const slidesContainer = document.getElementById("slides");
let currentSlide = 0;

fetch("JS/peliculas-series.json").then((response) => {
  response.json().then((data) => {
    const primerasPeliculas = data.peliculas.slice(0, 10);
    primerasPeliculas.forEach((pelicula) => {
      const cartaPelicula = document.createElement("div");
      cartaPelicula.classList.add("slide");
      cartaPelicula.innerHTML = `
      <img src="${pelicula.Poster}" alt="${pelicula.Title}">
      `;

      slidesContainer.append(cartaPelicula);
    });
  });
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
