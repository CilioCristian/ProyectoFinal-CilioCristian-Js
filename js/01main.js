//definimos variables
let productos = [];
let carrito = [];
let total = 0;

// Esperamos que se cargue todo el HTML antes de hacer nada
document.addEventListener("DOMContentLoaded", () => {
  // Traemos los productos que están guardados en el archivo JSON
  fetch('../data/productos.json')
    .then(res => res.json())
    .then(data => {
      // Guardamos esos productos en la variable global para usarlos después
      productos = data;
      // Mostramos los productos en la pantalla
      cargarProductosEnPantalla();
      // Cargamos del localStorage el carrito que ya tenía el usuario (si es que había algo)
      cargarCarritoDesdeLocalStorage();
      // Le agregamos funcionalidad a los botones de vaciar carrito y finalizar compra
      document.getElementById("vaciarCarrito").addEventListener("click", vaciarCarrito);
      document.getElementById("finalizarCompra").addEventListener("click", finalizarCompra);
    })
    // Si falla al traer el JSON, mostramos el error en la consola
    .catch(error => console.error('Error al cargar productos:', error));
});
// Esperamos que se cargue todo el HTML antes de correr el script
document.addEventListener("DOMContentLoaded", () => {
  // Obtenemos los botones que van a activar los michis
  const btnIzquierda = document.getElementById("activarIzquierda");
  const btnDerecha = document.getElementById("activarDerecha");
  // Seleccionamos las dos imágenes de los gatos
  const imagenes = document.querySelectorAll(".michi_compania");
  // Cuando se toca el botón de la izquierda:
  btnIzquierda.addEventListener("click", () => {
    imagenes[0].style.display = "block"; // mostramos la imagen
    btnIzquierda.style.display = "none"; // ocultamos el botón
    // Mostramos un toast que avisa que se activó el gato
    Toastify({
      text: "Ascesor gatuno activado ✅",
      duration: 2000,
      gravity: "bottom",
      position: "left",
      backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
    }).showToast();
  });
  // Lo mismo para el botón de la derecha:
  btnDerecha.addEventListener("click", () => {
    imagenes[1].style.display = "block";
    btnDerecha.style.display = "none";
    Toastify({
      text: "Ascesor gatuno activado ✅",
      duration: 2000,
      gravity: "bottom",
      position: "right",
      backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
    }).showToast();
  });
});
