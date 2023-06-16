const url = 'http://localhost:8082/api/hurtos' 
//url de la api. Al desplegarla en el servidor local colocar la api del servi
const listar = async() => {
    let respuesta = ''
    let body = document.getElementById('contenido')
    fetch(url, {
        method: 'GET',
        mode: 'cors',
        headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then((resp) => resp.json()) // Obtener la respuesta y convertirla a json
    .then(function(data){
        let listahurtos = data.hurtos
        listahurtos.map(function(hurto){
            respuesta += `<tr><td>${hurto._id}</td>`+
                        `<td>${hurto.direccion}</td>`+
                        `<td>${hurto.latitud}</td>`+
                        `<td>${hurto.longitud}</td>`+
                        `<td>${hurto.descripcion}</td>`+
                        `<td>${hurto.fecha}</td>`+
                        `<td><a class="waves-effect waves-light btn modal-trigger" href="#modal1" onclick='editar(${JSON.stringify(hurto)})'>Editar</a>
                        <a class="waves-effect waves-light btn modal-denger red" href="http://localhost:3000/consumirAPI206/listarDatos.html" onclick='eliminar(${JSON.stringify(hurto)})'>Eliminar</a></td></tr>`  
                        body.innerHTML = respuesta

        })
    })
    //alert('En desarrollo...')
}

const registrar = async()=>{

    let _direccion = document.getElementById('direccion').value
    let _latitud = document.getElementById('latitud').value
    let _longitud = document.getElementById('longitud').value
    let _descripcion = document.getElementById('descripcion').value
    let _fecha = document.getElementById('fecha').value
   

    //alert(_pass.length+' '+_confirmaPass.length)

    if(latitud.length>0 && longitud.length>0){
        let _hurto = {
            direccion: _direccion,
            latitud:_latitud,
            longitud:_longitud ,
            descripcion: _descripcion,
            fecha: _fecha,
        }
        fetch(url, {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(_hurto), //Convertir el objeto usuario a un JSON
            headers: {"Content-type": "application/json; charset=UTF-8"}
        })
        .then((resp) => resp.json()) // Obtener la respuesta y convertirla a JSON
        .then(json   =>{
           // alert(json.msg)
           Swal.fire(
            json.msg,
            '',
            'success'
          )

        })


    } else {
     //alert('El Password y la Confirmar de Password no coinciden. Por favor corregir')
     Swal.fire(
        'El Password y la Confirmar de Password no coinciden. Por favor corregir',
        '',
        'error'
      )
}
}


const editar = (hurto) => {
    document.getElementById('direccion').value = hurto.hora_inicio;
    document.getElementById('latitud').value = hurto.instructor;
    document.getElementById('longitud').value = hurto.hora_fin;
    document.getElementById('descripcion').value = hurto.clase;
    document.getElementById('fecha').value = hurto.dia;
}

const actualizar = async () => {
    let _direccion = document.getElementById('direccion').value
    let _latitud = document.getElementById('latitud').value
    let _longitud = document.getElementById('longitud').value
    let _descripcion = document.getElementById('descripcion').value

    if (_hora_inicio.length > 0 && _hora_fin.length > 0) {
        const _hurto = {
            direccion: _direccion,
            latitud:_latitud,
            longitud:_longitud ,
            descripcion: _descripcion
       
        };

        fetch(url, {
            method: 'PUT',
            mode: 'cors',
            body: JSON.stringify(_hurto),
            headers: {"Content-type": "application/json; charset=UTF-8"}
        })
        .then((resp) => resp.json())
        .then(json => {
            Swal.fire(
                json.msg,
                '',
                'success'
            );
        })
        .catch(error => {
            console.error(error);
            Swal.fire(
                'Ocurrió un error al actualizar la hurto. Por favor, inténtalo nuevamente.',
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


const eliminar = (id) =>{
    if(confirm('¿Está seguro de relizar la eliminación?') == true){
        
            let hurto = {
                _id: id
                
            }
            fetch(url, {
                method: 'DELETE',
                mode: 'cors',
                body: JSON.stringify(hurto), //Convertir el objeto usuario a un JSON
                headers: {"Content-type": "application/json; charset=UTF-8"}
            })
            .then((resp) => resp.json()) // Obtener la respuesta y convertirla a JSON
            .then(json   =>{
                alert(json.msg)
            })

    }
}

if(document.querySelector('#btnRegistrar')){
    document.querySelector('#btnRegistrar')
    .addEventListener('click', registrar)
}
if(document.querySelector('#btnActualizar')){
    document.querySelector('#btnActualizar')
    .addEventListener('click', actualizar)
}
/* // ELIMINAR DATOS
const eliminar = async()=>{
    let _id = document.getElementById('id').value
    if(_id.length > 0){ */
