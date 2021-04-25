import { @Vigilant, @SwitchProperty } from 'Vigilance';

import Color from '../SkyblockUtilities/enums/Color';

const moduleName = 'DarkMonolithWaypoints';
const version = JSON.parse(FileLib.read(`${Config.modulesFolder}/${moduleName}/metadata.json`)).version;
const categoryDescription = `${Color.DARK_PURPLE}${moduleName} ${Color.GRAY}v${version} by ${Color.GOLD}Steinente ${Color.GRAY}/ ${Color.GOLD}EnteStein`;
const general = 'General';
const updates = 'Updates';

@Vigilant(moduleName)
class Settings {

    @SwitchProperty({
        name: 'Enabled',
        description: 'Shows waypoints for the Dark Monoliths',
        category: general,
        subcategory: general
    })
    enabled = true;

    @SwitchProperty({
        name: 'Notify when update',
        category: updates,
        subcategory: updates
    })
    update = true;

    constructor() {
        this.initialize(this);
        this.setCategoryDescription(general, categoryDescription);
        this.setCategoryDescription(updates, categoryDescription);
    }
}

export default new Settings;
