// Settings
const request = new XMLHttpRequest();
const url = "http://localhost:3002";
const modalRegisterForm = document.getElementById('modal-registr-form');

class SendData{
    id; 
    name;
    surname;
    age;
}


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


//PATCH request

function sendPatchRequest(event){

    event.preventDefault();

    const modalFormInputs = modalForm.getElementsByTagName('input')

    for(let i = 0; i < modalFormInputs.length; i++){
        newData[modalFormInputs[i].name] = modalFormInputs[i].value
    };
    
    request.open('PATCH', url + '/update', true);

    request.setRequestHeader("Content-type", "application/json");
    request.onreadystatechange = function() {
        if(request.readyState == XMLHttpRequest.DONE && (request.status == 200)) {
            console.log(request.status);
        };
    }
    
    requestBody = {oldData, newData};

    request.send(JSON.stringify(requestBody));
  
}


//Delete request

function deleteUserRequest(user_id){
    
    
    request.open('DELETE', url + '/delete?id=' + user_id);

    request.setRequestHeader('Content-Type', 'application/x-www-form-url');

    request.send(null);

    request.addEventListener("readystatechange", () =>{
        if(request.readyState === 4 && request.status == 200 ){
            console.log('Delete');  
        }
    })
    
}


//Register Modal Form
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


}

registerNav.addEventListener('click', showModalRegistrationForm);

///////////////////////////////////////////////////////////


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

///////////////////////////////////////////////////////////

//Edit and delete User Form

const editUserBtn = document.getElementById('editUser');
const deleteUserBtn = document.getElementById('deleteUser');
const modalForm = document.getElementById('modal-edit-form');
const oldData = new SendData    
const newData = new SendData



function showModalEditForm(userData){

    showCover();
    let modalFormContainer = document.getElementById('modal-editform-block')
    let modalFormInputs = modalForm.getElementsByTagName('input')
    let data = userData.getElementsByTagName('td');


    for(let i = 0; i < data.length - 1; i++){
        modalFormInputs[i].value = data[i].innerHTML;
        oldData[modalFormInputs[i].name] = data[i].innerHTML;
    }


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

    //Edit User
    editUserBtn.onclick = function(event){
        sendPatchRequest(event);
    }

    //Delete User
    deleteUserBtn.onclick = function(event){
        event.preventDefault()
        deleteUserRequest(oldData.id);
    }

    // Hide cover
    const overModalClick = document.getElementById('cover-div');

    overModalClick.addEventListener('click', complete);

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


window.onload = function(){ // Исправвить необх постоянной перезагрузки
    editUsers();
}
