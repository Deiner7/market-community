const params = new URLSearchParams(window.location.search);
const usuario = params.get("usuario");

const nombreUsuario = document.getElementById("nombre-usuario");

fetch(`http://localhost/market-community/backend/obtener_usuario.php?id=${usuario}`)
    .then(res => res.json())
    .then(data => {
        nombreUsuario.innerText = "Chat con " + data.nombre;
    });

const chat = document.getElementById("chat");

//  Cargar conversación
function cargarChat() {

    fetch(`http://localhost/market-community/backend/obtener_chat.php?usuario=${usuario}`)
        .then(res => res.json())
        .then(data => {

            chat.innerHTML = "";

            data.forEach(msg => {

    const div = document.createElement("div");
    div.classList.add("mensaje");

    //  CALCULAR HORA PARA TODOS
    const fecha = new Date(msg.fecha_envio);
    const hora = fecha.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    if (msg.remitente == usuario) {
        div.classList.add("otro");
    } else {
        div.classList.add("mio");
    }

    //  APLICAR A TODOS LOS MENSAJES
    div.innerHTML = `
        ${msg.contenido}
        <br><small>${hora}</small>
    `;

    chat.appendChild(div);
});

            //  SCROLL AL FINAL (CORRECTO)
            chat.scrollTop = chat.scrollHeight;

        });
}

//  Enviar mensaje
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

//  Auto carga
cargarChat();
setInterval(cargarChat, 3000);