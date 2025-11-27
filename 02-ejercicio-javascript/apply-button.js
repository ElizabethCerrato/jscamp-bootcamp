const elementoUl = document.querySelector(".jobs-listing");

elementoUl.addEventListener("click", (e) => {
  const botonAplicar = e.target.closest(".button-apply-job");
  console.log(botonAplicar);
  if(botonAplicar) {
    botonAplicar.classList.add("button-applyed");
    botonAplicar.textContent = "¡Aplicado!";
    botonAplicar.disabled = true;
  }

});