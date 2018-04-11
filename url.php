<?php
$file = "cache/data.txt";
$res = file_get_contents($file);
$nowTime = time();
$cacheTime = 10; //本地缓存时间
if($res!==''){
    $res_arr = explode(',',$res);
    $lastTime = $res_arr[0];
    $spendTime = $nowTime - $lastTime;
    if($spendTime>$cacheTime){
        $jumpUrl = get_url();
        $data['code'] = 0;
        $data['from'] = 'php';
        $data['url'] = $jumpUrl;
        $data['lasttime'] = date("Y-m-d H:i:s", $lastTime);
    }else{
        $jumpUrl = $res_arr[1];
        $data['code'] = 0;
        $data['from'] = 'cache';
        $data['url'] = $jumpUrl;
        $data['lasttime'] = date("Y-m-d H:i:s", $lastTime);
    }
}else{
    $jumpUrl = get_url();
    $data['code'] = 0;
    $data['from'] = 'api';
    $data['url'] = $jumpUrl;
}

$json = json_encode($data);

$ticket = md5($nowTime."yzu123");
$jumpUrl = "{$jumpUrl}/?t={$nowTime}&ticket={$ticket}";
//echo $json;exit;
header("Location:{$jumpUrl}");



function get_url(){
    $file = "cache/data.txt";
    $nowTime = time();
    $url = "http://api.weixin139.com/jumpurl/index/get_url.html?user=qq82419592&type=1";
    $con = get_msg($url);
    $content = "{$nowTime},{$con}";
    file_put_contents($file,$content);
    return $con;
}

function get_msg($url)
        {
                $ch = curl_init();
                //超时时间
                curl_setopt($ch,CURLOPT_TIMEOUT,2);
                curl_setopt($ch,CURLOPT_RETURNTRANSFER, 1);
                curl_setopt($ch,CURLOPT_URL,$url);
                curl_setopt($ch,CURLOPT_SSL_VERIFYPEER,false);
                curl_setopt($ch,CURLOPT_SSL_VERIFYHOST,false);
                $data = curl_exec($ch);
                if($data){
                        curl_close($ch);
                        return $data;
                }
                else {
                        $error = curl_errno($ch);
                        //echo "call faild, errorCode:$error\n";
                        curl_close($ch);
                        return false;
                }
        }