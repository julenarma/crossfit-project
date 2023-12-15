$(document).ready(function () {
	datos();
	comentarios();
});

function datos(){

    fetch(url + 'controller/cPerfil.php', {
        method: 'GET'
    })
        .then(result => result.json())
        .then(response => {

        const user = response.answer;

        if ( typeof(user) !== 'object') location.href = url;

        $('#picture').attr('style', `background-image: url('${url}uploads/${user.foto}')`);

        const admin = user.admin? 'Administrador' : 'Estandar';

        let content = `
                <h1>Personal</h1>
                <p><strong>Nombre:</strong> ${user.nombre} Apellido: ${user.apellido}</p>
                <p><strong>Administrador:</strong></p>
                <p>Categoria: ${user.idCategoria}</p>
        `;

        fetch( url + 'controller/cCategoriaId.php', {
            method: 'POST',
            body: JSON.stringify( {idCategoria: user.idCategoria} )
        } )
            .then( result => result.json())
            .then( response => {
                const categoria = response.answer;

                content += `
                    <h1>Tarifa</h1>
                    <p>Nombre: ${categoria.nombre} Edades admitidas: ${categoria.edad}</p>
                    <p>Precio mensual: ${categoria.precio}</p>
                `;

            } )

        $('#infoUsuario').html(content);
    })
        .catch(error => console.error('Error status:', error));
}

function comentarios(){
    var url = "../controller/cLoadComments.php";


    fetch(url, {
        method: 'GET'

    })
        .then(res => res.json()).then(result => {

        console.log(result.answer.comments);
        var comentarios = result.answer.comments;

        var newRow = "<div class='text-center'><h3>COMENTARIOS</h3>";
        for (let i = 0; i < comentarios.length; i++) {
        	
            newRow += "<p> Asunto: "+comentarios[i].asunto+"</p>"
            		+"<p> Comentario: "+comentarios[i].texto+"</p>";
            		
        }
        newRow+="</div>";
        document.getElementById("comentarios").innerHTML = newRow;
        
    })
        .catch(error => console.error('Error status:', error));
}