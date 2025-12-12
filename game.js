const size = 13;
const Tile = {
  GROUND: 0,
  WALL: 1,
  DOOR_YELLOW: 2,
  DOOR_BLUE: 3,
  STAIRS_UP: 4,
  STAIRS_DOWN: 5,
};

const tileClassMap = {
  [Tile.GROUND]: 'ground',
  [Tile.WALL]: 'wall',
  [Tile.DOOR_YELLOW]: 'door-yellow',
  [Tile.DOOR_BLUE]: 'door-blue',
  [Tile.STAIRS_UP]: 'stairs-up',
  [Tile.STAIRS_DOWN]: 'stairs-down',
};

const enemies = {
  slime: { name: '绿史莱姆', hp: 35, atk: 18, def: 1, gold: 1, exp: 1, cls: 'slm' },
  bat: { name: '小蝙蝠', hp: 45, atk: 20, def: 4, gold: 3, exp: 2, cls: 'bat' },
  skeleton: { name: '骷髅士兵', hp: 55, atk: 28, def: 8, gold: 6, exp: 4, cls: 'skeleton' },
  knight: { name: '初级骑士', hp: 120, atk: 42, def: 20, gold: 14, exp: 10, cls: 'knight' },
};

const baseFloors = [
  {
    name: '1F',
    map: [
      [1,1,1,1,1,1,1,1,1,1,1,1,1],
      [1,0,0,0,0,0,0,0,0,0,0,4,1],
      [1,0,1,1,0,1,1,1,1,1,0,0,1],
      [1,0,1,0,0,0,0,0,0,1,0,1,1],
      [1,0,1,1,1,1,1,1,0,1,0,0,1],
      [1,0,0,0,0,0,0,1,0,1,1,0,1],
      [1,1,1,1,1,1,0,1,0,0,0,0,1],
      [1,0,0,0,0,1,0,1,0,1,1,0,1],
      [1,0,1,1,0,1,0,0,0,1,0,0,1],
      [1,0,1,0,0,1,1,1,0,1,0,1,1],
      [1,0,0,0,0,0,0,0,0,1,0,0,1],
      [1,2,1,1,1,1,1,1,1,1,1,5,1],
      [1,1,1,1,1,1,1,1,1,1,1,1,1],
    ],
    heroStart: { x: 1, y: 1 },
    items: {
      '2,1': { type: 'potion-red', value: 30 },
      '4,4': { type: 'key-yellow', value: 1 },
      '8,2': { type: 'key-yellow', value: 1 },
      '10,5': { type: 'potion-blue', value: 80 },
      '3,9': { type: 'gem-atk', value: 3 },
      '11,11': { type: 'key-blue', value: 1 },
    },
    monsters: {
      '5,3': { type: 'slime' },
      '7,4': { type: 'slime' },
      '9,2': { type: 'bat' },
      '6,9': { type: 'skeleton' },
      '10,9': { type: 'slime' },
    },
  },
  {
    name: '2F',
    map: [
      [1,1,1,1,1,1,1,1,1,1,1,1,1],
      [1,4,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,1,1,1,1,1,1,1,1,1,0,1],
      [1,0,0,0,0,0,0,0,0,0,1,0,1],
      [1,1,1,1,1,1,1,1,1,0,1,0,1],
      [1,0,0,0,0,0,0,0,1,0,1,0,1],
      [1,0,1,1,1,1,1,0,1,0,1,0,1],
      [1,0,1,0,0,0,1,0,1,0,1,0,1],
      [1,0,1,0,1,0,1,0,1,0,1,0,1],
      [1,0,1,0,1,0,1,0,1,0,1,2,1],
      [1,0,1,0,1,0,0,0,1,0,0,0,1],
      [1,0,0,0,1,1,1,1,1,1,1,5,1],
      [1,1,1,1,1,1,1,1,1,1,1,1,1],
    ],
    heroStart: { x: 1, y: 1 },
    items: {
      '2,10': { type: 'key-yellow', value: 2 },
      '6,5': { type: 'potion-blue', value: 80 },
      '4,9': { type: 'potion-red', value: 50 },
      '8,6': { type: 'gem-def', value: 3 },
      '3,3': { type: 'key-blue', value: 1 },
    },
    monsters: {
      '3,5': { type: 'bat' },
      '4,7': { type: 'skeleton' },
      '7,7': { type: 'skeleton' },
      '8,1': { type: 'knight' },
      '10,6': { type: 'knight' },
      '10,10': { type: 'skeleton' },
    },
  },
  {
    name: '3F',
    map: [
      [1,1,1,1,1,1,1,1,1,1,1,1,1],
      [1,4,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,1,1,1,1,1,1,1,1,1,0,1],
      [1,0,0,0,0,0,0,0,0,0,1,0,1],
      [1,1,1,1,1,1,1,1,1,0,1,0,1],
      [1,0,0,0,0,0,0,0,1,0,1,0,1],
      [1,0,1,1,1,1,1,0,1,0,1,0,1],
      [1,0,1,0,0,0,1,0,1,0,1,0,1],
      [1,0,1,0,1,0,1,0,1,0,1,0,1],
      [1,0,1,0,1,0,1,0,1,0,1,0,1],
      [1,0,1,0,1,0,0,0,1,0,0,0,1],
      [1,0,0,0,1,1,1,1,1,1,1,5,1],
      [1,1,1,1,1,1,1,1,1,1,1,1,1],
    ],
    heroStart: { x: 1, y: 1 },
    items: {
      '2,10': { type: 'key-yellow', value: 1 },
      '6,5': { type: 'gem-atk', value: 5 },
      '4,9': { type: 'potion-blue', value: 120 },
      '8,6': { type: 'gem-def', value: 5 },
      '3,3': { type: 'key-blue', value: 1 },
    },
    monsters: {
      '3,5': { type: 'skeleton' },
      '4,7': { type: 'knight' },
      '7,7': { type: 'knight' },
      '8,1': { type: 'knight' },
      '10,6': { type: 'knight' },
      '10,10': { type: 'knight' },
    },
  },
];

const state = {
  floor: 0,
  hero: {
    x: 0,
    y: 0,
    hp: 200,
    atk: 20,
    def: 10,
    gold: 0,
    exp: 0,
    keys: { yellow: 1, blue: 0 },
  },
  muted: false,
  maps: [],
  items: [],
  monsters: [],
};

const boardEl = document.getElementById('board');
const logEl = document.getElementById('log-text');
const statsEls = {
  hp: document.getElementById('hp'),
  atk: document.getElementById('atk'),
  def: document.getElementById('def'),
  gold: document.getElementById('gold'),
  exp: document.getElementById('exp'),
  keyY: document.getElementById('key-yellow'),
  keyB: document.getElementById('key-blue'),
  floor: document.getElementById('floor'),
};

document.getElementById('reset').addEventListener('click', resetGame);
document.getElementById('mute').addEventListener('click', toggleMute);
window.addEventListener('keydown', handleKey);

function resetGame() {
  state.floor = 0;
  state.hero = {
    x: baseFloors[0].heroStart.x,
    y: baseFloors[0].heroStart.y,
    hp: 200,
    atk: 20,
    def: 10,
    gold: 0,
    exp: 0,
    keys: { yellow: 1, blue: 0 },
  };
  state.maps = cloneMaps();
  state.items = cloneItems();
  state.monsters = cloneMonsters();
  logEl.innerHTML = '';
  log('勇者踏入魔塔，熟悉的像素味道扑面而来。');
  render();
}

function cloneItems() {
  return baseFloors.map((f) => ({ ...f.items }));
}

function cloneMonsters() {
  return baseFloors.map((f) => ({ ...f.monsters }));
}

function cloneMaps() {
  return baseFloors.map((f) => f.map.map((row) => [...row]));
}

function render() {
  boardEl.innerHTML = '';
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const tile = state.maps[state.floor][y][x];
      const div = document.createElement('div');
      div.classList.add('tile', tileClassMap[tile] || 'ground');
      const posKey = `${x},${y}`;

      if (state.hero.x === x && state.hero.y === y) {
        div.classList.add('hero');
      } else if (state.items[state.floor][posKey]) {
        const item = state.items[state.floor][posKey];
        div.classList.add('item', item.type);
      } else if (state.monsters[state.floor][posKey]) {
        const monster = enemies[state.monsters[state.floor][posKey].type];
        div.classList.add('enemy', monster.cls);
      }
      boardEl.appendChild(div);
    }
  }
  updateStats();
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

  if (event.key.toLowerCase() === 's') {
    toggleMute();
    return;
  }

  if (!(event.key in keyMap)) return;
  const delta = keyMap[event.key];
  moveHero(delta.x, delta.y);
}

function moveHero(dx, dy) {
  const nx = state.hero.x + dx;
  const ny = state.hero.y + dy;
  const tile = state.maps[state.floor][ny]?.[nx];
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

  if (tile === Tile.DOOR_YELLOW) {
    if (state.hero.keys.yellow <= 0) {
      log('黄门需要黄钥匙。');
      return;
    }
    state.hero.keys.yellow -= 1;
    log('使用一把黄钥匙，门被打开。');
    state.maps[state.floor][ny][nx] = Tile.GROUND;
  }

  if (tile === Tile.DOOR_BLUE) {
    if (state.hero.keys.blue <= 0) {
      log('蓝门需要蓝钥匙。');
      return;
    }
    state.hero.keys.blue -= 1;
    log('使用一把蓝钥匙，门被打开。');
    state.maps[state.floor][ny][nx] = Tile.GROUND;
  }

  if (tile === Tile.STAIRS_UP) {
    if (state.floor === baseFloors.length - 1) {
      log('你登上塔顶，经典魔塔完成度 99%！');
      render();
      return;
    }
    state.floor += 1;
    const spawn = findLandingSpot(state.floor, Tile.STAIRS_DOWN);
    state.hero.x = spawn.x;
    state.hero.y = spawn.y;
    log(`来到了第 ${baseFloors[state.floor].name}。`);
    render();
    return;
  }

  if (tile === Tile.STAIRS_DOWN) {
    if (state.floor === 0) return;
    state.floor -= 1;
    const spawn = findLandingSpot(state.floor, Tile.STAIRS_UP);
    state.hero.x = spawn.x;
    state.hero.y = spawn.y;
    log(`回到了第 ${baseFloors[state.floor].name}。`);
    render();
    return;
  }

  state.hero.x = nx;
  state.hero.y = ny;
  render();
}

function pickItem(item, key) {
  switch (item.type) {
    case 'potion-red':
      state.hero.hp += item.value;
      log(`喝下红药，生命 +${item.value}。`);
      break;
    case 'potion-blue':
      state.hero.hp += item.value;
      log(`喝下蓝药，生命 +${item.value}。`);
      break;
    case 'key-yellow':
      state.hero.keys.yellow += item.value;
      log(`获得 ${item.value} 把黄钥匙。`);
      break;
    case 'key-blue':
      state.hero.keys.blue += item.value;
      log(`获得 ${item.value} 把蓝钥匙。`);
      break;
    case 'gem-atk':
      state.hero.atk += item.value;
      log(`攻击提升 +${item.value}。`);
      break;
    case 'gem-def':
      state.hero.def += item.value;
      log(`防御提升 +${item.value}。`);
      break;
    default:
      break;
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
    log(`轻松击败了 ${enemy.name}，未受伤。`);
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
      log(`预估：挑战 ${enemy.name} 需承受 ${totalDamage} 伤害。`);
      return;
    }
  }
  log('附近没有可以预估的怪物。');
}

function log(text) {
  const p = document.createElement('div');
  p.textContent = text;
  logEl.appendChild(p);
}

function updateStats() {
  statsEls.hp.textContent = state.hero.hp;
  statsEls.atk.textContent = state.hero.atk;
  statsEls.def.textContent = state.hero.def;
  statsEls.gold.textContent = state.hero.gold;
  statsEls.exp.textContent = state.hero.exp;
  statsEls.keyY.textContent = state.hero.keys.yellow;
  statsEls.keyB.textContent = state.hero.keys.blue;
  statsEls.floor.textContent = `${baseFloors[state.floor].name} / ${baseFloors.length}F`;
}

function toggleMute() {
  state.muted = !state.muted;
  document.getElementById('mute').textContent = state.muted ? '开音' : '静音';
}

function findLandingSpot(floorIdx, tileType) {
  const map = state.maps[floorIdx];
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] === tileType) {
        return { x, y };
      }
    }
  }
  return { ...baseFloors[floorIdx].heroStart };
}

resetGame();
