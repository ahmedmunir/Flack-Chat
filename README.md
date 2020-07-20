# Flack Chat:Real time Chat application using Flask.
This is the second project of course [CS50's web programming using python and Javascript](https://www.edx.org/course/cs50s-web-programming-with-python-and-javascript)- 2018.  
It is real time application which supports chatting inside private rooms and sending private messages to other users.    
Each User must login using Unique username.  
The project depends on [Flask-SocketIO](https://flask-socketio.readthedocs.io/en/latest/) at server side & [SocketIO JS library](https://socket.io/) at client side. 

# Demo:
![Alt Text](https://media.giphy.com/media/Qu73SOGNSOAWscndna/giphy.gif)

# Overview:
My app has no DB, i save last 100 messages inside data structure variables.  
The app is divided into 2 sections:  

## Front-End Section:
My app consists of 2 pages:  
**Home Page**: which template at **chat/templatesindex.html**    
                     styles at **chat/static/style.css**  
                     JS script at **chat/static/dist/script.JS**  


**chat Page**: at this page i depend on MVC pattern because code here was too messy.  
This page was responsible of all communications between client side & server side; so i depend on **webpack** to pack JS code from all files inside **chat/static/dist/bundle.js**.  

I used npm & package.json to install webpack.
inside **chat/static/src** you will find the whole code of my chat page JS code where it is divided into:
- **models**: which have the code for connection with backend through **AJAX** or **socket**.
- **views**: to represent all changes after receiving data in models
- **index.js**: which is the controller that connects between models and views.   

Each file inside **models** and **views** has name which represents its job inside my app; while **base.js** file which exists in **chat/src/views** has all variables that are not connected to specific section in our code but variables that will be used by more than one function like DOM variables.  

Both **models** and **views** have **socket** folder, which has all manipulation or view functions that will run only inside websocket connection, to separate them from other functions.

The styling of chat page will be at **chat/static/css/chat.css**.  

## Back-End Section:
i depend on the same concept of (separation of concerns) at back-end too.
so i turned my main chat into package which has 3 files:
- __init__.py: which has **app** variable that will run application and all common variables that will be used across the app.
- **routes.py**: has all routes functions.
- **socket.py**: has all socket functions.


# Installation:
if you are going to use this application locally, you need to re-configure it.  
According to **Flask-SocketIO** [DOCS](https://flask-socketio.readthedocs.io/en/latest/); in case of development mode while you depend on **flask** web server, you need to modify how to run the app; by modifying **application.py** code to be:
```python
if __name__ == "__main__":
    socketio.run(app)
```
then run the app:
```bash
python application.py
```

if you are going to upload it to web server, you need to follow [DOCS](https://flask-socketio.readthedocs.io/en/latest/) of **Flask-SocketIO** according to server you are going to use.  
My app uses **gunicorn** web server which is required by **heroku** platform.

# Important Note:
Try not to run application on Mozila Firefox, because there is problem with headers that sent from socketIO to serverside which Mozila consider it as deprecated.

# Website Link:
Enjoy Chatting:  
https://flackchat-app.herokuapp.com/