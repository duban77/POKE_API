// Inicialización de favoritos desde localStorage
let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
// **Explicación**: Recupera la lista de Pokémon favoritos almacenada en `localStorage`. Si no hay ningún valor guardado, se inicializa como un array vacío `[]`.


// Función para agregar o quitar de favoritos
const toggleFavorito = (id, nombre) => {
    id = Number(id); 
    // **Explicación**: Convierte el `id` a un número, asegurándose de que esté en el tipo adecuado para realizar comparaciones numéricas.

    const esFavorito = favoritos.some(pokemon => Number(pokemon.id) === id);
    // **Explicación**: Verifica si el Pokémon con el `id` proporcionado ya está en la lista de favoritos utilizando el método `some()`. Devuelve `true` si el Pokémon ya es favorito.

    if (esFavorito) {
        // **Explicación**: Si el Pokémon ya es favorito, entra en este bloque para eliminarlo de la lista de favoritos.

        favoritos = favoritos.filter(p => Number(p.id) !== id);
        // **Explicación**: Filtra el array `favoritos` y elimina el Pokémon cuyo `id` coincida con el proporcionado.

        document.getElementById(`corazon-${id}`).textContent = '🤍';
        // **Explicación**: Cambia el icono del corazón a blanco (🤍), indicando que ya no es un favorito.

    } else {
        // **Explicación**: Si el Pokémon no es favorito, entra en este bloque para agregarlo a la lista de favoritos.

        favoritos.push({ 
            id, 
            nombre, 
            url: `https://pokeapi.co/api/v2/pokemon/${id}/` 
        });
        // **Explicación**: Añade el Pokémon a la lista de favoritos, incluyendo el `id`, `nombre` y la `url` del Pokémon.

        document.getElementById(`corazon-${id}`).textContent = '❤️';
        // **Explicación**: Cambia el icono del corazón a rojo (❤️), indicando que el Pokémon ahora es un favorito.
    }

    // Guardar favoritos en localStorage
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
    // **Explicación**: Guarda la lista actualizada de favoritos en `localStorage` como una cadena JSON.
};

// Función para actualizar el icono del corazón
const actualizarIconoFavorito = (id) => {
    id = Number(id);
    // **Explicación**: Convierte el `id` a un número, asegurándose de que esté en el tipo adecuado para realizar comparaciones numéricas.

    const corazonIcono = document.getElementById(`corazon-${id}`);
    // **Explicación**: Obtiene el elemento con el ID `corazon-${id}`, que es el icono del corazón asociado con el Pokémon.

    if (!corazonIcono) return;
    // **Explicación**: Si el icono del corazón no existe (por alguna razón), sale de la función sin hacer nada.

    if (favoritos.some(pokemon => Number(pokemon.id) === id)) {
        corazonIcono.textContent = '❤️';
        // **Explicación**: Si el Pokémon está en la lista de favoritos, cambia el icono a rojo (❤️).
    } else {
        corazonIcono.textContent = '🤍';
        // **Explicación**: Si el Pokémon no está en la lista de favoritos, cambia el icono a blanco (🤍).
    }
};

// Función para mostrar los detalles de un Pokémon
async function mostrarDetalle(id) {
    id = Number(id);
    // **Explicación**: Convierte el `id` a un número, asegurándose de que esté en el tipo adecuado para realizar comparaciones numéricas.

    const res = await fetch('https://pokeapi.co/api/v2/pokemon/' + id);
    // **Explicación**: Realiza una solicitud `fetch` a la API de Pokémon para obtener los detalles del Pokémon con el `id` proporcionado.

    const data = await res.json();
    // **Explicación**: Convierte la respuesta de la API a formato JSON, obteniendo todos los datos del Pokémon.

    let tipoPoke = "";
    // **Explicación**: Inicializa una variable vacía para almacenar los tipos del Pokémon.

    for (let i = 0; i < data.types.length; i++) {
        tipoPoke += `<span>${data.types[i].type.name}</span>`;
        // **Explicación**: Recorre los tipos del Pokémon y los agrega a la variable `tipoPoke` como elementos `span`.
    }

    const app = document.getElementById("app");
    // **Explicación**: Obtiene el contenedor principal con el ID `app` donde se mostrarán los detalles.

    const esFavorito = favoritos.some(pokemon => Number(pokemon.id) === id);
    // **Explicación**: Verifica si el Pokémon con el `id` proporcionado ya está en la lista de favoritos.

    const detalle = `
    <section class="c-detalle">
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png" alt="${data.name}" height="120" width="auto">
        <p>${data.name}</p>
        <p>${data.id}</p>
        <p>${tipoPoke}</p>
        <p>Altura: ${data.height / 10} m / Peso: ${data.weight / 10} km</p>
        <p>hp: ${data.stats[0].base_stat}</p>
        <p>Velocidad: ${data.stats[5].base_stat}</p>
        <p>Ataque: ${data.stats[1].base_stat} Defensa: ${data.stats[2].base_stat}</p>
        <p>Ataque Especial: ${data.stats[3].base_stat} Defensa Especial: ${data.stats[4].base_stat}</p>

        <button id="favorito-btn-${id}" onclick="toggleFavorito(${id}, '${data.name}')">
            <span id="corazon-${id}" class="corazon">${esFavorito ? '❤️' : '🤍'}</span> Favorito
        </button>
    </section>
    `;
    // **Explicación**: Crea una plantilla HTML con todos los detalles del Pokémon, incluyendo su imagen, nombre, ID, tipos, estadísticas, y un botón para marcarlo como favorito.

    app.innerHTML = detalle;
    // **Explicación**: Reemplaza el contenido del contenedor principal con los detalles del Pokémon.

    actualizarIconoFavorito(id);
    // **Explicación**: Llama a la función `actualizarIconoFavorito` para asegurarse de que el icono de corazón esté actualizado según si el Pokémon es favorito o no.
}
