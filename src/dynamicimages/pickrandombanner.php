<?php

function random_pic($dir = '../img/banners')
{
    $pngs = glob($dir . '/*.png');
	if (!$pngs)
		$pngs = array();
	$gifs = glob($dir . '/*.gif');
	if (!$gifs)
		$gifs = array();
	$files = array_merge($pngs, $gifs);
    $file = array_rand($files);
    return $files[$file];
}

header('Content-Type: image/png');
header('Cache-Control: public,max-age=120,s-maxage=300,stale-if-error=300,stale-while-revalidate=300');
readfile(random_pic());

?>