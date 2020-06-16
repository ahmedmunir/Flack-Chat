import {elements} from './../base';

export const receivePrivateBox = (data) => {

    // Display black backwindow
    document.querySelector('.black-background').classList.add('display_private_message');

    elements.direct_message.setAttribute('id', data['sender_id']);
    elements.direct_messageSender.textContent = `A message from: ${data['sender']}`;
    elements.direct_messageText.textContent = data['message'];
    elements.direct_message_replyButton.textContent = 'reply';
    elements.direct_message_ignoreButton.textContent = 'ignore';
    elements.direct_message.classList.add('display_private_message');
}