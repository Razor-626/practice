// Settings
const request = new XMLHttpRequest();
const url = "http://localhost:3002";
const modalRegisterForm = document.getElementById('modal-registr-form');

//Get request
request.open('GET', url);

request.setRequestHeader('Content-Type', 'application/x-www-form-url');

request.addEventListener("readystatechange", () =>{
    if(request.readyState === 4 && request.status === 200){
        userArray = JSON.parse(request.response);
        renderAllUser(userArray.users);  
    }
});

request.send();



//Post request

const registrUser = document.getElementById('registrUser');

function sendPostRequest(event){

    event.preventDefault();


    let requestBody = new SendData
    const modalFormInputs = modalRegisterForm.getElementsByTagName('input')

    for(let i = 0; i < modalFormInputs.length; i++){
        requestBody[modalFormInputs[i].name] = modalFormInputs[i].value
    };

    console.log(requestBody);
    
    request.open('POST', url + '/create', true);

    request.setRequestHeader("Content-type", "application/json");
    request.onreadystatechange = function() {
        if(request.readyState == XMLHttpRequest.DONE && (request.status == 200 || request.status == 201)) {
            console.log('OK');
        };
    }
    
    request.send(JSON.stringify(requestBody));
    
}

registrUser.onclick = function(event){
    sendPostRequest(event);
}




//Modal Form
const registerNav = document.getElementById('registration');

function showCover() {
    
    let coverDiv = document.createElement('div');
    coverDiv.id = 'cover-div';

    document.body.style.overflowY = 'hidden';

    document.body.append(coverDiv);
}


function hideCover() {
    document.getElementById('cover-div').remove();
    document.body.style.overflowY = '';
  }


function showModalRegistrationForm(){
    
    showCover();
    let modalFormContainer = document.getElementById('modal-registrform-block')
    modalFormContainer.style.display = 'block';


    function complete(value) {
        hideCover();
        modalFormContainer.style.display = 'none';
        document.onkeydown = null;
    }
    
    /*
    modalRegisterForm.onsubmit = function() {
        complete(value);
        return false;
    };
    */

    modalRegisterForm.cancel.onclick = function() {
        complete(null);
    };
    

    document.onkeydown = function(e) {
        if (e.key == 'Escape') {
            complete(null);
        }
    };
    
    // Hide cover
    const overModalClick = document.getElementById('cover-div');

    overModalClick.addEventListener('click', complete);
//

}

registerNav.addEventListener('click', showModalRegistrationForm);



//Rendering JSON Data
function insertAfter(lastElement, newTr) {
    lastElement.parentNode.insertBefore(newTr, lastElement.nextSibling);
    lastElement.classList.remove('last_stream');
    newTr.classList.add('last_stream');

};


function sortedByField(field) {
    return (a, b) => a[field] > b[field] ? 1 : -1;
}
  

function renderAllUser(usersArray){

    usersArray.sort(sortedByField('name'));

    for(let i = 0; i < usersArray.length; i++){
        
        let lastElement = document.querySelector('.last_stream');        
        user = usersArray[i];
        user_keys = Object.keys(user);
        key_counter = user_keys.length;
        let newTr = document.createElement('tr');
        
        for(let j = 0; j < key_counter; j++){
            newTr.innerHTML += "<td>" + user[user_keys[j]] + "</td>";   
        }

        newTr.innerHTML += "<td class='edit-td'><button class='edit-button' value='" + user.id + "'></button></td>"
        insertAfter(lastElement, newTr);


    }


};


//Edit User (refactoring)

/*
function getCurrentUser(userId){

    request.open('GET', url);

    request.setRequestHeader('Content-Type', 'application/x-www-form-url');

    request.addEventListener("readystatechange", () =>{
        if(request.readyState === 4 && request.status === 200){
            userArray = JSON.parse(request.response);
            renderAllUser(userArray);  
        }
});

request.send();

}
*/

const editUser = document.getElementById('editUser');

class SendData{
    id; 
    name;
    surname;
    age;
}

function sendPatchRequest(event){

    event.preventDefault();
    /*
    request.open('POST', url + '/create', true);

    request.setRequestHeader("Content-type", "application/json");
    request.onreadystatechange = function() {
        if(request.readyState == XMLHttpRequest.DONE && (request.status == 200 || request.status == 201)) {
            console.log('OK');
        };
    }
    
    request.send(JSON.stringify(requestBody));
    */
   console.log('patch');
}

editUser.onclick = function(event){
    sendPatchRequest(event);
}

function showModalEditForm(userData){

    showCover();
    let modalFormContainer = document.getElementById('modal-editform-block')
    let modalForm = document.getElementById('modal-edit-form')
    let modalFormInputs = modalForm.getElementsByTagName('input')
    let data = userData.getElementsByTagName('td');

    const oldData = new SendData


    for(let i = 0; i < data.length - 1; i++){
        modalFormInputs[i].value = data[i].innerHTML;
        oldData[modalFormInputs[i].name] = data[i].innerHTML;
        console.log(modalFormInputs[i].name);
    }

    console.log(oldData);

    function complete(value) {
        hideCover();
        modalFormContainer.style.display = 'none';
        document.onkeydown = null;
    }
    
    /*
    form.onsubmit = function() {
        complete(value);
        return false;
    };
    */

    modalForm.cancel.onclick = function() {
        complete(null);
    };
    

    document.onkeydown = function(e) {
        if (e.key == 'Escape') {
            complete(null);
        }
    };

    modalFormContainer.style.display = 'block';
    
    // Hide cover
    const overModalClick = document.getElementById('cover-div');

    overModalClick.addEventListener('click', complete);
    //

}


function editUsers(){
    const editButtons = document.getElementsByClassName("edit-button");
    for(let i = 0; i < editButtons.length; i++){
        editButtons[i].addEventListener('click', function(){
            userDataStream = editButtons[i].parentNode.parentNode;
            showModalEditForm(userDataStream);
        })
    }
}

window.onload = function(){
    editUsers();
}


