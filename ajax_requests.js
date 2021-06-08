const request = new XMLHttpRequest();

//Get request

const url = "http://localhost:3002";

request.open('GET', url);

request.setRequestHeader('Content-Type', 'application/x-www-form-url');

request.addEventListener("readystatechange", () =>{
    if(request.readyState === 4 && request.status === 200){
        console.log(request.responseText);
    }
});

request.send();