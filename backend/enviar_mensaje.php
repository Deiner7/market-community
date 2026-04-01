<?php

session_start();
include("conexion.php");

// Verificar login
if (!isset($_SESSION["usuario_id"])) {
    echo "Debes iniciar sesión";
    exit();
}

$remitente = $_SESSION["usuario_id"];
$destinatario = $_POST["destinatario"];
$mensaje = $_POST["mensaje"];

$sql = "INSERT INTO mensajes (remitente, destinatario, contenido)
        VALUES ('$remitente', '$destinatario', '$mensaje')";

if ($conn->query($sql) === TRUE) {
    echo "Mensaje enviado correctamente";
} else {
    echo "Error: " . $conn->error;
}

$conn->close();

?>