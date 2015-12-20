<?php
include 'ChromePhp.php';

ChromePhp::log('Hello console!');
ChromePhp::log($_SERVER);

$name = $_POST['name'];
$url = $_POST['URL'];
$disc = $_POST['disc'];

$data = Array();
ChromePhp::log(phpinfo());
ChromePhp::log($_FILES);
ChromePhp::log($_POST);
ChromePhp::log($_GET);
ChromePhp::log(filesize($_FILES['picture']['tmp_name']));
ChromePhp::log(is_uploaded_file($_FILES['picture']['tmp_name']));
$upload_dir = '/Users/sb/Desktop/tmp/';
ChromePhp::log(move_uploaded_file($_FILES["picture"]["tmp_name"], $upload_dir.$_FILES["picture"]["name"]));
$pic = $upload_dir.$_FILES["picture"]["name"];
mysql_connect("127.0.0.1:8889", "root", "root") or die (mysql_error ());
mysql_select_db("vp1") or die(mysql_error());
mysql_set_charset( 'utf8' );
$strSQL = "INSERT INTO projects(name, url, disc, pic) VALUES('{$name}', '{$url}', '{$disc}', '{$pic}')"; 
mysql_query($strSQL) or die (mysql_error());
mysql_close();
exit;

?>