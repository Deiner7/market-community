const params = new URLSearchParams(window.location.search);
const usuario = parseInt(params.get("usuario"));

const nombreUsuario = document.getElementById("nombre-usuario");
const estadoUsuario = document.getElementById("estado-usuario");

fetch(`http://localhost/market-community/backend/obtener_usuario.php?id=${usuario}`)
    .then(res => res.json())
    .then(data => {
        nombreUsuario.innerText = "Chat con " + data.nombre;
    });

const chat = document.getElementById("chat");
const inputMensaje = document.getElementById("mensaje");

//  Detectar escritura
inputMensaje.addEventListener("input", () => {

    fetch("http://localhost/market-community/backend/actualizar_escribiendo.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: "estado=1"
    });

    clearTimeout(window.timer);

    window.timer = setTimeout(() => {
        fetch("http://localhost/market-community/backend/actualizar_escribiendo.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: "estado=0"
        });
    }, 2000);
});

//  Cargar conversación
function cargarChat() {

    fetch(`http://localhost/market-community/backend/obtener_chat.php?usuario=${usuario}`)
        .then(res => res.json())
        .then(data => {

            chat.innerHTML = "";

            data.forEach(msg => {

                const div = document.createElement("div");
                div.classList.add("mensaje");

                const fecha = new Date(msg.fecha_envio);
                const hora = fecha.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

                if (msg.remitente == usuario) {
                    div.classList.add("otro");
                } else {
                    div.classList.add("mio");
                }

                div.innerHTML = `
                    ${msg.contenido}
                    <br><small>${hora}</small>
                `;

                chat.appendChild(div);
            });

            chat.scrollTop = chat.scrollHeight;

        });
}

// Enviar mensaje
function enviarMensaje() {

    const texto = document.getElementById("mensaje").value;

    fetch("http://localhost/market-community/backend/enviar_mensaje.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: `mensaje=${texto}&destinatario=${usuario}`
    })
    .then(res => res.text())
    .then(() => {
        document.getElementById("mensaje").value = "";
        cargarChat();
    });
}

//  Actualizar actividad (online)
function actualizarActividad() {
    fetch("http://localhost/market-community/backend/actualizar_actividad.php");
}

//  Estado combinado
function verificarEstado() {

    fetch(`http://localhost/market-community/backend/obtener_estado.php?id=${usuario}`)
        .then(res => res.json())
        .then(data => {

            if (data.escribiendo == 1) {
                estadoUsuario.innerText = "✍️ Escribiendo...";
            } else {

                fetch(`http://localhost/market-community/backend/estado_online.php?id=${usuario}`)
                    .then(res => res.json())
                    .then(data => {

                        if (data.estado === "online") {
                            estadoUsuario.innerText = "🟢 En línea";
                        } else {
                            estadoUsuario.innerText = "⚫ Desconectado";
                        }

                    });
            }

        });
}

//  AUTO EJECUCIÓN
cargarChat();

//  CLAVE: marcar actividad desde el inicio
actualizarActividad();

setInterval(cargarChat, 3000);
setInterval(verificarEstado, 2000);
setInterval(actualizarActividad, 5000);