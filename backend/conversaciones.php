<?php

session_start();
include("conexion.php");

if (!isset($_SESSION["usuario_id"])) {
    echo json_encode(["error" => "Debes iniciar sesión"]);
    exit();
}

$id_usuario = $_SESSION["usuario_id"];

//  Obtener usuarios con los que has hablado
$sql = "
SELECT DISTINCT 
    u.id_usuario, u.nombre
FROM usuarios u
JOIN mensajes m 
    ON (u.id_usuario = m.remitente OR u.id_usuario = m.destinatario)
WHERE (m.remitente = $id_usuario OR m.destinatario = $id_usuario)
AND u.id_usuario != $id_usuario
";

$resultado = $conn->query($sql);

$conversaciones = [];

while ($fila = $resultado->fetch_assoc()) {
    $conversaciones[] = $fila;
}

echo json_encode($conversaciones);

$conn->close();

?>