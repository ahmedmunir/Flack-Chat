import {elements} from './base';

export const displayPeople = () => {
    //set attribute value to ul to be used later
    elements.channels__people.setAttribute('data-type', 'people');

    //change the style of button
    elements.channels__button.classList.remove('button-color');
    elements.people__button.classList.add('button-color');
    elements.create__channel.classList.add('disable__roomButton');
    elements.create__channelInput.classList.add('disable__roomButton');
}