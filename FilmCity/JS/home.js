const slidesContainer = document.getElementById("slides");
let currentSlide = 0;

// Función para mover el carrusel
function moveSlide(direction) {
  const slides = document.querySelectorAll(".slide");
  const totalSlides = slides.length - 1;

  currentSlide += direction;

  if (currentSlide < 0) {
    currentSlide = totalSlides - 1; // Vuelve al último slide si está en el primero
    document.querySelector(".slides").classList.add("slide_final");
  } else if (currentSlide >= totalSlides) {
    currentSlide = 0; // Vuelve al primer slide si está en el último
    document.querySelector(".slides").classList.add("slide_final");
  } else {
    document.querySelector(".slides").classList.remove("slide_final");
  }

  const offset = -currentSlide * 100; // Calcula el desplazamiento
  slidesContainer.style.transform = `translateX(${offset}%)`; // Mueve el contenedor
  //
}

// Cargar las películas desde el JSON
fetch("JS/peliculas-series.json")
  .then((response) => response.json())
  .then((data) => {
    const primerasPeliculas = data.peliculas.slice(0, 10); // Obtén las primeras 10 películas

    primerasPeliculas.forEach((pelicula) => {
      const cartaPelicula = document.createElement("div");
      cartaPelicula.classList.add("slide");
      cartaPelicula.innerHTML = `
      <h1>${pelicula.Id}</h1>
        <img src="${pelicula.Poster}" alt="${pelicula.Title}">
      `;

      slidesContainer.append(cartaPelicula);
    });
  })
  .catch((error) => {
    console.error("Error al cargar las películas:", error);
  });
