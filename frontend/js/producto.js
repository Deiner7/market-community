// Obtener ID desde la URL
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

// Llamar al backend
fetch(`http://localhost/market-community/backend/obtener_producto.php?id=${id}`)
    .then(response => response.json())
    .then(producto => {

        const contenedor = document.getElementById("detalle-producto");

        contenedor.innerHTML = `
            <h3>${producto.titulo}</h3>
            <img src="../../uploads/${producto.imagen}" width="300">
            <p><strong>Precio:</strong> $${producto.precio}</p>
            <p><strong>Descripción:</strong> ${producto.descripcion}</p>
            <p><strong>Vendedor:</strong> ${producto.nombre}</p>

            <h4>Contactar</h4>
            <textarea id="mensaje" placeholder="Escribe tu mensaje"></textarea><br><br>
            <button onclick="enviarMensaje(${producto.id_usuario})">Enviar mensaje</button>

            <p id="respuesta"></p>
        `;
    })
    .catch(error => console.error("Error:", error));


// 🔥 Función enviar mensaje (MEJORADA)
function enviarMensaje(destinatarioId) {

    const mensaje = document.getElementById("mensaje").value;
    const respuesta = document.getElementById("respuesta");

    // 🔴 Validación
    if (mensaje.trim() === "") {
        respuesta.textContent = "El mensaje no puede estar vacío";
        respuesta.style.color = "red";
        return;
    }

    fetch("http://localhost/market-community/backend/enviar_mensaje.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: `mensaje=${encodeURIComponent(mensaje)}&destinatario=${destinatarioId}`
    })
    .then(response => response.text())
    .then(data => {
        respuesta.textContent = data;
        respuesta.style.color = "green";
        document.getElementById("mensaje").value = "";
    })
    .catch(error => console.error("Error:", error));
}