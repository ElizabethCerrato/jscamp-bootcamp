/*
      1)FETCH
      2)VALIDAR RESPUESTA
      3)PARSEAR CUERPO
      4)USAR DATOS
      5)MANEJAR DATOS
 */

fetch("./data.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Error en el fetch");
    }
    const ofertasDeTrabajo = response.json();
    return ofertasDeTrabajo;
  })

  .then((ofertasDeTrabajo) => {
    const elementoUl = document.querySelector(".jobs-listing");
    ofertasDeTrabajo.forEach((oferta) => {
      const elementoLi = document.createElement("li");
      const article = document.createElement("article");
      article.className = "job-listing-card";
      article.dataset.modalidad = oferta.data.modalidad;
      article.dataset.tech = oferta.data.technology;
      article.dataset.nivel = oferta.data.nivel;

  
      article.innerHTML = `
        <div class="job-header">
          <h3>${oferta.titulo}</h3>
          <small>${oferta.empresa} | ${normalizarCiudad(oferta.data.modalidad)}</small>
        <p>${oferta.descripcion}</p>
        </div>
        <button class="button-apply-job">Aplicar</button> 
    `;
    elementoLi.appendChild(article);
    elementoUl.appendChild(elementoLi);
    });
  })
  .catch((error) => {
    console.log("Error al mostrar los datos: ", error);
  });

  
function normalizarCiudad(ciudad) {
  if(ciudad === "cdmx") 
    return "Ciudad de México";
  else {
    const letraMayuscula = ciudad.slice(0, 1).toUpperCase();
    const ciudadNormalizada = letraMayuscula + ciudad.slice(1, ciudad.length);
    return ciudadNormalizada;
  }
}
