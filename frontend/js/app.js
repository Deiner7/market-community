fetch("http://localhost/market-community/backend/obtener_productos.php")
    .then(response => response.json())
    .then(data => {

        const contenedor = document.getElementById("contenedor-productos");

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
    <hr>
`;

            contenedor.appendChild(div);
        });

    })
    .catch(error => console.error("Error:", error));