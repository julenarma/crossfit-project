var savedFileBase64;
var filename;
var filesize;
var foto = "";

$(document).ready(function () {
    atletas();
    selectCategoria();
    $("#btnExecInsert").click(function () {
        if (validarInsert()) {
            execInsert();
        }
    });
    $("#btnExecUpdate").click(function () {
    	if (validarUpdate()) {
    		execUpdate();
    	}
        
    });
    $("#ageInsert").keyup(function (e) {
       activarSelect("I");
    });
    $("#ageUpdate").keyup(function (e) {
        activarSelect("D");
     });
    //Solo numeros y maximo dos
    $("#ageInsert").keypress(function (e) { 
        var keychar;
        var teclanum;
        teclanum = e.which;
        keychar = String.fromCharCode(teclanum);
        if (keychar < "0" || keychar > "9") {
            return false;
        } else {
            const field = $(this).val() + e.key;
            if (field.length > 2) {
                return false;
            }
            return true;
        }
    });
    //Solo numeros y maximo dos
    $("#ageUpdate").keypress(function (e) {   
        var keychar;
        var teclanum;
        teclanum = e.which;
        keychar = String.fromCharCode(teclanum);
        if (keychar < "0" || keychar > "9") {
            return false;
        } else {
            const field = $(this).val() + e.key;
            if (field.length > 2) {
                return false;
            }
            return true;
        }
    });
    $("#photoInsert").change(changeFitx);
    $("#photoUpdate").change(changeFitx2);
});
//Cambia el color de la pagina
function changeBodyClaroAtletas() {
    
    var modo = $('#modoclaro').html();
    if (modo == "Modo Claro") {
        $('body').css('background-color', 'white');
        $('#modoclaro').html("Modo Oscuro");
        $('nav').css('background-color', '#BA0C2F');
        $("h1").css('color', 'black');
        $(".card").css('color', 'white');
        $(".card").css('background-color', '#343333');
        $("footer").css('background-color', '#BA0C2F');
    }
    if (modo == "Modo Oscuro") {
        $('#modoclaro').html("Modo Claro");
        $('body').css('background-color', 'black');
        $('nav').css('background-color', 'black');
        $("h1").css('color', 'white');
        $(".card").css('color', 'black');
        $(".card").css('background-color', '#bfbfbf');
        $("footer").css('background-color', 'black');
    }
}
//Trae los datos generales de todos los atletas
function atletas() {

    var url = "../controller/cAtletas.php";
    fetch(url, {
        method: 'GET',
    })
        .then(res => res.json()).then(result => {
        console.log(result.list);
        var atletas = result.list;

        var newRow = "";
        for (let i = 0; i < atletas.length; i++) {
            if (["", "NULL"].includes(atletas[i].foto)) {
                atletas[i].foto = "default.jpg";
            }

            newRow += "<div class='card col-12 col-md-4 col-lg-3 '>"
                + "<div class='rounded-circle profile' style='background-image: url(../uploads/" + atletas[i].foto + ")'>"
                + "</div>"
                + "<div class='card-body'>"
                + "<h5 class='card-title text-center'>" + atletas[i].nombre + "  " + atletas[i].apellido + "</h5>"
                + "<p>" + atletas[i].correo + "</p>"
                + "<p>Entrenador: " + atletas[i].objEntrenador.nombre + "</p>"
                + "<p>Categoria: <a href='#cat' class='categorias' data-categoria='" + atletas[i].idCategoria + "'>" + atletas[i].objCategoria.nombre + "*</a></p>"
                + "<p> Edad: " + atletas[i].edad + "</p>"
                + "<p> Sexo: " + atletas[i].sexo + "</p>"
                + "<button data-id='" + atletas[i].idAtleta + "' type='button' class='btn btn-success mr-5' data-target='#actualizar' data-toggle='modal' data-nombre='" + atletas[i].nombre + "' data-apellido='" + atletas[i].apellido + "' data-correo='" + atletas[i].correo + "' data-entrenador='" + atletas[i].idEntrenador + "' data-categoria='" + atletas[i].idCategoria + "' data-edad='" + atletas[i].edad + "' data-sexo='" + atletas[i].sexo + "'data-foto='" + atletas[i].foto + "'><img src='iconos/update.png' width='50' height='50' ></button>"
                + "<button data-id='" + atletas[i].idAtleta + "' type='button' class='btn btn-danger'><img src='iconos/delete.png' width='50' height='50'></button>"
                + "</div> "
                + "</div> "
        }
        document.getElementById("atletas").innerHTML = newRow;
        var categorias = document.querySelectorAll(".categorias");

        for (let i = 0; i < categorias.length; i++) {
            categorias[i].addEventListener('click', atletasCategoria);
        }
        var btnDelte = document.querySelectorAll(".btn-danger");
        for (let i = 0; i < btnDelte.length; i++) {
            btnDelte[i].addEventListener('click', execDelete);
        }
        var btnActualizar = document.querySelectorAll(".btn-success");
        for (let i = 0; i < btnActualizar.length; i++) {
            btnActualizar[i].addEventListener('click', datosActualizar);
        }
        // Check if admin else disable DB operations
        fetch('../controller/cCheckSession.php')
            .then(res => res.json())
            .then(response => {
                if (!eval(response.answer.admin)) {
                    $('.card-body button, .container-fluid > div:nth-child()').addClass('d-none').attr('disabled', 'true');
                }

            })
    })
        .catch(error => console.error('Error status:', error));
}
//Trae los atletas de la categoria X
function atletasCategoria() {

    var idCategoria = this.dataset.categoria;
    console.log(idCategoria);

    var url = "../controller/cAtletasByCategory.php";
    var data = {'idCategoria': idCategoria};

    fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {'Content-Type': 'application/json'}

    })
        .then(res => res.json()).then(result => {
        console.log(result.list);
        var atletas = result.list;

        var newRow = "<h1 class='text-center mt-4'>ATLETAS DE LA CATEGORÍA: " + atletas[0].objCategoria.nombre + "</h1>"
            + "<table id='cat' class='table table-sm table-dark mt-5 mb-5'>"
            + "<th>NOMBRE</th><th>APELLIDO</th><th>ENTRENADOR</th>"
            + "";
        for (let i = 0; i < atletas.length; i++) {
            newRow += "<tr>"
                + "<td>" + atletas[i].nombre + "</td>"
                + "<td>" + atletas[i].apellido + "</td>"
                + "<td><button  class='btn btn-warning btn-block btnEntrenador' data-target='#entrenadores' data-toggle='modal' value='" + atletas[i].idEntrenador + "'>" + atletas[i].objEntrenador.nombre + "</button></td>";
            +"</tr>"
        }
        newRow += "</table>";
        document.getElementById("categorias").innerHTML = newRow;
        var entrenadores = document.querySelectorAll(".btnEntrenador");

        for (let i = 0; i < entrenadores.length; i++) {
            entrenadores[i].addEventListener('click', atletasEntrenador);
        }
    })
        .catch(error => console.error('Error:', error));
}
//Te enseña los datos de los atletas de el entrenador seleccionado
function atletasEntrenador() {
    var entrenador = event.target;
    var idEntrenador = entrenador.value;
    console.log(idEntrenador);
    var url = "../controller/cEntrenadores.php";
    var data = {'idEntrenador': idEntrenador};

    fetch(url, {
        method: 'POST',
        body: JSON.stringify(data)
    })
        .then(res => res.json())
        .then(result => {
            console.log(result.list);
            console.log(result.entrenador);
            var atletas = result.list;
            var entrenador = result.entrenador;

            let newRow = `
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header d-flex justify-content-between"><span>${entrenador[0].nombre}&nbsp ${entrenador[0].apellido}</span>&nbsp->&nbsp<span>  Nivel: ${entrenador[0].nivel}&nbsp->&nbsp Experiencia: ${entrenador[0].experiencia}</span>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
	                            <span aria-hidden="true">&times;</span>
	                </button></div>
                    <div class="modal-body row">`;

            for (let i = 0; i < atletas.length; i++) {
                newRow += `
                        <div class="col d-flex flex-column justify-content-center align-items-center">
                            <div class="rounded-circle" style="background-image: url(../uploads/${atletas[i].foto})">
                            </div>
                            <p class="text-center">${atletas[i].nombre}</br>${atletas[i].apellido}</p>
                        </div>`;
            }
            newRow += `
                    </div>
                </div>
            </div>`;

            document.getElementById("entrenadores").innerHTML = newRow;
        })
        .catch(error => console.error('Error status:', error));
}
//Cuando escribimos la edad podemos elegir dentro de nuestra categoria el entrenador que nos guste
function activarSelect(letra) {
    var le = letra;
    if (letra === "I") {
        if ($("#ageInsert").val() === "") {
            $('#trainerInsert').prop('disabled', true);
        }
        if ($("#ageInsert").val() > 0 && $("#ageInsert").val() <= 16) {
            $('#categoryInsert').val(1);
            $('#trainerInsert').prop('disabled', false);
            selectEntrenador(1);
        }
        if ($("#ageInsert").val() > 16 && $("#ageInsert").val() < 50) {
            $('#categoryInsert').val(2);
            $('#trainerInsert').prop('disabled', false);
            selectEntrenador(2);
        }
        if ($("#ageInsert").val() >= 50) {
            $('#categoryInsert').val(3);
            $('#trainerInsert').prop('disabled', false);
            selectEntrenador(3);
        }
    } else if (letra === "D") {
        if ($("#ageUpdate").val() === "") {
            $('#trainerUpdate').prop('disabled', true);
        }
        if ($("#ageUpdate").val() > 0 && $("#ageInsert").val() <= 16) {
            $('#categoryUpdate').val(1);
            $('#trainerUpdate').prop('disabled', false);
            selectEntrenador(1);
        }
        if ($("#ageUpdate").val() > 16 && $("#ageInsert").val() < 50) {
            $('#categoryUpdate').val(2);
            $('#trainerUpdate').prop('disabled', false);
            selectEntrenador(2);
        }
        if ($("#ageUpdate").val() >= 50) {
            $('#categoryUpdate').val(3);
            $('#trainerUpdate').prop('disabled', false);
            selectEntrenador(3);
        }
    }
}
//Rellena  el select de categoria (insert y update)
function selectCategoria() {
    $.ajax({
        type: "GET",
        url: "../controller/cSelectCategorias.php",
        dataType: "json",
        success: function (result) {
            var categorias = result.list;
            console.log(result.list);
            var newRow = "<option value='0'>CATEGORIAS</option>";

            for (let i = 0; i < categorias.length; i++) {
                newRow += "<option value='" + categorias[i].idCategoria + "'>" + categorias[i].nombre + " -Edades: " + categorias[i].edad + "</option>";
            }
            $("#categoryInsert").append(newRow);
            $("#categoryUpdate").append(newRow);
        },
        error: function (xhr) {
            alert("An error occured: " + xhr.status + " " + xhr.statusText);
        }
    });
}
//Rellena el select de entrenadores (insert y update)
function selectEntrenador(idCategoria) {
    var data = {'idCategoria': idCategoria};
    var url = "../controller/cSelectEntrenadores.php";
    $("#trainerInsert").empty();
    $("#trainerUpdate").empty();
    fetch(url, {
        method: 'POST',
        body: JSON.stringify(data)
    })
        .then(res => res.json())
        .then(result => {
            console.log(result.list);
            var entrenadores = result.list;
            var newRow = "";

            for (let i = 0; i < entrenadores.length; i++) {
                var datuak = entrenadores[i].nombre + "  " + entrenadores[i].apellido + " Nivel - " + entrenadores[i].nivel;
                newRow += "<option value='" + entrenadores[i].idEntrenador + "'>" + datuak + "</option>";
            }
            $("#trainerInsert").append(newRow);
            $("#trainerUpdate").append(newRow);

        })
        .catch(error => console.error('Error status:', error));
}

//Comprobamos que el formulario este correctamente relleno: insert y update
function validarInsert() {
    if (nombre() && apellido() && email() && edad() && entrenador() && sexo()) {
        alert("datos correctos");
        return true;
    } else {
        return false;
    }
}
function validarUpdate() {
    if (nombreU() && apellidoU() && emailU() && edadU() && entrenadorU() && sexoU()) {
        alert("datos correctos");
        return true;
    } else {
        return false;
    }
}
function nombre() {
    if ($('#nameInsert').val() === "") {
        alert("Tienes que rellenar el nombre");
        return false;
    } else {
        return true;
    }
}
function nombreU() {
    if ($('#nameUpdate').val() === "") {
        alert("Tienes que rellenar el nombre");
        return false;
    } else {
        return true;
    }
}
function apellido() {
    if ($('#surnameInsert').val() === "") {
        alert("Tienes que rellenar el apellido");
        return false;
    } else {
        return true;
    }
}
function apellidoU() {
    if ($('#surnameUpdate').val() === "") {
        alert("Tienes que rellenar el apellido");
        return false;
    } else {
        return true;
    }
}
function email() {
    if (/\w+@\w+\.\w+/.test($('#emailInsert').val())) {
        return true;
    } else {
        alert("Correo incorrecto");
        return false;
    }
}
function emailU() {
    if (/\w+@\w+\.\w+/.test($('#emailUpdate').val())) {
        return true;
    } else {
        alert("Correo incorrecto");
        return false;
    }
}
function edad() {
    if ($('#ageInsert').val() === "") {
        alert("Tienes que rellenar la edad");
        return false;
    } else {
        return true;
    }
}
function edadU() {
    if ($('#ageUpdate').val() === "") {
        alert("Tienes que rellenar la edad");
        return false;
    } else {
        return true;
    }
}
function entrenador() {
    if ($('#trainerInsert').val() === '0') {
        alert("Tienes que elegir un entrenador");
        return false;
    } else {
        return true;
    }
}
function entrenadorU() {
    if ($('#trainerUpdate').val() === '0') {
        alert("Tienes que elegir un entrenador");
        return false;
    } else {
        return true;
    }
}
function sexo() {
    if (!$("input[name='sexo']").is(':checked')) {
        alert('Elige una opción de sexo');
    } else {
        return true;
    }
}
function sexoU() {
    if (!$("input[name='sexo2']").is(':checked')) {
        alert('Elige una opción de sexo');
    } else {
        return true;
    }
}
//Cuando cargamos un archivo de tipo imagen guarda las variables
function changeFitx() {

    var file = $("#photoInsert")[0].files[0];
    filename = file.name.toLowerCase();
    filesize = file.size;
    if (!new RegExp("(.*?)\.(jpg|jpeg|png|gif)$").test(filename)) {
        alert("Solo se aceptan imágenes JPG, PNG y GIF");
        $("#filmPhoto").val("");
    } else {
        var reader = new FileReader();
        reader.onloadend = function () {
            savedFileBase64 = reader.result;     
            $("#filmPhoto").attr('src', savedFileBase64);
        }
        if (file) {
            reader.readAsDataURL(file);

        } else {
            $("#filmPhoto").attr('src', '');
        }
    }
}
//Lo mismo que el anterior pero para Update
function changeFitx2() {

    var file = $("#photoUpdate")[0].files[0];
    filename = file.name.toLowerCase();
    filesize = file.size;
    if (!new RegExp("(.*?)\.(jpg|jpeg|png|gif)$").test(filename)) {
        alert("Solo se aceptan imágenes JPG, PNG y GIF");
        $("#photoUpdate").val("");
    } else {
        var reader = new FileReader();
        reader.onloadend = function () {
            savedFileBase64 = reader.result;   
            $("#fotoActualizar").attr('src', savedFileBase64);
        }
        if (file) {
            reader.readAsDataURL(file);
        } else {
            $("#fotoActualizar").attr('src', '');
        }
    }
}
//Insertamos un nuevo atleta
function execInsert() {
    var nameInsert = $("#nameInsert").val();
    var surnameInsert = $("#surnameInsert").val();
    var emailInsert = $("#emailInsert").val();
    var ageInsert = $("#ageInsert").val();
    var categoryInsert = $("#categoryInsert").val();
    var trainerInsert = $("#trainerInsert").val();
    var photoInsert = $("#photoInsert").val();
    var sexoInsert = $("input:radio[name=sexo]:checked").val();
    $.ajax({
        type: "POST",
        data: {
            'nameInsert': nameInsert, 'surnameInsert': surnameInsert,
            'emailInsert': emailInsert, 'ageInsert': ageInsert,
            'categoryInsert': categoryInsert, 'trainerInsert': trainerInsert,
            'filename': filename, 'savedFileBase64': savedFileBase64,
            'sexoInsert': sexoInsert
        },
        url: "../controller/cInsertAtleta.php",
        dataType: "json",
        success: function (result) {
            console.log(result);
            alert(result.resultado);
            window.location.reload(true);
        },
        error: function (xhr) {
            alert("An error occured: " + xhr.status + " " + xhr.statusText);
        }
    });
}
//Eliminamos un atleta
function execDelete() {

    var idUsuario = this.dataset.id; // Añadido - Aingeru
    alert(idUsuario);
    var url = "../controller/cDeleteAtleta.php";
    var data = {'idUsuario': idUsuario};
    fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {'Content-Type': 'application/json'}
    })
        .then(res => res.json()).then(result => {
        console.log(result.error);
        alert(result.error);
        atletas();
    })
        .catch(error => console.error('Error status:', error));
}
//Traemos los datos para mostrarlos y elegir cual actualizar
function datosActualizar() {
    selectCategoria();
    $('#actualizar').attr('data-id', this.dataset.id);
    $('#nameUpdate').val(this.dataset.nombre);
    $('#surnameUpdate').val(this.dataset.apellido);
    $('#emailUpdate').val(this.dataset.correo);
    $('#ageUpdate').val(this.dataset.edad);
    selectEntrenador(this.dataset.categoria);
    $('#categoryUpdate').val(this.dataset.categoria);
    $('#trainerUpdate').val(this.dataset.entrenador);
    $('#fotoActualizar').attr('src', '../uploads/' + this.dataset.foto);
    //guardamos la foto por si no quiere cambiarla
    foto = this.dataset.foto;
    if (this.dataset.sexo == "M") {
        $('#sexoUpdateM').prop('checked', true);
    }
    if (this.dataset.sexo == "F") {
        $('#sexoUpdateF').prop('checked', true);
    }
}
//Actualizamos los datos del atleta elegido
function execUpdate() {

    var idAtleta = $('#actualizar').attr('data-id');
    var nameUpdate = $("#nameUpdate").val();
    var surnameUpdate = $("#surnameUpdate").val();
    var emailUpdate = $("#emailUpdate").val();
    var ageUpdate = $("#ageUpdate").val();
    var categoryUpdate = $("#categoryUpdate").val();
    var trainerUpdate = $("#trainerUpdate").val();
    var photoUpdate = $("#photoUpdate").val();
    if (photoUpdate == "") {
        filename = foto;
    }
    var sexoUpdate = $("input:radio[name=sexo2]:checked").val();
    $.ajax({
        type: "POST",
        data: {
            'idAtleta': idAtleta,
            'nameUpdate': nameUpdate, 'surnameUpdate': surnameUpdate,
            'emailUpdate': emailUpdate, 'ageUpdate': ageUpdate,
            'categoryUpdate': categoryUpdate, 'trainerUpdate': trainerUpdate,
            'filename': filename, 'savedFileBase64': savedFileBase64,
            'sexoUpdate': sexoUpdate
        },

        url: "../controller/cUpdate.php",
        dataType: "json",

        success: function (result) {
            console.log(result);
            alert(result.resultado);
            window.location.reload(true);
        },
        error: function (xhr) {
            alert("An error occured: " + xhr.status + " " + xhr.statusText);
        }
    });

}