import {elements} from './../base';

export const socket__messageJoinLeave = (data, username) => {
    //figure out whether the connection comming from (joining / leaving) person or new message
    if(data["join"] || data["leave"]) {
        const join_message = data["join"] || data['leave'];
        const join_p = document.createElement('p');
        join_p.classList.add('join_room_person');
        join_p.innerHTML = join_message;
        elements.messages__container.append(join_p);
        
    } else {

        //in case just default message sent to specific room
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
        nam.innerHTML = `${data['username']}:`;
        p.innerHTML = data['message'];
        ti.innerHTML = data["time"];

        //Styling message
        nam.classList.add('message-username');
        message_container.classList.add('message-container');
        ti.classList.add('time-style')
        
        //check whether the message is of the user who logged in or another one
        if (username == data['username']) {
            message_container.classList.add('message-container-userColor');
            bigger_container.classList.add('whole-message-box-owner');
        } else {
            message_container.classList.add('message-container-strangeColor');
            bigger_container.classList.add('whole-message-box-strange');
        }

    }

    //set scrollbar to become at the end of chat
    elements.messages__container.scrollTop = elements.messages__container.scrollHeight - elements.messages__container.clientHeight;
    
}