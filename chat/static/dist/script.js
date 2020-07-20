// add event Listener when all DOM components loaded
document.addEventListener('DOMContentLoaded', () => {

    //initialize all DOM elements needed
    const username__Input = document.querySelector('.username-input'),
          username__button = document.querySelector('.username-add-button');
    
    // check whether user entered his name or not
    username__Input.addEventListener('keyup', () => {

        //check the length of input field
        if(username__Input.value.length > 0) {
            username__button.disabled = false;
        } else {
            username__button.disabled = true;
        }
        
    })

    // add event listener to button
    username__button.addEventListener('click', () => {
        
        const data = new FormData();

        // get data from input field
        data.append('username', username__Input.value);

        //send XMLhttpRequest to server
        fetch(`${location.protocol}//${location.hostname}:${location.port}`,{
            method: 'POST',
            body: data
        })
        .then(response => response.json())
        .then(data => {

            // check if username is used or not
            if(data["username"] == "already used") {

                //display error message that username is wrong
                document.querySelector('.error-message').textContent = 'Name is already used, please Try another one';

            } else {

                //redirect to chat page
                url = `${location.protocol}//${location.hostname}:${location.port}/chat`;
                window.location = url
            }
        })
    })
})