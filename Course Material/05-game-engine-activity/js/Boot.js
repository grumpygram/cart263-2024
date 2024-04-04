class Boot extends Phaser.Scene {
    constructor() {
        super({
            key: `boot`
        });
    }

    preload() {
        //Load assets here
        this.load.image(`avatar`, `assets/images/avatar.png`);
        this.load.image(`thumbs-down`, `assets/images/thumbs-down.png`);
        this.load.image(`thumbs-up`, `assets/images/thumbs-up.png`);

        this.load.on(`complete`, () => {
            this.scene.start(`play`);
        });
    }

    create() {

    }

    update() {

    }
}