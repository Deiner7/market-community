<?php

session_start();

if (isset($_SESSION["usuario_id"])) {
    echo json_encode([
        "logueado" => true,
        "nombre" => $_SESSION["nombre"]
    ]);
} else {
    echo json_encode([
        "logueado" => false
    ]);
}
?>