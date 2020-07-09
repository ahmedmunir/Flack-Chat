# CS50 Web programming with Python and Javascript (Project 2):

# Flack Chat
After i finished this app with full functionallity according to requirments, i found that my code is too messy, and it was taking too much time to debug small problem at front-end or back-end.
so i read about refactoring code and design patterns; and now my code is separated into 2 sections:

# Demo:
![Alt Text](https://media.giphy.com/media/eJAEFwvHnH6TTCyNp1/giphy.gif)

## Front-End Section:
My app consists of 2 pages:
**Home Page**: which template at **chat/templatesindex.html**  
                     styles at **chat/static/style.css**
                     JS script at **chat/static/dist/script.JS**


**chat Page**: at this page i depend on MVC pattern because code here was too messy; because this page was responsible of all communications between client side & server side, i depend on **webpack** to pack JS code from all files inside **chat/static/dist/bundle.js**.

i used npm & package.json to install webpack.
inside **chat/static/src** you will find the whole code of my chat page JS code
where it is divided into:
- models: which have the code for connection with backend through AJAX or socket.
- views: to represent all changes after receiving data in models
- index.js: which is the controller that connects between models and views. 

Each file inside **models** and **views** has name which represents its job inside my app; while **base** file which exist in **chat/src/views** has all variables that are not connected to specific section in our code but variables that will be used by more than one function like DOM variables.

Both **models** and **views** have **socket** folder, which has all manipulation or view functions that will run only inside websocket connection, to separate them from other functions.

The styling of chat page will be at **chat/static/css/chat.css**.

## Back-End Section:
i depend on the same concept of (separation of concerns) at back-end too.
so i turned my main chat into package which has 3 files:
- __init__.py: which has **app** variable that will run application and all common variables that will be used across the app.
- routes.py: has all routes functions.
- socket.py: has all socket functions.

application.py: that file will just run application, and i run it using socketio server to be able to run websocket along with app (i got this from flask-socketIO DOCS).

## Personal Touch:
my personal Touch is a private message, by clicking on people list, all available users will display and by clicking to any of them, you will get a send message box to send a message to any of them.
the receiver will get an alert message, where he can read the message or ignore it.
