function toggleVisibility(el) {
  const portDiv = document.getElementById("portfolio");
  const streamDiv = document.getElementById("streaming");

  el.classList.toggle("hidden");
  if (portDiv.classList.contains("hidden")) {
    streamDiv.classList.add("fullscreen");
  } else {
    streamDiv.classList.remove("fullscreen");
  }
}

function createEnbed() {
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

  if (portDiv && streamDiv) {
    portDiv.addEventListener("click", () => toggleVisibility(streamDiv));
    streamDiv.addEventListener("click", () => toggleVisibility(portDiv));
  }

  createEnbed();
});
