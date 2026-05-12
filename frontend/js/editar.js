const params = new URLSearchParams(window.location.search);

const id = params.get("id");

// CARGAR PRODUCTO
fetch(`http://localhost/market-community/backend/obtener_producto.php?id=${id}`)
    .then(res => res.json())
    .then(producto => {

        document.getElementById("id_producto").value =
            producto.id_producto;

        document.getElementById("titulo").value =
            producto.titulo;

        document.getElementById("descripcion").value =
            producto.descripcion;

        document.getElementById("precio").value =
            producto.precio;

    })
    .catch(error => {

        console.error(error);

        mostrarToast("Error cargando producto", "error");

    });

// ACTUALIZAR
document.getElementById("form-editar")
.addEventListener("submit", function(e) {

    e.preventDefault();

    const boton = document.querySelector(".auth-btn");

    boton.disabled = true;

    boton.innerText = "Actualizando...";

    const datos = new URLSearchParams();

    datos.append(
        "id_producto",
        document.getElementById("id_producto").value
    );

    datos.append(
        "titulo",
        document.getElementById("titulo").value
    );

    datos.append(
        "descripcion",
        document.getElementById("descripcion").value
    );

    datos.append(
        "precio",
        document.getElementById("precio").value
    );

    fetch("http://localhost/market-community/backend/editar_producto.php", {
        method: "POST",
        body: datos
    })
    .then(res => res.text())
    .then(data => {

        mostrarToast("Producto actualizado");

        boton.innerText = "Actualizado";

        setTimeout(() => {

            window.location.href = "perfil.html";

        }, 1200);

    })
    .catch(error => {

        console.error(error);

        mostrarToast("Error actualizando", "error");

        boton.disabled = false;

        boton.innerText = "Actualizar Producto";

    });

});