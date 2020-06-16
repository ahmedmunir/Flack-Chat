export const get_messages = async (room) => {
    
    let messages_of_room;

    //get data of new channel and display them
    await fetch(`${location.protocol}//${location.hostname}:${location.port}/messages/${room}`)
    .then(response => response.json())
    .then(msgs => {

        messages_of_room = msgs['messages'];
        
    })

    return messages_of_room;
}