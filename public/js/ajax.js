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
function mostrar() {
    /* Obtener elemento html donde introduciremos la recarga (datos o mensajes) */
    var table = document.getElementById('table');

    /*Obtener elemento/s que se pasarán como parámetros: token, method, inputs...*/
    var token = document.getElementById('token').getAttribute("content");

    var method = document.getElementById('postFiltro').value;

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
                    recarga += '<form action="./clientes/' + respuesta[i].id + '/edit" method="post">';
                    recarga += '<input type="hidden" name="_method" value="GET">';
                    recarga += '<button class= "botonAct" type="submit" value="Edit">Editar</button>';
                    recarga += '</form>';
                    recarga += '</td>';
                    recarga += '<td>';
                    //eliminar
                    recarga += '<form method="post">';
                    recarga += '<input type="hidden" name="_method" value="DELETE" id="deleteCliente">';
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

/* Función para filtrar recursos implementada con AJAX */
function eliminar(resultado_id) {
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
    ajax.open("POST", "eliminar" + resultado_id, true);
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
                mostrar();
            }
        }
        /*
        send(string)->Sends the request to the server (used for POST)
        */
    ajax.send(formData)
}