
var monkey , monkey_running, ground;
var banana ,bananaImage;
var obstacle, obstacleImage;
var bananaGroup, obstaclesGroup;
var survivalTime;
var gameStates,END,PLAY;


function preload(){   
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  
  obstacleImage = loadImage("obstacle.png");
}


function setup() {
createCanvas(600,200);
  
monkey=createSprite(70,170,15,15);
  monkey.addAnimation("running",monkey_running);
  monkey.scale=0.09;
  
  ground=createSprite(200,200,800,20);
  ground.x=ground.width/2;
  
  bananaGroup=new Group();
  obstaclesGroup=new Group();
  
  survivalTime=0;
}


function draw() {
background(0);  
 
  if(gameStates===PLAY){
    monkey.changeAnimation("running", monkey_running);
    
     if(ground.x<0){
    ground.x=ground.width/2;
  }
    
  if(keyDown("space") && monkey.y >= 100){
    monkey.velocityY = -12;  
  }
   monkey.velocityY =monkey.velocityY + 0.9;
  
  monkey.collide(ground);
    
    if(bananaGroup.isTouching(monkey)){
      bananaGroup.destroyEach();
      monkey.scale=0.15
    }
  
  food();
  obstacles();
    
    if(obstaclesGroup.isTouching(monkey)){
      monkey.scale=0.05;
  }
  }
    
   
  
  
  stroke("red");
  textSize(20);
  survivalTime=Math.ceil(frameCount/frameRate());
  text("survivalTime" + survivalTime,100,50);
  
  
  drawSprites();
}

function food(){
  
  if(frameCount % 80 === 0){
    var banana1=createSprite(600,170,15,15);
    banana1.y=Math.round(random(120,160));
    banana1.addImage(bananaImage);
    banana1.velocityX=-10;
    banana1.scale=0.1;
    banana1.lifetime=60;
    
    banana1.depth = monkey.depth;
    banana1.depth = banana1.depth + 1;
    bananaGroup.add(banana1);
  }
}

function obstacles(){
  
  if(frameCount % 300 === 0){
    var obstacle=createSprite(600,180,15,15);
    obstacle.y=Math.round(random(160,190));
     obstacle.addImage(obstacleImage);
    obstacle.scale=0.2;
    obstacle.velocityX=-10;
    obstacle.lifetime=60;
    
    obstaclesGroup.add(obstacle);
    
    obstacle.depth = monkey.depth;
    obstacle.dpeth= obstacle.depth+1;
  } 
}