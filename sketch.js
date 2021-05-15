
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
var PLAY=1;
var END=0;
var gameState=PLAY;

function preload(){
santaRunning=loadAnimation("Run (1).png" ,"Run (2).png","Run (3).png","Run (4).png","Run (5).png","Run (6).png","Run (7).png","Run (8).png", "Run (9).png","Run (10).png","Run (11).png");
santaJumping=loadAnimation("Jump (1).png", "Jump (2).png", "Jump (3).png", "Jump (4).png", "Jump (5).png", "Jump (6).png", "Jump (7).png", "Jump (8).png", "Jump (9).png", "Jump (10).png", "Jump (11).png", "Jump (12).png", "Jump (13).png", "Jump (14).png", "Jump (15).png", "Jump (16).png");	
santaDead=loadAnimation("Dead (1).png", "Dead (2).png", "Dead (3).png", "Dead (4).png", "Dead (5).png", "Dead (6).png", "Dead (7).png", "Dead (8).png", "Dead (9).png", "Dead (10).png", "Dead (11).png", "Dead (12).png", "Dead (13).png", "Dead (14).png", "Dead (15).png", "Dead (16).png", "Dead (17).png");
bgImg=loadImage("BG.png");
obstacle1=loadImage("Crate.png")
obstacle2=loadImage("Crystal.png")
obstacle3=loadImage("IceBox.png")
obstacle4=loadImage("Igloo.png")
obstacle5=loadImage("Sign_1.png")
obstacle6=loadImage("Sign_2.png")
obstacle7=loadImage("SnowMan.png")
obstacle8=loadImage("Stone.png")
obstacle9=loadImage("Tree_1.png")
obstacle10=loadImage("Tree_2.png")
platformImg=loadImage("2.png")
restartImg=loadImage("restartButton.png")
}

function setup() {
	createCanvas(1350, 630);
bg= createSprite(0,350,1350,1000);
bg.addImage(bgImg);
  santa= createSprite(70,550,50,50);
  santa.addAnimation("running", santaRunning);
  santa.addAnimation("jumping", santaJumping);
   santa.addAnimation("dead", santaDead);
  santa.scale = 0.3;
//  santa.debug=true;
  santa.setCollider("rectangle",0,0,320,320);
   ground = createSprite(670,620,1350,10);
  ground.x = ground.width /2;
  ground.visible=false;

//  ground.velocityX = -(6+3*score/100);
    
 // cloudsGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
  restart = createSprite(700,350);
  restart.addImage(restartImg);
   restart.scale = 0.4;

restart.visible = false;

	engine = Engine.create();
	world = engine.world;

	//Create the Bodies Here.


	Engine.run(engine);
  
}


function draw() {
	background(0);
 
	
	if(gameState === PLAY){
	 score = score + Math.round(getFrameRate()/62);
	if(keyDown("space")&& santa.y>=300) {
	  santa.velocityY = -10;
	  santa.changeAnimation("jumping", santaJumping);
		}
//assigning gravity to the santa so he will not fly
		santa.velocityY = santa.velocityY + 0.8
	
		if (bg.x < 700){
			bg.x = bg.width/2;
		  }
	if (ground.x < 700){
	  ground.x = ground.width/2;
	  console.log(ground.x);
	}
	
	santa.collide(ground);
	//spawnClouds();
	spawnObstacles();
	if(obstaclesGroup.isTouching(santa)){
		gameState = END;
	  }
  }
	else if(gameState === END){
	  restart.visible = true;
	  
	  //set velcity of each game object to 0
	  ground.velocityX = 0;
	  bg.velocityX = 0;
	  santa.velocityY = 0;
	  obstaclesGroup.setVelocityXEach(0);
	//  cloudsGroup.setVelocityXEach(0);
	  
	  //change the santa animation
	  santa.changeAnimation("dead",santaDead);
	  
	  if(mousePressedOver(restart)) {
	  restart();
	}
	  
	}
	drawSprites();
	textSize(25);
	fill("black");
  text("Score: "+ score, 1000,50);
  }
  function spawnClouds() {
	//write code here to spawn the clouds
	if (frameCount % 60 === 0) {
	  var cloud = createSprite(600,120,40,10);
	  cloud.y = Math.round(random(80,120));
	  cloud.addImage(cloudImage);
	  cloud.scale = 0.5;
	  cloud.velocityX = -3;
	  
	   //assign lifetime to the variable
	  cloud.lifetime = 200;
	  
	  //adjust the depth
	  cloud.depth = santa.depth;
	  santa.depth = santa.depth + 1;
	  
	  //add each cloud to the group
	  cloudsGroup.add(cloud);
	}
	
  }
  
  function spawnObstacles() {
	if(frameCount % 150 === 0) {
	  var obstacle = createSprite(1300,550,50,50);
	  obstacle.velocityX = -8;
//	  obstacle.debug=true;
	  //generate random obstacles
	  var rand = Math.round(random(1,10));
	  switch(rand) {
		case 1: obstacle.addImage(obstacle1);
				break;
		case 2: obstacle.addImage(obstacle2);
				break;
		case 3: obstacle.addImage(obstacle3);
				break;
		case 4: obstacle.addImage(obstacle4);
				break;
		case 5: obstacle.addImage(obstacle5);
				break;
		case 6: obstacle.addImage(obstacle6);
				break;
		case 7: obstacle.addImage(obstacle7);
				break;
		case 8: obstacle.addImage(obstacle8);
				break;
		case 9: obstacle.addImage(obstacle9);
				break;
		case 10: obstacle.addImage(obstacle10);
				break;
		default: break;
	  }
	  
	  //assign scale and lifetime to the obstacle           
	  obstacle.scale = 0.6;
	  obstacle.lifetime = 170;
	  //add each obstacle to the group
	  obstaclesGroup.add(obstacle);
	}
  }

function restart() {
	gameState=PLAY;
	ground.velocityX = -4;
	bg.velocityX = -4;
	santa.velocityY = 10;
//	obstaclesGroup.setVelocityXEach(0);
  //  cloudsGroup.setVelocityXEach(0);
	
	//change the santa animation
	santa.changeAnimation("running",santaRunning);
	
}