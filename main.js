// Ruta al archivo JSON
const rutaArchivoJSON = 'datos.json';

let productos = [];

// Hace una verificación de si ya hay datos en el carrito en el almacenamiento local
const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

document.addEventListener("DOMContentLoaded", function () {
    const carritoElement = document.getElementById("carrito");

    if (carritoElement) {
        actualizarCarrito();

        if (carrito.length > 0) {
            carrito.forEach((producto, index) => {
                const productoLi = document.createElement("li");
                productoLi.textContent = `${index + 1}. ${producto.nombre} - $${producto.precio}`;
                carritoElement.querySelector("ul").appendChild(productoLi);
            });
        } else {
            const mensajeVacio = document.createElement("p");
            mensajeVacio.textContent = "No hay productos en el carrito.";
            carritoElement.querySelector("ul").appendChild(mensajeVacio);
        }
    }
});

// Hace una verificación de si ya hay datos en el total en el almacenamiento local
let total = JSON.parse(localStorage.getItem('total')) || 0;

// Función que carga los productos desde el archivo JSON
function cargarProductos() {
    fetch(rutaArchivoJSON)
        .then(response => response.json())
        .then(data => {
            productos = data;
            actualizarCarrito();
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
        alert("El carrito está vacío. Agrega productos antes de quitar un producto.");
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
        alert("El carrito está vacío. Agrega productos antes de ir a confirmar el pago de tus productos.");
        return;
    }

    guardarEnLocalStorage();
    
    window.location.href = 'detalles_compra.html'; 
}

// Maneja el evento de clic en el botón "Confirmar Compra" de la pagina detalles_compra.html
const confirmarCompraBtn = document.getElementById("confirmarCompraBtn");
if (confirmarCompraBtn) {
    confirmarCompraBtn.addEventListener("click", function () {

        // Muestra mensaje de compra exitosa
        alert("¡Muchas gracias, la compra fue exitosa!");
        
        // Redirige al usuario a la página de productos.html
        window.location.href = "productos.html";
    });
}

document.addEventListener("DOMContentLoaded", function () {
    const productosCarritoElement = document.getElementById("productos-carrito");

    if (productosCarritoElement) {
        // Comprueba si hay productos en el carrito y los muestra
        if (carrito.length > 0) {
            carrito.forEach((producto, index) => {
                const productoLi = document.createElement("li");
                productoLi.textContent = `${index + 1}. ${producto.nombre} - $${producto.precio}`;
                productosCarritoElement.querySelector("ul").appendChild(productoLi);
            });
        } else {
            const mensajeVacio = document.createElement("p");
            mensajeVacio.textContent = "No hay productos en el carrito.";
            productosCarritoElement.querySelector("ul").appendChild(mensajeVacio);
        }
    }
});

// Inicializa la página
actualizarCarrito();
actualizarTotalEnPagina();
