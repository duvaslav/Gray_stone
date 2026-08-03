import { clearState, loadState, saveState } from "./core/state.js";

const app = document.querySelector("#app");

async function loadJson(path) {
  const response = await fetch(path);
  if (!response.ok) throw new Error(`Не удалось загрузить ${path}: ${response.status}`);
  return response.json();
}

function renderTitle(config, state) {
  app.innerHTML = `
    <section class="title-screen">
      <p class="eyebrow">${config.projectCode}</p>
      <h1>${config.title}</h1>
      <p class="lead">${config.logline}</p>
      <button class="primary-action" data-action="new-game">Начать новую игру</button>
      <p class="status-line">День ${state.day} · ${state.actionPoints} ОД · версия данных ${state.schemaVersion}</p>
    </section>
  `;

  app.querySelector('[data-action="new-game"]').addEventListener("click", () => {
    clearState();
    const newState = loadState(config);
    saveState(newState);
    renderTitle(config, newState);
  });
}

async function bootstrap() {
  try {
    const config = await loadJson("./src/data/game.config.json");
    const state = loadState(config);
    saveState(state);
    renderTitle(config, state);
  } catch (error) {
    console.error(error);
    app.innerHTML = `<section class="loading-screen"><h1>Ошибка загрузки</h1><p>${error.message}</p></section>`;
  }
}

bootstrap();
