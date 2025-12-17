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
    // Faltó la `s` en `jobs-listings`. Por eso no cargaban los datos 
    const elementoUl = document.querySelector(".jobs-listings");

    /* 
    createDocumentFragment() lo que hace es crear un contenedor en memoria que sirve para almacenar todos los elementos del DOM que queremos pintar.
    Para que sirve esto? Para evitar re dibujar el HTML cada vez que insertamos un elemento dentro del forEach. Lo que hacemos es: agregamos los elementos en el contenedor virtual, y una vez estén todos, pintamos de una sola vez lo que hay en el contenedor sobre el DOM.
    Esto mejora bastante el rendimiento, sobre todo cuando tenemos muchos elementos :)
    */
    const documentFragment = document.createDocumentFragment()

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
    documentFragment.appendChild(elementoLi);
    });
    elementoUl.appendChild(documentFragment);
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
