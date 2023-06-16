document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const hurtoId = urlParams.get('id');

    if (hurtoId) {
        fetch('http://localhost:8082/api/hurtos/' + hurtoId) // Reemplaza 'https://example.com/api/hurtos/' con la URL correcta de tu API para obtener los datos del hurto
            .then(response => response.json())
            .then(hurto => {
                document.getElementById('direccion').value = hurto.direccion;
                document.getElementById('latitud').value = hurto.latitud;
                document.getElementById('longitud').value = hurto.longitud;
                document.getElementById('descripcion').value = hurto.descripcion;
            })
            .catch(error => console.error(error));
    }
});
