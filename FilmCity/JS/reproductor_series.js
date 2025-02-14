let reproduciendo = true;

let pelicula = document.querySelector("video");

function reproducir() {
  if (reproduciendo) {
    pelicula.pause();
    reproduciendo = false;
    document
      .querySelector("#play i")
      .classList.replace("bi-play-fill", "bi-pause-fill");
  } else {
    pelicula.play();
    reproduciendo = true;
    document
      .querySelector("#play i")
      .classList.replace("bi-pause-fill", "bi-play-fill");
  }
}
