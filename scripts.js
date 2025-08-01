function showFullscreen(section) {
  const portDiv = document.getElementById("portfolio");
  const streamDiv = document.getElementById("streaming");

  portDiv.classList.remove("hidden", "fullscreen");
  streamDiv.classList.remove("hidden", "fullscreen");

  if (section === "streaming") {
    portDiv.classList.add("hidden");
    streamDiv.classList.add("fullscreen");
    location.hash = "#/streaming";
  } else if (section === "portfolio") {
    streamDiv.classList.add("hidden");
    portDiv.classList.add("fullscreen");
    location.hash = "#/portfolio";
  } else {
    location.hash = "#/";
  }
}

function resetLayout() {
  const portDiv = document.getElementById("portfolio");
  const streamDiv = document.getElementById("streaming");

  portDiv.classList.remove("hidden", "fullscreen");
  streamDiv.classList.remove("hidden", "fullscreen");
}

function applyHashState() {
  const hash = window.location.hash;

  if (hash === "#/streaming") {
    showFullscreen("streaming");
  } else if (hash === "#/portfolio") {
    showFullscreen("portfolio");
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
});

window.addEventListener("hashchange", applyHashState);
