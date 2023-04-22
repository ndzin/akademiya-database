const status = document.getElementById("discord-status");
const pfp = document.getElementsByClassName("pfp")[0];
axios.get("https://api.lanyard.rest/v1/users/407649282200436738")
  .then(async (res) => {
    let discordstatus = [];

    res.data.activities.forEach((stats) => {
      let name = stats.name || null;
      let state = stats.state || null;
      let details = (res.data.activities[1].details) || null;

      if (name != ""){
        discordstatus.push(name).toString();
      }
      if (state != ""){
        discordstatus.push(state).toString();
      }
      if (details != ""){
        discordstatus.push(details).toString();
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
