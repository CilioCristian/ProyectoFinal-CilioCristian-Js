let productos = [];
let carrito = [];
let total = 0;

document.addEventListener("DOMContentLoaded", () => {
  fetch('../data/productos.json')
    .then(res => res.json())
    .then(data => {
      productos = data;
      cargarProductosEnPantalla();
      cargarCarritoDesdeLocalStorage();

      document.getElementById("vaciarCarrito").addEventListener("click", vaciarCarrito);
      document.getElementById("finalizarCompra").addEventListener("click", finalizarCompra);
    })
    .catch(error => console.error('Error al cargar productos:', error));
});
