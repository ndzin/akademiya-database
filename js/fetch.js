const status = document.getElementById("discord-status");
const pfp = document.getElementsByClassName("pfp")[0];
fetch("https://api.lanyard.rest/v1/users/454920881177624576")
  .then((res) => res.json())
  .then((af) => {
    let discordstatus = [];

    af.data.activities.forEach((stats) => {
      let name = stats.name || null;
      let state = stats.state || null;
      let details = (stats.details) || null;

      if (name != ""){
        discordstatus.push(name);
      }
      if (state != ""){
        discordstatus.push(state);
      }
      if (details != ""){
        discordstatus.push(details);
      }
    });

    pfp.style.border = `3px solid #${
      af.data.discord_status == "online"
        ? "3ba55d"
        : af.data.discord_status == "idle"
        ? "faa819"
        : af.data.discord_status == "dnd"
        ? "ed4043"
        : af.data.discord_status == "offline"
        ? "737e8c"
        : null
    }`;
    status.innerText = discordstatus.join("\n");
  });

export { status, pfp };
