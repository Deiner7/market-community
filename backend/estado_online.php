<?php

include("conexion.php");

//  FORZAR ZONA HORARIA (COLOMBIA)
date_default_timezone_set('America/Bogota');

$id = $_GET["id"];

$stmt = $conn->prepare("SELECT ultima_actividad FROM usuarios WHERE id_usuario = ?");
$stmt->bind_param("i", $id);
$stmt->execute();

$resultado = $stmt->get_result();
$usuario = $resultado->fetch_assoc();

//  Si no hay actividad
if (!$usuario["ultima_actividad"]) {
    echo json_encode(["estado" => "offline"]);
    exit();
}

//  CONVERTIR AMBOS A TIMESTAMP CORRECTO
$ultima = strtotime($usuario["ultima_actividad"]);
$ahora = strtotime(date("Y-m-d H:i:s"));

//  DEBUG (puedes quitar luego)
// echo "Ultima: $ultima - Ahora: $ahora";

//  margen más amplio para evitar errores
if (($ahora - $ultima) < 60) {
    echo json_encode(["estado" => "online"]);
} else {
    echo json_encode(["estado" => "offline"]);
}

$stmt->close();
$conn->close();

?>