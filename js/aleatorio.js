var misNumeros = JSON.parse(localStorage.getItem("misNumeros")) || [];

function mostrarAleatorio(pokemones) {
    const app = document.getElementById("app");

    let pokesAleatorios = '<section class="c-aleatorio c-lista">';

    for (let i = 0; i < 4; i++) {
        let num = Math.floor(Math.random() * totalPokes) + 1;

        /* validacion numero repetido */
        let repetido = false;
        for(let x = 0; x < misNumeros.length; x++){
            if(misNumeros[x] === num){
                repetido = true;
                break;
            }
        }
        if (!repetido) {
            misNumeros.push(num);
            localStorage.setItem("misNumeros", JSON.stringify(misNumeros));
        }
        /* validacion numero repetido */
        pokesAleatorios += `
        <div class="c-lista-pokemon c-un_aleatorio">
            <p>${num}</p>
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${num}.png" alt="${pokemones[num - 1].name}" width="60" height="60">
            <p>${pokemones[num - 1].name}</p>
        </div>`;
    }

    pokesAleatorios += "</section>";


    app.innerHTML = pokesAleatorios;
}
