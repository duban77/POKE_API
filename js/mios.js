function mostrarMios() {
    const app = document.getElementById("app"); // Obtiene el contenedor principal de la aplicación
    app.innerHTML = ""; // Limpia cualquier contenido previo del contenedor

    const seccion = document.createElement("section"); // Crea una nueva sección para mostrar los Pokémon
    seccion.classList.add("c-lista"); // Aplica la clase "c-lista" para el estilo de lista
    seccion.classList.add("c-mios"); // Aplica la clase "c-mios" para el estilo de esta sección en particular

    let misPokes = ""; // Inicializa una variable para almacenar el HTML de los Pokémon que se mostrarán

    // Itera sobre todos los números de Pokémon (de 1 a totalPokes-1)
    for (let i = 1; i < totalPokes; i++) {
        // Si el número de Pokémon está en la lista de "misNumeros"
        if (misNumeros.includes(i)) {
            // Crea un div para mostrar este Pokémon como uno que el usuario tiene
            misPokes += `
            <div class="c-unpoke c-mios-pokemon poke-${i}" onclick="mostrarDetalle('${i}')">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${i}.png" width="auto" height="45" loading="lazy" alt="${i}">
                <p>${i}</p>
            </div>`;
        } else {
            // Si no está en "misNumeros", lo muestra como un Pokémon que no tiene
            misPokes += `
            <div class="c-unpoke">
                <p>${i}</p>
            </div>
            `;
        }
    }

    // Asigna el HTML generado de los Pokémon a la sección
    seccion.innerHTML = misPokes;

    // Crea un contador que muestra cuántos Pokémon tiene el usuario
    let contador = document.createElement("p");
    contador.textContent = `${misNumeros.length} / ${totalPokes}`;

    // Añade el contador y la sección con los Pokémon al contenedor principal
    app.appendChild(contador);
    app.appendChild(seccion);
}
