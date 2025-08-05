function showFullscreen(section) {
  const portDiv = document.getElementById("portfolio");
  const streamDiv = document.getElementById("streaming");
  const schedule = document.getElementById("schedule-grid");
  const commands = document.getElementById("commands-page");

  resetLayout();

  if (section === "streaming") {
    portDiv.classList.add("hidden");
    streamDiv.classList.add("fullscreen");
    schedule.classList.add("hidden");
    location.hash = "#/streaming";
  } else if (section === "portfolio") {
    streamDiv.classList.add("hidden");
    portDiv.classList.add("fullscreen");
    schedule.classList.add("hidden");
    location.hash = "#/portfolio";
  } else if (section === "schedule-grid") {
    streamDiv.classList.add("hidden");
    portDiv.classList.add("hidden");
    schedule.classList.add("fullscreen");
    schedule.classList.remove("hidden");
    location.hash = "#/schedule";
  } else if (section === "commands") {
    streamDiv.classList.add("hidden");
    portDiv.classList.add("hidden");
    commands.classList.add("fullscreen");
    commands.classList.remove("hidden");
    location.hash = "#/commands";
  } else {
    location.hash = "#/";
  }
}

function resetLayout() {
  const portDiv = document.getElementById("portfolio");
  const streamDiv = document.getElementById("streaming");
  const schedule = document.getElementById("schedule-grid");
  const commands = document.getElementById("commands-page");

  portDiv.classList.remove("hidden", "fullscreen");
  streamDiv.classList.remove("hidden", "fullscreen");
  schedule.classList.remove("fullscreen");
  schedule.classList.add("hidden");
  commands.classList.remove("fullscreen");
  commands.classList.add("hidden");
}

function applyHashState() {
  const hash = window.location.hash;

  if (hash === "#/streaming") {
    showFullscreen("streaming");
  } else if (hash === "#/portfolio") {
    showFullscreen("portfolio");
  } else if (hash === "#/schedule") {
    showFullscreen("schedule-grid");
  } else if (hash === "#/commands") {
    showFullscreen("commands");
  } else {
    resetLayout();
  }
}

function createEmbed() {
  new Twitch.Embed("twitch-embed", {
    width: "100%",
    height: "100%",
    muted: true,
    layout: "video-with-chat",
    channel: "WillTheFoolLearn",
    parent: ["www.willthefool.work", "willthefool.work"],
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const portDiv = document.getElementById("portfolio");
  const streamDiv = document.getElementById("streaming");
  const btnSchedule = document.getElementById("btn_schedule");
  const schedule = document.getElementById("schedule-grid");
  const commands = document.getElementById("commands-page");
  const btnCommands = document.getElementById("btn_commands");

  applyHashState();
  createEmbed();

  portDiv.addEventListener("click", () => {
    if (portDiv.classList.contains("fullscreen")) {
      location.hash = "#/";
    } else {
      location.hash = "#/portfolio";
    }
  });

  streamDiv.addEventListener("click", () => {
    if (streamDiv.classList.contains("fullscreen")) {
      location.hash = "#/";
    } else {
      location.hash = "#/streaming";
    }
  });

  btnSchedule.addEventListener("click", (event) => {
    event.stopPropagation();

    if (schedule.classList.contains("fullscreen")) {
      location.hash = "#/";
    } else {
      location.hash = "#/schedule";
    }
  });

  schedule.addEventListener("click", () => {
    if (schedule.classList.contains("fullscreen")) {
      location.hash = "#/";
    } else {
      location.hash = "#/schedule";
    }
  });

  btnCommands.addEventListener("click", (event) => {
    event.stopPropagation();

    if (commands.classList.contains("fullscreen")) {
      location.hash = "#/";
    } else {
      location.hash = "#/commands";
    }
  });

  commands.addEventListener("click", () => {
    if (commands.classList.contains("fullscreen")) {
      location.hash = "#/";
    } else {
      location.hash = "#/commands";
    }
  });

  document.querySelectorAll(".time-block").forEach((el) => {
    const pdtTime = el.dataset.pdt;
    if (pdtTime) {
      const dateInPDT = new Date(pdtTime);

      const localTimeStr = dateInPDT.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      el.textContent = localTimeStr;
    }
  });
});

window.addEventListener("hashchange", applyHashState);
