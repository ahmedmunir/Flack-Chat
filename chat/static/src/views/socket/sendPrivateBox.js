import {elements} from './../base';

export const sendPrivateBox = (e) => {

    // Display black backwindow
    document.querySelector('.black-background').classList.add('display_private_message');

    // Display Private message Box
    elements.direct_message.classList.add('display_private_message');
    elements.direct_message.setAttribute('id', e.target.getAttribute('id'));
    elements.direct_message_replyButton.textContent = 'Send';
    elements.direct_message_ignoreButton.textContent = 'cancel';
    elements.direct_messageSender.textContent = `send a message to ${e.target.textContent}:`;
}