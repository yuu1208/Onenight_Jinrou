<?php

$html = file_get_contents('https://kids.yahoo.co.jp/today/'); 
$start_leng = mb_strpos($html,'<dl id="dateDtl"><dt><span>') ;
$end_leng = mb_strpos($html,'</span></dt>') - $start_leng ;
echo mb_substr($html, $start_leng , $end_leng );

?>
