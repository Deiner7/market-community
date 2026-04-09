fetch("http://localhost/market-community/backend/obtener_mis_productos.php")
    .then(response => response.json())
    .then(data => {

        const contenedor = document.getElementById("mis-productos");

        if (data.error) {
            contenedor.innerHTML = "<p>Debes iniciar sesión</p>";
            return;
        }

        data.forEach(producto => {

            const div = document.createElement("div");

            div.innerHTML = `
                <h3>${producto.titulo}</h3>
                <img src="../../uploads/${producto.imagen}" width="200">
                <p>Precio: $${producto.precio}</p>

                <button onclick="editarProducto(${producto.id_producto})">
                    Editar
                </button>

                <button onclick="eliminarProducto(${producto.id_producto})">
                    Eliminar
                </button>

                <hr>
            `;

            contenedor.appendChild(div);
        });

    })
    .catch(error => console.error("Error:", error));


//  FUNCIÓN ELIMINAR
function eliminarProducto(id) {

    if (!confirm("¿Seguro que quieres eliminar este producto?")) return;

    fetch("http://localhost/market-community/backend/eliminar_producto.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: `id_producto=${id}`
    })
    .then(response => response.text())
    .then(data => {
        alert(data);
        location.reload();
    });
}


//  FUNCIÓN EDITAR
function editarProducto(id) {
    window.location.href = `editar.html?id=${id}`;
}