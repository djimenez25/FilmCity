const caja_mostrar_peliculas = document.querySelector(".peliculas_catalogo");
let caja_info;

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
                    "Titulo": pelicula.Title,
                    "TG": pelicula.Rated, 
                    "Time": pelicula.Runtime, 
                    "Genero": pelicula.Genre
                });

                console.log(datos);

                const caja_informacion = document.createElement("div");
                let mostrar_informacion = `
                                            <div>
                                                <img src="${pelicula.Poster}"></img>
                                            </div
                                            <div>
                                                <p>${pelicula.Rated}</p>
                                                <p>${pelicula.Runtime}</p>
                                            </div>
                                            <div>
                                                <p>${pelicula.Genre}</p>
                                            </div>
                                        `;
                caja_informacion.innerHTML=mostrar_informacion;
                caja_informacion.classList.add("detalles");
                caja_pelicula.appendChild(caja_informacion);  

                caja_info = caja_informacion;                
            });
            
            caja_pelicula.addEventListener("mouseleave", ()=>{
                caja_pelicula.removeChild(caja_info);
            });

        });

    }).catch((error)=>{
        console.log(error);
    });

}

leerPeliculas();