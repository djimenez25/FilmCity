const menuToggle = document.querySelector(".desplegable");
const menu = document.querySelector(".secciones");

menuToggle.addEventListener("click", function () {
  menu.classList.toggle("active");
});

const select_temporadas = document.getElementById("temporadas_serie");
const pequeños = document.getElementById("capitulos_pequeños");
const grandes = document.getElementById("capitulos_grandes");
let serie;
let temporadas_serie;
let caja_serie_detalle;

function capitulosGrandes() {
  for (let i = 0; i < temporadas_serie; i++) {
    const caja_capitulo = document.createElement("div");
    let muestra = `
                            <div class="caja_imagen">
                                <a href='reproductor_series.html'>
                                    <img class="imagen_serie" src="${serie.ChapterImg}"></img>
                                </a>
                            </div>
                            <div>
                                <p class="titulo">T${select_temporadas.value} E${i}: Los Soprano</p>
                                <p>58 min 1998</p>
                                <p>${serie.Plot}</p>
                            </div>
                        `;
    caja_capitulo.innerHTML = muestra;
    caja_capitulo.classList.add("capitulo_grande");
    grandes.appendChild(caja_capitulo);
  }
}

function temporadas() {
  fetch("JS/peliculas-series.json", {})
    .then((response) => {
      return response.json();
    })
    .then((datos) => {
      const series = datos.series;

      //Pillamos la serie de Los Soprano
      for (let index = 0; index < series.length; index++) {
        if (index == 1) {
          serie = series[index];
        }
      }

      //---------------------OPTIONS---------------------
      temporadas_serie = serie.totalSeasons;
      for (let i = 1; i <= temporadas_serie; i++) {
        const option_temporada = document.createElement("option");
        option_temporada.textContent = "Temporada " + i;
        option_temporada.value = i;
        option_temporada.classList.add = "options_select";

        select_temporadas.appendChild(option_temporada);
      }

      //---------------------CAPITULOS 576px-768px---------------------
      for (let i = 0; i < temporadas_serie; i++) {
        const capitulo = document.createElement("div");
        let mostrar = `<p>E${i}: Los Soprano</p>`;
        capitulo.innerHTML = mostrar;
        capitulo.classList.add("capitulo_pequeño");

        pequeños.appendChild(capitulo);

        capitulo.addEventListener("click", (e) => {
          const detalles_cap = document.querySelectorAll(".detalles_capitulo");

          detalles_cap.forEach((cap) => {
            cap.parentElement.removeChild(cap);
          });

          if (capitulo.contains(caja_serie_detalle)) {
            capitulo.removeChild(caja_serie_detalle);
          } else {
            const caja_detalle = document.createElement("div");
            let mostrar = `
                                    <a href='reproductor_series.html'>
                                        <img src="${serie.ChapterImg}"></img>
                                        <div>
                                            <div class="text-start">
                                                <p style="font-weight: 600">58 min 1998</p>
                                            </div>
                                            <div class="text-start">
                                                <p>${serie.Plot}</p>
                                            </div>
                                        </div>
                                    </a>
                                `;
            caja_detalle.innerHTML = mostrar;
            caja_detalle.classList.add("detalles_capitulo");
            capitulo.appendChild(caja_detalle);

            caja_serie_detalle = caja_detalle;
          }
        });
      }

      //---------------------CAPITULOS 992px-1200px---------------------
      capitulosGrandes();
    })
    .catch((error) => {
      console.log(error);
    });
}

temporadas();

select_temporadas.addEventListener("change", () => {
  grandes.innerHTML = "";
  capitulosGrandes();
});
