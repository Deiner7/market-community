<?php

session_start();
include("conexion.php");

if (!isset($_SESSION["usuario_id"])) {
    echo json_encode(["error" => "Debes iniciar sesión"]);
    exit();
}

$id_usuario = $_SESSION["usuario_id"];

//  USAR nombres reales de tu BD
$stmt = $conn->prepare("
    SELECT mensajes.*, usuarios.nombre 
    FROM mensajes
    JOIN usuarios ON mensajes.remitente = usuarios.id_usuario
    WHERE mensajes.destinatario = ? OR mensajes.remitente = ?
    ORDER BY mensajes.id_mensaje DESC
");

$stmt->bind_param("ii", $id_usuario, $id_usuario);
$stmt->execute();

$resultado = $stmt->get_result();

$mensajes = [];

while ($fila = $resultado->fetch_assoc()) {
    $mensajes[] = $fila;
}

echo json_encode($mensajes);

$stmt->close();
$conn->close();

?>