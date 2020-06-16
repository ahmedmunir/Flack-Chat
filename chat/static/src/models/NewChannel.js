import {elements} from './../views/base';

export const new_channel_request = async () => {
    let results;
    let data = new FormData();
    data.append('channel', elements.create__channelInput.value);
    await fetch(`${location.protocol}//${location.hostname}:${location.port}/chat/newChannel`,{
        method: 'POST',
        body: data
    })
    .then(response => response.json())
    .then(data => {

        results = data;


    })

    //return the data by function
    return results;
}