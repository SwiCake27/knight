var dragon,knight,princess,ground;
var DragonImage,run,slay,jump,Panda,dragonGroup,princessGroup,Edge1,Edge2;
var bg,castle,yard;
var gamestate=1;
var RUN=1;
var SLAY=2;
var DEFEAT=3;
var JUMP=4
var WIN=3;
var score=0;
var kill=false;
var death=false;
function preload(){
DragonImage=loadImage("dragon.jpg")
  run=loadImage("run.jpg")
  slay=loadImage("slay.jpg")
  jump=loadImage("jump.jpg")
  Panda=loadImage("panda princess.jpg")
bg=loadImage("bg.jpg")
  castle=loadImage("castle.jpg")
   yard=loadImage("yard.jpg")

}

function setup() {
  createCanvas(400,400)
 knight=createSprite(200,10)
  knight.addImage(run);
  knight.scale=0.05
  ground=createSprite(200,110,1000,10);
 ground.visible=false;
    princessGroup=new Group();
  dragonGroup=new Group();
   Edge1=createSprite(-90,200,200,600)
  Edge2=createSprite(490,200,200,600)
   //Edge1.visible=false;
   //Edge2.visible=false;
 
}

function draw() {
 background(bg);
  //console.log(gamestate);
  knight.collide(ground);
   knight.bounceOff(Edge1);
   knight.collide(Edge2);
  text("score:"+score,300,10);
 knight.collide(Edge1)
  if (keyDown("space")&&gamestate===1){
    gamestate=4;
    knight.addImage(jump)
    knight.velocityY=-10
  }
  knight.velocityY = knight.velocityY + 0.8
   if (keyDown("left")&&gamestate===1){
    knight.x=knight.x-100
  }
   if (keyDown("right")&&gamestate===1){
    knight.x=knight.x+100
  }
    if (keyDown("s")&&gamestate===1){
    gamestate=2;
  }
  if (keyWentUp("space")&&gamestate===4){
      knight.addImage(run);
     gamestate=1;
  }
   if (keyWentUp("s")&&gamestate===2){
      gamestate=1;
       knight.addImage(run);
      knight.scale=0.05;
  }
  if (gamestate===2){
    knight.addImage(slay)
    knight.scale=0.2;

  }
  enemy();
  friend();
   if (dragonGroup.isTouching(knight)&&gamestate===2){
    dragonGroup.destroyEach(); 
    score=score+1;
  }
 if (princessGroup.isTouching(knight)&&gamestate===1){
    princessGroup.destroyEach(); 
    score=score+10;
 }
  if (dragonGroup.isTouching(knight)&&gamestate===1){
    
    
     gamestate=3;
      knight.destroy();
      death=true;
    
  }
  
   
  
  
    if (princessGroup.isTouching(knight)&&gamestate===2){
   gamestate=3;
        knight.destroy();
     kill=true;
  }
   if (kill===true){
   
    background(yard);
  
 }
   if (death===true){
   
    background(castle);
   }
  
  
  drawSprites();
   
}
function enemy(){
  if (frameCount % 60 === 0){
  
   
    //generate random obstacles
    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: dragon=createSprite(300,400)
              break;
      case 2: dragon=createSprite(100,400)
              break;
      case 3: dragon=createSprite(200,400)
              break;
      default: break;
    }
     dragon.addImage(DragonImage)
    
       dragon.scale= 0.1;
   dragon.velocityY = -10
   dragon.lifetime = 300;
    
       dragonGroup.add(dragon);
    if (kill===true){
   
    dragonGroup.remove(dragon);
dragon.destroy();
  
 }
   if (death===true){
   
    dragonGroup.remove(dragon);
dragon.destroy();
   }
  }

    //assign scale and lifetime to the obstacle           

   
   //add each obstacle to the group
   
 

}

function friend(){
    //write code here to spawn the clouds
  if (frameCount % 100 === 0) {
    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: princess=createSprite(300,400)
              break;
      case 2: princess=createSprite(100,400)
              break;
      case 3: princess=createSprite(200,400)
              break;
      default: break;
    }
     
    
     princess.addImage(Panda);
     princess.scale = 0.1;
     princess.velocityY = -3;
    
     //assign lifetime to the variable
    princess.lifetime = 200;
 

   
    
    //add each cloud to the group
    princessGroup.add(princess);
}
  
 if (kill===true){
   
    princessGroup.remove(princess);
princess.destroy();
  console.log("kill");
 }
   if (death===true){
   
    princessGroup.remove(princess);
princess.destroy();
   }
}

