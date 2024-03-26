class Play extends Phaser.Scene {

    constructor() {
        super({
            key: `play`
        });
    }

    create() {
        this.wall = this.add.image(100, 100, `wall`);
        this.wall.setTint(0xdd3333);

        this.dino = this.add.sprite(200, 200, `dino`);

        this.createAnimations();

        this.dino.setVelocityX(100);
        this.dino.play(`dino-moving`);
        this.dino.setCollideWorldBounds(true);

        this.cursors = this.input.keyboard.createCursorKeys();
    }

    update() {
        this.dino.setVelocity(0);

        if (this.cursors.left.isDown) {
            this.dino.setVelocityX(-300);
        }
        else if (this.cursors.right.isDown) {
            this.dino.setVelocityX(300);
        }

        if (this.cursors.up.isDown) {
            this.dino.setVelocityY(-300);
        }
        else if (this.cursors.down.isDown) {
            this.dino.setVelocityY(300);
        }

        if (this.dino.body.velocity.x !== 0 || this.dino.body.velocity.y !== 0) {
            this.dino.play(`dino-moving`, true);
        }
        else {
            this.dino.play(`avatar-idle`, true);
        }
        
    }

    createAnimations() {
        this.anims.create({
            key: `dino-moving`,
            frame: this.anims.generateFrameNumbers(`dino`, {
                start: 0,
                end: 2
            }),
            frameRate: 30,
            repeat: -1
        });

        this.dino.play(`dino-moving`);
    }

}