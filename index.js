/// <reference types='../CTAutocomplete' />
/// <reference lib='es2015' />

import SkyblockUtilities from '../SkyblockUtilities/index';
import Area from '../SkyblockUtilities/enums/Area';
import Color from '../SkyblockUtilities/enums/Color';
import Settings from './configfile';
import Position from './Position';
import Corners from './Corners';
import FileUtilities from '../FileUtilities/main';
import request from '../requestV2/index';

const moduleName = 'DarkMonolithWaypoints';
const version = JSON.parse(FileLib.read(`${Config.modulesFolder}/${moduleName}/metadata.json`)).version;
const EggPositionsList = [
  new Corners(new Position(-16, -92), new Position(-15, -93), 236),
  new Corners(new Position(48, -163), new Position(49, -161), 202),
  new Corners(new Position(56, -26), new Position(57, -24), 214),
  new Corners(new Position(128, 57), new Position(129, 59), 187),
  new Corners(new Position(151, 190), new Position(151, 190), 196),
  new Corners(new Position(60, 182), new Position(61, 180), 204),
  new Corners(new Position(91, 130), new Position(92, 132), 187),
  new Corners(new Position(77, 162), new Position(78, 164), 160),
  new Corners(new Position(-10, 108), new Position(-9, 110), 162),
  new Corners(new Position(1, 23), new Position(2, 25), 183),
  new Corners(new Position(0, -2), new Position(1, 0), 170),
  new Corners(new Position(-95, -33), new Position(-93, -29), 201),
  new Corners(new Position(-93, -55), new Position(-92, -51), 221),
  new Corners(new Position(-65, -65), new Position(-64, -63), 206)
];
const air = 'minecraft:air';
const breakLine = '\n';
const startSeparator = `${Color.YELLOW}---------- ${Color.GOLD}${moduleName} ${Color.YELLOW}----------${breakLine}`;
const endSeparator = `${Color.YELLOW}---------------------------------------`;
let lastPos = [0, 0, 0];
let egg = null;

updateMessage();
checkForUpdates();

register('command', () => Settings.openGUI()).setName('dmw');
register('command', () => Settings.openGUI()).setName('darkmonolithwaypoints');

register('worldLoad', () => {
  egg = null;
  searchEgg();
});

register('renderWorld', () => {
  drawDragonEggTag();
});

register('chat', (event) => {
  if (ChatLib.getChatMessage(event).includes('You found the mysterious Dark Monolith.')) {
    egg = null;
  }
});

register('step', () => {
  searchEgg();
}).setDelay(5);

function searchEgg() {
  if (!isEnabled()) return;
  new Thread(() => {
    const playerX = Math.floor(Player.getX());
    const playerY = Math.floor(Player.getY());
    const playerZ = Math.floor(Player.getZ());
    let posJson = JSON.stringify([playerX, playerY, playerZ]);
    if (JSON.stringify(lastPos) !== posJson) {
      lastPos = JSON.parse(posJson);
      if (egg !== null) {
        const blockAtEgg = World.getBlockAt(egg.getX(), egg.getY(), egg.getZ()).getRegistryName();
        const blockUnderEgg = World.getBlockAt(egg.getX(), egg.getY() - 1, egg.getZ()).getRegistryName();
        if (blockUnderEgg !== air && blockAtEgg === air) {
          egg = null;
        }
      }
      EggPositionsList.forEach(eggPositions => {
        let corners1 = eggPositions.getCorners1();
        let corners2 = eggPositions.getCorners2();
        let corners1X = corners1.getX();
        let corners2X = corners2.getX();
        let corners1Z = corners1.getZ();
        let corners2Z = corners2.getZ();
        for (let x = Math.min(corners1X, corners2X); x <= Math.min(corners1X, corners2X); x++) {
          for (let z = Math.min(corners1Z, corners2Z); z <= Math.max(corners1Z, corners2Z); z++) {
            let block = World.getBlockAt(x, eggPositions.getY(), z);
            if (block.getRegistryName() === 'minecraft:dragon_egg') {
              if (egg === null) {
                ChatLib.chat(`${Color.GRAY}[${Color.DARK_PURPLE}${moduleName}${Color.GRAY}] ${Color.GREEN}A Dark Monolith appeared around you. Look around!`);
                World.playSound('mob.enderdragon.growl', 100, 0);
              }
              egg = block;
              return;
            }
          }
        }
      });
    }
  }).start(); 
}

function drawDragonEggTag() {
  if (isEnabled() && egg !== null) {
    Tessellator.drawString('Dark Monolith', egg.getX() + 0.5, egg.getY() + 1.25, egg.getZ() + 0.5, Renderer.DARK_PURPLE, true, 1, true);
  }
}

function isEnabled() {
  return Settings.enabled && SkyblockUtilities.getArea() === Area.DWARVEN_MINES;
}

function updateMessage() {
	const newVersion = `${Config.modulesFolder}/${moduleName}/updates/${version}`;
	if (!FileUtilities.exists(newVersion)) {
		FileUtilities.newFile(newVersion);
		const message = new Message(
			startSeparator,
			`${Color.DARK_GREEN}Changelog:${breakLine}`,
			`${Color.GRAY}??? ${Color.GREEN}added this changelog functionality${breakLine}`,
      `${Color.GRAY}??? ${Color.GREEN}added update info${breakLine}`,
			`${Color.GRAY}??? ${Color.GREEN}Dark Monoliths now will be removed if someone else has collected them${breakLine}${breakLine}`,
			`${Color.AQUA}Discord for suggestions, bug-reports, more modules and more:${breakLine}`,
			new TextComponent(`${Color.BLUE}https://discord.gg/W64ZJJQQxy${breakLine}`).setClick('open_url', 'https://discord.gg/W64ZJJQQxy'),
			endSeparator
		);
		ChatLib.chat(message);
	}
}

function checkForUpdates() {
  if (Settings.update) {
    request({
      url: 'https://raw.githubusercontent.com/Steinente/DarkMonolithWaypoints/master/metadata.json',
      json: true
    }).then(response => {
      if (JSON.parse(JSON.stringify(response)).version !== version) {
        const message = new Message(
          startSeparator,
          `${Color.RED}New version available! Download at:`,
          new TextComponent(`${Color.BLUE}https://github.com/Steinente/DarkMonolithWaypoints/releases/latest${breakLine}`)
            .setClick('open_url', 'https://github.com/Steinente/DarkMonolithWaypoints/releases/latest'),
          endSeparator
        );
        ChatLib.chat(message);
      }
    });
  }
}