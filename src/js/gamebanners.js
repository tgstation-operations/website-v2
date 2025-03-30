const url = "https://tgstation13.org/serverinfo.json";
// const url = "/assets/js/serverinfo.json";
async function getData() {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const data = await response.json();
    data.servers.forEach((server) => {
      updateBanners(server);
    });
  } catch (error) {
    console.error(error.message);
  }
}

function updateBanners(server) {
  const banner = document.getElementById(`${server.identifier}`);
  let errortext = "Connection Error!";
  if (!server.hasOwnProperty("data")) {
    setBannerToErrorMode(banner, errortext);
    return;
  } else if (
    server.data.hasOwnProperty("ERROR") ||
    !server.data.hasOwnProperty("players") ||
    !server.data.hasOwnProperty("version")
  ) {
    if (server.data.errortext) {
      errortext = server.data.errortext;
    }
    setBannerToErrorMode(banner, errortext);
    return;
  }

  state2class(server.data.gamestate, banner);
  setRevision(server.data.revision, banner);
  setVersion(server.data, banner);
  setMap(server.data.map_name, banner);
  setTtl(server.data, banner);
  setIcons(
    server.data,
    banner.querySelector(`#${server.identifier}-hub`),
    banner.querySelector(`#${server.identifier}-bunker`)
  );
  return;
}

function setRevision(revision, banner) {
  banner.querySelector(".revision").textContent = revision.substr(0, 7);
}

function setVersion(data, banner) {
  let modestr = "Playing /tg/Station 13";
  if (data.hasOwnProperty("version")) modestr = "Playing " + data.version;
  if (data.hasOwnProperty("custom_event")) {
    modestr = "Playing Event " + data.custom_event;
  } else if (data.hasOwnProperty("mode")) {
    modestr += ' mode "' + data.mode + '"';
  }
  banner.querySelector(".version").textContent = modestr;
}

function setMap(map, banner) {
  banner.querySelector(".map").textContent = `The map is: ${map}`;
}

function setTtl(data, banner) {
  let ttl = "";
  ttl += data.players;
  let popcap = popcapstring(data);
  if (popcap) ttl += "/" + popcap;
  if (Number(data.round_duration))
    ttl += " " + secondsToTime(Number(data.round_duration));
  if (data.hasOwnProperty("shuttle_mode") && Number(data.shuttle_timer))
    ttl += " " + shuttleTime(data.shuttle_mode, Number(data.shuttle_timer));

  banner.querySelector(".status").textContent = ttl;
}

function popcapstring(serverdata) {
  let string = "∞";
  let popcap = Number(serverdata.popcap);
  let hpopcap = Number(serverdata.hard_popcap);
  let epopcap = Number(serverdata.extreme_popcap);
  if (epopcap) {
    if (hpopcap && hpopcap < epopcap) return hpopcap + "(" + epopcap + ")";
    string = epopcap;
  } else if (hpopcap) return hpopcap;
  else if (popcap) return popcap;
  return string;
}

function secondsToTime(seconds) {
  let output = "";
  if (seconds >= 86400) output += Math.floor(seconds / 86400) + ":";

  if (seconds >= 3600) output += pad(Math.floor(seconds / 3600) % 24, 2) + ":";

  output +=
    pad(Math.floor((seconds / 60) % 60), 2) +
    ":" +
    pad(Math.floor(seconds) % 60, 2);
  return output;
}

function shuttleTime(shuttlemode, shuttletime) {
  switch (shuttlemode) {
    case "igniting":
      return "IGN " + secondsToTime(shuttletime);
    case "recalled":
      return "RCL " + secondsToTime(shuttletime);
    case "called":
      return "ETA " + secondsToTime(shuttletime);
    case "docked":
      return "ETD " + secondsToTime(shuttletime);
    case "escape":
      return "ESC " + secondsToTime(shuttletime);
    case "stranded":
      return "ERR --:--";
    case "endgame: game over":
      return "FIN 00:00";
  }
  return "";
}

function state2class(state, target) {
  target.classList.remove("loading");
  switch (Number(state)) {
    case 2:
    case 3:
      target.classList.add("underway");
      target.classList.remove("lobby", "end");
      break;
    case 4:
      target.classList.add("end");
      target.classList.remove("underway", "lobby");
      break;
    default:
      target.classList.add("lobby");
      target.classList.remove("underway", "end");
  }
}

function setIcons(data, hub, bunker) {
  if (data.hasOwnProperty("hub") && true === data.hub) {
    hub.classList.remove("hidden");
  } else {
    hub.classList.add("hidden");
  }
  if (data.hasOwnProperty("bunkered") && true === data.bunkered) {
    bunker.classList.remove("hidden");
  } else {
    bunker.classList.add("hidden");
  }
}

function pad(n, width, z) {
  z = z || "0";
  n = n + "";
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

function setBannerToErrorMode(banner, errorText, undo = false) {
  if (!undo) {
    banner.classList.add("error");
    banner.classList.remove("underway", "lobby", "end");
    banner.querySelector(".version").textContent = errorText;
  } else {
  }
}

getData();

setInterval(function () {
  getData();
}, 4000);
