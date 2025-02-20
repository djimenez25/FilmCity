const menuToggle = document.querySelector(".desplegable");
const menu = document.querySelector(".secciones");

menuToggle.addEventListener("click", function () {
  menu.classList.toggle("active");
});

const caja_mostrar_series = document.querySelector(".series_catalogo");
const select_genero = document.getElementById("select_genero");

let caja_info;
let series;
let serie_caja;
let fondo;
let edad;
let caja_informacion;

/**
 * Funcion que nos recorre el array
 * @param {*} serie
 */
function recorrerArray(serie) {
  const caja_serie = document.createElement("div");
  let mostrar = `
                            <img src="${serie.Poster}"></img>
                        `;
  caja_serie.innerHTML = mostrar;
  caja_serie.classList.add("bottom");
  caja_mostrar_series.appendChild(caja_serie);

  caja_serie.addEventListener("mouseenter", () => {
    serie_caja = caja_serie;
    pintarSerie(serie);
  });

  caja_serie.addEventListener("mouseleave", () => {
    caja_serie.removeChild(caja_info);
  });
}

/**
 * Funcion que nos pinta una serie
 * @param {} serie
 */
function pintarSerie(serie) {
  if (serie.Rated === "TV-14") {
    fondo = "orange";
    edad = "+14";
  } else {
    fondo = "red";
    edad = "+18";
  }

  caja_informacion = document.createElement("div");
  let mostrar_informacion = `
                                            <div class="imagen_card">
                                                <video class="video" autoplay="true">
                                                    <source src="multimedia/video/demo.mp4" type="video/mp4">
                                                </video>
                                            </div>
                                            <div class="enlaces_pelicula">
                                                <div class="peliculas_derecha">
                                                    <a href="reproductor_series.html">
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
                                                    <a href="detalles_series.html">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="white" class="bi bi-arrow-down-circle" viewBox="0 0 16 16">
                                                            <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293z"/>
                                                        </svg>
                                                    </a>
                                                </div>
                                            </div>
                                            <div class="valoracion_tiempo">
                                                <div class="align-right naranja ${fondo}">
                                                    <p>${edad}</p> 
                                                </div>
                                                <div class="align-left">
                                                    <p>${serie.totalSeasons} seasons</p>
                                                </div>
                                                <div class="align-left">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" class="bi bi-badge-hd" viewBox="0 0 16 16">
                                                        <path d="M7.396 11V5.001H6.209v2.44H3.687V5H2.5v6h1.187V8.43h2.522V11zM8.5 5.001V11h2.188c1.811 0 2.685-1.107 2.685-3.015 0-1.894-.86-2.984-2.684-2.984zm1.187.967h.843c1.112 0 1.622.686 1.622 2.04 0 1.353-.505 2.02-1.622 2.02h-.843z"/>
                                                        <path d="M14 3a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zM2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z"/>
                                                    </svg>
                                                </div>
                                            </div>
                                            <div class="genero text-start">
                                                <p>${serie.Genre}</p>
                                            </div>
                                        `;
  caja_informacion.innerHTML = mostrar_informacion;
  caja_informacion.classList.add("detalles");
  serie_caja.appendChild(caja_informacion);

  caja_info = caja_informacion;
}

/**
 * Funcion que lee el JSON
 */
function leerSeries() {
  fetch("JS/peliculas-series.json", {})
    .then((response) => {
      return response.json();
    })
    .then((datos) => {
      series = datos.series;
      series.forEach((serie) => {
        recorrerArray(serie);
      });
    })
    .catch((error) => {
      console.log(error);
    });
}

leerSeries();

select_genero.addEventListener("change", () => {
  switch (select_genero.value) {
    case "Generos":
      caja_mostrar_series.innerHTML = "";

      series.forEach((serie) => {
        recorrerArray(serie);
      });
      break;
    case "Drama":
      caja_mostrar_series.innerHTML = "";
      const array_drama = series.filter((serie) =>
        serie.Genre.includes("Drama")
      );

      array_drama.forEach((serie) => {
        recorrerArray(serie);
      });
      break;
    case "Comedia":
      caja_mostrar_series.innerHTML = "";
      const array_comedia = series.filter((serie) =>
        serie.Genre.includes("Comedy")
      );

      array_comedia.forEach((serie) => {
        recorrerArray(serie);
      });
      break;
    case "Accion":
      caja_mostrar_series.innerHTML = "";
      const array_accion = series.filter((serie) =>
        serie.Genre.includes("Action")
      );

      array_accion.forEach((serie) => {
        recorrerArray(serie);
      });
      break;
    default:
      break;
  }
});
