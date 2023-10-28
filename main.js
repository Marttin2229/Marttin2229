// Ruta al archivo JSON local
const rutaArchivoJSON = 'datos.json';

// Variable para almacenar los productos
let productos = [];

// Verifica si ya hay datos en el carrito en el almacenamiento local
const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// Verifica si ya hay datos en el total en el almacenamiento local
let total = JSON.parse(localStorage.getItem('total')) || 0;

// Función para cargar los productos desde el archivo JSON
function cargarProductos() {
    fetch(rutaArchivoJSON)
        .then(response => response.json())
        .then(data => {
            productos = data;
        })
        .catch(error => {
            console.error('Error al cargar el archivo JSON:', error);
        });
}

// Llama a la función para cargar los productos cuando se inicie la página
cargarProductos();

function agregarAlCarrito(index) {
    const producto = productos[index];
    carrito.push(producto);
    total += producto.precio;
    actualizarCarrito();
    actualizarTotalEnPagina();
    guardarEnLocalStorage();
}

function quitarDelCarrito() {
    if (carrito.length === 0) {
        console.log("El carrito está vacío, no se puede quitar ningún producto.");
        return;
    }

    const productoRemovido = carrito.pop();
    total -= productoRemovido.precio;
    actualizarCarrito();
    actualizarTotalEnPagina();
    guardarEnLocalStorage();
}

function actualizarCarrito() {
    const carritoElement = document.getElementById("carrito");
    carritoElement.innerHTML = "";

    carrito.forEach((producto, index) => {
        const productoElement = document.createElement("div");
        productoElement.textContent = `${index + 1}. ${producto.nombre} - $${producto.precio}`;
        carritoElement.appendChild(productoElement);
    });

    const totalElement = document.getElementById("total");
    totalElement.textContent = `Total: $${total}`;
}

function actualizarTotalEnPagina() {
    document.getElementById("total").textContent = `Total: $${total}`;
}

function guardarEnLocalStorage() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
    localStorage.setItem('total', JSON.stringify(total));
}

function confirmarCompra() {
    if (carrito.length === 0) {
        alert("El carrito está vacío. Agrega productos antes de confirmar la compra.");
        return;
    }

    alert("¡Compra completada exitosamente! Gracias por tu compra.");
    carrito.length = 0;
    total = 0;
    actualizarCarrito();
    actualizarTotalEnPagina();
    guardarEnLocalStorage();
}

// Inicializa la página
actualizarCarrito();
actualizarTotalEnPagina();
