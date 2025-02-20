let reproduciendo = false;

let pelicula = document.querySelector("video");

function reproducir() {
  if (reproduciendo) {
    pelicula.pause();
    reproduciendo = false;
    document
      .querySelector("#play i")
      .classList.replace("bi-pause-fill", "bi-play-fill");
  } else {
    pelicula.play();
    reproduciendo = true;
    document
      .querySelector("#play i")
      .classList.replace("bi-play-fill", "bi-pause-fill");
  }
}

document.querySelector("#play").addEventListener("click", reproducir);

//barra para ver el minuto que va del video
pelicula.addEventListener("timeupdate", () => {
  // Actualizar el valor y el máximo de la barra de progreso
  const barraProgreso = document.querySelector("#tiempoPelicula");
  barraProgreso.value = pelicula.currentTime;
  barraProgreso.max = pelicula.duration;

  // Calcular el porcentaje de progreso
  const porcentaje = (pelicula.currentTime / pelicula.duration) * 100;

  // Cambiar el color de la barra de progreso según el porcentaje
  barraProgreso.style.background = `linear-gradient(to right, #E50914 ${porcentaje}%, #d3d3d3 ${porcentaje}%)`;
});

//funcionalidad para la barra de duracion
document.querySelector("#tiempoPelicula").addEventListener("change", () => {
  pelicula.currentTime = document.querySelector("#tiempoPelicula").value;
});

document.querySelector("#mute").addEventListener("click", silenciar);

function silenciar() {
  document.querySelector("#volumen").value = 0;
  pelicula.volume = 0;
}

function avanzar() {
  pelicula.currentTime += 10;
}
document.getElementById("adelantar").addEventListener("click", avanzar);
function retroceder() {
  pelicula.currentTime -= 10;
}
document.getElementById("atrasar").addEventListener("click", retroceder);

// Control de volumen: Mostrar/Ocultar
const volumenContainer = document.querySelector(".volumen");
const volumenUpButton = document.getElementById("volumenUp");
const volumenMuteButton = document.getElementById("mute");
const volumenInput = document.getElementById("volumen");
const volumenIcon = volumenUpButton.querySelector("i"); // Seleccionamos el ícono dentro del botón
let timeout;

// Al cargar la página, ocultamos el control del volumen
volumenInput.style.display = "none"; // Ocultamos el control de volumen al inicio
volumenMuteButton.style.display = "none"; // Ocultamos el control de volumen al inicio
volumenIcon.classList.remove("bi-volume-off-fill"); // Aseguramos que no se muestre el ícono de volumen apagado
volumenIcon.classList.add("bi-volume-up-fill"); // Ponemos el ícono de volumen encendido

// Mostrar/Ocultar control de volumen al hacer clic en el botón de volumen
volumenUpButton.addEventListener("click", () => {
  if (volumenInput.style.display === "none") {
    mostrarVolumen(); // Si está oculto, lo mostramos
  } else {
    ocultarVolumen(); // Si está visible, lo ocultamos
  }
});

function mostrarVolumen() {
  // Mostrar el control de volumen
  volumenInput.style.display = "inline-block";
  volumenMuteButton.style.display = "inline-block"; // Ocultamos el control de volumen al inicio

  // Expande el contenedor de volumen
  volumenContainer.style.width = "300px";

  // Reiniciar el temporizador para ocultar el control después de 3 segundos
  clearTimeout(timeout);

  timeout = setTimeout(() => {
    ocultarVolumen(); // Ocultar el control después de 3 segundos
  }, 7000);
}

function ocultarVolumen() {
  // Ocultar el control de volumen
  volumenInput.style.display = "none";
  volumenMuteButton.style.display = "none"; // Ocultamos el control de volumen al inicio

  // Reducir el ancho del contenedor de volumen
  volumenContainer.style.width = "50px";
}

const rangeInput = document.getElementById("volumen");

// Función para actualizar el fondo de la barra
function updateRange() {
  const value = rangeInput.value;
  const max = rangeInput.max;
  const percentage = (value / max) * 100;

  // Cambia el color de fondo de la barra en función del valor
  rangeInput.style.background = `linear-gradient(to right,rgb(229, 9, 20) ${percentage}%, rgb(200, 200, 200) ${percentage}%)`;
}
// Agregar el evento de clic al botón de mute
document.getElementById("mute").addEventListener("click", () => {
  rangeInput.value = 0; // Establece el valor del rango a 0
  rangeInput.style.background = `linear-gradient(to right, rgb(255, 255, 255) 100%, rgb(255, 255, 255) 100%)`; // Cambia el color de fondo a blanco
});

// Actualiza el fondo cada vez que se cambia el valor
rangeInput.addEventListener("input", updateRange);

// Inicializa el fondo cuando se carga la página
updateRange();

// Función para mostrar el tiempo restante de la película
function mostrarTiempoRestante() {
  const duracionSegundos = pelicula.duration;
  const tiempoTranscurrido = pelicula.currentTime;
  const tiempoRestante = duracionSegundos - tiempoTranscurrido; // Tiempo restante en segundos

  const minutos = Math.floor(tiempoRestante / 60); // Minutos
  const segundos = Math.floor(tiempoRestante % 60); // Segundos

  // Formateamos el tiempo restante en formato mm:ss
  const tiempoRestanteFormateado = `${minutos}:${
    segundos < 10 ? "0" + segundos : segundos
  }`;

  // Actualizamos el contenido de un elemento HTML con id 'tiempoRestante'
  document.querySelector(
    "#duracionPelicula"
  ).textContent = `${tiempoRestanteFormateado}`;
}
mostrarTiempoRestante();

// Llamamos a la función cada vez que el video avanza (se actualiza el tiempo actual)
pelicula.addEventListener("timeupdate", mostrarTiempoRestante);

function activarPantallaCompleta() {
  const video = document.getElementById("contenedor"); // Seleccionamos el video

  // Verificamos si el elemento ya está en pantalla completa
  if (
    !document.fullscreenElement &&
    !document.webkitFullscreenElement &&
    !document.mozFullScreenElement &&
    !document.msFullscreenElement
  ) {
    // Si no está en pantalla completa, entramos en ese modo
    if (video.requestFullscreen) {
      video.requestFullscreen();
    } else if (video.webkitRequestFullscreen) {
      // Safari
      video.webkitRequestFullscreen();
    } else if (video.mozRequestFullScreen) {
      // Firefox
      video.mozRequestFullScreen();
    } else if (video.msRequestFullscreen) {
      // IE/Edge
      video.msRequestFullscreen();
    }
  } else {
    // Si ya está en pantalla completa, salimos de ese modo
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      // Safari
      document.webkitExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      // Firefox
      document.mozCancelFullScreen();
    } else if (document.msExitFullscreen) {
      // IE/Edge
      document.msExitFullscreen();
    }
  }
}

// Asociamos la función al botón
document
  .getElementById("full")
  .addEventListener("click", activarPantallaCompleta);
let timeout2;

function resetTimer() {
  clearTimeout(timeout2);

  // Mostrar los elementos cuando hay actividad
  document.querySelector(".headerRepro").style.display = "flex";
  document.querySelector(".footerRepro").style.display = "flex";

  // Iniciar el temporizador de 5 segundos para ocultarlos
  timeout2 = setTimeout(() => {
    document.querySelector(".headerRepro").style.display = "none";
    document.querySelector(".footerRepro").style.display = "none";
  }, 5000);
}

// Eventos que reinician el temporizador cuando hay actividad
window.onload = resetTimer;
document.onmousemove = resetTimer;
document.onkeydown = resetTimer;
document.onclick = resetTimer;
document.onscroll = resetTimer;

//funcion para pasar de capitulo y cambiar el numero del capitulo
document.addEventListener("DOMContentLoaded", function () {
  let capituloActual = 1; // Número de capítulo inicial
  let temporadaActual = 1; // Número de temporada inicial
  const nombreEpisodio = document.getElementById("nombre_episodio");
  const botonSiguiente = document.getElementById("siguiente");
  const video = document.querySelector("video"); // Selecciona el video en la página

  function cambiarCapitulo() {
    // Verifica si es el último capítulo de la última temporada
    if (capituloActual === 12 && temporadaActual === 5) {
      // Reinicia a la temporada 1, capítulo 1
      temporadaActual = 1;
      capituloActual = 1;

      // Actualiza el texto del episodio
      nombreEpisodio.textContent = `Los Soprano T${temporadaActual}: Capítulo ${capituloActual}`;

      // Detiene el video y lo reinicia al principio
      video.pause();
      video.currentTime = 0;
      return; // Sale de la función
    }

    // Lógica para cambiar de capítulo o temporada
    if (capituloActual < 12) {
      capituloActual++; // Aumenta el número del capítulo
    } else {
      // Si es el capítulo 12, cambia de temporada
      temporadaActual++;
      capituloActual = 1; // Reinicia el contador de capítulos
    }

    // Actualiza el texto del episodio
    nombreEpisodio.textContent = `Los Soprano T${temporadaActual}: Capítulo ${capituloActual}`;

    // Reinicia el video para simular cambio de capítulo
    video.currentTime = 0;
    video.play();
  }

  // Evento cuando se hace clic en "Siguiente"
  botonSiguiente.addEventListener("click", function (event) {
    event.preventDefault(); // Evita que el enlace recargue la página
    cambiarCapitulo();
  });

  // Evento cuando el video termina
  video.addEventListener("ended", function () {
    cambiarCapitulo();
  });
});
