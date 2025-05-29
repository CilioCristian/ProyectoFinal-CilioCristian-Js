let carrito = [];
let total = 0;

function mostrarProductos() 
{
    let lista = "¿Cual de nuestro potes estas buscando? eleji uno: \n";
    for (let i = 0; i < productos.length; i++) {
        lista += `${i + 1}. ${productos[i].nombre} - $${productos[i].precio}\n`;
    }
    return prompt(lista + "Ingresá el número del producto:");
}

function iniciarSimulador()
    {   
    alert("Bienvenido a Onlyplast");
    let comprar = confirm("¿Querés comprar algo?");
    while (comprar) 
        {
        let opcion = parseInt(mostrarProductos());
        if (opcion >= 1 && opcion <= productos.length) 
            {
            let productoElegido = productos[opcion - 1];
            carrito.push(productoElegido);
            total += productoElegido.precio;
            alert(`Agregaste ${productoElegido.nombre} al carrito.`);
            console.log(`Carrito actual:`, carrito);
            } else 
                {
                alert("Opción inválida. Probá otra vez con alguno de los numeros de la lista.");
                }

        comprar = confirm("¿Querés comprar otra cosa?");
        }

    if (carrito.length > 0) {
        let resumen = "Resumen de compra:\n";
        for (let item of carrito) {
        resumen += ` ${item.nombre} $${item.precio}\n`;
    }
    resumen += `\nTotal a pagar: $${total}`;
    alert(resumen);
    console.log("Compra finalizada. Productos:", carrito, "Total:", total);
    } else {
    alert("¡Hasta la próxima!");
    }
    }
