<?php

session_start();

$response = Array();

if ( session_destroy() ) $response['answer'] = true;
else $response['answer'] = false;

echo json_encode($response);