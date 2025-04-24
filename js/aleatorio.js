// Inicialización de la lista de números (Pokémon) desde localStorage
var misNumeros = JSON.parse(localStorage.getItem("misNumeros")) || [];
// **Explicación**: Intenta obtener la lista `misNumeros` almacenada en `localStorage`. Si no hay nada guardado, se inicializa como un array vacío `[]`.

// Función para mostrar 4 Pokémon aleatorios
function mostrarAleatorio(pokemones) {
    const app = document.getElementById("app");
    // **Explicación**: Obtiene el contenedor con el ID `app`, que es donde se mostrará el contenido generado por esta función.

    let pokesAleatorios = '<section class="c-aleatorio c-lista">';
    // **Explicación**: Inicia una cadena de HTML para construir la sección donde se mostrarán los Pokémon aleatorios.

    for (let i = 0; i < 4; i++) {
        // **Explicación**: Repite el proceso 4 veces para mostrar 4 Pokémon aleatorios.

        let num = Math.floor(Math.random() * totalPokes) + 1;
        // **Explicación**: Genera un número aleatorio entre 1 y `totalPokes` (presumiblemente el total de Pokémon disponibles en la API o base de datos).

        /* validación de número repetido */
        let repetido = false;
        // **Explicación**: Inicializa una variable `repetido` en `false`, que se usará para verificar si el número ya ha sido seleccionado.

        for (let x = 0; x < misNumeros.length; x++) {
            if (misNumeros[x] === num) {
                repetido = true;
                break;
            }
        }
        // **Explicación**: Recorre la lista `misNumeros` y verifica si el número generado ya está en la lista. Si es así, establece `repetido = true` y sale del ciclo.

        if (!repetido) {
            misNumeros.push(num);
            // **Explicación**: Si el número no está repetido, lo agrega a la lista `misNumeros`.

            localStorage.setItem("misNumeros", JSON.stringify(misNumeros));
            // **Explicación**: Guarda la lista actualizada de números en `localStorage` para persistirla entre recargas de página.
        }
        /* validación de número repetido */

        // **Explicación**: Crea el HTML para mostrar un Pokémon con el número aleatorio generado.
        pokesAleatorios += `
        <div class="c-lista-pokemon c-un_aleatorio">
            <p>${num}</p>
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${num}.png" alt="${pokemones[num - 1].name}" width="60" height="60">
            <p>${pokemones[num - 1].name}</p>
        </div>`;
    }

    pokesAleatorios += "</section>";
    // **Explicación**: Cierra la etiqueta `section` que contiene los Pokémon aleatorios.

    app.innerHTML = pokesAleatorios;
    // **Explicación**: Inserta el HTML generado en el contenedor con el ID `app`, actualizando la vista en la página.
}
