<?php
ini_set('display_errors', 1); ini_set('display_startup_errors', 1); error_reporting(E_ALL);
date_default_timezone_set('Africa/Juba');
function clean($v){ return trim(str_replace(array("\n","\r",";"), ' ', htmlspecialchars($v ?? '', ENT_QUOTES, 'UTF-8'))); }
if($_SERVER['REQUEST_METHOD']==='POST'){
  $name=clean($_POST['name']??''); $email=clean($_POST['email']??''); $subject=clean($_POST['subject']??''); $message=clean($_POST['message']??''); $when=date('Y-m-d H:i:s');
  if($name && $email && $subject && $message){
    $dir=__DIR__.DIRECTORY_SEPARATOR.'data'; if(!is_dir($dir)){mkdir($dir,0777,true);}
    $file=$dir.DIRECTORY_SEPARATOR.'contact_submissions.csv'; $isNew=!file_exists($file);
    $fp=fopen($file,'a'); if($isNew){fputcsv($fp,['timestamp','name','email','subject','message']);}
    fputcsv($fp,[$when,$name,$email,$subject,$message]); fclose($fp);
    header('Content-Type:text/html;charset=utf-8');
    echo '<!doctype html><html><head>
<meta name="viewport" content="width=device-width, initial-scale=1"><meta charset="utf-8"><link rel="stylesheet" href="assets/css/styles.css"><title>Thanks</title><script defer src="assets/js/main.js"></script>
</head><body>
<header class="site-header">
  <div class="container nav-container">
    <a class="nav-logo" href="index.html">
      <img src="assets/img/logo-caritas-juba.png" alt="Caritas Archdiocese of Juba" />
      
    </a>
    <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="primary-navigation">
      <span class="nav-toggle-label">Menu</span>
      <span class="nav-toggle-icon" aria-hidden="true"><span></span></span>
    </button>
    <nav class="nav-drawer" id="primary-navigation" aria-label="Main" aria-hidden="true">
      <button class="nav-close" type="button"><span class="sr-only">Close menu</span></button>
      <ul class="nav-links">
        <li><a class="nav-link" href="index.html" aria-current="page">Home</a></li>
        <li><a class="nav-link" href="about.html">About</a></li>
        <li><a class="nav-link" href="work.html">Our Work</a></li>
        <li><a class="nav-link" href="support-us.html">Support Us</a></li>
        <li><a class="nav-link" href="careers.html"> Careers </a></li>
        <li><a class="nav-link" href="news.html">News</a></li>
        <li><a class="nav-link" href="contact.html">Contact</a></li>
      </ul>
    </nav>
    <div class="nav-backdrop" hidden></div>
  </div>
</header><div class="container section"><div class="card"><h2>Thank you, '.$name.'.</h2><p>Your message has been saved.</p><p><a class="btn" href="index.html">Back to Home</a></p></div></div></body></html>'; exit;
  } else { http_response_code(400); echo "Please fill all fields."; exit; }
} else { header("Location: contact.html"); exit; }
