class Boot extends Phaser.Scene {
    constructor() {
        super({
            key: `boot`
        });
    };

    preload() {
        this.load.image(`wall`, `assets/images/wall.png`);
        this.load.spritesheet(`dino`, `assets/images/dino.png`, {
            frameWidth: 32,
            frameHeight: 32,
            endFrame: 2
        });

        this.load.on(`complete`, () => {
            this.scene.start(`play`);
        });
    }

    create() {
        let style = { 
            fontFamily: `sans-serif`, 
            fontSize: `40px`, 
            color: `#ffffff`
        };
        let loadingString = `Loading...`;
        this.add.text(100, 200, loadingString, style);
    
        this.scene.start(`play`);
    }

    update() {

    }
}