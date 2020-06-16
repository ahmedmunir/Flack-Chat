import {elements} from './base';

export const newChannel_validation = () => {
    if(elements.create__channelInput.value.length > 0) {
        
        return true
    
    } else {
        elements.newchannelError_text.innerHTML = 'Please enter unique channel name';
        elements.newchannelError_text.classList.add('display_createChannelButton_Error');
    }
}

export const clear_newChannel_validation = (data) => {
    
    //extract the results first
    let results = data['data']
    let list_type = data['list_type']
    
    //check whether channel created or not
    if(results == 'used') {
        elements.newchannelError_text.innerHTML = 'Please enter unique channel name';
        elements.newchannelError_text.classList.add('display_createChannelButton_Error');
        elements.create__channelInput.value = '';
    } else {
        
        //remove class of error message and error message itself if it exists
        elements.newchannelError_text.classList.remove('display_createChannelButton_Error');
        elements.create__channelInput.value = '';
    }
}