<?php

function random_pic()
{
	$files = array('./img/tglogo1.png', './img/tglogo2.gif', './img/tgmc2.png');
    $file = array_rand($files);
    return $files[$file];
}

header('Content-Type: image/png');
header('Cache-Control: public,max-age=60,s-maxage=120,stale-if-error=300,stale-while-revalidate=240');
readfile(random_pic());

?>
