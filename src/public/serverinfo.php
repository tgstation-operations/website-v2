<?php //<--- you see this shit right here, that php tag, it better be the first thing in the file
		//If there is even a space or a newline before that tag, shit will break
    // Connection settings:
     
    $servers = Array();
     
    /*
    Example: (copy paste this to somewhere AFTER the comment and fill with your own information)
    If you have multiple servers, list them one after the other. Change the id from 1 to 2, 3, 4, etc. tho.
     
    "address" and "port": is the ip or url you use to connect: Normally you see
    byond://123.123.123.123:56372. The 123.123.123.123 part is the address, the 56372
    part is the port. Fill with your own information, obviously. If you use an url
    and you connect to something like byond://game.mysite.com:1234, then
    game.mysite.com is the address and 1234 the port
    "servername": is just a string that gets written on the image. Can be
    pretty much anything
     
    //My Server
    $servers[1] = Array();
    $servers[1]["address"] = "192.168.0.100";
    $servers[1]["port"] = 56372;
    $servers[1]["servername"] = "SS13: My Server";
     
    */
     
    //Copy paste the code above to after this line
     
    //Bagil
    $servers['bagil'] = Array();
    $servers['bagil']['address'] = 'bagil.tgstation13.org';
    $servers['bagil']['port'] = 2337;
	$servers['bagil']['servername'] = 'Basil [US-West]';
	$servers['bagil']['dbname'] = 'Bagil';
	$servers['bagil']['commsname'] = 'Bagil';
	$servers['bagil']['public_logs_url'] = 'https://tgstation13.org/parsed-logs/basil/';
	$servers['bagil']['raw_logs_url'] = 'https://tgstation13.org/raw-logs/basil/';
	//$servers['bagil']['popcap'] = 90;
	if (rand(0,25) === 0)
		$servers['bagil']['servername'] = 'Bagil [US-West]';
	//$servers['bagil']['errortext'] = "Unlocking more threads for the thread gods";
	//if (rand(0,2) === 2)
	//	$servers['bagil']['servername'] = 'Bagil: THUNDERDOME!';
    
	//Sybil
    $servers['sybil'] = Array();
    $servers['sybil']['address'] = 'sybil.tgstation13.org';
    $servers['sybil']['port'] = 1337;
    $servers['sybil']['servername'] = 'Sybil [US-West]';
	$servers['sybil']['dbname'] = 'Sybil';
	$servers['sybil']['commsname'] = 'Sybil';
	$servers['sybil']['public_logs_url'] = 'https://tgstation13.org/parsed-logs/sybil/';
	$servers['sybil']['raw_logs_url'] = 'https://tgstation13.org/raw-logs/sybil/';
	if (rand(0,25) === 0)
		$servers['sybil']['servername'] = 'Sybil 2 [US-West]';
	else if (rand(0,50) === 0)
		$servers['sybil']['servername'] = 'Sybil [Roleplay/US-West]';
	$servers['sybil']['popcap'] = '∞';
	//$servers['sybil']['errortext'] = "Down for Maintenance...";
	//$servers['sybil']['errortext'] = "";


	//Sybil
    $servers['sybil2'] = Array();
    $servers['sybil2']['address'] = 'manuel.tgstation13.org';
    $servers['sybil2']['port'] = 1447;
    $servers['sybil2']['servername'] = 'Manuel [Moar RP/US-West]';
	$servers['sybil2']['dbname'] = 'Manuel';
	$servers['sybil2']['commsname'] = 'Manuel';
	$servers['sybil2']['public_logs_url'] = 'https://tgstation13.org/parsed-logs/manuel/';
	$servers['sybil2']['raw_logs_url'] = 'https://tgstation13.org/raw-logs/manuel/';
	//$servers['sybil2']['servername'] = 'Campbell [Moar RP/EU]';
	if (rand(0,100) === 0)
		$servers['sybil2']['servername'] = 'Sybil-2 [Roleplay/US-Wes]';
	//$servers['sybil2']['popcap'] = 666;
	//$servers['sybil2']['errortext'] = "Down for the weekend to seed Campbell";
	//$servers['sybil2']['errortext'] = "Waiting for Sybil to shutdown...";
	//$servers['sybil2']['errortext'] = "Booting machine";

	$servers['eventhall'] = Array();
    $servers['eventhall']['address'] = 'events-eu.tgstation13.org';
    $servers['eventhall']['port'] = 4337;
    $servers['eventhall']['servername'] = 'Event Hall [EU]';
	$servers['eventhall']['dbname'] = 'Events-EU';
	$servers['eventhall']['commsname'] = 'Event+Hall+EU';
	$servers['eventhall']['public_logs_url'] = 'https://tgstation13.org/parsed-logs/event-hall/';
	$servers['eventhall']['raw_logs_url'] = 'https://tgstation13.org/raw-logs/event-hall/';
	//$servers['eventhall']['servername'] = '/tg/station 2019 Code [EU]';
	// $servers['eventhall']['errortext'] = "Cloning configuration.....";
	//$servers['eventhall']['errortext'] = "Backup Summer Ball Server";
	//$servers['eventhall']['popcap'] = 300;
	//$servers['eventhall']['eventcolors'] = true;
	//$servers['eventhall']['errortext'] = "Sunday at Noon PST|3pm EST|8pm GMT";

	$servers['eventhallus'] = Array();
    $servers['eventhallus']['address'] = 'bagil.tgstation13.org';
    $servers['eventhallus']['port'] = 4447;
    //$servers['eventhallus']['servername'] = '/tg/Station GameShow';
	$servers['eventhallus']['servername'] = 'Event Hall [US-West]';
	$servers['eventhallus']['dbname'] = 'Events-US';
	$servers['eventhallus']['commsname'] = 'Event+Hall+US';
	$servers['eventhallus']['servername'] = 'Wall Hall [US-West]';
	$servers['eventhallus']['errortext'] = "Wallening the sprites....";
	$servers['eventhallus']['public_logs_url'] = 'https://tgstation13.org/parsed-logs/event-hall-us/';
	$servers['eventhallus']['raw_logs_url'] = 'https://tgstation13.org/raw-logs/event-hall-us/';
	//$servers['eventhallus']['errortext'] = "Use that server ->>";
	//$servers['eventhallus']['errortext'] = "Down for Maintenance";
	//$servers['eventhallus']['popcap'] = 300;
	//$servers['eventhallus']['eventcolors'] = true;
	//$servers['eventhallus']['errortext'] = "Sunday at Noon PST|3pm EST|8pm GMT";

	
	$servers['terry'] = Array();
    $servers['terry']['address'] = 'terry.tgstation13.org';
    $servers['terry']['port'] = 3336;
	$servers['terry']['servername'] = 'Terry [EU]';
	$servers['terry']['dbname'] = 'Terry';
	$servers['terry']['commsname'] = 'Terry';
	$servers['terry']['publiclogsurl'] = 'https://tgstation13.org/parsed-logs/terry/';
	$servers['terry']['rawlogsurl'] = 'https://tgstation13.org/raw-logs/terry/';
	if (rand(0,10) === 0)
		$servers['terry']['servername'] = ''.array_rand(array('Terry' => '', 'Larry' => '', 'Garry' => '', 'Jerry' => '')).' [EU]';
	if (rand(0,1000) === 0)
		$servers['terry']['servername'] = ''.array_rand(array('Terri' => '', 'Larri' => '', 'Garri' => '', 'Jerri' => '')).' [EU]';
	// $servers['terry']['errortext'] = "Launching ddos relay.....";
	//$servers['terry']['popcap'] = 90;
	
	$servers['dmca'] = Array();
    $servers['dmca']['address'] = 'tgmc.tgstation13.org';
    $servers['dmca']['port'] = 5337;
    $servers['dmca']['servername'] = 'TG Marine Corps [US-West]';
	$servers['dmca']['dbname'] = 'TGMC';
	$servers['dmca']['commsname'] = '';
	//$servers['dmca']['publiclogsurl'] = 'https://tgstation13.org/parsed-logs/terry/';
	$servers['dmca']['rawlogsurl'] = 'https://tgstation13.org/raw-logs-tgmc/tgmc/';
	//$servers['dmca']['errortext'] = "dmca";
	$servers['dmca']['errortext'] = "Server not online";
	//$servers['dmca']['errortext'] = "Unlocking more threads for the thread gods";
	//$servers['dmca']['popcap'] = 180;
	
	$servers['ftl13'] = Array();
    $servers['ftl13']['address'] = 'toolbox.tgstation13.org';
    $servers['ftl13']['port'] = 1337;
    $servers['ftl13']['servername'] = 'TOOLBOX 2023 [US-East]';
	//$servers['terry']['errortext'] = "dmca";
	$servers['ftl13']['errortext'] = "THE SERVER GOT ROBUSTED";
	//$servers['ftl13']['popcap'] = 180;
	//$servers['ftl13']['eventcolors'] = true;
	
	$servers['campbell'] = Array();
    $servers['campbell']['address'] = 'campbell.tgstation13.org';
    $servers['campbell']['port'] = 6337;
    $servers['campbell']['servername'] = 'Campbell [Moar RP/EU]';
	$servers['campbell']['dbname'] = 'Campbell';
	$servers['campbell']['commsname'] = 'Campbell';
	#$servers['campbell']['publiclogsurl'] = 'https://tgstation13.org/parsed-logs/terry/';
	#$servers['campbell']['rawlogsurl'] = 'https://tgstation13.org/raw-logs/terry/';
	$servers['campbell']['errortext'] = "Cloning configuration.....";
	//$servers['campbell']['popcap'] = 50;
	//$servers['campbell']['eventcolors'] = true;
	
 ///\/ you see this shit right here, that closing php tag, it better be the last thing in the file
		//If there is even a space or a newline after that tag, shit will break
?>