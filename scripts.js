const sectionMap = {
  portfolio: document.getElementById("portfolio"),
  streaming: document.getElementById("streaming"),
  schedule: document.getElementById("schedule-grid"),
  commands: document.getElementById("commands-page"),
};

function resetLayout() {
  sectionMap.portfolio.classList.remove("hidden", "fullscreen");
  sectionMap.streaming.classList.remove("hidden", "fullscreen");

  sectionMap.schedule.classList.remove("fullscreen");
  sectionMap.schedule.classList.add("hidden");

  sectionMap.commands.classList.remove("fullscreen");
  sectionMap.commands.classList.add("hidden");
}

function showFullscreen(section) {
  Object.entries(sectionMap).forEach(([_, el]) => {
    el.classList.remove("fullscreen");
    el.classList.add("hidden");
  });

  const el = sectionMap[section];
  if (el) {
    el.classList.remove("hidden");
    el.classList.add("fullscreen");

    location.hash = `#/${section}`;
  } else {
    location.hash = "#/";
  }
}

function applyHashState() {
  const hash = window.location.hash.replace("#/", "");

  if (sectionMap[hash]) {
    showFullscreen(hash);
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
  applyHashState();
  createEmbed();

  const btnSchedule = document.getElementById("btn_schedule");
  const btnCommands = document.getElementById("btn_commands");

  sectionMap.portfolio.addEventListener("click", () => {
    location.hash = sectionMap.portfolio.classList.contains("fullscreen")
      ? "#/"
      : "#/portfolio";
  });

  sectionMap.streaming.addEventListener("click", () => {
    location.hash = sectionMap.streaming.classList.contains("fullscreen")
      ? "#/"
      : "#/streaming";
  });

  [btnSchedule, sectionMap.schedule].forEach((el) =>
    el.addEventListener("click", (e) => {
      e.stopPropagation();
      location.hash = sectionMap.schedule.classList.contains("fullscreen")
        ? "#/"
        : "#/schedule";
    }),
  );

  [btnCommands, sectionMap.commands].forEach((el) =>
    el.addEventListener("click", (e) => {
      e.stopPropagation();
      location.hash = sectionMap.commands.classList.contains("fullscreen")
        ? "#/"
        : "#/commands";
    }),
  );

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
