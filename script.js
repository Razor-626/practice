// Settings
const request = new XMLHttpRequest();
const url = "http://localhost:3002";
const modalRegisterForm = document.getElementById('modal-registr-form');

class SendData{ 
    id; 
    name; 
    surname; 
    age;}


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
function sendPostRequest(event, registrFormInputs){

    event.preventDefault();


    let requestBody = new SendData

    for(let i = 0; i < registrFormInputs.length; i++){
        requestBody[registrFormInputs[i].name] = registrFormInputs[i].value
    };

    console.log(requestBody);
    
    request.open('POST', url + '/create', true);

    request.setRequestHeader("Content-type", "application/json");
    request.onreadystatechange = function() {
        if(request.readyState == XMLHttpRequest.DONE && (request.status == 200 || request.status == 201)) {
            alert(JSON.parse(request.responseText).answer);
        };
    }
    
    request.send(JSON.stringify(requestBody));
    
}   


//PATCH request

function sendPatchRequest(event, editFormInputs){

    event.preventDefault();

    for(let i = 0; i < editFormInputs.length; i++){
        newData[editFormInputs[i].name] = editFormInputs[i].value
    };
    
    request.open('PATCH', url + '/update', true);

    request.setRequestHeader("Content-type", "application/json");
    request.onreadystatechange = function() {
        if(request.readyState == XMLHttpRequest.DONE && request.status == 200) {
            alert(JSON.parse(request.responseText).answer);
            console.log(JSON.parse(request.responseText).answer);
        };
    }
    
    requestBody = {oldData, newData};

    request.send(JSON.stringify(requestBody));
}


//Delete request

function deleteUserRequest(event, user_id){

    event.preventDefault();
    
    request.open('DELETE', url + '/delete?id=' + user_id);

    request.setRequestHeader('Content-Type', 'application/x-www-form-url');

    request.addEventListener("readystatechange", () =>{
        if(request.readyState === 4 && request.status == 200 ){
            alert(JSON.parse(request.responseText).answer);  
            console.log(JSON.parse(request.responseText).answer);
        }
    })

    request.send(null);
    
}


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


//Register Modal Form
const registerNav = document.getElementById('registration');
const saveRegistrUser = document.getElementById('registrUser');
const registerFormContainer = document.getElementById('modal-registrform-block')
const registrFormInputs = modalRegisterForm.getElementsByTagName('input')


function clearInputValue(formInputs){
    for(let i = 0; i < formInputs.length; i++){
        formInputs[i].value = '';
    }
}

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


function complete(value, formContainer) {
    hideCover();
    formContainer.style.display = 'none';
    document.onkeydown = null;
}

function closeModal(formContainer, form){
    
    
    form.cancel.onclick = function() {
        complete(null, formContainer);
    };
    
    document.onkeydown = function(e) {
        if (e.key == 'Escape') {
            complete(null, formContainer);
        }
    };

    const overModalClick = document.getElementById('cover-div');

    overModalClick.addEventListener('click', function(){
        complete(null, formContainer);
    }); 

}


function showRegisterForm(registerFormContainer){

    const registrForm = registerFormContainer.getElementsByTagName('form')[0];

    showCover();
    clearInputValue(registrFormInputs);
    registerFormContainer.style.display = 'block';


    //Send request and close modal
    saveRegistrUser.onclick = function(event){
        validateData(event, registrForm)
        let errors = registrForm.querySelectorAll('.error');
        if(errors.length == 0){
            sendPostRequest(event, registrFormInputs);
            complete(null, registerFormContainer)
        }
    }

    
    closeModal(registerFormContainer, registrForm);
}

registerNav.addEventListener('click', function(){
    showRegisterForm(registerFormContainer)
});


//Edit and delete modal form

const saveEditUser = document.getElementById('editUser');
const deleteUser = document.getElementById('deleteUser');
const editFormContainer = document.getElementById('modal-editform-block');
const oldData = new SendData    
const newData = new SendData



function showModalEditForm(userData, editFormContainer){

    showCover();
    const editForm = editFormContainer.getElementsByTagName('form')[0];
    const editFormInputs = editForm.querySelectorAll('input');
    const data = userData.getElementsByTagName('td');

    for(let i = 0; i < data.length - 1; i++){
        editFormInputs[i].value = data[i].innerHTML;
        oldData[editFormInputs[i].name] = data[i].innerHTML;
    }

    editFormContainer.style.display = 'block';


    //Delete User
    deleteUser.onclick = function(event){
        deleteUserRequest(event, oldData.id);
        complete(null, editFormContainer)
    }

    //Save Edit and close modal
    saveEditUser.onclick = function(event){
        validateData(event, editForm)
        let errors = editForm.querySelectorAll('.error');
        if(errors.length == 0){
            sendPatchRequest(event, editFormInputs);
            complete(null, editFormContainer)
        }
    }

    editForm.onsubmit = function(event){
        validateData(event, editForm)
    }
    
    closeModal(editFormContainer, editForm)

}


function editUsers(editFormContainer){
    const editButtons = document.getElementsByClassName("edit-button");
    for(let i = 0; i < editButtons.length; i++){
        editButtons[i].addEventListener('click', function(){
            userDataStream = editButtons[i].parentNode.parentNode;
            showModalEditForm(userDataStream, editFormContainer);
        })
    }
}


window.onload = function(){ // Исправвить необх постоянной перезагрузки
    editUsers(editFormContainer);
}


// Validator

function validateData(event, form){

    
    function createErrorDiv(error, formInput){
        if(error != undefined){
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error';
            errorDiv.style.color = 'red';
            errorDiv.innerHTML = error;;
            formInput.parentElement.insertBefore(errorDiv, formInput);        
        }
    
    }


    function number_field_error_handler(input){
    
        let error;
    
        if(input.value <=  0){
            error = 'This field can not be 0 or less.' 
        }else if(input.name == 'age' && input.value > 100){
            error = 'Incorrect age value.'
        }
    
    }
    
    function text_field_error_handler(input){
        
        let error;
    
        if(/[0-9]/.test(input.value)){
            error = 'Field ' + input.name + ' shouldn\'t contain numbers.'
        } else if(input.value.length < 5){
            error = 'Field ' + input.name + ' should be longer than 5 symbol.'
        } else if(input.value.length > 50){
            error = 'Field ' + input.name + ' shouldn\'t be longer than 50 symbol.'
        }
    
        createErrorDiv(error, input);
    }


    function empty_error_handler(event, form){
    
        const formInputs = form.getElementsByTagName('input');

        for(let i = 0; i < formInputs.length; i++){
            
            if(formInputs[i].value == ''){
                
                createErrorDiv('Is empty', formInputs[i]);
                
            } else {
    
                if (formInputs[i].name == 'id' || formInputs[i].name == 'age'){
                    
                    number_field_error_handler(formInputs[i]);
                }else{
    
                    text_field_error_handler(formInputs[i]);
    
                }
            }
        }

        event.preventDefault();
    }


    let errors = document.querySelectorAll('.error');

    for(let i = 0; i < errors.length; i++){
        errors[i].remove();
    }

    empty_error_handler(event, form);    

}

