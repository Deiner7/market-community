console.log("JS cargado");
document.addEventListener("DOMContentLoaded", function () {

    console.log("JS cargado");

    const contenedor = document.getElementById("contenedor-productos");
    const buscador = document.getElementById("buscador");

    console.log("Buscador:", buscador);

    //  Función para cargar productos
    function cargarProductos(query = "") {

        console.log("Buscando:", query);

        fetch(`http://localhost/market-community/backend/buscar_productos.php?q=${encodeURIComponent(query)}`)
            .then(response => response.json())
            .then(data => {

                console.log("Resultados:", data);

                contenedor.innerHTML = "";

                if (data.length === 0) {
                    contenedor.innerHTML = "<p>No se encontraron productos</p>";
                    return;
                }

                data.forEach(producto => {

                    const div = document.createElement("div");

                    div.innerHTML = `
                        <h3>
                            <a href="pages/producto.html?id=${producto.id_producto}">
                                ${producto.titulo}
                            </a>
                        </h3>
                        <img src="../uploads/${producto.imagen}" width="200">
                        <p>Precio: $${producto.precio}</p>
                    `;

                    contenedor.appendChild(div);
                });

            })
            .catch(error => console.error("Error:", error));
    }

    //  Evento búsqueda
    buscador.addEventListener("input", () => {
        console.log("Escribiendo:", buscador.value);
        cargarProductos(buscador.value);
    });

    //  Inicial
    cargarProductos();

});