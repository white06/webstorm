<?php
define('AUDIO_FILE', $_FILES['audioData']['tmp_name']);
//define('AUDIO_FILE', "./test.pcm");
$url = "http://vop.baidu.com/server_api";

//填写参数
$cuid = "";            //用户 ID，推荐使用设备mac 地址/手机IMEI 等设备唯一性参数
$apiKey = "";        //百度的 API Key
$secretKey = "";    //百度的 Secret Key

$auth_url = "http://openapi.baidu.com/oauth/2.0/token?grant_type=client_credentials&client_id=".$apiKey."&client_secret=".$secretKey;
//用 https 访问 报证书错误问题
//$auth_url = "https://openapi.baidu.com/oauth/2.0/token?grant_type=client_credentials&client_id=".$apiKey."&client_secret=".$secretKey;
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $auth_url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 5);
$response = curl_exec($ch);
if(curl_errno($ch))
{
    print curl_error($ch);
}
curl_close($ch);
$response = json_decode($response, true);
$token = $response['access_token'];

$audio = file_get_contents(AUDIO_FILE);
$base_data = base64_encode($audio);
$array = array(
        "format" => "pcm",
        "rate" => 8000,
        "channel" => 1,
        //"lan" => "zh",
        "token" => $token,
        "cuid"=> $cuid,
        //"url" => "http://www.xxx.com/sample.pcm",
        //"callback" => "http://www.xxx.com/audio/callback",
        "len" => filesize(AUDIO_FILE),
        "speech" => $base_data,
        );
$json_array = json_encode($array);
$content_len = "Content-Length: ".strlen($json_array);
$header = array ($content_len, 'Content-Type: application/json; charset=utf-8');

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_HTTPHEADER, $header);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 30);
curl_setopt($ch, CURLOPT_TIMEOUT, 30);
curl_setopt($ch, CURLOPT_POSTFIELDS, $json_array);
$response = curl_exec($ch);
if(curl_errno($ch))
{
    print curl_error($ch);
}
curl_close($ch);
echo $response;
$response = json_decode($response, true);
var_dump($response);

?>