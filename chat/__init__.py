from flask import Flask, session
from flask_socketio import SocketIO


app = Flask(__name__)
app.config["SECRET_KEY"] = "mZq4t7w!ShVmYq3tbPeSgVkYG-KaPdSg%C*F-JaN"
app.config["SESSION_TYPE"] = "filesystem"

# data structure to store all usernames
users = {}

'''Here we store rooms & messages inside dictionary, first we have array of rooms
   inside each room is array of tuples, where each tuple has 3 elements
   first element is the name of the username (creator of message)
   second element is the message itself
   third element is the time we created this message
'''
rooms_messages = {}

from chat import socket

from chat import routes

