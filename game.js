var config = {
    type: Phaser.AUTO,
    width: 2000, // Set a default width
    height: 600,
    scale: {
        mode: Phaser.Scale.RESIZE, // Scale the canvas to fit the screen size
        parent: 'phaser-example', // Replace with the ID of your HTML element
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 250 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var player;
var cursors;
var leftButton, rightButton, jumpButton;
var lasers;





var game = new Phaser.Game(config);

function preload() {
    this.load.image('sky', 'sky.png');
    this.load.spritesheet('dude', 'dude.png', { frameWidth: 113, frameHeight: 138 });
    this.load.spritesheet('jumpdude', 'jumpdude.png', { frameWidth: 105, frameHeight: 138 });
    this.load.spritesheet('idledude', 'idledude.png', { frameWidth: 90.6, frameHeight: 138 });
    this.load.image('ground', 'ground.png');
    this.load.image('wall', 'wall.png');
    this.load.image('platform', 'ground.png');
    this.load.spritesheet('enemy', 'enemy.png', { frameWidth: 228, frameHeight: 210 });
    this.load.spritesheet('bouncyenemy', 'bouncyenemy.png', { frameWidth: 128, frameHeight: 128 });
    this.load.spritesheet('bluebouncyenemy', 'bluebouncyenemy.png', { frameWidth: 128, frameHeight: 128 });
    this.load.spritesheet('redbouncyenemy', 'redbouncyenemy.png', { frameWidth: 128, frameHeight: 128 });
    this.load.image('purpleLaser', 'laser.png'); // Replace 'purpleLaser.png' with your actual purple laser image file


}

function create() {
   // Add background image
     let bg = this.add.image(0, 0, 'sky').setOrigin(0, 0).setScale(6);

 // Set camera bounds based on the whole world
    this.physics.world.setBounds(0, 0, bg.displayWidth * bg.scaleX, bg.displayHeight * bg.scaleY);

    // Adjust camera bounds to follow the player within the world size
this.cameras.main.setBounds(0, 0, config.width - 50, config.height +200);

lasers = this.physics.add.group();


function shootLaser(enemy) {
    var laser = lasers.create(enemy.x, enemy.y, 'purpleLaser');
    laser.setVelocityX(enemy.flipX ? -2000 : 2000);
    laser.setCollideWorldBounds(true);
}

this.time.addEvent({
    delay: 2000,
    callback: function () {
        shootLaser(enemyLeft);
        shootLaser(enemyRight);
        // Add more enemy references if needed
    },
    loop: true
});








    // Set physics world bounds to include the wall
    this.physics.world.setBounds(0, 0, 2000 + bg.displayWidth * bg.scaleX, bg.displayHeight * bg.scaleY);

// Create ground
let ground = this.physics.add.staticSprite(0, 700, 'ground').setOrigin(0, 0).setDisplaySize(config.width, 100).refreshBody();

// Create wall at the end of the ground
let wall = this.physics.add.staticSprite(config.width - 50, 100, 'wall').setOrigin(0, 0).setDisplaySize(50, config.height).refreshBody();

let platform = this.physics.add.staticSprite(400, 500, 'platform').setDisplaySize(200, 50).refreshBody();
let platform1 = this.physics.add.staticSprite(750, 500, 'platform').setDisplaySize(200, 50).refreshBody();
let platform2 = this.physics.add.staticSprite(1150, 500, 'platform').setDisplaySize(200, 50).refreshBody();
let platform3 = this.physics.add.staticSprite(1550, 500, 'platform').setDisplaySize(200, 50).refreshBody();
let platform4 = this.physics.add.staticSprite(1350, 300, 'platform').setDisplaySize(200, 50).refreshBody();
let platform5 = this.physics.add.staticSprite(950, 300, 'platform').setDisplaySize(200, 50).refreshBody();
let platform6 = this.physics.add.staticSprite(550, 300, 'platform').setDisplaySize(200, 50).refreshBody();




    // Set up player
    player = this.physics.add.sprite(config.width / 2, config.height - 50, 'dude');
    player.setSize(40, 0); // Adjust the width and height as needed
    player.setBounce(0);
    player.setCollideWorldBounds(true);


  // Create enemies on the left and right edges
    let enemyLeft = this.physics.add.sprite(50, config.height - 50, 'enemy');
    let enemyRight = this.physics.add.sprite(config.width - 130, config.height  + 20, 'enemy');

    // Set properties for the enemies
    enemyLeft.setCollideWorldBounds(true);
    enemyRight.setCollideWorldBounds(true);

    // Set the scale of the enemies to make them smaller
    enemyLeft.setScale(0.8); // Adjust the scale value as needed
    enemyRight.setScale(0.8); // Adjust the scale value as needed

    // Add static bodies to make enemies stand on the ground
    this.physics.add.existing(enemyLeft, true);
    this.physics.add.existing(enemyRight, true);

  // Add collision between the ground and enemies
    this.physics.add.collider([enemyLeft, enemyRight], ground);

 // green bouncy enemy
    let bouncingEnemy1 = this.physics.add.sprite(1100, 250, 'bouncyenemy');
    let bouncingEnemy2 = this.physics.add.sprite(1220, 250, 'bouncyenemy');
    let bouncingEnemy3 = this.physics.add.sprite(1150, 250, 'bouncyenemy');
    let bouncingEnemy4 = this.physics.add.sprite(1080, 250, 'bouncyenemy');
    let bouncingEnemy5 = this.physics.add.sprite(1200, 250, 'bouncyenemy');


    // blue bouncy enemy

    let bluebouncyenemy1 = this.physics.add.sprite(1469, 250, 'bluebouncyenemy');
    let bluebouncyenemy2 = this.physics.add.sprite(1630, 250, 'bluebouncyenemy');
    let bluebouncyenemy3 = this.physics.add.sprite(1539, 250, 'bluebouncyenemy');
    let bluebouncyenemy4 = this.physics.add.sprite(1479, 250, 'bluebouncyenemy');
    let bluebouncyenemy5 = this.physics.add.sprite(1569, 250, 'bluebouncyenemy');

       // red bouncy enemy

        let redbouncyenemy1 = this.physics.add.sprite(680, 250, 'redbouncyenemy');
        let redbouncyenemy2 = this.physics.add.sprite(800, 250, 'redbouncyenemy');
        let redbouncyenemy3 = this.physics.add.sprite(730, 250, 'redbouncyenemy');
        let redbouncyenemy4 = this.physics.add.sprite(690, 250, 'redbouncyenemy');
        let redbouncyenemy5 = this.physics.add.sprite(780, 250, 'redbouncyenemy');

    bouncingEnemy1.setBounce(0.2); // Set bounce value to make the enemy bounce
    bouncingEnemy2.setBounce(0.2);
    bouncingEnemy3.setBounce(0.2);
    bouncingEnemy4.setBounce(1);
    bouncingEnemy5.setBounce(1);

    bluebouncyenemy1.setBounce(0.2); // Set bounce value to make the enemy bounce
    bluebouncyenemy2.setBounce(0.2);
    bluebouncyenemy3.setBounce(0.2);
    bluebouncyenemy4.setBounce(1);
    bluebouncyenemy5.setBounce(1);

    redbouncyenemy1.setBounce(0.2); // Set bounce value to make the enemy bounce
    redbouncyenemy2.setBounce(0.2);
    redbouncyenemy3.setBounce(0.2);
    redbouncyenemy4.setBounce(1);
    redbouncyenemy5.setBounce(1);

    bouncingEnemy1.setCollideWorldBounds(true);
    bouncingEnemy2.setCollideWorldBounds(true);
    bouncingEnemy3.setCollideWorldBounds(true);
    bouncingEnemy4.setCollideWorldBounds(true);
    bouncingEnemy5.setCollideWorldBounds(true);

    bluebouncyenemy1.setCollideWorldBounds(true);
    bluebouncyenemy2.setCollideWorldBounds(true);
    bluebouncyenemy3.setCollideWorldBounds(true);
    bluebouncyenemy4.setCollideWorldBounds(true);
    bluebouncyenemy5.setCollideWorldBounds(true);

    redbouncyenemy1.setCollideWorldBounds(true);
    redbouncyenemy2.setCollideWorldBounds(true);
    redbouncyenemy3.setCollideWorldBounds(true);
    redbouncyenemy4.setCollideWorldBounds(true);
    redbouncyenemy5.setCollideWorldBounds(true);

    bouncingEnemy1.setScale(1);
    bouncingEnemy2.setScale(1);
    bouncingEnemy3.setScale(1);
    bouncingEnemy4.setScale(1);
    bouncingEnemy5.setScale(1);

    bluebouncyenemy1.setScale(1);
    bluebouncyenemy2.setScale(1);
    bluebouncyenemy3.setScale(1);
    bluebouncyenemy4.setScale(1);
    bluebouncyenemy5.setScale(1);

    redbouncyenemy1.setScale(1);
    redbouncyenemy2.setScale(1);
    redbouncyenemy3.setScale(1);
    redbouncyenemy4.setScale(1);
    redbouncyenemy5.setScale(1);

    this.physics.add.existing(bouncingEnemy1, false);
    this.physics.add.existing(bouncingEnemy2, false);
    this.physics.add.existing(bouncingEnemy3, false);
    this.physics.add.existing(bouncingEnemy4, false);
    this.physics.add.existing(bouncingEnemy5, false);

    this.physics.add.existing(bluebouncyenemy1, false);
    this.physics.add.existing(bluebouncyenemy2, false);
    this.physics.add.existing(bluebouncyenemy3, false);
    this.physics.add.existing(bluebouncyenemy4, false);
    this.physics.add.existing(bluebouncyenemy5, false);

        this.physics.add.existing(redbouncyenemy1, false);
        this.physics.add.existing(redbouncyenemy2, false);
        this.physics.add.existing(redbouncyenemy3, false);
        this.physics.add.existing(redbouncyenemy4, false);
        this.physics.add.existing(redbouncyenemy5, false);


    this.physics.add.collider([bouncingEnemy1, bouncingEnemy2, bouncingEnemy3, bouncingEnemy4, bouncingEnemy5], [platform2, ground]);

    this.physics.add.collider([bluebouncyenemy1, bluebouncyenemy2, bluebouncyenemy3, bluebouncyenemy4, bluebouncyenemy5], [platform3, ground]);

    this.physics.add.collider([redbouncyenemy1, redbouncyenemy2, redbouncyenemy3, redbouncyenemy4, redbouncyenemy5], [platform1, ground]);


    // Add animation for bouncing enemies
    this.anims.create({
        key: 'bouncingEnemyAnimation',
        frames: this.anims.generateFrameNumbers('bouncyenemy', { start: 0, end: 13 }),
        frameRate: 10,
        repeat: -1
    });

    bouncingEnemy1.anims.play('bouncingEnemyAnimation', true);
    bouncingEnemy2.anims.play('bouncingEnemyAnimation', true);
    bouncingEnemy3.anims.play('bouncingEnemyAnimation', true);
    bouncingEnemy4.anims.play('bouncingEnemyAnimation', true);
    bouncingEnemy5.anims.play('bouncingEnemyAnimation', true);

    // animation for blue bouncing enemies
       // Add animation for bouncing enemies
        this.anims.create({
            key: 'BluebouncingEnemyAnimation',
            frames: this.anims.generateFrameNumbers('bluebouncyenemy', { start: 0, end: 13 }),
            frameRate: 10,
            repeat: -1
        });

        bluebouncyenemy1.anims.play('BluebouncingEnemyAnimation', true);
        bluebouncyenemy2.anims.play('BluebouncingEnemyAnimation', true);
        bluebouncyenemy3.anims.play('BluebouncingEnemyAnimation', true);
        bluebouncyenemy4.anims.play('BluebouncingEnemyAnimation', true);
        bluebouncyenemy5.anims.play('BluebouncingEnemyAnimation', true);

          // animation for red bouncing enemies
               // Add animation for bouncing enemies
                this.anims.create({
                    key: 'RedbouncingEnemyAnimation',
                    frames: this.anims.generateFrameNumbers('redbouncyenemy', { start: 0, end: 13 }),
                    frameRate: 10,
                    repeat: -1
                });

                redbouncyenemy1.anims.play('RedbouncingEnemyAnimation', true);
                redbouncyenemy2.anims.play('RedbouncingEnemyAnimation', true);
                redbouncyenemy3.anims.play('RedbouncingEnemyAnimation', true);
                redbouncyenemy4.anims.play('RedbouncingEnemyAnimation', true);
                redbouncyenemy5.anims.play('RedbouncingEnemyAnimation', true);


    // Create enemy animations
    this.anims.create({
        key: 'enemyAnimation',
        frames: this.anims.generateFrameNumbers('enemy', { start: 0, end: 16 }), // Adjust end frame based on the number of frames in your sprite
        frameRate: 10,
        repeat: -1
    });

    // Play the enemy animation on both enemies
    enemyLeft.anims.play('enemyAnimation', true);
    enemyRight.anims.play('enemyAnimation', true);

     enemyRight.setFlipX(true);





    // Create player animations
       this.anims.create({
           key: 'left',
           frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 2 }),  // Adjust end frame based on the number of frames in your sprite
           frameRate: 10,
           repeat: -1
       });

       this.anims.create({
           key: 'turn',
           frames: [{ key: 'dude', frame: 1 }],  // Adjust frame based on the number of frames in your sprite
           frameRate: 20
       });

       this.anims.create({
           key: 'right',
           frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 2 }),  // Adjust start and end frames based on the number of frames in your sprite
           frameRate: 10,
           repeat: -1
       });

  this.anims.create({
        key: 'jump',
        frames: this.anims.generateFrameNumbers('jumpdude', { start: 0, end: 3, first: 0 }),
        frameRate: 10,
        repeat: -1  // Set repeat to -1 for continuous looping
    });


        this.anims.create({
             key: 'idle',
             frames: this.anims.generateFrameNumbers('idledude', { start: 0, end: 7, first: 0 }),
             frameRate: 10,
             repeat: -1  // Set repeat to -1 for continuous looping
         });
         player.anims.play('idle');



    // Follow the player with the camera
    this.cameras.main.startFollow(player, true, 0.5, 0.5);

    // Create cursor keys
    cursors = this.input.keyboard.createCursorKeys();
        // Add collision between the player and the ground
        this.physics.add.collider(player, [ground, wall, platform, platform1, platform2, platform3, platform4, platform5, platform6]);


    // Create on-screen buttons
      leftButton = this.add.sprite(50, 600, 'leftButton').setInteractive();
      rightButton = this.add.sprite(150, 600, 'rightButton').setInteractive();
      jumpButton = this.add.sprite(700, 600, 'jumpButton').setInteractive();

      // Scale the buttons as needed
      leftButton.setScale(2);
      rightButton.setScale(2);
      jumpButton.setScale(2);

      leftButton.setAlpha(0.5);
      rightButton.setAlpha(0.5);
      jumpButton.setAlpha(0.5);


      // Add button events
      leftButton.on('pointerdown', function () {
          cursors.left.isDown = true;
      });

      leftButton.on('pointerup', function () {
          cursors.left.isDown = false;
      });

      rightButton.on('pointerdown', function () {
          cursors.right.isDown = true;
      });

      rightButton.on('pointerup', function () {
          cursors.right.isDown = false;
      });

      jumpButton.on('pointerdown', function () {
          if (player.body.onFloor()) {
              player.setVelocityY(-500);
          }
      });
  }

function update() {
    // Update the position of the on-screen buttons with the camera
    leftButton.x = 50 + this.cameras.main.scrollX;
    rightButton.x = 150 + this.cameras.main.scrollX;
    jumpButton.x = 650 + this.cameras.main.scrollX;


 leftButton.y = 300 + this.cameras.main.scrollY;
    rightButton.y = 300 + this.cameras.main.scrollY;
    jumpButton.y = 300 + this.cameras.main.scrollY;

    // Player movement code
    if (cursors.left.isDown) {
        // Left movement
        player.setVelocityX(-160);
        player.flipX = true;
        if (player.body.onFloor()) {
            player.anims.play('left', true);
        }
    } else if (cursors.right.isDown) {
        // Right movement
        player.setVelocityX(160);
        player.flipX = false;
        if (player.body.onFloor()) {
            player.anims.play('right', true);
        }
    } else {
        // No movement, play the idle animation
        player.setVelocityX(0);
        if (player.body.onFloor()) {
            player.anims.play('idle', true);
        }
    }

    // Check for the jump key
    if (cursors.up.isDown && player.body.onFloor()) {
        // Player is on the ground and the jump key is pressed
        player.setVelocityY(-500);
        player.anims.play('jump', true);
    } else if (!player.body.onFloor()) {
        // Player is in the air, play the jump animation continuously
        player.anims.play('jump', true);
    }

     if (player.body.velocity.y > 0) {
            // Increase gravity when the player is falling
            player.body.gravity.y = 800; // You can adjust the gravity value as needed
        } else {
            // Reset gravity to the default value when the player is not falling
            player.body.gravity.y = 250;
        }
}



