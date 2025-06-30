let carrito = [];
let total = 0;

// Carga los productos al DOM
function cargarProductosEnPantalla() {
  const contenedor = document.getElementById("lista-productos");

  productos.forEach((producto, index) => {
    const div = document.createElement("div");
    div.className = "producto";

    div.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.nombre}">
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

  // Buscar si ya está en el carrito
  const productoEnCarrito = carrito.find(item => item.nombre === producto.nombre);

  if (productoEnCarrito) {
    // Si ya está, sumamos 1 a la cantidad
    productoEnCarrito.cantidad += 1;
  } else {
    // Si no está, lo agregamos con cantidad 1
    carrito.push({ ...producto, cantidad: 1 });
  }

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
      <button onclick="eliminarDelCarrito(${index})">❌</button>
      ${item.cantidad} unidades de  ${item.nombre} de $${item.precio} = $${item.precio * item.cantidad}
      
      <button onclick="restarAlCarrito(${index})">➖</button>
      <button onclick="sumarAlCarrito(${index})">➕</button>
    `;
    ul.appendChild(li);
  });

  totalTexto.textContent = `Total a pagar: $${total}`;
}


// Elimina el producto específico del carrito
function eliminarDelCarrito(indice) {
  total -= carrito[indice].precio * carrito[indice].cantidad;
  carrito.splice(indice, 1);

  guardarCarritoEnLocalStorage();
  mostrarCarrito();
}


// Vacía todo el carrito
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
function sumarAlCarrito(indice) {
  carrito[indice].cantidad += 1;
  total += carrito[indice].precio;

  guardarCarritoEnLocalStorage();
  mostrarCarrito();
}
function restarAlCarrito(indice) {
  if (carrito[indice].cantidad > 1) {
    carrito[indice].cantidad -= 1;
    total -= carrito[indice].precio;
  } else {
    // Si llega a 1 y queremos restar, lo eliminamos del carrito
    total -= carrito[indice].precio;
    carrito.splice(indice, 1);
  }

  guardarCarritoEnLocalStorage();
  mostrarCarrito();
}
