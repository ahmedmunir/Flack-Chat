import {elements} from './base';

export const displayChannels = () => {
    //set attribute value to ul to be used later
    elements.channels__people.setAttribute('data-type', 'channels');

    //change the style of button
    elements.channels__button.classList.add('button-color');
    elements.people__button.classList.remove('button-color');
    elements.create__channel.classList.remove('disable__roomButton');
    elements.create__channelInput.classList.remove('disable__roomButton');
}