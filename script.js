// Settings
const request = new XMLHttpRequest();
const url = "http://localhost:3002";


//Get request
request.open('GET', url);

request.setRequestHeader('Content-Type', 'application/x-www-form-url');

request.addEventListener("readystatechange", () =>{
    if(request.readyState === 4 && request.status === 200){
        userArray = JSON.parse(request.response);
        renderAllUser(userArray);  
    }
});

request.send();


//Modal Form

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


function showModalForm(event){
    
    showCover();
    let modalFormContainer = document.getElementById('modal-form-block')
    let modalForm = document.getElementById('modal-form');
    modalFormContainer.style.display = 'block';

    if(event.targe !== modalFormContainer && modalFormContainer.style.display !== 'none'){
        //modalFormContainer.style.display = 'none';
        //hideCover();
        console.log('Yes');
    }


    /*
    function complete(value) {
        hideCover();
        modalFormContainer.style.display = 'none';
        document.onkeydown = null;
        callback(value);
      }

    form.onsubmit = function() {
        complete(value);
        return false;
    };

    form.cancel.onclick = function() {
        complete(null);
    };

    document.onkeydown = function(e) {
        if (e.key == 'Escape') {
            complete(null);
        }
    };
    */
}

const register = document.getElementById('registration');

register.onclick =  function(event){
    showModalForm(event);
};



//Rendering JSON Data
function insertAfter(lastElement, newTr) {
    lastElement.parentNode.insertBefore(newTr, lastElement.nextSibling);
    lastElement.classList.remove('last_stream');
    newTr.classList.add('last_stream');

};


function renderAllUser(userArray){

    for(let i = 0; i < userArray.users.length; i++){
        
        let lastElement = document.querySelector('.last_stream');        
        user = userArray.users[i];
        user_keys = Object.keys(user);
        key_counter = user_keys.length;
        let newTr = document.createElement('tr');
        
        for(let j = 0; j < key_counter; j++){
            newTr.innerHTML += "<td>" + user[user_keys[j]] + "</td>";   
        }

        insertAfter(lastElement, newTr);


    }


};