var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;

 ghost = createSprite(200,200,50,50);
 ghost.addImage("ghost",ghostImg);
 ghost.scale = 0.5;

 doorsGroup = new Group();
 climbersGroup = new Group();
 invisibleBlockGroup = new Group();
 
  
}

function draw() {
  background(200);
  
  if(tower.y > 400){
      tower.y = 300
    }

    if (keyDown ("space")) {
      ghost.velocityY = -10;  
    }
    ghost.velocityY = ghost.velocityY + 0.5

    if (keyDown ("left")) {
      ghost.x = ghost.x-3;  
    }

    if (keyDown ("right")) {
      ghost.x = ghost.x+3;  
    }

    //climbersGroup.collide(ghost);
    if(climbersGroup.isTouching(ghost)){
      ghost.velocityY = 0;
    }
    if(invisibleBlockGroup.isTouching(ghost) || ghost.y > 600){
      ghost.destroy();
      gameState = "end"
    }
   spawnDoors();
    drawSprites();
}

function spawnDoors() {
  if (frameCount % 240 === 0){
     door = createSprite(200, -50);
     climber = createSprite(200,20);
     invisibleBlock = createSprite(200,15);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;

    door.x = Math.round(random(120,400));
    climber.x = door.x;
    invisibleBlock.x = door.x;
    
    door.addImage(doorImg);
    climber.addImage(climberImg);
    
    door.velocityY = 1;
    climber.velocityY = 1;
    invisibleBlock.velocityY = 1;
    
    ghost.depth = door.depth;
    ghost.depth +=1;
   
    //assign lifetime to the variable
    door.lifetime = 800;
    climber.lifetime = 800;
    invisibleBlock.lifetime = 800;

    
    //add each door to the group
    doorsGroup.add(door);
    invisibleBlock.debug = true;
    climbersGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);
  }
}
  
   
  
    
   

   
