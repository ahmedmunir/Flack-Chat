import {elements} from './base';

export const clear_messages = () => {
    elements.messages__container.innerHTML = '';
}

export const display_messages = (msgs, username) => {

    //display older messages
    for(let arr of msgs){
        const bigger_container = document.createElement('div');
        const message_container = document.createElement('div');
        const p = document.createElement('p');
        const nam = document.createElement('p');
        const ti = document.createElement('span');
        message_container.append(p);
        bigger_container.append(nam);
        bigger_container.append(message_container);
        bigger_container.append(ti);
        elements.messages__container.append(bigger_container);
        nam.innerHTML = `${arr[0]}:`;
        p.innerHTML = arr[1];
        ti.innerHTML = arr[2];

        //Styling message
        nam.classList.add('message-username');
        message_container.classList.add('message-container');
        ti.classList.add('time-style')
        
        //check whether the message is of the user who logged in or another one
        if (username == arr[0]) {
            message_container.classList.add('message-container-userColor');
            bigger_container.classList.add('whole-message-box-owner');
        } else {
            message_container.classList.add('message-container-strangeColor');
            bigger_container.classList.add('whole-message-box-strange');
        }
        
    }
}

export const display_textArea_sendButton = () => {
    elements.sendMessage_button.classList.add('sendButton__text_hide');
    elements.sendMessage_text.classList.add('sendButton__text_hide');
}

////styling the color of button of room selected
export const room_selected_style = (e) => {
    
    //select all channels inside
    elements.channels__people.childNodes.forEach(list_element => {
        
        //set background to white
        list_element.classList.remove('style-selected-room');
    })

    //set the selected channel to be green
    e.target.classList.add('style-selected-room');
}