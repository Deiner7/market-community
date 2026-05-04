document.addEventListener("DOMContentLoaded", function () {

    const contenedor = document.getElementById("contenedor-productos");
    const buscador = document.getElementById("buscador");

    // Cargar productos
    function cargarProductos(query = "") {

        fetch(`http://localhost/market-community/backend/buscar_productos.php?q=${encodeURIComponent(query)}`)
            .then(response => response.json())
            .then(data => {

                contenedor.innerHTML = "";

                if (data.length === 0) {
                    contenedor.innerHTML = `
                        <p class="sin-productos">
                            No se encontraron productos
                        </p>
                    `;
                    return;
                }

                data.forEach(producto => {

                    const div = document.createElement("div");
                    div.classList.add("card-producto");

                    div.classList.add("card-producto");

div.innerHTML = `
    <div class="imagen-container">
        <img src="../uploads/${producto.imagen}" alt="${producto.titulo}">
    </div>

    <div class="info-producto">

        <h3>
            <a href="pages/producto.html?id=${producto.id_producto}">
                ${producto.titulo}
            </a>
        </h3>

        <p class="precio">$${producto.precio}</p>

        <a class="btn-ver" href="pages/producto.html?id=${producto.id_producto}">
            Ver producto
        </a>

    </div>
`;

                    contenedor.appendChild(div);
                });

            })
            .catch(error => console.error("Error:", error));
    }

    // Búsqueda en tiempo real
    buscador.addEventListener("input", () => {
        cargarProductos(buscador.value);
    });

    // Inicial
    cargarProductos();

});