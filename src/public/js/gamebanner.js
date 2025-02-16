//requires jquery

function getCookie(cname) {
	var name = cname + "=";
	var ca = document.cookie.split(';');
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i].trim();
		if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
	}
	return "";
}

var refreshjobs = {};
refreshtimer = 0;
function setupreloader(server, target) {
	if (refreshjobs[server]) {
		console.log('Dupe reload job' + server);
		return;
	}
	$(target).removeAttr('src');
	var gamebannerspan = $('<span class="gamebanner statuserror"></span>').appendTo(target);
	gamebannerspan.append(
		'<span class="gamebannerline gamebanneraddrline"><span class="gamebanneraddr"></span><span class="gamebannericons"><span class="gamebannericon gamebannerbunker"> <i title="This server is not accepting connections from new players (Panic Bunker)" class="fa fa-shield"></i></span><span class="gamebannericon gamebannernoenter"><i title="Spectate only, Entry into the round has been disabled." class="fa fa-glasses"></i></span><span class="gamebannericon gamebannerhub"><i title="This server is on the BYOND hub" class="fa fa-globe"></i></span></span></span>',
		'<span class="gamebannerline gamebannername"></span>',
		'<span class="gamebannerline gamebannermode"></span>',
		'<span class="gamebannerline gamebannermap"></span>',
		'<span class="gamebannerline gamebannerttl"></span>',
		'<span class="gamebannerline gamebannererror"></span>'
	);

	var refreshjob = {
		server: server,
		target: target,
		gamebannerspan: gamebannerspan,
		spinning: true
	};
	refreshjobs[server] = refreshjob;
	banner_init(refreshjob, server);
	setbannererrormode(refreshjob, true);
}

function displayrefreshstatus() {
	if (getCookie("disablerefresh")) {
		document.getElementById("refreshstatus").innerHTML = "<span style=\"color:red;font-weight:bold;\">Disabled</span>";
		return;
	}
	document.getElementById("refreshstatus").innerHTML = "<span style=\"color:green;font-weight:bold;\">Enabled</span>";
	return;
}

function kick_reload_jobs() {
	for (var server in refreshjobs) {
		var refreshjob = refreshjobs[server];
		if (refreshjob && refreshjob.timer)
			reloadimg(refreshjob);
	}
}

function refreshtoggleclick() {
	if (getCookie("disablerefresh")) {
		document.cookie = "disablerefresh=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
		reloadbanners();
		displayrefreshstatus();
		return;
	}
	document.cookie = "disablerefresh=1; expires=Thu, 2038-01-19 04:14:00 GMT; path=/";
	displayrefreshstatus();
}
function round_to_precision(x, precision) {
	var y = +x + (precision === undefined ? 0.5 : precision / 2);
	return y - (y % (precision === undefined ? 1 : +precision));
}

function pad(n, width, z) {
	z = z || '0';
	n = n + '';
	return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}
function secondsToTime(seconds) {
	var output = '';
	if (seconds >= 86400)
		output += Math.floor(seconds / 86400) + ':';

	if (seconds >= 3600)
		output += pad(Math.floor(seconds / 3600) % 24, 2) + ':';

	output += pad(Math.floor((seconds / 60) % 60), 2) + ':' + pad(Math.floor(seconds) % 60, 2);
	return output;
}

function shuttleTime(shuttlemode, shuttletime) {
	switch (shuttlemode) {
		case 'igniting':
			return 'IGN ' + secondsToTime(shuttletime);
		case 'recalled':
			return 'RCL ' + secondsToTime(shuttletime);
		case 'called':
			return 'ETA ' + secondsToTime(shuttletime);
		case 'docked':
			return 'ETD ' + secondsToTime(shuttletime);
		case 'escape':
			return 'ESC ' + secondsToTime(shuttletime);
		case 'stranded':
			return 'ERR --:--';
		case 'endgame: game over':
			return 'FIN 00:00';
	}
	return '';

}
function popcapstring(serverdata) {
	let string = '∞';
	let popcap = Number(serverdata.popcap);
	let hpopcap = Number(serverdata.hard_popcap)
	let epopcap = Number(serverdata.extreme_popcap);
	if (epopcap) {
		if (hpopcap && hpopcap < epopcap)
			return hpopcap + '(' + epopcap + ')';
		string = epopcap;
	} else if (hpopcap)
		return hpopcap;
	else if (popcap)
		return popcap;
	return string;
}
/*
<span class="gamebanneraddr">bagil.tgstation13.org:2337 6b92020326</span>
<span class="gamebannername">Bagil [US-West]</span>
<span class="gamebannermode">Playing /tg/ Station 13 mode "dynamic"</span>
<span class="gamebannermap">The map is: Delta Station</span>
<span class="gamebannerttl">
-
<span class="gamebanneraddr">alt2.tgstation13.org:6337</span>
<span class="gamebannername">Alt Codebase Server 2</span>
<span class="gamebannererror">
*/
function setbannererrormode(banner, display) {
	$('.gamebannermode', banner.target).toggle(!display);
	$('.gamebannermap', banner.target).toggle(!display);
	$('.gamebannerttl', banner.target).toggle(!display);
	$('.gamebannererror', banner.target).toggle(display);
	$(banner.target).toggleClass("statuserror", display);
}

function bannererror(banner, errormessage) {
	$('.gamebannererror', banner.target).text(errormessage);
	setbannererrormode(banner, true);
	return 0;
}

function banner_init(banner, identifier) {
	$('.gamebannername', banner.target).text(identifier);
	$('.gamebannermap', banner.target).text('Loading...');
	setbannererrormode(banner, false);
}

function infofillbanner(banner, serverdata, identifier) {
	if (banner.gamebannerspan) {
		$(banner.target).replaceWith(banner.gamebannerspan);
		banner.target = banner.gamebannerspan;
		banner.gamebannerspan = null;
		$('.gamebannerloader', banner.target).toggle(false);
		$('.gamebannerbunker', banner.target).toggle(false);
		$('.gamebannerhub', banner.target).toggle(false);
		$('.gamebannernoenter', banner.target).toggle(false);
		banner.spinning = false;
	}
	if (!serverdata || typeof serverdata !== 'object') {
		$('.gamebannername', banner.target).text(banner.server);
		return bannererror(banner, 'Invalid Game Banner!');
	}

	let name_map = {
		terry: "Terry [EU]",
		manuel: "Manuel [US-Central]",
		sybil: "Sybil [US-Central]",
		tgmc: "TerraGov Marine Corps [US-Central]",
	}
	let addr_map = {
		terry: "terry.tgstation13.org:3336",
		manuel: "manuel.tgstation13.org:1447",
		sybil: "sybil.tgstation13.org:1337",
		tgmc: "tgmc.tgstation13.org:5337",
	}

	$('.gamebanneraddr', banner.target).text(addr_map[identifier] + ' ' + (serverdata.hasOwnProperty('revision') ? serverdata.revision.substr(0, 7) : ''));
	$('.gamebannername', banner.target).text(name_map[identifier]);

	if (serverdata.hasOwnProperty('ERROR') || !serverdata.hasOwnProperty('players') || !serverdata.hasOwnProperty('version')) {
		if (serverdata.restarting && serverdata.restarting < 18)
			return bannererror(banner, 'Server Restarting' + '.'.repeat(serverdata.restarting));
		let errortext = "Connection Error!";
		if (serverdata.serverdata.errortext)
			errortext = serverdata.serverdata.errortext;
		return bannererror(banner, errortext);
	}

	$('.gamebannerbunker', banner.target).toggle(!!(serverdata.hasOwnProperty('bunkered') && serverdata.bunkered));
	$('.gamebannerhub', banner.target).toggle(!!(serverdata.hasOwnProperty('hub') && serverdata.hub));
	$('.gamebannernoenter', banner.target).toggle(!!(serverdata.hasOwnProperty('enter') && !serverdata.enter));

	setbannererrormode(banner, false);
	switch (Number(serverdata.gamestate)) {
		case 2:
		case 3:
			$(banner.target).removeClass('statuslobby statusroundend').addClass('statusinprogress');
			break;
		case 4:
			$(banner.target).removeClass('statusinprogress statuslobby').addClass('statusroundend');
			break;
		default:
			$(banner.target).removeClass('statusinprogress statusroundend').addClass('statuslobby');
	}
	let modestr = 'Playing /tg/Station 13';
	if (serverdata.hasOwnProperty('version'))
		modestr = 'Playing ' + serverdata.version;
	if (serverdata.hasOwnProperty('custom_event')) {
		modestr = 'Playing Event ' + serverdata.custom_event;
	} else if (serverdata.hasOwnProperty('mode')) {
		modestr += ' mode "' + serverdata.mode + '"';
	}
	$('.gamebannermode', banner.target).text(modestr);
	if (serverdata.hasOwnProperty('map_name')) {
		if (serverdata.map_name.length <= 26)
			$('.gamebannermap', banner.target).text('The map is: ' + serverdata.map_name);
		else
			$('.gamebannermap', banner.target).text('Map: ' + serverdata.map_name);
	} else {
		$('.gamebannermap', banner.target).text("\xa0");
	}
	let ttl = '';
	ttl += serverdata.players;
	let popcap = popcapstring(serverdata);
	if (popcap)
		ttl += '/' + popcap;
	if (Number(serverdata.round_duration))
		ttl += ' ' + secondsToTime(Number(serverdata.round_duration));
	if (serverdata.hasOwnProperty('shuttle_mode') && Number(serverdata.shuttle_timer))
		ttl += ' ' + shuttleTime(serverdata.shuttle_mode, Number(serverdata.shuttle_timer));

	$('.gamebannerttl', banner.target).text(ttl);
	return serverdata.players;

}

known_failed_servers = {};
function do_reload_banners(data) {
	let totalpop = 0;
	let servers = data["servers"];

	let failed = {};
	for (let job in refreshjobs) {
		failed[job] = true;
	}

	for (let _server in servers) {
		let server = servers[_server];
		let identifier = server.identifier.toLowerCase();
		let data = server.data;
		let retry_wait = server.retry_wait;

		if (!refreshjobs[identifier] && !known_failed_servers[identifier]) {
			known_failed_servers[identifier] = true;
			console.log('Server not found: ' + identifier);
			continue;
		}
		totalpop += infofillbanner(refreshjobs[identifier], data, identifier);
		delete failed[identifier];
	}

	for (let job in failed) {
		bannererror(refreshjobs[job], 'Server Offline.');
	}

	$('.bannerusercount').text(totalpop + ' total players.');
}

function errorallbanners(errormessage) {
	console.log('Error all banners: ' + errormessage);
	$.each(refreshjobs, function (_, banner) {
		bannererror(banner, errormessage);
	});
}

refreshtime = 1000;
function reloadbanners(force) {
	let ourrefreshtime = refreshtime;

	if (force || !getCookie("disablerefresh")) {
		let ajax_request = {
			url: "./serverinfo.json",
			success: do_reload_banners,
			error: _ => errorallbanners('Connection Error!'),
			crossDomain: true,
		};
		$.ajax(ajax_request);
	} else ourrefreshtime = ourrefreshtime * 60;

	if (document.hidden || !iSeeYou)
		ourrefreshtime = ourrefreshtime * 1.5;
	if (DevilsWorkshopLvl) {
		if (document.hidden || !iSeeYou)
			ourrefreshtime = ourrefreshtime * 2
		ourrefreshtime = ourrefreshtime * Math.min(DevilsWorkshopLvl, 5);
	}
	clearTimeout(refreshtimer);
	refreshtimer = setTimeout(function () { reloadbanners() }, ourrefreshtime);

}
//Idle hands are The Devil's workshop
var devilInterval = 0;
var DevilsWorkshopLvl = 0;
document.onmousemove = function () {
	if (DevilsWorkshopLvl) {
		reloadbanners();
	}
	clearInterval(devilInterval);
	DevilsWorkshopLvl = 0;
	devilInterval = setInterval(function () { DevilsWorkshopLvl++; }, 120000);
}
var iSeeYou = 1;

window.onfocus = function () {
	iSeeYou = 1;
	reloadbanners();
};

window.onblur = function () {
	iSeeYou = 0;
};
$(function () {
	$("[data-gamebannerserver]").each(function (index) {
		setupreloader($(this).data('gamebannerserver'), this);
	});
	reloadbanners(true);
});
