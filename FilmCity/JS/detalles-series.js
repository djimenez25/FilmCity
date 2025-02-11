const select_temporadas = document.getElementById("temporadas_serie");
const pequeños = document.getElementById("capitulos_pequeños");
let serie;

function temporadas(){

    fetch("JS/peliculas-series.json", {
    }).then((response)=>{
        return response.json();
    }).then((datos)=>{
        const series = datos.series;

        //Pillamos la serie de Los Soprano
        for (let index = 0; index < series.length; index++) {
            if(index==1){
                serie = series[index];                
            }
        }

        //---------------------OPTIONS---------------------
        const temporadas = serie.totalSeasons;
        for (let i = 1; i <= temporadas; i++) {
            const option_temporada = document.createElement("option");
            option_temporada.textContent = 'Temporada '+i;
            option_temporada.value=i;
            option_temporada.classList.add="options_select";

            select_temporadas.appendChild(option_temporada);
        }

        //---------------------CAPITULOS---------------------
        for (let i = 0; i < temporadas; i++) {
            const capitulo = document.createElement("div");
            let mostrar = `<p>E${i}: Los Soprano</p>`;
            capitulo.innerHTML=mostrar;
            capitulo.classList.add("capitulo_pequeño");

            pequeños.appendChild(capitulo);

            capitulo.addEventListener("click", ()=>{
                
            });
            
        }

    }).catch((error)=>{
        console.log(error);
    })

}

temporadas();