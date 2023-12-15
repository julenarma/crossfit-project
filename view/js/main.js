let url = location.href;
if (url.search(/\/view\//i) !== -1) {
    // Aquí se va a comprobar si estamos en la carpeta view o no para cambiar los path
    // de los controladores en caso de que estemos en dicha carpeta

    const index = url.search(/view/);
    url = url.substring(0, index);  // Con esto me aseguro de que independientemente de cual sea la página que ejecute el script
                                    // La ruta a los controladores nunca falle
} else {
    const index = url.search(/[a-zA-z]*\.html/);
    url = url.substring(0, index);
}



$(document).ready(function () {

    // Hide buttons and login info
    $('#logout, #loggedUser, #loginType').hide();
    // Check if there is a user logged in
    loadSession();

    // Login Verification
    $('#password').keydown(function (event) {
        formVerify(event);
    });
    $('#sendLoginData').click(function () {
        verifyLogin();
    });
    // Logout
    $('#logout').click(function () {
        logout();
    });

    // Comments
    $('#dudasForm #sendComment').click(function (event) {
        sendComment(event);
    })
});


function loadSession() {
    $.ajax({
        url: url + 'controller/cCheckSession.php',
        method: 'POST',
        contentType: 'application/json',
        dataType: 'json'

    }).done(response => {
        if (typeof (response.answer) === 'object') {

            const admin = eval(response.answer.admin) ? 'Administrador' : 'Estandar';
            console.log(`Logged as ${response.answer.nombre} ${response.answer.apellido}`);
            $('nav button[data-target="#loginModal"]').hide();
            $('#logout, #loggedUser, #loginType').show();
            $('#loggedUser').text(`${response.answer.nombre} ${response.answer.apellido}`);
            $('#loginType').text(`${admin}`);
            $('#commentUsername').val(response.answer.usuario).attr('data-id', response.answer.idUsuario);

        } else {
            $('button[data-target="#dudasModal"]').attr('disabled', 'true');
            $('#commentNotAuth').removeClass('d-none')
            if (location.href.search(/\/atletas.html/i) !== -1) location.href = url;    // Aquellos que no están logeados no pueden acceder a las otras páginas
            // y serán redireccionados al index.html
        }

    })
}

function formVerify(event) {
    const username = $('#username').val();
    let password = $('#password').val();
    let validForm = true;

    if (event.key !== undefined) {
        if (event.key.length === 1) password += event.key;
        if (event.key === 'Backspace') password = password.substring(0, password.length - 1);

        if (!(username.length > 0) || !(password.length > 0)) {
            validForm = false;
        }
    }
    console.log( username, password )
    if (validForm) $('#sendLoginData').attr('disabled', false);
    else $('#sendLoginData').attr('disabled', true);
}

function verifyLogin() {
    const data = {
        username: $('#username').val(),
        password: $('#password').val()
    }

    $.ajax({
        url: url + 'controller/cLogin.php',
        method: 'POST',
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify(data)

    }).done(response => {
        if (typeof (response.answer) !== 'object') {
            return alert(response.answer);
        }

        console.log(response.answer)
        console.log(`Logged as ${response.answer.nombre} ${response.answer.apellido}`);
        location.href = url + 'view/atletas.html';
    })
}

function logout() {
    $.ajax({
        url: url + 'controller/cLogout.php',
        method: 'POST',
        contentType: 'application/json',
        dataType: 'json'
    }).done(response => {
        console.log(response.answer)
        if (response.answer) {
            alert('Logged out correctly');
            location.reload();
        } else alert('Error while trying to logout!');
    });
}

function sendComment() {
    const data = {
        idUsuario: $('#commentUsername').attr('data-id'),
        asunto: $('#commentSubject').val(),
        texto: $('#commentBody').val()
    }

    $.ajax({
        url: url + 'controller/cInsertCommentary.php',
        method: 'POST',
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify( data )
    }).done(response => {
        if ( response.answer ) {
            alert( 'Comentario enviado correctamente' );
            $('#commentSubject, #commentBody').val('');
            location.reload();
        } else alert ( 'Ha ocurrido un falló al enviar su comentario, revise que los campos estén debidamente rellenados' );
    });
}