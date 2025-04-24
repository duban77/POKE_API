function mostrarLista(pokemones) {
    const app = document.getElementById("app"); // Obtiene el contenedor principal de la aplicación
    app.innerHTML = ""; // Limpia el contenido de la aplicación

    const seccion = document.createElement("section"); // Crea una nueva sección donde se listarán los Pokémon
    seccion.classList.add("c-lista"); // Aplica la clase "c-lista" para el estilo de la lista

    // Crea un input para buscar Pokémon por nombre o ID
    const buscador = document.createElement("input");
    buscador.classList.add("c-buscador"); // Aplica una clase para los estilos
    buscador.type = "text";
    buscador.placeholder = "Buscar Pokémon..."; // Muestra este texto como sugerencia
    buscador.addEventListener("input", (evento) => buscarPoke(evento, pokemones)); // Escucha cambios en el input y ejecuta la función buscarPoke

    // Crea los botones de filtro por tipo de Pokémon
    const tipos = [
        "All", "normal", "fighting", "flying", "poison", "ground", "rock",
        "bug", "ghost", "steel", "fire", "water", "grass", "electric",
        "psychic", "ice", "dragon", "dark", "fairy", "stellar", "shadow", "unknown"
    ];

    let listaTipos = "";
    for (let i = 0; i < tipos.length; i++) {
        listaTipos += `<button onclick="filtrarPorTipo('${tipos[i]}')">${tipos[i]}</button>`; // Crea botones para cada tipo de Pokémon
    }

    const filtro = document.createElement("div"); // Crea un contenedor para los filtros
    filtro.classList.add("filtro"); // Aplica una clase para los estilos
    filtro.innerHTML = listaTipos; // Asigna los botones de tipo al contenedor de filtros

    // Genera la lista de Pokémon inicial
    seccion.innerHTML = generarLista(pokemones); // Llama a la función para generar la lista de Pokémon

    // Agrega el buscador, el filtro y la lista al DOM
    app.appendChild(buscador);
    app.appendChild(filtro);
    app.appendChild(seccion);
}

function generarLista(pokemones) {
    let listaHTML = ""; // Inicializa una variable para el HTML de la lista de Pokémon
    for (let i = 0; i < pokemones.length; i++) {
        let id = pokemones[i].url.split("/")[6]; // Extrae el ID del Pokémon de la URL
        listaHTML += `
        <div class="c-lista-pokemon poke-${id}" onclick="mostrarDetalle('${id}')">
            <p>#${id}</p>
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png" width="auto" height="60" loading="lazy" alt="${pokemones[i].name}">
            <p>${pokemones[i].name}</p>
        </div>`; // Crea un div con la imagen, el nombre y el ID del Pokémon
    }

    return listaHTML; // Devuelve el HTML generado
}

function buscarPoke(evento, pokemones) {
    const texto = evento.target.value.toLowerCase(); // Obtiene el texto ingresado en el input y lo convierte a minúsculas
    if (texto.length >= 3 && isNaN(texto)) {
        // Si el texto tiene al menos 3 caracteres y no es un número
        const listaFiltrada = pokemones.filter((pokemon) => pokemon.name.includes(texto)); // Filtra los Pokémon por nombre
        document.querySelector(".c-lista").innerHTML = generarLista(listaFiltrada); // Muestra la lista filtrada
    }

    if (!isNaN(texto)) {
        // Si el texto es un número (ID del Pokémon)
        const listaFiltrada = pokemones.filter((pokemon) => pokemon.url.includes("/" + texto)); // Filtra por ID
        document.querySelector(".c-lista").innerHTML = generarLista(listaFiltrada); // Muestra la lista filtrada
    }

    if (texto.length === 0) {
        // Si el campo de búsqueda está vacío, muestra todos los Pokémon
        document.querySelector(".c-lista").innerHTML = generarLista(pokemones);
    }
}

async function filtrarPorTipo(untipo) {
    if (untipo == "All") {
        conexionLista(); // Si el tipo es "All", muestra todos los Pokémon
    } else {
        try {
            // Si el tipo no es "All", consulta la API para obtener los Pokémon de ese tipo
            const respuesta = await fetch(`https://pokeapi.co/api/v2/type/${untipo}`);
            const datos = await respuesta.json();
    
            const pokemonesFiltrados = datos.pokemon.map(p => p.pokemon); // Extrae los Pokémon del tipo seleccionado
    
            mostrarLista(pokemonesFiltrados); // Muestra la lista filtrada por tipo
        } catch (error) {
            console.error("Error al filtrar por tipo:", error);
            document.getElementById("app").innerHTML = `<p>Error al cargar Pokémon de tipo "${untipo}".</p>`; // Muestra un mensaje de error si algo falla
        }
    }
}
