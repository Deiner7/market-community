<?php

session_start();
include("conexion.php");

if (!isset($_SESSION["usuario_id"])) {
    exit();
}

$id = $_SESSION["usuario_id"];

$stmt = $conn->prepare("UPDATE usuarios SET ultima_actividad = NOW() WHERE id_usuario = ?");
$stmt->bind_param("i", $id);
$stmt->execute();

$stmt->close();
$conn->close();

?>