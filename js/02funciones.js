// Carga todos los productos en la pantalla (los muestra en el HTML)
function cargarProductosEnPantalla() {
  const contenedor = document.getElementById("lista-productos");

  // Recorremos la lista de productos y por cada uno armamos un div con su info
  productos.forEach((producto, index) => {
    const div = document.createElement("div");
    div.className = "producto";

    // Ponemos imagen, nombre, precio y botón para agregar al carrito
    div.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.nombre}">
      <h3>${producto.nombre}</h3>
      <p>Precio: $${producto.precio}</p>
      <button onclick="agregarAlCarrito(${index})">Agregar al carrito</button>
    `;

    contenedor.appendChild(div); // Lo agregamos al contenedor en el HTML
  });
}

// Función que se ejecuta cuando apretamos "Agregar al carrito"
function agregarAlCarrito(indice) {
  const producto = productos[indice];

  // Vemos si ese producto ya está en el carrito
  const productoEnCarrito = carrito.find(item => item.nombre === producto.nombre);

  if (productoEnCarrito) {
    // Si ya estaba, le sumamos 1 a la cantidad
    productoEnCarrito.cantidad += 1;
  } else {
    // Si no estaba, lo agregamos al carrito con cantidad 1
    carrito.push({ ...producto, cantidad: 1 });
  }

  // Sumamos el precio de ese producto al total
  total += producto.precio;

  // Guardamos el carrito actualizado en localStorage
  guardarCarritoEnLocalStorage();

  // Volvemos a mostrar el carrito en pantalla actualizado
  mostrarCarrito();

  // Mostramos un toast avisando que se agregó al carrito
  Toastify({
    text: `Agregado: ${producto.nombre} 🛒`,
    duration: 2000,
    gravity: "top",
    position: "right",
    backgroundColor: "linear-gradient(to right, #00c6ff, #0072ff)",
  }).showToast();
}
// Muestra en pantalla todos los productos que hay en el carrito
function mostrarCarrito() {
  const ul = document.getElementById("items-carrito");
  const totalTexto = document.getElementById("total");

  ul.innerHTML = ""; // Vaciamos el listado para volver a llenarlo
  carrito.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <button onclick="eliminarDelCarrito(${index})">❌</button>
      ${item.cantidad} unidades de ${item.nombre} de $${item.precio} = $${item.precio * item.cantidad}
      <button onclick="restarAlCarrito(${index})">➖</button>
      <button onclick="sumarAlCarrito(${index})">➕</button>
    `;
    ul.appendChild(li); // Agregamos el producto al listado del carrito
  });

  // Actualizamos el total que se muestra abajo
  totalTexto.textContent = `Total a pagar: $${total}`;
}

// Elimina un producto puntual del carrito (por índice)
function eliminarDelCarrito(indice) {
  // Restamos del total el precio por la cantidad que tenía
  total -= carrito[indice].precio * carrito[indice].cantidad;

  // Lo sacamos del array carrito
  carrito.splice(indice, 1);

  // Guardamos cambios y actualizamos la vista
  guardarCarritoEnLocalStorage();
  mostrarCarrito();

  // Mostramos un toast avisando que se eliminó
  Toastify({
    text: "Producto eliminado del carrito ❌",
    duration: 2000,
    gravity: "top",
    position: "right",
    backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)",
  }).showToast();
}

// Vacía por completo el carrito
function vaciarCarrito() {
  carrito = [];  // Dejamos el carrito vacío
  total = 0;     // Ponemos el total en 0

  guardarCarritoEnLocalStorage();
  mostrarCarrito();

  // Mostramos toast avisando que se vació
  Toastify({
    text: "Carrito vaciado con éxito 🗑️",
    duration: 3000,
    gravity: "top",
    position: "right",
    backgroundColor: "linear-gradient(to right, #ff416c, #ff4b2b)",
  }).showToast();

  // Actualizamos las imágenes de los gatos, pero solo si están visibles
  const imagenes = document.querySelectorAll(".michi_compania");
  imagenes.forEach(img => {
    if (getComputedStyle(img).display !== "none") {
      actualizarImagenGato(img);
    }
  });
}
// Función para actualizar la imagen del michi con una nueva de la API
function actualizarImagenGato(imagenElement) {
  fetch('https://api.thecatapi.com/v1/images/search')
    .then(res => res.json())
    .then(data => {
      if (data && data[0] && data[0].url) {
        imagenElement.src = data[0].url; // ponemos la nueva imagen
      }
    })
    .catch(err => console.error("error al iniciar al ascesor gatuno", err));
}

// Finaliza la compra: revisa si el carrito está vacío, muestra un toast y vacía todo
function finalizarCompra() {
  if (carrito.length === 0) {
    Toastify({
      text: "El carrito está vacío 🚫",
      duration: 3000,
      gravity: "top",
      position: "right",
      backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)",
    }).showToast();
    return;
  }

  // Si hay productos, agradecemos la compra y vaciamos el carrito
  Toastify({
    text: `¡Gracias por tu compra! Total: $${total} 🛒`,
    duration: 4000,
    gravity: "top",
    position: "center",
    backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
  }).showToast();

  vaciarCarrito();
}

// Guarda el carrito y el total en localStorage para que no se pierdan
function guardarCarritoEnLocalStorage() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
  localStorage.setItem("total", total);
}

// Carga el carrito guardado de localStorage (si existe) y lo muestra
function cargarCarritoDesdeLocalStorage() {
  const carritoGuardado = localStorage.getItem("carrito");
  const totalGuardado = localStorage.getItem("total");

  if (carritoGuardado) {
    carrito = JSON.parse(carritoGuardado);
    total = parseFloat(totalGuardado);
    mostrarCarrito();
  }
}

// Suma 1 a la cantidad del producto en el carrito y actualiza todo
function sumarAlCarrito(indice) {
  carrito[indice].cantidad += 1;
  total += carrito[indice].precio;

  guardarCarritoEnLocalStorage();
  mostrarCarrito();

  Toastify({
    text: `+1 ${carrito[indice].nombre}`,
    duration: 1500,
    gravity: "top",
    position: "right",
    backgroundColor: "linear-gradient(to right, #4facfe, #00f2fe)",
  }).showToast();
}

// Resta 1 a la cantidad o elimina el producto si llega a 0
function restarAlCarrito(indice) {
  if (carrito[indice].cantidad > 1) {
    carrito[indice].cantidad -= 1;
    total -= carrito[indice].precio;

    Toastify({
      text: `-1 ${carrito[indice].nombre}`,
      duration: 1500,
      gravity: "top",
      position: "right",
      backgroundColor: "linear-gradient(to right, #ff9966, #ff5e62)",
    }).showToast();
  } else {
    // Si solo queda uno, lo sacamos del carrito completamente
    total -= carrito[indice].precio;
    const productoEliminado = carrito[indice].nombre;
    carrito.splice(indice, 1);

    Toastify({
      text: `Eliminado: ${productoEliminado}`,
      duration: 2000,
      gravity: "top",
      position: "right",
      backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)",
    }).showToast();
  }

  guardarCarritoEnLocalStorage();
  mostrarCarrito();
}

const URL = 'https://api.thecatapi.com/v1/images/search';
fetch(URL)
  .then(res => res.json())
  .then(data => {
    const imgs = document.querySelectorAll(".michi_compania");
    imgs.forEach((img, index) => {
      fetch(URL)
        .then(res => res.json())
        .then(data => {
          img.src = data[0].url;
        });
    });
  });
