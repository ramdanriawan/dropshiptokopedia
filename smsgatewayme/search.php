<?php
require_once('./client-php/vendor/autoload.php');

use SMSGatewayMe\Client\ApiClient;
use SMSGatewayMe\Client\Configuration;
use SMSGatewayMe\Client\Api\MessageApi;
use SMSGatewayMe\Client\Model\SendMessageRequest;
use SMSGatewayMe\Client\Model\Message;

// Configure client
$config        = Configuration::getDefaultConfiguration();
$config->setApiKey('Authorization', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJhZG1pbiIsImlhdCI6MTU0Mjg4NTg3OSwiZXhwIjo0MTAyNDQ0ODAwLCJ1aWQiOjI2ODY2LCJyb2xlcyI6WyJST0xFX1VTRVIiXX0.GBIUC2GEiioIoSwGiVj0mZ9B0YUPfWcMTP5Yify96TU');

$apiClient     = new ApiClient($config);
$messageClient = new MessageApi($apiClient);

$messages = $messageClient->searchMessages([
    'order_by' => [['field' => 'created_at', 'direction' => 'desc']],
    'limit' => 5,
]);

$messages = json_decode($messages)->results;

die(json_encode($messages));
