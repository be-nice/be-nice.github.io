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

//TIC-TAC

const WIN_PATTERNS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function checkWinner(board, player) {
  return WIN_PATTERNS.some((pattern) =>
    pattern.every((index) => board[index] === player),
  );
}

function findWinningMove(board, player) {
  for (let pattern of WIN_PATTERNS) {
    const [a, b, c] = pattern;
    const values = [board[a], board[b], board[c]];

    if (
      values.filter((v) => v === player).length === 2 &&
      values.includes("")
    ) {
      return pattern[values.indexOf("")];
    }
  }

  return null;
}

function computerMove(board, cells, message) {
  let moveIndex = findWinningMove(board, "O");

  if (moveIndex !== null) {
    board[moveIndex] = "O";
    cells[moveIndex].textContent = "O";
    message.textContent = "Computer wins!";
    return { board, gameOver: true };
  }

  moveIndex = findWinningMove(board, "X");

  if (moveIndex !== null) {
    board[moveIndex] = "O";
    cells[moveIndex].textContent = "O";
    return { board, gameOver: false };
  }

  const emptyIndices = board
    .map((val, idx) => (val === "" ? idx : null))
    .filter((val) => val !== null);

  if (emptyIndices.length === 0) return { board, gameOver: true };

  const randomIndex =
    emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
  board[randomIndex] = "O";
  cells[randomIndex].textContent = "O";

  if (checkWinner(board, "O")) {
    message.textContent = "Computer wins!";
    return { board, gameOver: true };
  }

  if (board.every((cell) => cell !== "")) {
    message.textContent = "It's a draw!";
    return { board, gameOver: true };
  }

  return { board, gameOver: false };
}

function resetGame(board, cells, message) {
  for (let i = 0; i < board.length; i++) {
    board[i] = "";
    cells[i].textContent = "";
  }
  message.textContent = "";

  return { board, gameOver: false };
}

document.addEventListener("DOMContentLoaded", () => {
  applyHashState();
  createEmbed();

  const btnSchedule = document.getElementById("btn_schedule");
  const btnCommands = document.getElementById("btn_commands");
  const cells = document.querySelectorAll(".cell");
  const message = document.getElementById("message");
  const btnRestart = document.getElementById("btn_reset_game");
  let board = ["", "", "", "", "", "", "", "", ""];
  let gameOver = false;

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

  cells.forEach((cell) => {
    cell.addEventListener("click", (e) => {
      e.stopPropagation();
      const index = cell.dataset.index;
      if (board[index] === "" && !gameOver) {
        board[index] = "X";
        cell.textContent = "X";

        if (checkWinner(board, "X")) {
          message.textContent = "You win!";
          gameOver = true;
          return;
        }

        if (board.every((cell) => cell !== "")) {
          message.textContent = "It's a draw!";
          gameOver = true;
          return;
        }

        setTimeout(() => {
          const result = computerMove(board, cells, message);
          board = result.board;
          gameOver = result.gameOver;
        }, 300);
      }
    });
  });

  btnRestart.addEventListener("click", (e) => {
    e.stopPropagation();
    const result = resetGame(board, cells, message);
    board = result.board;
    gameOver = result.gameOver;
  });
});

window.addEventListener("hashchange", applyHashState);
