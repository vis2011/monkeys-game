var monkey,monkeyImg,ground,bg,bgImg,stone,stoneImg,coin,cImg,cGroup,sGroup,gImg,gameover,banana,bImg,bGroup,jungle,jImg,gSound,m2;

var score=0;
var lt=0;

function preload(){
 monkeyImg=loadAnimation("sprite_0.png",       "sprite_1.png","sprite_2.png","sprite_3.png",
"sprite_4.png","sprite_5.png","sprite_6.png",
"sprite_7.png","sprite_8.png");

  cImg=loadImage("ci.png");
  stoneImg=loadImage("obstacle.png");
  gImg=loadImage("gameover.png");
  bImg=loadImage("banana.png");
  jImg=loadImage("jungleImg.webp");
  m2=loadAnimation("sprite_0.png");
} 

function setup() {
  createCanvas(400, 400);
  
    jungle=createSprite(0,200,800,800);
  jungle.addImage(jImg);
  jungle.scale=2;
  jungle.velocityX=-(5+9*score/10);
  
  monkey=createSprite(70,200,20,20);
  monkey.addAnimation("monkey",monkeyImg);
  monkey.addAnimation("stop",m2);
  monkey.scale=0.1;
  monkey.debug=false;
  monkey.setCollider("obb",20,2,300,600);

  ground=createSprite(20,400,800,10);
  ground.velocityX=-(5+5*score/10);
  
  gameover=createSprite(200,200,20,20);
  gameover.addImage(gImg);
  gameover.visible=false;
  
  
  cGroup=new Group();
  sGroup=new Group();
  bGroup=new Group();
}

function draw() {
  background("white");
  
  if(keyDown("space")&& monkey.y >= 100){
    monkey.velocityY=-12;
  }
  
  monkey.velocityY = monkey.velocityY + 0.9
  
   if (jungle.x < 0){
      jungle.x = jungle.width/2;
    }
  
     if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
  if(cGroup.isTouching(monkey)){
    cGroup.destroyEach();
    score=score+1;
  }
  
  if(score>1){
    score=0;
    lt=lt+1;
  }
  
 
  
  if(bGroup.isTouching(monkey)) {
    lt=lt+1;
    bGroup.destroyEach();
  }
  
  if(sGroup.isTouching(monkey)){
    ground.velocityX=0;
    monkey.velocityY=0;
    jungle.velocityX=0;
    gameover.visible=true;
    cGroup.setLifetimeEach(-1);
    sGroup.setLifetimeEach(-1);
    bGroup.setLifetimeEach(-1);
    cGroup.setVelocityXEach(0);
    sGroup.setVelocityXEach(0);
    bGroup.setVelocityXEach(0);
    monkey.changeAnimation("stop",m2);
  }
  
  monkey.collide(ground);
  stones();
  coins();
  bananas();
  
  drawSprites();
   textSize(20)
    fill("red");
    stroke("white");
  text("score:"+score,320,15);
  text("life saved:"+lt,14,15);
   if(lt>9){
    ground.velocityX=0;
    monkey.velocityY=0;
     jungle.velocityX=0;
    cGroup.setVelocityXEach(0);
    sGroup.setVelocityXEach(0);
    bGroup.setVelocityXEach(0);
    bGroup.destroyEach();
    sGroup.destroyEach();
    cGroup.destroyEach();
    monkey.visible=false;
     textSize(25)
    fill("red");
    stroke("white");
    text("YOU SAVED!! 10 MONKEYS",50,200);
  }
}

function stones(){
if (frameCount % 60 === 0) {
    stone = createSprite(500,370,100,5);
    stone.addImage(stoneImg);
     stone.y = Math.round(random(5,1000));
     stone.scale=0.2;
    stone.velocityX = -5;
    stone.lifetime=120;
    sGroup.add(stone);
  stone.debug=false;
  stone.setCollider("obb",10,2,400,410);
}
}

function coins(){
if (frameCount % 80 === 0) {
    coin= createSprite(600,300,100,5);
    coin.addImage(cImg);
    coin.scale=0.10;
    coin.y = Math.round(random(5,200));
    coin.velocityX = -5;
    coin.lifetime=120;
    cGroup.add(coin);
}
}

function bananas(){
 if(frameCount%500===0){
    banana=createSprite(600,300,20,20);
    banana.addImage(bImg);
    banana.scale=0.10;
    banana.velocityX=-5;
    bGroup.add(banana);
    banana.lifetime=110;
  }
}