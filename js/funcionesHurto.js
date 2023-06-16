const url = 'http://localhost:8082/api/hurtos'
//url de la api. Al desplegarla en el servidor local colocar la api del servi
const listar = async () => {
    let respuesta = ''
    let body = document.getElementById('contenido')
    fetch(url, {
        method: 'GET',
        mode: 'cors',
        headers: { "Content-type": "application/json; charset=UTF-8" }
    })
        .then((resp) => resp.json()) // Obtener la respuesta y convertirla a json
        .then(function (data) {
            let listahurtos = data.hurtos
            listahurtos.map(function (hurto) {
                respuesta += `<tr><td>${hurto._id}</td>` +
                    `<td>${hurto.direccion}</td>` +
                    `<td>${hurto.latitud}</td>` +
                    `<td>${hurto.longitud}</td>` +
                    `<td>${hurto.descripcion}</td>` +
                    `<td>${hurto.fecha}</td>` +
                    `<td><a class="waves-effect waves-light btn modal-trigger" href="#modal1" onclick='editar(${JSON.stringify(hurto)})'>Editar</a>
                        <a class="waves-effect waves-light btn modal-denger red" href="http://localhost:3000/consumirAPI206/listar.html" onclick='eliminar(${JSON.stringify(hurto)})'>Eliminar</a></td></tr>`
                body.innerHTML = respuesta

            })
        })
    //alert('En desarrollo...')
}

const registrar = async () => {
    let _direccion = document.getElementById('direccion').value;
    let _latitud = parseFloat.getElementById('latitud').value;
    let _longitud = parseFloat.getElementById('longitud').value;
    let _descripcion = document.getElementById('descripcion').value;
    let _fecha = document.getElementById('fecha').value;

    if (
        _latitud >= 6.13 &&
        _latitud <= 6.217 &&
        _longitud >= -75.567 &&
        _longitud <= -75.34
    ) {
        let _hurto = {
            direccion: _direccion,
            latitud: _latitud,
            longitud: _longitud,
            descripcion: _descripcion,
            fecha: _fecha,
        };

        fetch(url, {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(_hurto),
            headers: { 'Content-type': 'application/json; charset=UTF-8' },
        })
            .then((resp) => resp.json())
            .then((json) => {
                Swal.fire(json.msg, '', 'success');
            })
            .catch((error) => {
                console.error('Error:', error);
                Swal.fire('Se produjo un error en el registro', '', 'error');
            });
    } else {
        Swal.fire(
            'La latitud y longitud deben tener un valor. Por favor, corrígelos',
            '',
            'error'
        );
    }
};

const editar = (hurto) => {
    document.getElementById('id').value = hurto._id;
    document.getElementById('direccion').value = hurto.direccion;
    document.getElementById('latitud').value = hurto.latitud;
    document.getElementById('longitud').value = hurto.longitud;
    document.getElementById('descripcion').value = hurto.descripcion;

}
const actualizar = async () => {
    const _id = document.getElementById('id').value;
    const _direccion = document.getElementById('direccion').value;
    const _latitud = document.getElementById('latitud').value;
    const _longitud = document.getElementById('longitud').value;
    const _descripcion = document.getElementById('descripcion').value;

    if (
        _latitud >= 6.13 &&
        _latitud <= 6.217 &&
        _longitud >= -75.567 &&
        _longitud <= -75.34
    ) {
        let _hurto = {
            _id: _id,
            direccion: _direccion,
            latitud: _latitud,
            longitud: _longitud,
            descripcion: _descripcion,
        };

        fetch(url, {
            method: 'PUT',
            mode: 'cors',
            body: JSON.stringify(_hurto),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        })
            .then((resp) => resp.json())
            .then(json => {
                Swal.fire({
                    title: json.msg,
                    icon: 'success',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'Aceptar'
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.reload();
                    }
                });
            })
            .catch(error => {
                console.error(error);
                Swal.fire(
                    'Ocurrió un error al actualizar el hurto. Por favor, inténtalo nuevamente.',
                    '',
                    'error'
                );
            });
    } else {
        Swal.fire(
            'Por favor, ingresa la hora de inicio y la hora de fin.',
            '',
            'error'
        );
    }
}


const eliminar = (id) => {
    if (confirm('¿Está seguro de relizar la eliminación?') == true) {

        let hurto = {
            _id: id

        }
        fetch(url, {
            method: 'DELETE',
            mode: 'cors',
            body: JSON.stringify(hurto), //Convertir el objeto usuario a un JSON
            headers: { "Content-type": "application/json; charset=UTF-8" }
        })
            .then((resp) => resp.json()) // Obtener la respuesta y convertirla a JSON
            .then(json => {
                alert(json.msg)
            })
        setTimeout

    }
}

if (document.querySelector('#btnRegistrar')) {
    document.querySelector('#btnRegistrar')
        .addEventListener('click', registrar)
}
if (document.querySelector('#btnActualizar')) {
    document.querySelector('#btnActualizar')
        .addEventListener('click', actualizar)
}
/* // ELIMINAR DATOS
const eliminar = async()=>{
    let _id = document.getElementById('id').value
    if(_id.length > 0){ */
