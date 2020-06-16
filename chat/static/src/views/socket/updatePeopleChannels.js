 import {elements} from './../base';
 
 //function to update list of users or channels
 export const socket__updatePeopleChannels = (list_type, new_list) => {

    //variable to check whether we have the same user already logged in and we want just to update 
    //its SID
    let updating_sid_checker = false;
    
    //check whether we have new user to add or updating the value of existing user
    //by checking the value of name of user
    //select all elements that has list_style class to check their values
    document.querySelectorAll('.list_style').forEach( e => {
        if(e.innerHTML === new_list['newuser']) {

            //we find the item that has the same name so we update its value
            e.setAttribute('id', new_list['sid']);
            updating_sid_checker = true;
        }
    })
    
    //using the checker to guide us
    if(updating_sid_checker == true) {
        
        //set it back to false, for the next user to be added
        updating_sid_checker = false;
        
    } else {
        const li = document.createElement('li');
        li.setAttribute('value', list_type);
        var new_li = new_list;
        li.classList.add('list_style');

        if(list_type == "people") {
            li.setAttribute('id', new_li['id']);
            li.innerHTML = new_li['newuser'];
        } else {
            li.innerHTML = new_li;
        }
        elements.channels__people.append(li);
    }

}