export const socket__getMessagesOfRememberedRoom = async (data) => {

    let messages;

    await fetch(`${location.protocol}//${location.hostname}:${location.port}/messages/${data["room"]}`)
    .then(response => response.json())
    .then(msgs => {

        messages = msgs['messages']

    })

    return messages;
}