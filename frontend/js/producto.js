// Obtener ID desde la URL
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

// Llamar backend
fetch(`http://localhost/market-community/backend/obtener_producto.php?id=${id}`)
    .then(response => response.json())
    .then(producto => {

        const contenedor = document.getElementById("detalle-producto");

        contenedor.innerHTML = `

            <div class="producto-detalle-card">

                <div class="producto-imagen">
                    <img src="../../uploads/${producto.imagen}" alt="${producto.titulo}">
                </div>

                <div class="producto-info">

                    <h1>${producto.titulo}</h1>

                    <p class="detalle-precio">
                        $${producto.precio}
                    </p>

                    <p class="detalle-vendedor">
                        👤 Vendedor: <strong>${producto.nombre}</strong>
                    </p>

                    <div class="detalle-descripcion">
                        <h3>Descripción</h3>
                        <p>${producto.descripcion}</p>
                    </div>

                    <div class="contacto-box">

                        <h3>Contactar vendedor</h3>

                        <textarea 
                            id="mensaje" 
                            placeholder="Escribe tu mensaje..."
                        ></textarea>

                        <button onclick="enviarMensaje(${producto.id_usuario})">
                            Enviar mensaje
                        </button>

                        <p id="respuesta"></p>

                    </div>

                </div>

            </div>

        `;
    })
    .catch(error => console.error("Error:", error));


// FUNCIÓN ENVIAR MENSAJE
function enviarMensaje(destinatarioId) {

    const mensaje = document.getElementById("mensaje").value;
    const respuesta = document.getElementById("respuesta");

    // Validación
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