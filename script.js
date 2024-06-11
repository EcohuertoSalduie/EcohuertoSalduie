document.addEventListener("DOMContentLoaded", function() {
    let semillasData = [];

    // Función para renderizar las tarjetas
    function renderizarTarjetas(filtroTipo = '') {
        const catalogo = document.getElementById('catalogo');
        const mensaje = document.getElementById('mensaje');
        catalogo.innerHTML = ''; // Limpiar el contenedor

        const semillasFiltradas = semillasData.filter(item => 
            filtroTipo === '' || item.tipo === filtroTipo
        );
        semillasFiltradas.forEach(item => {
            // Crear el contenedor del artículo
            const article = document.createElement('article');
            article.className = 'tile';
            // Reemplazar los espacios por guiones en el tipo
            const tipoSinEspacios = quitarAcentos(item.tipo.replace(/\s+/g, '-')).toLowerCase();
            // Añadir una clase al artículo basada en el tipo
            article.classList.add('tile', tipoSinEspacios);
            // Crear el contenedor de la imagen
            const tileImg = document.createElement('div');
            tileImg.className = 'tile-img';
            const img = document.createElement('img');
            img.src = item.foto;
            img.alt = item.nombre;
            tileImg.appendChild(img);

            // Crear el encabezado
            const tileHeader = document.createElement('div');
            tileHeader.className = 'tile-header';
            const h3 = document.createElement('h3');
            const nombreSpan = document.createElement('span');
            nombreSpan.textContent = item.nombre;
            const nombreCientificoSpan = document.createElement('span');
            nombreCientificoSpan.textContent = item.nombre_cientifico;
            h3.appendChild(nombreSpan);
            h3.appendChild(nombreCientificoSpan);
            tileHeader.appendChild(h3);

            // Crear las etiquetas
            const labels = document.createElement('div');
            labels.className = 'labels';
            const añoLabel = document.createElement('div');
            añoLabel.className = 'label';
            añoLabel.style.color = '#ff942e';
            añoLabel.textContent = item.año;
            const disponibilidadLabel = document.createElement('div');
            disponibilidadLabel.className = 'label';
            disponibilidadLabel.style.color = '#ff942e';
            disponibilidadLabel.textContent = item.disponibilidad;
            const origenLabel = document.createElement('div');
            origenLabel.className = 'label';
            origenLabel.style.color = '#ff942e';
            origenLabel.textContent = item.origen;
            labels.appendChild(añoLabel);
            labels.appendChild(disponibilidadLabel);
            labels.appendChild(origenLabel);
            // Añadir todos los elementos al artículo
            article.appendChild(tileImg);
            article.appendChild(tileHeader);
            article.appendChild(labels);

            // Añadir el artículo al catálogo
            catalogo.appendChild(article);
        });
    }

    // Fetch para obtener los datos del JSON
    fetch('data.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            semillasData = data;
            renderizarTarjetas(); // Renderizar todas las tarjetas inicialmente
        })
        .catch(error => console.error('Error al cargar el JSON:', error));

    // Agregar event listeners a los elementos del menú
    const menuItems = document.querySelectorAll('.navigation a');
    menuItems.forEach(item => {
        item.addEventListener('click', event => {
            event.preventDefault();
            const tipo = event.currentTarget.querySelector('span').textContent;
            renderizarTarjetas(tipo);
        });
    });
});
function quitarAcentos(cadena) {
    return cadena.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}