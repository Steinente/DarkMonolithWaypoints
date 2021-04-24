import { @Vigilant, @SwitchProperty } from 'Vigilance';

@Vigilant('DarkMonolithWaypoints')
class Settings {

    @SwitchProperty({
        name: 'Enabled',
        description: 'Shows waypoints for the Dark Monoliths',
        category: 'General',
        subcategory: 'General'
    })
    enabled = true;

    constructor() {
        this.initialize(this);
        this.setCategoryDescription('General', '&5BetterFetchurSolver &7v0.0.1 by &6Steinente &7/ &6EnteStein');
    }
}

export default new Settings;
