const caja_mostrar_peliculas = document.querySelector(".peliculas_catalogo");

function leerPeliculas(){

    fetch("JS/peliculas-series.json", {
    }).then((response)=>{
        return response.json();
    }).then((datos)=>{
        const peliculas = datos.peliculas;
        peliculas.forEach(pelicula => {
            const caja_pelicula = document.createElement("div");
            let mostrar = `
                            <img src="${pelicula.Poster}"></img>
                        `;
            caja_pelicula.innerHTML=mostrar;
            caja_pelicula.classList.add("bottom");
            caja_mostrar_peliculas.appendChild(caja_pelicula);

            caja_pelicula.addEventListener("mouseenter", () => {
                const datos = [];
                //Guardamos los datos de la peli en un array
                datos.push({
                    "TG": pelicula.Rated, 
                    "Time": pelicula.Runtime, 
                    "Genero": pelicula.Genre
                });

                console.log(datos);
            });

        });

    }).catch((error)=>{
        console.log(error);
    });

}

leerPeliculas();