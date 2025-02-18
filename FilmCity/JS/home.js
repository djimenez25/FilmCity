// Función para mover el carrusel
function moveSlide(direction, type) {
  let slidesContainer, slides, totalSlides, slidesToShow;
  // Selecciona el contenedor correcto según el tipo de carrusel
  if (type === "series") {
    slidesContainer = document.getElementById("series-slides");
  } else if (type === "movies") {
    slidesContainer = document.getElementById("movies-slides");
  } else if (type === "more-series") {
    slidesContainer = document.getElementById("more-series-slides");
  } else if (type === "more-movies") {
    slidesContainer = document.getElementById("more-movies-slides");
  }

  slides = slidesContainer.querySelectorAll(".slide, .slide-grande");

  totalSlides = slides.length;

  // Determinar cuántas diapositivas se muestran según el tamaño de la pantalla
  slidesToShow =
    window.innerWidth >= 992 ? 5 : window.innerWidth >= 768 ? 3 : 1;

  // Calcular el índice actual
  let currentSlide = parseInt(slidesContainer.dataset.currentSlide || 0);
  currentSlide += direction * slidesToShow;
  // Ajustar el índice para que no se salga de los límites
  if (currentSlide < 0) {
    currentSlide = totalSlides - slidesToShow; // Vuelve al último grupo de diapositivas
    slidesContainer.classList.add("slide_final");
  } else if (currentSlide >= totalSlides - slidesToShow + 1) {
    currentSlide = 0; // Vuelve al primer grupo de diapositivas
    slidesContainer.classList.add("slide_final");
  } else {
    slidesContainer.classList.remove("slide_final");
  }

  // Guardar el índice actual en el dataset
  slidesContainer.dataset.currentSlide = currentSlide;

  // Calcular el desplazamiento
  const offset = -currentSlide * (100 / slidesToShow);
  slidesContainer.style.transform = `translateX(${offset}%)`;
}

// Cargar las 10 mejores películas desde el JSON
fetch("JS/peliculas-series.json")
  .then((response) => response.json())
  .then((data) => {
    const topPeliculas = data.peliculas.slice(0, 10); // Obtén las primeras 10 películas
    const peliculasSlides = document.getElementById("movies-slides");

    topPeliculas.forEach((pelicula) => {
      const cartaPelicula = document.createElement("div");
      cartaPelicula.classList.add("slide");
      cartaPelicula.innerHTML = `
       <span class="ranking-number">${pelicula.Id}</span>
        <div class="image-container">
           <img src="${pelicula.Poster}" alt="${pelicula.Title}">
        </div>
      `;

      // Añadir eventos para mostrar/ocultar información
      cartaPelicula.addEventListener("mouseenter", () => {
        mostrarInformacionPelicula(cartaPelicula, pelicula);
      });

      cartaPelicula.addEventListener("mouseleave", () => {
        ocultarInformacionPelicula(cartaPelicula);
      });

      peliculasSlides.append(cartaPelicula);
    });
  })
  .catch((error) => {
    console.error("Error al cargar las películas:", error);
  });

// Cargar películas desde el JSON
fetch("JS/peliculas-series.json")
  .then((response) => response.json())
  .then((data) => {
    const peliculas = data.peliculas.slice(0, 20); // Obtén las primeras 20 películas

    //Mezclar aleatoriamente el array usando sort() y Math.random()
    peliculas.sort(() => Math.random() - 0.5);
    const peliculasSlides = document.getElementById("more-movies-slides");

    peliculas.forEach((pelicula) => {
      const cartaPelicula = document.createElement("div");
      cartaPelicula.classList.add("slide-grande");
      cartaPelicula.innerHTML = `
      <div class="image-container">
         <img src="${pelicula.Poster}" alt="${pelicula.Title}">
      </div>
    `;

      // Añadir eventos para mostrar/ocultar información
      cartaPelicula.addEventListener("mouseenter", () => {
        mostrarInformacionPelicula(cartaPelicula, pelicula);
      });

      cartaPelicula.addEventListener("mouseleave", () => {
        ocultarInformacionPelicula(cartaPelicula);
      });

      peliculasSlides.append(cartaPelicula);
    });
  })
  .catch((error) => {
    console.error("Error al cargar las películas:", error);
  });

// Cargar las 10 mejores series desde el JSON
fetch("JS/peliculas-series.json")
  .then((response) => response.json())
  .then((data) => {
    const topSeries = data.series.slice(0, 10); // Obtén las primeras 10 series
    const seriesSlides = document.getElementById("series-slides");

    topSeries.forEach((serie) => {
      const cartaSeries = document.createElement("div");
      cartaSeries.classList.add("slide");
      cartaSeries.innerHTML = `
     <span class="ranking-number">${serie.Id}</span>
      <div class="image-container">
         <img src="${serie.Poster}" alt="${serie.Title}">
      </div>
    `;

      // Añadir eventos para mostrar/ocultar información
      cartaSeries.addEventListener("mouseenter", () => {
        mostrarInformacionPelicula(cartaSeries, serie);
      });

      cartaSeries.addEventListener("mouseleave", () => {
        ocultarInformacionPelicula(cartaSeries);
      });

      seriesSlides.append(cartaSeries);
    });
  })
  .catch((error) => {
    console.error("Error al cargar las series:", error);
  });

// Cargar series desde el JSON
fetch("JS/peliculas-series.json")
  .then((response) => response.json())
  .then((data) => {
    const series = data.series.slice(0, 20); // Obtén las primeras 20 series

    //Mezclar aleatoriamente el array usando sort() y Math.random()
    series.sort(() => Math.random() - 0.5);
    const seriesSlides = document.getElementById("more-series-slides");

    series.forEach((serie) => {
      const cartaSerie = document.createElement("div");
      cartaSerie.classList.add("slide-grande");
      cartaSerie.innerHTML = `
    <div class="image-container">
       <img src="${serie.Poster}" alt="${serie.Title}">
    </div>
  `;

      // Añadir eventos para mostrar/ocultar información
      cartaSerie.addEventListener("mouseenter", () => {
        mostrarInformacionPelicula(cartaSerie, serie);
      });

      cartaSerie.addEventListener("mouseleave", () => {
        ocultarInformacionPelicula(cartaSerie);
      });

      seriesSlides.append(cartaSerie);
    });
  })
  .catch((error) => {
    console.error("Error al cargar las series:", error);
  });

function mostrarInformacionPelicula(carta, pelicula, serie) {
  const caja_informacion = document.createElement("div");

  let fondo;
  let edad;

  // Verificar si es una película
  if (pelicula) {
    if (pelicula.Rated === "PG") {
      fondo = "verde";
      edad = "+5";
    } else if (pelicula.Rated === "PG-13") {
      fondo = "orange";
      edad = "+13";
    } else if (pelicula.Rated === "R") {
      fondo = "red";
      edad = "+18";
    }
  }

  // Verificar si es una serie
  if (serie) {
    if (serie.Rated === "TV-14") {
      fondo = "orange";
      edad = "14";
    } else {
      fondo = "red";
      edad = "18";
    }
  }

  let mostrar_informacion = `
        <div class="imagen_card">
          <video class="video" autoplay="true" muted loop>
            <source src="multimedia/video/demo.mp4" type="video/mp4">
            Tu navegador no soporta la reproducción de videos.
          </video>
        </div>
        <div class="enlaces_pelicula">
          <div class="peliculas_derecha">
            <a href="detalles_peliculas.html">
              <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="white" class="bi bi-play-circle-fill" viewBox="0 0 16 16">
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814z"/>
              </svg>
            </a>
            <a href="">
              <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="white" class="bi bi-plus-circle" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
              </svg>
            </a>
            <a href="">
              <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="white" class="bi bi-hand-thumbs-up" viewBox="0 0 16 16">
                <path d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2 2 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a10 10 0 0 0-.443.05 9.4 9.4 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a9 9 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.2 2.2 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.9.9 0 0 1-.121.416c-.165.288-.503.56-1.066.56z"/>
              </svg>
            </a>
          </div>
          <div class="peliculas_izquierda">
            <a href="detalles_peliculas.html">
              <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="white" class="bi bi-arrow-down-circle" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293z"/>
              </svg>
            </a>
          </div>
        </div>
        <div class="valoracion_tiempo">
          <div class="align-right naranja ${fondo}">
            <p class="align-right naranja">${edad}</p>
          </div>
          <div class="align-left">
            <p class="align-left">${pelicula.Runtime}</p>
          </div>
          <div class="align-left">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" class="bi bi-badge-hd" viewBox="0 0 16 16">
              <path d="M7.396 11V5.001H6.209v2.44H3.687V5H2.5v6h1.187V8.43h2.522V11zM8.5 5.001V11h2.188c1.811 0 2.685-1.107 2.685-3.015 0-1.894-.86-2.984-2.684-2.984zm1.187.967h.843c1.112 0 1.622.686 1.622 2.04 0 1.353-.505 2.02-1.622 2.02h-.843z"/>
              <path d="M14 3a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zM2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z"/>
            </svg>
          </div>
        </div>
        <div class="genero text-start">
          <p>${pelicula.Genre}</p>
        </div>
      `;

  caja_informacion.innerHTML = mostrar_informacion;
  caja_informacion.classList.add("detalles");
  carta.appendChild(caja_informacion);

  // Añadir clase de hover a la carta
  carta.classList.add("hover-active");
}

function ocultarInformacionPelicula(carta) {
  const caja_informacion = carta.querySelector(".detalles");
  if (caja_informacion) {
    carta.removeChild(caja_informacion);
    // Remover clase de hover
    carta.classList.remove("hover-active");
  }
}
