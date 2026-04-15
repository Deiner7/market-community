<?php

session_start();
include("conexion.php");

$id_usuario = $_SESSION["usuario_id"];
$otro = $_GET["usuario"];

$sql = "
SELECT * FROM mensajes 
WHERE (remitente = $id_usuario AND destinatario = $otro)
   OR (remitente = $otro AND destinatario = $id_usuario)
ORDER BY fecha_envio ASC
";

$resultado = $conn->query($sql);

$mensajes = [];

while ($fila = $resultado->fetch_assoc()) {
    $mensajes[] = $fila;
}

echo json_encode($mensajes);

$conn->close();

?>