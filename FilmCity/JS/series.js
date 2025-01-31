const caja_mostrar_series = document.querySelector(".series_catalogo");

function leerSeries(){

    fetch("JS/peliculas-series.json", {
    }).then((response)=>{
        return response.json();
    }).then((datos)=>{
        const series = datos.series;
        series.forEach(serie => {
            const caja_serie = document.createElement("div");
            let mostrar = `
                            <img src="${serie.Poster}"></img>
                        `;
            caja_serie.innerHTML=mostrar;
            caja_serie.classList.add("bottom");
            caja_mostrar_series.appendChild(caja_serie);

            caja_serie.addEventListener("mouseenter", () => {
                const datos = [];
                //Guardamos los datos de la serie en un array
                datos.push({
                    "Titulo": serie.Title,
                    "Temporadas": serie.totalSeasons, 
                    "Rated": serie.Rated, 
                    "Genero": serie.Genre
                });

                console.log(datos);
            });

        });

    }).catch((error)=>{
        console.log(error);
    });

}

leerSeries();