import { @Vigilant, @SwitchProperty } from 'Vigilance';

const categoryDescription = '&5DarkMonolithWaypoints &7v0.0.1 by &6Steinente &7/ &6EnteStein';

@Vigilant('DarkMonolithWaypoints')
class Settings {

    @SwitchProperty({
        name: 'Enabled',
        description: 'Shows waypoints for the Dark Monoliths',
        category: 'General',
        subcategory: 'General'
    })
    enabled = true;

    @SwitchProperty({
        name: 'Notify when update',
        category: 'Updates',
        subcategory: 'Updates'
    })
    update = true;

    constructor() {
        this.initialize(this);
        this.setCategoryDescription('General', categoryDescription);
        this.setCategoryDescription('Updates', categoryDescription);
    }
}

export default new Settings;
