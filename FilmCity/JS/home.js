const slidesContainer = document.getElementById("slides");
let currentSlide = 0;

// Función para mover el carrusel
function moveSlide(direction) {
  const slides = document.querySelectorAll(".slide");
  const totalSlides = slides.length - 1;

  // Determinar cuántas diapositivas se muestran según el tamaño de la pantalla
  const slidesToShow =
    window.innerWidth >= 992 ? 5 : window.innerWidth >= 768 ? 3 : 1;

  currentSlide += direction * slidesToShow;

  // Ajustar el índice para que no se salga de los límites
  if (currentSlide < 0) {
    currentSlide = totalSlides - slidesToShow; // Vuelve al último grupo de diapositivas
    document.querySelector(".slides").classList.add("slide_final");
  } else if (currentSlide >= totalSlides - slidesToShow + 1) {
    currentSlide = 0; // Vuelve al primer grupo de diapositivas
    document.querySelector(".slides").classList.add("slide_final");
  } else {
    document.querySelector(".slides").classList.remove("slide_final");
  }

  // Calcular el desplazamiento en función del número de diapositivas visibles
  const offset = -currentSlide * (100 / slidesToShow);
  slidesContainer.style.transform = `translateX(${offset}%)`;
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
       <span class="ranking-number">${pelicula.Id}</span>
        <div class="image-container">
           <img src="${pelicula.Poster}" alt="${pelicula.Title}">
        </div>
      `;

      slidesContainer.append(cartaPelicula);
    });
  })
  .catch((error) => {
    console.error("Error al cargar las películas:", error);
  });
