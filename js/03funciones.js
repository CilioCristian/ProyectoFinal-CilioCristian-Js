let carrito = [];
let total = 0;

// Carga los productos al DOM
function cargarProductosEnPantalla() {
  const contenedor = document.getElementById("lista-productos");

  productos.forEach((producto, index) => {
    const div = document.createElement("div");
    div.className = "producto";

    div.innerHTML = `
      <h3>${producto.nombre}</h3>
      <p>Precio: $${producto.precio}</p>
      <button onclick="agregarAlCarrito(${index})">Agregar al carrito</button>
    `;

    contenedor.appendChild(div);
  });
}

// Agrega el producto al carrito
function agregarAlCarrito(indice) {
  const producto = productos[indice];
  carrito.push(producto);
  total += producto.precio;

  guardarCarritoEnLocalStorage();
  mostrarCarrito();
}

// Muestra el carrito en el DOM
function mostrarCarrito() {
  const ul = document.getElementById("items-carrito");
  const totalTexto = document.getElementById("total");

  ul.innerHTML = "";
  carrito.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${item.nombre} - $${item.precio}
      <button onclick="eliminarDelCarrito(${index})">❌</button>
    `;
    ul.appendChild(li);
  });

  totalTexto.textContent = `Total a pagar: $${total}`;
}

// Elimina el producto específico del carrito
function eliminarDelCarrito(indice) {
  total -= carrito[indice].precio;
  carrito.splice(indice, 1);

  guardarCarritoEnLocalStorage();
  mostrarCarrito();
}

// Vacia todo el carrito
function vaciarCarrito() {
  carrito = [];
  total = 0;

  guardarCarritoEnLocalStorage();
  mostrarCarrito();
}

// Finaliza compra
function finalizarCompra() {
  if (carrito.length === 0) {
    alert("El carrito está vacío.");
    return;
  }

  alert(`¡Gracias por tu compra! Total: $${total}`);
  vaciarCarrito();
}

// LocalStorage
function guardarCarritoEnLocalStorage() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
  localStorage.setItem("total", total);
}

function cargarCarritoDesdeLocalStorage() {
  const carritoGuardado = localStorage.getItem("carrito");
  const totalGuardado = localStorage.getItem("total");

  if (carritoGuardado) {
    carrito = JSON.parse(carritoGuardado);
    total = parseFloat(totalGuardado);
    mostrarCarrito();
  }
}