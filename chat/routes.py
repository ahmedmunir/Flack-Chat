from flask import url_for, render_template, request, jsonify, redirect, flash, redirect, session
from chat import app, users, rooms_messages
from chat.socket import socketio

from functools import wraps

#login function decorator to check whether the user is logged in or not
def login_auth(test):
    @wraps(test)
    def wrap(*args, **kwargs):
        if not session.get('username'):
            flash('Please login first with a Unique name')
            return render_template('index.html')
        else:
            return test(*args, **kwargs)
    return wrap


@app.route("/", methods=["GET", "POST"])
def hello():
    # check if the request is POST or GET
    if request.method == "GET":

        if not session.get('username'):
            return render_template('index.html')
        else:
            return redirect(url_for('chat'))

    elif request.method == "POST":
        username = request.form.get('username')
        
        #check whether username is already used or not
        if username in users:
            return jsonify({
                "username": "already used"
            })
        else:
            # add new user to our database
            users[username] = {}
            users.get(username)["name"] = username
            session["username"] = username
            
            return jsonify({
                "username": "Done"
            })


@app.route("/chat", methods=["GET", "POST"])
@login_auth
def chat():

    if request.method == "GET":
        return render_template('chat.html')

    elif request.method == "POST":
        
        #get the type of list requested by user
        list_requested = request.form.get('list')

        if list_requested == 'people':
            return jsonify({
                'data': users,
                'list_type': list_requested
            })
        
        elif list_requested == 'channels':
            return jsonify({
                'data': rooms_messages,
                'list_type': list_requested
            })

@app.route("/chat/newChannel", methods=["POST"])
@login_auth
def new_channel():

    if request.method == "GET":
        return 'Error Page', 404
    
    else:
        new_channel = request.form.get('channel')

        #check if channel is created or not
        if new_channel in rooms_messages:
            return jsonify({
                'data': 'used'
            })
        else:
            rooms_messages[new_channel] = []

            socketio.emit('updateList', {"newroom": new_channel}, broadcast=True)
            return jsonify({
                'data': rooms_messages,
                'list_type': 'channels'
            })

#ask for messages of specific room
@app.route("/messages/<room>")
def messages_room(room):
    messages = rooms_messages.get(room)
    return jsonify({
        "messages": messages
    })

@app.route('/update/room', methods=["POST"])
def update_room():
    room = request.form.get('room')
    session['room'] = room
    return jsonify("Done")