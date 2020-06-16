export const elements = {
    channels__button : document.querySelector('.channels'),
    people__button : document.querySelector('.people-online'),
    channels__people : document.querySelector('.results'),
    create__channel : document.querySelector('.create-room'),
    create__channelInput : document.querySelector('.new__room__field'),
    newchannelError_text : document.querySelector('.newchannelError_text'),
    sendMessage_button : document.querySelector('.send-message'),
    sendMessage_text : document.querySelector('.message-text'),
    messages__container : document.querySelector('.messages'),
    newroom__input : document.querySelector('.new__room__field'),
    direct_message : document.querySelector('.private_message'),
    direct_messageSender : document.querySelector('.private_message_header'),
    direct_messageText : document.querySelector('.private_message_text'),
    private_message_value : document.querySelector('.reply_private_message'),
    direct_message_replyButton : document.querySelector('.private_message_reply'),
    direct_message_ignoreButton : document.querySelector('.private_message_ignore')
}

//function to update the list that display people or channels
export const update_ul = (data, username_client) => {
    // extract the results first
    let results = data['data'];
    let list_type = data['list_type'];

    //clear ul list from all items
    elements.channels__people.innerHTML = '';

    //check whether result is array of users or object of rooms
    let results_type = Object.keys(results);

    for(let key of results_type) {

        //prevent display the name of current logged in user
        //and we use || to give the ability to use to create a channel has name equal to his nickname
        if(results[key]['name'] !== username_client || list_type == 'channels') {
            const li = document.createElement('li');
            li.classList.add('list_style');
            li.setAttribute('value',list_type);

            if(list_type == "people") {
                li.setAttribute('id', results[key]['id']);
                li.innerHTML = results[key]['name'];
            } else {
                li.innerHTML = key;
            }
            
            elements.channels__people.append(li);
        }
    }
}

