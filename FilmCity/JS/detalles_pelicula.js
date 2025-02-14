fetch("JS/peliculas-series.json") // Cargar el JSON externo
  .then((response) => response.json()) // Convertir la respuesta en un objeto JavaScript
  .then((data) => {
    // Filtrar la película con ID 6
    const pelicula = data.peliculas.find((p) => p.Id === 6);

    if (pelicula) {
      // Insertar Sinopsis
      document.getElementById("sinopsis").innerHTML = `
       <div class="detalle_box">
         <h4>Sinopsis</h4>
         <p>${pelicula.Plot}</p>
       </div>
     `;

      // Insertar Dirección y Reparto (envuelto en un contenedor)
      document.getElementById("reparto").innerHTML = `
       <div class="detalle_box">
         <h4>Dirección y reparto</h4>
         <p><strong>Dirección:</strong> ${pelicula.Director}</p>
         <p><strong>Reparto:</strong> ${pelicula.Actors}</p>
       </div>
     `;

      // Insertar Audio y Subtítulos (envuelto en un contenedor)
      document.getElementById("audio").innerHTML = `
       <div class="detalle_box">
         <h4>Audio y subtítulos</h4>
         <p><strong>Audio:</strong> ${pelicula.Audio}</p> <!-- Asegúrate de que 'pelicula.Language' contenga el dato correcto -->
         <p><strong>Subtítulos:</strong> ${pelicula.Language}</p>
       </div>
     `;
    } else {
      console.error("Película con ID 6 no encontrada.");
    }
  })
  .catch((error) => console.error("Error cargando JSON:", error));

//PELICULAS
fetch("JS/peliculas-series.json") // Cargar el JSON externo
  .then((response) => response.json()) // Convertir la respuesta en un objeto JavaScript
  .then((data) => {
    // Filtrar las primeras 3 películas (o las que desees)
    const peliculasRelacionadas = data.peliculas.slice(12, 15); // Cambia el filtro según tus necesidades

    const peliculasContainer = document.getElementById("peliculas");

    if (peliculasRelacionadas.length > 0) {
      // Generar el HTML para cada película
      peliculasRelacionadas.forEach((pelicula) => {
        const peliculaHTML = `
          <div class="pelicula">
            <img src="${pelicula.Poster}" alt="${pelicula.Title}" />
          </div>
        `;
        peliculasContainer.innerHTML += peliculaHTML; // Agregar cada película al contenedor
      });
    } else {
      console.error("No se encontraron películas relacionadas.");
    }
  })
  .catch((error) => console.error("Error cargando JSON:", error));
