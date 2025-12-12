const size = 13;
const Tile = {
  FLOOR: 0,
  WALL: 1,
  DOOR: 2,
  STAIRS: 3,
};

const entityIcons = {
  hero: '勇',
  enemy: '怪',
  potion: '药',
  key: '钥',
  stairs: '↑',
  door: '门',
};

const enemies = {
  slime: { name: '史莱姆', hp: 30, atk: 12, def: 5, gold: 5, exp: 5 },
  bat: { name: '蝙蝠', hp: 45, atk: 18, def: 7, gold: 10, exp: 10 },
  soldier: { name: '士兵', hp: 70, atk: 25, def: 15, gold: 15, exp: 12 },
  knight: { name: '骑士', hp: 120, atk: 40, def: 25, gold: 30, exp: 25 },
};

const floors = [
  {
    map: [
      [1,1,1,1,1,1,1,1,1,1,1,1,1],
      [1,0,0,0,0,0,0,0,0,0,0,3,1],
      [1,0,1,0,1,1,1,1,1,1,0,0,1],
      [1,0,1,0,0,0,0,0,0,1,0,1,1],
      [1,0,1,1,1,1,1,1,0,1,0,0,1],
      [1,0,0,0,0,0,0,1,0,1,1,0,1],
      [1,1,1,1,1,1,0,1,0,0,0,0,1],
      [1,0,0,0,0,1,0,1,0,1,1,0,1],
      [1,0,1,1,0,1,0,0,0,1,0,0,1],
      [1,0,1,0,0,1,1,1,0,1,0,1,1],
      [1,0,0,0,0,0,0,0,0,1,0,0,1],
      [1,2,1,1,1,1,1,1,1,1,1,0,1],
      [1,1,1,1,1,1,1,1,1,1,1,1,1],
    ],
    heroStart: { x: 1, y: 1 },
    items: {
      '2,1': { type: 'potion', value: 30 },
      '4,4': { type: 'key', value: 1 },
      '8,2': { type: 'key', value: 1 },
      '10,5': { type: 'potion', value: 50 },
      '11,11': { type: 'key', value: 1 },
    },
    monsters: {
      '5,3': { type: 'slime' },
      '7,4': { type: 'slime' },
      '9,2': { type: 'bat' },
      '6,9': { type: 'soldier' },
      '10,9': { type: 'slime' },
    },
  },
  {
    map: [
      [1,1,1,1,1,1,1,1,1,1,1,1,1],
      [1,3,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,1,1,1,1,1,1,1,1,1,0,1],
      [1,0,0,0,0,0,0,0,0,0,1,0,1],
      [1,1,1,1,1,1,1,1,1,0,1,0,1],
      [1,0,0,0,0,0,0,0,1,0,1,0,1],
      [1,0,1,1,1,1,1,0,1,0,1,0,1],
      [1,0,1,0,0,0,1,0,1,0,1,0,1],
      [1,0,1,0,1,0,1,0,1,0,1,0,1],
      [1,0,1,0,1,0,1,0,1,0,1,2,1],
      [1,0,1,0,1,0,0,0,1,0,0,0,1],
      [1,0,0,0,1,1,1,1,1,1,1,1,1],
      [1,1,1,1,1,1,1,1,1,1,1,1,1],
    ],
    heroStart: { x: 1, y: 1 },
    items: {
      '2,10': { type: 'key', value: 2 },
      '6,5': { type: 'potion', value: 80 },
      '4,9': { type: 'potion', value: 50 },
      '8,6': { type: 'key', value: 1 },
    },
    monsters: {
      '3,5': { type: 'bat' },
      '4,7': { type: 'soldier' },
      '7,7': { type: 'soldier' },
      '8,1': { type: 'knight' },
      '10,6': { type: 'knight' },
      '10,10': { type: 'soldier' },
    },
  },
];

const state = {
  floor: 0,
  hero: {
    x: 0,
    y: 0,
    hp: 100,
    atk: 20,
    def: 10,
    gold: 0,
    exp: 0,
    keys: 1,
  },
};

const boardEl = document.getElementById('board');
const logEl = document.getElementById('log-text');
const statsEls = {
  hp: document.getElementById('hp'),
  atk: document.getElementById('atk'),
  def: document.getElementById('def'),
  gold: document.getElementById('gold'),
  exp: document.getElementById('exp'),
  keys: document.getElementById('keys'),
  floor: document.getElementById('floor'),
};

document.getElementById('reset').addEventListener('click', resetGame);
window.addEventListener('keydown', handleKey);

function resetGame() {
  state.floor = 0;
  state.hero = { x: floors[0].heroStart.x, y: floors[0].heroStart.y, hp: 100, atk: 20, def: 10, gold: 0, exp: 0, keys: 1 };
  state.items = cloneItems();
  state.monsters = cloneMonsters();
  logEl.innerHTML = '';
  log('勇者踏入魔塔，冒险开始！');
  render();
}

function cloneItems() {
  return floors.map((f) => ({ ...f.items }));
}

function cloneMonsters() {
  return floors.map((f) => ({ ...f.monsters }));
}

function render() {
  boardEl.innerHTML = '';
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const tile = floors[state.floor].map[y][x];
      const div = document.createElement('div');
      div.classList.add('tile');
      div.classList.add(tileClass(tile));
      const posKey = `${x},${y}`;

      if (state.hero.x === x && state.hero.y === y) {
        div.textContent = entityIcons.hero;
        div.classList.add('hero');
      } else if (state.items[state.floor][posKey]) {
        const item = state.items[state.floor][posKey];
        div.textContent = item.type === 'potion' ? '药' : '钥';
        div.classList.add('item');
      } else if (state.monsters[state.floor][posKey]) {
        div.textContent = '怪';
        div.classList.add('enemy');
      } else if (tile === Tile.STAIRS) {
        div.textContent = entityIcons.stairs;
        div.classList.add('stairs');
      } else if (tile === Tile.DOOR) {
        div.textContent = entityIcons.door;
        div.classList.add('door');
      }
      boardEl.appendChild(div);
    }
  }
  updateStats();
}

function tileClass(tile) {
  switch (tile) {
    case Tile.WALL:
      return 'wall';
    case Tile.DOOR:
      return 'door';
    case Tile.STAIRS:
      return 'stairs';
    default:
      return 'floor';
  }
}

function handleKey(event) {
  const keyMap = {
    ArrowUp: { x: 0, y: -1 },
    ArrowDown: { x: 0, y: 1 },
    ArrowLeft: { x: -1, y: 0 },
    ArrowRight: { x: 1, y: 0 },
  };

  if (event.key === ' ') {
    previewCombat();
    event.preventDefault();
    return;
  }

  if (event.key.toLowerCase() === 'r') {
    resetGame();
    return;
  }

  if (!(event.key in keyMap)) return;
  const delta = keyMap[event.key];
  moveHero(delta.x, delta.y);
}

function moveHero(dx, dy) {
  const nx = state.hero.x + dx;
  const ny = state.hero.y + dy;
  const tile = floors[state.floor].map[ny]?.[nx];
  if (tile === undefined || tile === Tile.WALL) return;

  const posKey = `${nx},${ny}`;
  const monster = state.monsters[state.floor][posKey];
  if (monster) {
    fight(monster, posKey);
    return;
  }

  const item = state.items[state.floor][posKey];
  if (item) {
    pickItem(item, posKey);
  }

  if (tile === Tile.DOOR) {
    if (state.hero.keys <= 0) {
      log('门被锁住，需要黄钥匙。');
      return;
    }
    state.hero.keys -= 1;
    log('使用一把黄钥匙，门被打开。');
    floors[state.floor].map[ny][nx] = Tile.FLOOR;
  }

  if (tile === Tile.STAIRS) {
    if (state.floor === floors.length - 1) {
      log('你登上塔顶，成功通关！');
      render();
      return;
    }
    state.floor += 1;
    state.hero.x = floors[state.floor].heroStart.x;
    state.hero.y = floors[state.floor].heroStart.y;
    log(`来到了第 ${state.floor + 1} 层。`);
    render();
    return;
  }

  state.hero.x = nx;
  state.hero.y = ny;
  render();
}

function pickItem(item, key) {
  if (item.type === 'potion') {
    state.hero.hp += item.value;
    log(`喝下药剂，生命 +${item.value}。`);
  } else if (item.type === 'key') {
    state.hero.keys += item.value;
    log(`获得 ${item.value} 把黄钥匙。`);
  }
  delete state.items[state.floor][key];
}

function fight(monsterData, key) {
  const enemy = { ...enemies[monsterData.type] };
  const damageToEnemy = Math.max(1, state.hero.atk - enemy.def);
  const damageToHero = Math.max(0, enemy.atk - state.hero.def);

  const turnsToKill = Math.ceil(enemy.hp / damageToEnemy);
  const totalDamage = damageToHero * (turnsToKill - 1);

  if (damageToHero === 0) {
    log(`轻松击败了 ${enemy.name}，未受到伤害。`);
  } else if (totalDamage >= state.hero.hp) {
    log(`${enemy.name} 太强大了，会致命！`);
    return;
  }

  state.hero.hp -= totalDamage;
  state.hero.gold += enemy.gold;
  state.hero.exp += enemy.exp;
  log(`击败 ${enemy.name}，损失 ${totalDamage} 生命，获得 ${enemy.gold} 金币 / ${enemy.exp} 经验。`);
  delete state.monsters[state.floor][key];
  render();
}

function previewCombat() {
  const directions = [
    { x: 0, y: -1 },
    { x: 0, y: 1 },
    { x: -1, y: 0 },
    { x: 1, y: 0 },
  ];
  for (const d of directions) {
    const nx = state.hero.x + d.x;
    const ny = state.hero.y + d.y;
    const monster = state.monsters[state.floor][`${nx},${ny}`];
    if (monster) {
      const enemy = { ...enemies[monster.type] };
      const damageToEnemy = Math.max(1, state.hero.atk - enemy.def);
      const damageToHero = Math.max(0, enemy.atk - state.hero.def);
      const turnsToKill = Math.ceil(enemy.hp / damageToEnemy);
      const totalDamage = damageToHero * (turnsToKill - 1);
      log(`预估：挑战 ${enemy.name} 需承受 ${totalDamage} 点伤害。`);
      return;
    }
  }
  log('附近没有可以预估的怪物。');
}

function log(text) {
  const p = document.createElement('div');
  p.textContent = text;
  logEl.prepend(p);
}

function updateStats() {
  statsEls.hp.textContent = state.hero.hp;
  statsEls.atk.textContent = state.hero.atk;
  statsEls.def.textContent = state.hero.def;
  statsEls.gold.textContent = state.hero.gold;
  statsEls.exp.textContent = state.hero.exp;
  statsEls.keys.textContent = state.hero.keys;
  statsEls.floor.textContent = `${state.floor + 1} / ${floors.length}`;
}

resetGame();
