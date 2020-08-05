/***  Normal MVC imports  ***/
import {elements, update_ul} from './views/base';

import * as channelsView from './views/channelsView';
import * as peopleView from './views/peopleView';
import listRequest from './models/listRequest';

import * as newChannelView from './views/newChannelView';
import * as NewChannel from './models/NewChannel';

import * as joinRoomView from './views/joinRoomView';
import * as JoinRoom from './models/JoinRoom';

/***  Socket MVC imports  ***/
import {socket__messageJoinLeave} from './views/socket/messageJoinLeave';

import {socket__updatePeopleChannels} from './views/socket/updatePeopleChannels';

import {socket__updateRoomAtSession} from './models/socket/updateRoomAtSession';

import {socket__getMessagesOfRememberedRoom} from './models/socket/getMessagesOfRememberedRoom';

import {displayMessagesRememberedRoom, room_selected_style} from './views/socket/getMessagesOfRememberedView';

import {receivePrivateBox} from './views/socket/receivePrivateBox';

import {sendPrivateBox} from './views/socket/sendPrivateBox';

/****** Global Variables Section  that needed to be associated with each client ******/

//variable to store current logged in user
var username_client = '';

// value to store current chatting room or person
var state = {};
state.current_chatting = {};


/****** Main Socket Section that responsible of send and receive messages at rooms ******/

// open a SocketIO connection with server
const socket = io.connect(`${location.protocol}//${location.hostname}:${location.port}`);
socket.on('connect', (data) => {
    console.log('SocketIO connection Established');
    
    /*update the username variable that will responsible of declaring the username at top of code
    and preventing from display the user (which already logged in) inside people list*/
    if(data) {
        document.querySelector('.login_user').innerHTML = `<p>Welcome ${data['username']}, Enjoy Chatting with our Flack Chat App</p>.<p>You can create new channel, chat inside any channel you select and send private message to any online user</p>`;
        username_client = data['username'];
        state.current_chatting['connector'] = data['room'];
        console.log(data)
    }
    
})

//listening to incoming messages
socket.on('message', data => {
    
    //display message of leaving or joining room / or just normal message
    socket__messageJoinLeave(data, username_client);

})

//update list of channels or persons when new person or channel added
socket.on('updateList', data => {

    //check whether we update list of people or list of channels
    if(data["newuser"] && (elements.channels__people.getAttribute('data-type') == 'people')) {
        socket__updatePeopleChannels('people', data)
    
     } else if (data["newroom"] && (elements.channels__people.getAttribute('data-type') == 'channels')) {
        socket__updatePeopleChannels('channels', data["newroom"]);
     }
 })



 //update room variable in session
 socket.on('update_room', data => {
    socket__updateRoomAtSession(data);
 })

 //remember the last room visited by user
 socket.on('remember_channel', async (data) => {
     
    //if channel remembered
    if(data['room']) {
        
        //click on channel button
        elements.channels__button.click();

        //ask for messages from remembered Channel
        let messages = await socket__getMessagesOfRememberedRoom(data);

        //display messages after receive them
        displayMessagesRememberedRoom(messages, username_client);

        //join new room or make new connection from that room
        socket.emit('join', {'room': data['room'] });

        // display text area and button to send messages
        elements.sendMessage_button.classList.add('sendButton__text_hide');
        elements.sendMessage_text.classList.add('sendButton__text_hide');

        //styling the room that remembered by giving it green color
        room_selected_style(data['room']);

    }     

 })


/****** Private socket Section that responsible of private messages between users ******/
const private_socket = io('/private');

//display message to user when received from private socket
private_socket.on('private', data => {

    //display alert box
    document.querySelector('.receive-message-alert').classList.add('display_private_message');

    //store private message data inside state
    state.current_chatting['data'] = data
})


/************** Display List of channels or List of People Section*******************/

//add event listener on click on channels button
elements.channels__button.addEventListener('click', (e) => {

    
    e.preventDefault();

    display_list_request('channels');

})

//add event listener on click on people button
elements.people__button.addEventListener('click', (e) => {
    e.preventDefault();

    display_list_request('people');

})

const display_list_request = async (list_requested) => {

    //check whether the requested is list of channels or list of people

    if(list_requested == 'channels') {

        //add CSS styles to channels button and display Create channel with input
        channelsView.displayChannels();
    
    } else if (list_requested == 'people') {

        //display all people that are available
        peopleView.displayPeople();
    }

    //ask for channels from server, and display all available channels
    state.listRequestResult = new listRequest(list_requested);
    await state.listRequestResult.getResult();

    //update the current list and display all channels or all online users
    update_ul(state.listRequestResult.results, username_client);

}

/************** Create new channel Section *******************/

//create new channel button
elements.create__channel.addEventListener('click', (e) => {
    e.preventDefault();

    new_channel();

})

const new_channel = async () => {

    //check that user has entered data to create new channel
    if(newChannelView.newChannel_validation()) {
        
        //send channel name to server
        let new_channel_request = await NewChannel.new_channel_request();
        
        //update the new channel UI
        newChannelView.clear_newChannel_validation(new_channel_request);
    }
}


/************** Join room or send private_message Section *******************/

//make child elements clickable to be able to join chat rooms or talk to others
elements.channels__people.addEventListener('click', (e) => {
    
    //if the item clicked is channel 
    if(e.target.getAttribute('value') == 'channels') {

        join_room(e);

    }else {

        private_message(e);
    }
    
})

const join_room = async (e) => {
    //test that the user chose new chat room or the already chosen one
    if(state.current_chatting['connector'] == e.target.textContent) {

        //return nothing if user chose the same room he already in
        return false;

    } else {

        //leave previous room if he was already at room 
        if(state.current_chatting['connector']) {
            socket.emit('leave', {'room': state.current_chatting['connector']});
        }

        //update the value of our state
        state.current_chatting['connector'] = e.target.textContent;
        state.current_chatting['type'] = e.target.getAttribute('value');

        //clear all messages from old room
        joinRoomView.clear_messages();

        //get all messages for the selected room
        let messages = await JoinRoom.get_messages(state.current_chatting['connector']);

        //display all messages after receiving
        joinRoomView.display_messages(messages, username_client);

        //join new room or make new connection from that room
        socket.emit('join', {'room': state.current_chatting['connector'] });

        // display text area and button to send messages
        joinRoomView.display_textArea_sendButton();

        //styling the color of button of room selected
        joinRoomView.room_selected_style(e);

    }
}

//display private message function
const private_message = (e) => {
                
    //change the connector
    state.current_chatting['connector'] = e.target.getAttribute('id');
    state.current_chatting['type'] = e.target.getAttribute('value');            

    //display direct message pop up window
    sendPrivateBox(e);  
}
/***********  Alert Message Section  ********/

//open alert message
document.querySelector('.alert-open').addEventListener('click', e => {

    //display pop up box and depends on what he click we display messages or not
    receivePrivateBox(state.current_chatting['data'] );

    //remove the alert box
    document.querySelector('.receive-message-alert').classList.remove('display_private_message');
})

//ignore alert message
document.querySelector('.alert-ignore').addEventListener('click', e => {
    document.querySelector('.receive-message-alert').classList.remove('display_private_message');
})

/************************* Sending and receiving messages Section **************************/

//send message to all rooms when clicked or to specific user
elements.sendMessage_button.addEventListener('click', (e) => {
    e.preventDefault();

    //check whether we send to room or to specific person
    if(state.current_chatting['type'] == 'people') {
        private_socket.emit('private', {'message': elements.sendMessage_text.value, 'id': state.current_chatting['connector']})

    } else {
        //send message to back-end with room
        socket.emit('message', {'message': elements.sendMessage_text.value, 'room': state.current_chatting['connector']})

    }

    //clean textarea from old message
    elements.sendMessage_text.value = '';
})

//reply to a private message button
elements.direct_message_replyButton.addEventListener('click', (e) => {
    private_socket.emit('private', {'id': elements.direct_message.getAttribute('id'), 'message': elements.private_message_value.value});
    elements.direct_message.classList.remove('display_private_message');
    elements.private_message_value.value = '';

    // hide the back window
    document.querySelector('.black-background').classList.remove('display_private_message');
})

//ignore to a private message button
elements.direct_message_ignoreButton.addEventListener('click', () => {
    elements.direct_message.classList.remove('display_private_message');

    // hide the back window
    document.querySelector('.black-background').classList.remove('display_private_message');
})
