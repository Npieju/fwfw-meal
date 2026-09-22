"use strict";

const DISHES = [
  "岩塩かけハム", "魚醤のスープ", "マダジーン",
  "ダグザナナフシの甘辛煮", "炭火焼き魚", "テフノミの果醤",
  "豆とスナブタの丸ごと煮", "炙りチーズザリガニ", "梨のシロップ煮",
  "焼き山羊肉", "ホタテガーリック炭火焼き", "カボチャスープ",
];

const CHARACTERS = [
  [1,"カイ",4,4,2,4,4,3,4,4,4,4,4,3], [2,"ティアラ",1,2,4,1,2,3,1,4,3,2,2,3],
  [3,"ピーテル",4,3,3,4,2,4,3,4,4,4,3,4], [6,"ゲイツ",2,2,1,2,3,3,3,1,2,1,2,2],
  [7,"ジェスター",1,1,3,2,2,3,2,2,3,2,2,2], [8,"ゴライアス",4,3,1,4,3,2,4,1,2,4,3,2],
  [9,"ダンテ",3,1,3,3,1,3,3,1,3,3,1,3], [10,"ディートリヒ",2,2,3,2,2,4,2,3,4,3,2,4],
  [12,"エスメラルダ",2,3,3,1,3,4,2,4,4,3,2,4], [13,"ミカエラ",4,3,1,4,4,3,4,1,2,2,3,2],
  [14,"オルヘル",4,4,4,4,4,4,4,4,4,4,4,4], [15,"ディエゴ",2,1,2,4,2,2,3,2,3,3,3,1],
  [16,"ロレッタ",2,2,4,3,3,3,3,4,3,4,3,4], [17,"セテス",2,3,2,1,3,2,2,1,1,2,2,2],
  [18,"ニネ",2,2,3,1,2,2,2,3,1,3,1,2], [19,"セオドラ",3,3,2,1,3,2,3,3,2,3,3,2],
  [20,"ボナパルテ",2,4,1,3,4,3,2,2,4,1,4,3], [21,"トビヤス",4,4,1,4,4,3,4,2,1,2,2,3],
  [22,"リリアン",4,4,3,4,4,3,4,4,3,4,4,4], [23,"ライサンダー",4,4,2,3,3,2,3,3,2,3,3,3],
  [24,"レダ",3,3,1,3,3,3,3,1,3,1,3,3], [25,"シロッコ",4,3,1,2,3,3,4,1,1,2,1,3],
  [26,"バッカニア",1,1,2,3,3,4,3,1,4,1,3,2], [27,"ムウ(良成長)",1,1,4,1,1,4,1,2,3,2,1,3],
  [28,"オリンピア",3,2,3,1,2,2,3,3,2,4,2,2], [30,"ウーシュラ",1,2,3,1,1,3,1,2,3,1,2,3],
  [31,"ルルディヤー",3,3,3,1,4,4,4,3,1,3,1,3], [32,"シモン",2,2,4,2,1,2,1,3,3,3,2,3],
  [33,"フィアナ",4,4,2,2,1,1,2,1,1,1,1,1], [34,"アナトリア",3,3,3,3,3,3,3,3,3,3,3,3],
  [35,"ナジャ",2,2,4,3,3,4,3,3,4,3,3,3], [36,"サラン",3,3,2,3,3,3,3,2,3,2,3,3],
  [37,"ダイトウ",4,4,3,4,4,3,4,4,4,4,4,3], [38,"ハルヴィン",2,2,4,2,1,2,1,3,3,3,2,3],
  [39,"ヨーカイ",2,2,1,2,2,3,2,1,3,1,2,3], [40,"ペペ",3,4,3,3,4,3,3,4,3,3,4,3],
  [41,"ノクチュラ",2,1,2,3,2,2,3,2,2,3,2,1], [42,"ソフィア",4,4,4,4,4,4,4,4,4,4,4,4],
  [43,"ヌディーヌ",1,3,3,1,3,2,1,4,2,2,3,2], [44,"ザーコネ",1,1,4,1,2,4,2,1,4,1,1,4],
  [45,"マジーデ",3,3,1,3,3,3,3,1,3,1,3,3], [46,"ベンディッツ",3,3,3,4,3,3,3,3,4,3,4,3],
  [47,"イニオニ",3,3,2,2,1,1,1,2,2,2,2,3], [48,"ジャスミン",1,3,2,2,3,2,1,3,3,1,4,2],
  [49,"キロイカ",4,4,1,4,4,3,4,2,3,1,4,3], [50,"ヌッツォ",2,2,2,2,3,2,3,3,1,3,2,1],
  [51,"イオ",4,1,1,2,1,3,4,1,1,3,1,3], [52,"カターニャ",2,2,2,2,3,3,3,2,2,2,2,2],
  [53,"グザラン",4,4,2,4,4,4,4,2,4,2,4,4], [54,"セントリオン",4,4,4,1,4,4,4,4,2,4,2,4],
].map(([id, name, ...ratings]) => ({ id, name, ratings }));

const HERO_IDS = [1, 10, 19, 24];
const HEROES = HERO_IDS.map(id => CHARACTERS.find(character => character.id === id));
const CANDIDATES = CHARACTERS.filter(character => !HERO_IDS.includes(character.id));
const STORAGE_KEY = "fwfw-meal-active-v1";
const WEEK_KEY = "fwfw-meal-week-v1";

const roster = document.querySelector("#roster");
const activeCount = document.querySelector("#activeCount");
const weekTabs = document.querySelector("#weekTabs");
const weekPanel = document.querySelector("#weekPanel");

let activeIds = loadActiveIds();
let currentWeek = loadWeek();

function loadActiveIds() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (Array.isArray(saved)) {
      const valid = new Set(CANDIDATES.map(character => character.id));
      return new Set(saved.filter(id => valid.has(id)));
    }
  } catch (_) {}
  return new Set(CANDIDATES.map(character => character.id));
}

function loadWeek() {
  const saved = Number(localStorage.getItem(WEEK_KEY));
  return saved >= 1 && saved <= 4 ? saved : 1;
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...activeIds]));
    localStorage.setItem(WEEK_KEY, String(currentWeek));
  } catch (_) {}
}

function renderRoster() {
  roster.replaceChildren();
  for (const character of CANDIDATES) {
    const label = document.createElement("label");
    label.className = "unit-row";
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = activeIds.has(character.id);
    checkbox.setAttribute("aria-label", `${character.name}を候補に含める`);
    checkbox.addEventListener("change", () => {
      checkbox.checked ? activeIds.add(character.id) : activeIds.delete(character.id);
      saveState();
      updateActiveCount();
      renderMeals();
    });
    const name = document.createElement("span");
    name.className = "unit-name";
    name.textContent = character.name;
    label.append(checkbox, name);
    roster.append(label);
  }
  updateActiveCount();
}

function updateActiveCount() {
  activeCount.textContent = `${activeIds.size} / ${CANDIDATES.length}`;
}

function renderTabs() {
  weekTabs.replaceChildren();
  for (let week = 1; week <= 4; week++) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "week-tab";
    button.role = "tab";
    button.textContent = `週${week}`;
    button.setAttribute("aria-selected", String(week === currentWeek));
    button.tabIndex = week === currentWeek ? 0 : -1;
    button.addEventListener("click", () => setWeek(week));
    weekTabs.append(button);
  }
}

function setWeek(week) {
  if (!Number.isInteger(week) || week < 1 || week > 4) throw new Error("週は1から4で指定してください");
  currentWeek = week;
  saveState();
  renderTabs();
  renderMeals();
}

function candidatesFor(dishIndex, rating) {
  return CANDIDATES.filter(character => activeIds.has(character.id) && character.ratings[dishIndex] === rating);
}

function renderMeals() {
  weekPanel.replaceChildren();
  const start = (currentWeek - 1) * 3;
  for (let dishIndex = start; dishIndex < start + 3; dishIndex++) {
    const card = document.createElement("article");
    card.className = "meal-card";
    const heading = document.createElement("h2");
    heading.textContent = DISHES[dishIndex];
    const ratings = document.createElement("div");
    ratings.className = "hero-ratings";
    for (const hero of HEROES) {
      const item = document.createElement("div");
      item.className = "hero-rating";
      const name = document.createElement("span");
      name.className = "hero-name";
      name.textContent = hero.name;
      name.title = hero.name;
      const value = document.createElement("span");
      const rating = hero.ratings[dishIndex];
      value.className = `rating-value rating-${rating}`;
      value.textContent = String(rating);
      item.append(name, value);
      ratings.append(item);
    }
    const columns = document.createElement("div");
    columns.className = "candidate-grid";
    for (const rating of [4, 3, 2]) {
      const candidates = candidatesFor(dishIndex, rating);
      const column = document.createElement("section");
      column.className = "candidate-column";
      column.dataset.rating = String(rating);
      const title = document.createElement("h3");
      title.className = "candidate-heading";
      title.textContent = `評価${rating}`;
      const count = document.createElement("span");
      count.className = "candidate-count";
      count.textContent = `${candidates.length}人`;
      title.append(count);
      const list = document.createElement("ul");
      list.className = "candidate-list";
      if (candidates.length === 0) {
        const empty = document.createElement("li");
        empty.className = "empty";
        empty.textContent = "候補なし";
        list.append(empty);
      } else {
        for (const character of candidates) {
          const row = document.createElement("li");
          row.textContent = character.name;
          row.title = `ID ${character.id}`;
          list.append(row);
        }
      }
      column.append(title, list);
      columns.append(column);
    }
    card.append(heading, ratings, columns);
    weekPanel.append(card);
  }
}

function setAll(enabled) {
  activeIds = enabled ? new Set(CANDIDATES.map(character => character.id)) : new Set();
  saveState();
  renderRoster();
  renderMeals();
}

document.querySelector("#enableAll").addEventListener("click", () => setAll(true));
document.querySelector("#disableAll").addEventListener("click", () => setAll(false));

function registerWebMcpTools() {
  const context = document.modelContext;
  if (!context?.registerTool) return;
  const safeRegister = tool => {
    try { void Promise.resolve(context.registerTool(tool)).catch(() => {}); } catch (_) {}
  };
  safeRegister({
    name: "get_meal_planner_state",
    title: "食事会候補の状態を取得",
    description: "現在表示中の週と、有効になっている候補ユニットのIDを取得します。",
    inputSchema: { type: "object", properties: {}, additionalProperties: false },
    annotations: { readOnlyHint: true, untrustedContentHint: false },
    execute() { return { week: currentWeek, activeUnitIds: [...activeIds] }; },
  });
  safeRegister({
    name: "set_meal_week",
    title: "表示する週を変更",
    description: "食事会候補画面を指定した週へ切り替えます。",
    inputSchema: { type: "object", properties: { week: { type: "integer", minimum: 1, maximum: 4 } }, required: ["week"], additionalProperties: false },
    annotations: { readOnlyHint: false, untrustedContentHint: false },
    execute(input) { setWeek(input.week); return { week: currentWeek }; },
  });
  safeRegister({
    name: "set_units_enabled",
    title: "候補ユニットの有効状態を変更",
    description: "指定したユニットIDをまとめて有効または無効にします。",
    inputSchema: { type: "object", properties: { ids: { type: "array", items: { type: "integer" }, uniqueItems: true }, enabled: { type: "boolean" } }, required: ["ids", "enabled"], additionalProperties: false },
    annotations: { readOnlyHint: false, untrustedContentHint: false },
    execute(input) {
      const validIds = new Set(CANDIDATES.map(character => character.id));
      if (!Array.isArray(input.ids) || input.ids.some(id => !validIds.has(id))) throw new Error("候補ユニットのIDを指定してください");
      for (const id of input.ids) input.enabled ? activeIds.add(id) : activeIds.delete(id);
      saveState(); renderRoster(); renderMeals();
      return { enabled: input.enabled, updatedIds: input.ids, activeCount: activeIds.size };
    },
  });
}

renderRoster();
renderTabs();
renderMeals();
registerWebMcpTools();
