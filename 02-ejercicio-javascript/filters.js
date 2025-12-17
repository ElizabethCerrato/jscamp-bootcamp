// 3 y 4) Filtrar resultados por ubicación, nivel de experiencia, tecnología.

//Datos
const divContenedorFiltros = document.querySelector(".filters");

const ubicacion = document.querySelector("#ubicacion");
const nivel = document.querySelector("#nivel");
const tecnologia = document.querySelector("#tech");

divContenedorFiltros.addEventListener("change", (e) => {
  e.preventDefault();
  //Ubicación
  const valorFiltroUbicacion = ubicacion.value;
  console.log(`valor ubicación ${valorFiltroUbicacion}`);
  //Nivel
  const valorFiltroNivel = nivel.value;
  console.log(`valor experiencia ${valorFiltroNivel}`);
  //Tecnologías
  const valorFiltroTecnologia = tecnologia.value;
  console.log(`valorFiltroTecnologia ${valorFiltroTecnologia}`);

  const jobs = Array.from(document.querySelectorAll(".job-listing-card"));

  jobs.forEach((job) => {
    const atributoModalidad = job.getAttribute("data-modalidad");
    const atributoNivel = job.getAttribute("data-nivel");
    const tecnologiasAtributo = job.getAttribute("data-tech");
    const arrTecnologias = tecnologiasAtributo.split(",");

    const mostrarUbicacion =
      atributoModalidad === valorFiltroUbicacion || valorFiltroUbicacion === "";
    const mostrarNivel =
      atributoNivel === valorFiltroNivel || valorFiltroNivel === "";

    const mostrarTecnologia =  arrTecnologias.includes(valorFiltroTecnologia) ||
      valorFiltroTecnologia === "";

    const mostrar = mostrarUbicacion && mostrarNivel && mostrarTecnologia;
    mostrar
      ? job.classList.remove("is-hidden")
      : job.classList.add("is-hidden");
  });

});

// 4) Filtrar los resultados de búsqueda por título.

const input = document.querySelector("input");

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
