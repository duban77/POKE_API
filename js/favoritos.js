function mostrarFavoritos() {
    const app = document.getElementById("app"); // Obtiene el contenedor principal de la aplicación
    app.innerHTML = ""; // Limpia el contenido de la aplicación

    const contenedor = document.createElement("section"); // Crea una nueva sección para mostrar los favoritos
    contenedor.classList.add("c-lista"); // Aplica la clase "c-lista" para el estilo de la lista

    contenedor.innerHTML = generarLista(favoritos); // Llama a la función generarLista para mostrar los Pokémon favoritos

    app.appendChild(contenedor); // Agrega la sección de favoritos al DOM
}
