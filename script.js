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

function showModalForm(){
    showCover();
    let modalFormContainer = document.getElementById('modal-form-block')
    let modalForm = document.getElementById('modal-form');
    modalFormContainer.style.display = 'block';

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
}

const register = document.getElementById('registration');

register.addEventListener('click', showModalForm);

