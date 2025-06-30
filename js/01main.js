document.addEventListener("DOMContentLoaded", () => {
  cargarProductosEnPantalla();
  cargarCarritoDesdeLocalStorage();
 
  document.getElementById("vaciarCarrito").addEventListener("click", vaciarCarrito);
  document.getElementById("finalizarCompra").addEventListener("click", finalizarCompra); 
});