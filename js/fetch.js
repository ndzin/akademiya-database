const status = document.getElementById("discord-status");
const pfp = document.getElementsByClassName("pfp")[0];
fetch("https://api.lanyard.rest/v1/users/407649282200436738")
  .then((res) => res.json())
  .then((af) => {
    let discordstatus = [];

    af.data.activities.forEach((lonelil) => {
      let name = lonelil.name || null;
      let details = lonelil.details || null;
      let state = lonelil.state || null;
      discordstatus.push(`${name}
      ${details}
      ${state}
      `);
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
