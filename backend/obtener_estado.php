<?php

include("conexion.php");

$id = $_GET["id"];

$stmt = $conn->prepare("SELECT escribiendo FROM usuarios WHERE id_usuario = ?");
$stmt->bind_param("i", $id);
$stmt->execute();

$resultado = $stmt->get_result();

if ($fila = $resultado->fetch_assoc()) {
    echo json_encode($fila);
}

$stmt->close();
$conn->close();

?>