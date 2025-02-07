<<<<<<< Updated upstream
const slidesContainer = document.getElementById("slides");
let currentSlide = 0;

fetch("JS/peliculas-series.json").then((response) => {
  response.json().then((data) => {
    const primerasPeliculas = data.peliculas.slice(0, 10);
    primerasPeliculas.forEach((pelicula) => {
=======
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
>>>>>>> Stashed changes
      const cartaPelicula = document.createElement("div");
      cartaPelicula.classList.add("slide");
      cartaPelicula.innerHTML = `
      <img src="${pelicula.Poster}" alt="${pelicula.Title}">
      `;

      peliculasSlides.append(cartaPelicula);
    });
  });
<<<<<<< Updated upstream
});

window.moveSlide = function (direction) {
  const slides = document.querySelectorAll(".slide");
  if (slides.length === 0) return;

  // Calcular la diapositiva actual
  currentSlide = currentSlide + direction;

  // Si se llega al final (última diapositiva duplicada), volver a la primera original
  if (currentSlide >= slides.length - 1) {
    currentSlide = 1; // Volver a la primera película original
    slidesContainer.style.transition = "none"; // Desactivar la transición para un cambio instantáneo
    slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
    setTimeout(() => {
      slidesContainer.style.transition = "transform 0.5s ease"; // Reactivar la transición
    }, 50);
  }

  // Si se llega al principio (primera diapositiva duplicada), volver a la última original
  if (currentSlide <= 0) {
    currentSlide = slides.length - 2; // Volver a la última película original
    slidesContainer.style.transition = "none"; // Desactivar la transición para un cambio instantáneo
    slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
    setTimeout(() => {
      slidesContainer.style.transition = "transform 0.5s ease"; // Reactivar la transición
    }, 50);
  }

  // Aplicar la transformación para mover el slider
  slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
};
=======

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

      seriesSlides.append(cartaSerie);
    });
  })
  .catch((error) => {
    console.error("Error al cargar las series:", error);
  });
>>>>>>> Stashed changes
