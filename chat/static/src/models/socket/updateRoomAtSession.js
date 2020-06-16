export const socket__updateRoomAtSession = (data) => {
    let room = data['room']
    let room_send = new FormData()
    room_send.append('room', room)
    fetch(`${location.protocol}//${location.hostname}:${location.port}/update/room`, {
        method: 'POST',
        body: room_send
    })
    .then(response => response.json())
    .then(data => {
        console.log('Room sent successfully');
    })
}