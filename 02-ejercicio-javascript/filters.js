// 3 y 4) Filtrar resultados por ubicación, nivel de experiencia, tecnología.

//Datos
/* 
Siempre que queramos evaluar el comportamiento de un input, select, o checkbox, es mejor hacerlo de manera individual. Esto nos da mas control.
Imagina que cambiamos el orden de los select dentro de `divContenedorFiltros`, o que agreguemos uno nuevo con una funcionalidad distinta. Esto generaría un error y habría que modificar el código dentro del `addEventListener`. Lo mejor es crear la funcionalidad, y aplicarla a los select que corresponden.
*/
// const divContenedorFiltros = document.querySelector(".search-filters");

/* Ya que estamos haciendo una selección por ID, podemos usar `getElementById` */
/* Además, los Ids que ingresaste no existen, vamos a cambiarlos por los correctos */
/* Agregamos un símbolo de $, simplemente para que visualmente entedamos que la variable almacena una referencia a elementos del DOM, y no valores como tal. Así cuando lo usemos, visualmente no nos genere confusiones. Usamos `$` pero puede ser cualquier otro indicador */
const $formulario = document.getElementById("empleos-search-form")
const $ubicacion = document.getElementById("filter-location");
const $nivel = document.getElementById("filter-experience-level");
const $tecnologia = document.getElementById("filter-technology");
const $buscador = document.getElementById("empleos-search-input")


/* Lo que queremos es que cada input y select filtre los resultados de búsqueda. Esto nos da la pauta de que podemos reutilizar una función que se encargue de eso. Así que crearemos una: */
function filtrarEmpleos() {
  const valorFiltroUbicacion = $ubicacion.value;
  const valorFiltroNivel = $nivel.value;
  const valorFiltroTecnologia = $tecnologia.value;

  // Aquí agregamos también el valor del `input`, que lo precisamos para hacer el filtrado
  // para compararlo mejor con el título de cada `job`. Lo pasamos a minúscula y sacamos los espacios en blanco
  // Sacar los espacios vacios tambien nos ayuda a que si el usuario ingresa únicamente eso, no se afecte el resultado
  const valorBuscador = $buscador.value.toLowerCase().trim()
  
  const $resultadosDeBusqueda = document.querySelectorAll(".job-listing-card")

  $resultadosDeBusqueda.forEach((job) => {
    const atributoModalidad = job.getAttribute("data-modalidad");
    const atributoNivel = job.getAttribute("data-nivel");
    const tecnologiasAtributo = job.getAttribute("data-tech");
    const arrTecnologias = tecnologiasAtributo.split(",");
    const titulo = job.querySelector("h3").textContent;

    const mostrarUbicacion =
      atributoModalidad === valorFiltroUbicacion || valorFiltroUbicacion === "";

    const mostrarNivel =
      atributoNivel === valorFiltroNivel || valorFiltroNivel === "";

    const mostrarTecnologia =  arrTecnologias.includes(valorFiltroTecnologia) ||
      valorFiltroTecnologia === "";

    const mostrarTitulo = titulo.toLowerCase().includes(valorBuscador) || valorBuscador === "";

    const mostrar = mostrarUbicacion && mostrarNivel && mostrarTecnologia && mostrarTitulo

    // podemos hacer un toogle
    /* mostrar
      ? job.classList.remove("is-hidden")
      : job.classList.add("is-hidden"); */

    job.classList.toggle("is-hidden", !mostrar)

  })
}

/* Ahora que ya tenemos la función que se encarga del filtrado, solo queda aplicarla a nuestros selects e input */

$ubicacion.addEventListener("change", filtrarEmpleos);
$nivel.addEventListener("change", filtrarEmpleos);
$tecnologia.addEventListener("change", filtrarEmpleos);
$buscador.addEventListener("input", filtrarEmpleos);

// Como agregado extra, si queremos evitar que la pagina se recargue cada vez que introducimos un cambio en el formulario y le damos a `enter`. Lo que podemos hacer es desactivar su comportamiento por defecto :)
$formulario.addEventListener("submit", (evt) => evt.preventDefault())

// 4) Filtrar los resultados de búsqueda por título.

// Esto lo quitamos por lo siguiente:
// Si manejamos el filtrado por separado, los resultados no se van a complementar. Es decir:
// Filtramos por el input, o filtramos por los select, en ambos caminos obteniendo resultados distintos y no manteniendo los valores que seleccionamos en los otros campos.
// Habiendo integrado todo en la misma función, puedo por ejemplo filtrar por `trabajo remoto`, y a partir de esos resultados, consultar desde el input, no perdiendo el filtro de `trabajo remoto`.

/* const input = document.querySelector("input");

input.addEventListener("input", () => {
  const valorIntroducido = input.value;
  console.log(valorIntroducido);
  const jobs = Array.from(document.querySelectorAll(".job-listing-card"));
  jobs.forEach((job) => {
    const titulo = job.querySelector("h3").textContent;
    const mostrar = titulo
      .toLowerCase()
      .includes(valorIntroducido.toLowerCase());
    console.log(mostrar);

    job.classList.toggle("is-hidden", !mostrar);
  });
});
 */