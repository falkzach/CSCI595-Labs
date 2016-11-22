var box = function(options) {
	var bmd = game.add.bitmapData(options.length, options.width);
	bmd.ctx.beginPath();
	bmd.ctx.rect(0,0,options.length, options.width);
	bmd.ctx.fillStyle = options.color;
	bmd.ctx.fill();
	return bmd;
};

var game = new Phaser.Game(500,500);

var mainState = {
	create: function() {
		game.stage.backgroundColor = '#BDC2C5'; // set background color
		game.physics.startSystem(Phaser.Physics.ARCADE); // set up the physics system
		game.world.enableBody = true; // game objects can move and interact with one another
		this.player  = game.add.sprite(32,32,box({length:32,width:32, color: '#4F616E'})
		);
		this.cursor = game.input.keyboard.createCursorKeys(); // create a cursor object, use this to detect which key was pressed and react
		this.player.body.collideWorldBounds = true;
		this.player.health = 100;
		this.walls = game.add.group(); // create a group of sprites
		this.walls.enableBody = true;
		var top = this.walls.create(0,0,box({length: game.world.width,
						width: 16,
						color:'#374A59' 
					}) // create a top wall
		);
		top.body.immovable = true;
		var bottom = this.walls.create(0,game.world.height-16,box({length: game.world.width,
						width: 16,
						color:'#374A59' 
					}) // create a bottom wall
		);
		bottom.body.immovable = true;
		var leftWall = this.walls.create(0,16,box({length: 16,
						width: game.world.height-32,
						color:'#374A59'
					}) // create a left wall
		);
		leftWall.body.immovable = true;
		
		var rightWall = this.walls.create(game.world.width-16,16,box({length: 16,
						width: game.world.height-32,
						color:'#374A59'
					}) // create a right wall
		);
		rightWall.body.immovable = true;
		var innerWall1 = this.walls.create(game.world.width/4,16,box({length: 16,
				width: game.world.height-game.world.height/4,
				color:'#374A59'
					}) // create an inner wall
		);
		innerWall1.body.immovable = true;
		
		var innerWall2 = this.walls.create(game.world.width/2,128,box({length: 16,
						width: game.world.height-game.world.height/4,
						color:'#374A59'
					}) // create an inner wall
		);
		innerWall2.body.immovable = true;

		var innerWall3 = this.walls.create((game.world.width*3)/4,16,box({length: 16,
				width: game.world.height-game.world.height/4,
				color:'#374A59'
			}) // create an inner wall
		);
		innerWall3.body.immovable = true;
		
		this.enemy = game.add.sprite(200,32,
			box({
				length: 32,
				width: 32,
				color: '#A96262'
			})
		);

		this.enemy2 = game.add.sprite(300,32,
			box({
				length: 32,
				width: 32,
				color: '#A96262'
			})
		);

		this.enemy3 = game.add.sprite(100,400,
			box({
				length: 32,
				width: 32,
				color: '#A96262'
			})
		);

		this.enemy4 = game.add.sprite(400,400,
			box({
				length: 32,
				width: 32,
				color: '#A96262'
			})
		);


	},
	update: function(){
		game.physics.arcade.collide(this.player, this.walls);
		game.physics.arcade.collide(this.enemy, this.walls);
		game.physics.arcade.collide(this.enemy2, this.walls);
		game.physics.arcade.collide(this.enemy3, this.walls);
		game.physics.arcade.collide(this.enemy4, this.walls);
		game.physics.arcade.overlap(this.enemy, this.enemy, this.damagePlayer, null, this);
		game.physics.arcade.overlap(this.enemy2, this.enemy, this.damagePlayer, null, this);
		game.physics.arcade.overlap(this.enemy3, this.enemy, this.damagePlayer, null, this);
		game.physics.arcade.overlap(this.enemy4, this.enemy, this.damagePlayer, null, this);

		var speed = 250;
		this.player.body.velocity.y  = 0;
		this.player.body.velocity.x = 0;
		if(this.cursor.up.isDown){
			this.player.body.velocity.y -= speed;
		}
		else if(this.cursor.down.isDown){
			this.player.body.velocity.y += speed;
		}
		else if(this.cursor.left.isDown){
			this.player.body.velocity.x -= speed;
		}
		else if(this.cursor.right.isDown){
			this.player.body.velocity.x += speed;
		}

	},
	handlePlayerDeath: function (player, enemy){
		player.kill(); // function to handle overlap with player and enemy
		game.state.start('gameOver'); // start the game over 
	},
	damagePlayer: function(player, enemy) {
		if(this.player.health > 0) {
			this.player.health -= 1;
			console.log(this.player.health);
		} else {
			this.handlePlayerDeath(player, enemy)
		}
	},
	moveEnemy: function(enemy) {

	}
	

}; 

gameOverState = {
	create: function(){
		this.spacebar = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR); // add the spacebar
		label = game.add.text(game.world.width/2, game.world.height/2,
		'GAME OVER\n Press SPACE to restart',
		{
			font: '22px Arial',
			fill: '#fff',
			align: 'center'
		});
		label.anchor.setTo(0.5,0.5);
	},
	update: function(){
		if(this.spacebar.isDown){
			game.state.start('main'); // handle when the spacebar is pressed
		}

	}
};



game.state.add('gameOver', gameOverState); // add this new state

game.state.add('main', mainState);
game.state.start('main');
