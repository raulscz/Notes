function objetoAjax() {
    var xmlhttp = false;
    try {
        xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (e) {
        try {
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        } catch (E) {
            xmlhttp = false;
        }
    }
    if (!xmlhttp && typeof XMLHttpRequest != 'undefined') {
        xmlhttp = new XMLHttpRequest();
    }
    return xmlhttp;
}

/* Función para filtrar recursos implementada con AJAX */
function filtro() {
    /* Obtener elemento html donde introduciremos la recarga (datos o mensajes) */
    var table = document.getElementById('table');

    /*Obtener elemento/s que se pasarán como parámetros: token, method, inputs...*/
    var token = document.getElementById('token').getAttribute("content");

    var method = document.getElementById('postFiltro').value;

    var filtro = document.getElementById('search').value;

    /*Usar el objeto FormData para guardar los parámetros que se enviarán:*/
    var formData = new FormData();

    formData.append('_token', token);

    formData.append('_method', method);

    formData.append('nombre', filtro);

    /* Inicializar un objeto AJAX */
    var ajax = objetoAjax();
    /*
    ajax.open("method", "rutaURL", true);
    GET  -> No envía parámetros
    POST -> Sí envía parámetros
    true -> asynchronous
    */
    ajax.open("POST", "shows", true);
    ajax.onreadystatechange = function() {
            if (ajax.readyState == 4 && ajax.status == 200) {
                var respuesta = JSON.parse(this.responseText);
                /* Crear la estructura html que se devolverá dentro de una variable recarga*/
                var recarga = '<tr>';
                recarga += '<th scope="col">#</th>';
                recarga += '<th scope="col">Titulo</th>';
                recarga += '<th scope="col">Descripción</th>';
                recarga += '<th scope="col" colspan="2">Acciones</th>';
                recarga += ' </tr>';
                for (let i = 0; i < respuesta.length; i++) {
                    recarga += '<tr>';
                    recarga += '<td scope="row">' + respuesta[i].id + '</td>';
                    recarga += '<td>' + respuesta[i].titulo_notes + '</td>';
                    recarga += '<td>' + respuesta[i].desc_notes + '</td>';
                    recarga += '<td>';
                    //editar
                    recarga += '<form method="post" onsubmit="return false;">';
                    recarga += '<input type="hidden" name="_method" value="PUT" id="modificarCliente">';
                    recarga += '<button onclick="openModal(' + respuesta[i].id + ',\'' + respuesta[i].titulo_notes + '\',\'' + respuesta[i].desc_notes + '\');" class= "botonAct" type="submit" value="Put">Editar</button>';
                    recarga += '</form>';
                    recarga += '</td>';
                    recarga += '<td>';
                    //eliminar
                    recarga += '<form method="post">';
                    recarga += '<input type="hidden" name="_method" value="DELETE" id="deleteNotes">';
                    recarga += '<button class= "botonEli" type="submit" value="Delete" onclick="eliminar(' + respuesta[i].id + '); return flase;">Eliminar</button>';
                    recarga += '</form>';
                    recarga += '</td>';
                    recarga += '</tr>';
                }

                table.innerHTML = recarga;
                /* creación de estructura: la estructura que creamos no ha de contener código php ni código blade*/
                /* utilizamos innerHTML para introduciremos la recarga en el elemento html pertinente */
            }
        }
        /*
        send(string)->Sends the request to the server (used for POST)
        */
    ajax.send(formData)
}

/* Función para eliminar recursos implementada con AJAX */
function eliminar(resultado_id) {
    //alert("Hola");
    /* Obtener elemento html donde introduciremos la recarga (datos o mensajes) */

    var msj = document.getElementById("message");

    /*Obtener elemento/s que se pasarán como parámetros: token, method, inputs...*/

    var token = document.getElementById('token').getAttribute("content");

    var method = document.getElementById('deleteNotes').value;

    /*Usar el objeto FormData para guardar los parámetros que se enviarán:*/
    var formData = new FormData();

    formData.append('_token', token);

    formData.append('_method', method);

    /* Inicializar un objeto AJAX */
    var ajax = objetoAjax();
    /*
    ajax.open("method", "rutaURL", true);
    GET  -> No envía parámetros
    POST -> Sí envía parámetros
    true -> asynchronous
    */
    ajax.open("POST", "eliminar/" + resultado_id, true);
    ajax.onreadystatechange = function() {
            if (ajax.readyState == 4 && ajax.status == 200) {
                var respuesta = JSON.parse(this.responseText);
                if (respuesta.resultado == "OK") {
                    /* creación de estructura: la estructura que creamos no ha de contener código php ni código blade*/
                    /* utilizamos innerHTML para introduciremos la recarga en el elemento html pertinente */
                    msj.innerHTML = 'El registro #' + resultado_id + ' se ha eliminado correctamente.';
                } else {
                    /* creación de estructura: la estructura que creamos no ha de contener código php ni código blade*/
                    /* utilizamos innerHTML para introduciremos la recarga en el elemento html pertinente */
                    msj.innerHTML = 'Ha habido un error: ' + respuesta.resultado;
                }
                filtro();
            }
        }
        /*
        send(string)->Sends the request to the server (used for POST)
        */
    ajax.send(formData)
}

/*Crear con Ajax*/
function crear() {
    //alert("Hola");
    /* Obtener elemento html donde introduciremos la recarga (datos o mensajes) */

    var msj = document.getElementById("message");

    /*Obtener elemento/s que se pasarán como parámetros: token, method, inputs...*/

    var token = document.getElementById('token').getAttribute("content");

    var method = document.getElementById('postCrear').value;

    var titulo = document.getElementById('titulo_notes').value;

    var desc = document.getElementById('desc_notes').value;

    /*Usar el objeto FormData para guardar los parámetros que se enviarán:*/
    var formData = new FormData();

    formData.append('_token', token);

    formData.append('_method', method);

    formData.append('titulo_notes', titulo);

    formData.append('desc_notes', desc);

    /* Inicializar un objeto AJAX */
    var ajax = objetoAjax();
    /*
    ajax.open("method", "rutaURL", true);
    GET  -> No envía parámetros
    POST -> Sí envía parámetros
    true -> asynchronous
    */
    ajax.open("POST", "crear", true);
    ajax.onreadystatechange = function() {
            if (ajax.readyState == 4 && ajax.status == 200) {
                var respuesta = JSON.parse(this.responseText);
                if (respuesta.resultado == "OK") {
                    /* creación de estructura: la estructura que creamos no ha de contener código php ni código blade*/
                    /* utilizamos innerHTML para introduciremos la recarga en el elemento html pertinente */
                    msj.innerHTML = 'El registro se ha insertado correctamente';
                } else {
                    /* creación de estructura: la estructura que creamos no ha de contener código php ni código blade*/
                    /* utilizamos innerHTML para introduciremos la recarga en el elemento html pertinente */
                    msj.innerHTML = 'Ha habido un error: ' + respuesta.resultado;
                }
                filtro();
            }
        }
        /*
        send(string)->Sends the request to the server (used for POST)
        */
    ajax.send(formData)
}
/*Actualizar*/
function modificar() {
    //alert("Hola");
    /* Obtener elemento html donde introduciremos la recarga (datos o mensajes) */

    var msj = document.getElementById("message");

    /*Obtener elemento/s que se pasarán como parámetros: token, method, inputs...*/

    var token = document.getElementById('token').getAttribute("content");

    var method = document.getElementById('actuNotes').value;

    var titulo = document.getElementById('tNotes').value;

    var desc = document.getElementById('dNotes').value;

    var id = document.getElementById('idRegis').value;


    /*Usar el objeto FormData para guardar los parámetros que se enviarán:*/
    var formData = new FormData();

    formData.append('_token', token);

    formData.append('_method', method);

    formData.append('titulo_notes', titulo);

    formData.append('desc_notes', desc);

    formData.append('idRegis', id);

    /* Inicializar un objeto AJAX */
    var ajax = objetoAjax();
    /*
    ajax.open("method", "rutaURL", true);
    GET  -> No envía parámetros
    POST -> Sí envía parámetros
    true -> asynchronous
    */
    ajax.open("POST", "modificar", true);
    ajax.onreadystatechange = function() {
            if (ajax.readyState == 4 && ajax.status == 200) {
                var respuesta = JSON.parse(this.responseText);
                if (respuesta.resultado == "OK") {
                    /* creación de estructura: la estructura que creamos no ha de contener código php ni código blade*/
                    /* utilizamos innerHTML para introduciremos la recarga en el elemento html pertinente */
                    msj.innerHTML = 'El registro se ha modificado correctamente';
                } else {
                    /* creación de estructura: la estructura que creamos no ha de contener código php ni código blade*/
                    /* utilizamos innerHTML para introduciremos la recarga en el elemento html pertinente */
                    msj.innerHTML = 'Ha habido un error: ' + respuesta.resultado;
                }
                filtro();
                modal.style.display = "none";
            }
        }
        /*
        send(string)->Sends the request to the server (used for POST)
        */
    ajax.send(formData)
}

/*Modales*/
function openModal(id, titulo, desc) {
    modal.style.display = "block";

    document.getElementById('tNotes').value = titulo;
    document.getElementById('dNotes').value = desc;
    document.getElementById('idRegis').value = id;
}

window.onload = function() {
    modal = document.getElementById("myModal");

    // Get the button that opens the modal
    //var btn = document.getElementById("myBtn");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks the button, open the modal 


    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}