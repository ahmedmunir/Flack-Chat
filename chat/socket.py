from flask import request, session
from chat import  app, users, rooms_messages
from datetime import datetime
from flask_socketio import SocketIO, emit, send, join_room, leave_room

socketio = SocketIO(app)


# socket IO connections:
@socketio.on('connect')
def test_socketConnect():
    users.get(session.get('username'))["id"] = request.sid

    # update the request.sid for user at front end
    # everytime the user refresh page or close and reopen tab
    # new websocket connection established, with new SID for each socketio request
    # we depend on that SID for private messages, so each time user refresh or close and reopen
    # browser; we need to update the value of id of user at front end

    #if user was already at room, redirect him to that room
    if(session.get('room')):
        emit('remember_channel', {'room': session.get('room')})

        #update the value of state.current_chatting['connector'] to be used for further communication
        emit('connect', {'username': session.get('username'), 'room': session.get('room')})
    
    else:
        #in case that the user didn't join any room before closing chat tab
        #send username to the client
        emit('connect', {'username': session.get('username')})

    #update the list of users using socketio
    emit('updateList', {
        "newuser": users.get(session.get('username')).get('name'),
        'sid': users.get(session.get('username')).get('id')
        }, broadcast=True)

    print("SocketIO connection established on Server Side")

@socketio.on('disconnect')
def test_disconnect():
    print("User has been disconnected")

#send message to private room
@socketio.on('message')
def send_message(msg):

    #retreive messages & username to store them and room name
    message = msg.get('message')
    username = session.get('username')
    room = msg.get('room')
    message_time = str(datetime.now())
    decimal_point_index = message_time.find('.')
    message_time = message_time[:decimal_point_index]

    #check that the length of list that contains messages doesn't exceed 100
    if len(rooms_messages.get(room)) >= 100:
        
        #remove the first message
        rooms_messages[room].pop(0)

    #add new message to the end of messages
    rooms_messages[room].append((username, message, message_time))

    emit('message', {"username": username, "message": message, "time": message_time}, room=room)

#joining specific room
@socketio.on('join')
def on_join(data):
    username = session.get('username')
    room = data.get('room')
    join_room(room)
    send({"join": f'{username} has joined room'}, room=room)
    emit('update_room', {'room': room})

#leaving room
@socketio.on('leave')
def on_leave(data):
    username = session.get('username')
    room = data.get('room')
    leave_room(room)
    send({'leave': f'{username} has left room'}, room=room)

#route to receive private message
@socketio.on('private', namespace="/private")
def private(private_data):
    emit('private', {"sender_id": users.get(session.get('username')).get('id'), "sender": session.get('username'), 'message': private_data.get('message')}, room=private_data.get('id'))

