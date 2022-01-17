<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
    <script src="js/ajax.js"></script>
    <link rel="stylesheet" href="{!! asset('css/styles.css') !!}">
    <meta name="csrf-token" id="token" content="{{ csrf_token() }}">
    <title>App Notas | CRUD Laravel + AJAX</title>
</head>
<body>
    <h1 class="p-4">App Notas</h1>

    <div class="p-5">
        <div class="row pb-3">
            <div class="col">
                {{-- Buscador (filtro) --}}
                <form method="post" submit="return false;">
                    <input type="hidden" name="_method" value="POST" id="postFiltro">
                    <div class="form-outline">
                        <input type="search" id="search" name="nombre" class="form-control" placeholder="Buscar por titulo..." aria-label="Search" onkeyup="filtro(); return false;" />
                    </div>
                </form>
            </div>
            <div class="col"></div>
        </div>
        <div id="message">

        </div>
        <table class="table" id="table">
            <tr>
                <th scope="col">#</th>
                <th scope="col">Titulo</th>
                <th scope="col">Descripción</th>
                <th scope="col" colspan="2">Acciones</th>
            </tr>
            @forelse ($listaNotes as $resultado)
            <tr>
                <td scope="row">{{$resultado->id}}</td>
                <td>{{$resultado->titulo_notes}}</td>
                <td>{{$resultado->desc_notes}}</td>
                <td>
                {{-- Editar --}}
                    <form action="" method="post">
                        <input type="hidden" name="_token" value="{{ csrf_token() }}">
                        <input type="hidden" name="_method" value="GET">
                        <button class= "botonAct" type="submit" value="Edit">Editar</button>
                    </form>
                </td>
                <td>
                    {{-- Eliminar --}}
                    <form method="post">
                        <input type="hidden" name="_method" value="DELETE" id="deleteNotes">
                        <button class= "botonEli" type="submit" value="Delete" onclick="eliminar({{$resultado->id}}); return false;">Eliminar</button>
                    </form>
                </td>
            </tr>
            @empty
            <tr><td colspan="7">No hay registros</td></tr>
            @endforelse
        </table>
        <div class="col">
            <form method="post">
                <input type="hidden" name="_method" value="POST" id="postCrear">
                <div class="form-group">
                    <p>Titulo:</p>
                    <div>
                        <input class="inputcrear" type="text" name="titulo_notes" placeholder="Introduce el titulo...">
                    </div>
                </div>
                <br>
                <div class="form-group">
                    <p>Descripción:</p>
                    <div>
                        <input class="inputcrear" type="text" name="desc_notes" placeholder="Introduce la descripción...">
                    </div>
                </div>
                <br>
                <input type="hidden" name="_token" value="{{ csrf_token() }}">
                <input type="hidden" name="_method" value="GET">
                <input type="submit" class="botoncrear" value="Crear">
            </form>
        </div>
    </div>
</body>
</html>