<?php

session_start();
include("conexion.php");

if (!isset($_SESSION["usuario_id"])) {
    exit();
}

$id = $_SESSION["usuario_id"];
$estado = $_POST["estado"];

$stmt = $conn->prepare("UPDATE usuarios SET escribiendo = ? WHERE id_usuario = ?");
$stmt->bind_param("ii", $estado, $id);
$stmt->execute();

$stmt->close();
$conn->close();

?>