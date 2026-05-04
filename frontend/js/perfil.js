fetch("http://localhost/market-community/backend/obtener_mis_productos.php")
    .then(response => response.json())
    .then(data => {

        const contenedor = document.getElementById("mis-productos");

        // VALIDAR LOGIN
        if (data.error) {

            contenedor.innerHTML = `
                <p class="sin-productos">
                    Debes iniciar sesión
                </p>
            `;

            return;
        }

        // SI NO HAY PRODUCTOS
        if (data.length === 0) {

            contenedor.innerHTML = `
                <p class="sin-productos">
                    No has publicado productos todavía
                </p>
            `;

            return;
        }

        // RECORRER PRODUCTOS
        data.forEach(producto => {

            const div = document.createElement("div");

            div.classList.add("card-producto");

            div.innerHTML = `

                <div class="imagen-container">
                    <img src="../../uploads/${producto.imagen}">
                </div>

                <div class="info-producto">

                    <h3>${producto.titulo}</h3>

                    <p class="precio">
                        $${producto.precio}
                    </p>

                    <div class="acciones-producto">

                        <button onclick="editarProducto(${producto.id_producto})">
                            ✏️ Editar
                        </button>

                        <button class="btn-eliminar"
                            onclick="eliminarProducto(${producto.id_producto})">
                            🗑️ Eliminar
                        </button>

                    </div>

                </div>
            `;

            contenedor.appendChild(div);

        });

    })
    .catch(error => console.error("Error:", error));


// ELIMINAR PRODUCTO
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


// EDITAR PRODUCTO
function editarProducto(id) {

    window.location.href = `editar.html?id=${id}`;

}