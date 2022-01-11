var config = {
    type: Phaser.AUTO,
    width: 1480,
    height: 700,
    physics: {
        default: 'arcade',
        arcade:{
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);
var StartGame = false;


var playBool = false;
var crimeBool = false;
var messageBool = false;

var txt;
var displayedTexts = [
    "You are an investigator who witnessed a homicide\nThe culprit bashed you on the back of your head and escaped\nYou experience brief dimmed flashbacks of what happened but can only see through a small \nwindow into the background\n Use this window as a flashlight to view your surroundings and remember where everything was \nbefore the menace deconstructed the crime site and obscured the evidence\n",
    "You awake confabulated and experiencing paramnesia / Déjà vu\n However, you must act quickly and reassemble the proof by placing the items in their\n original location\n Collect the clues to jog your memory and capture this menace, solve this Enigma!\n",
    "You remember that besides you & the culprit, there was two others at the house, \n a small girl named Emma, and her grandmother, Grace\n You Hear a sound coming from the kitchen and proceed quietly\n",
    "You have a flashback of the kitchen and its contents, try to reassemble them before \n the timer runs out\n",
    "You remember that the last place you saw the family in before passing out was \n the living room, you hurry there\n",
    "You reach the living room and feel a slight breeze, it looks like someone was \n here recently\n You are getting closer!\n",
    "You remember grace saying that she was going to get some whine from the attic, \n you have a bad feeling about this and get shivers as you are directed towards \n the attic\n",
    "Oh no …. You find Emma hanging\n This breaks your heart, but you must proceed and successfully solve this puzzle\n"
]

var cbackground;
var pbackground;
var txtbackround;
var light;

var items = [];
var originalItems = [];

var timers = [10, 15, 20, 20]
var timer;
var timerTxt;
var levelTxt;
var itemBar;

var level = 0;
var txtLevel = 0;
var score;
var itemsNum;
var nextButton;

var red = [];
var green = [];

var map = [
    [[900, 370], [1162, 594], [1030, 592], [780, 194], [190, 210], [300, 540]],
    [[365, 149], [ 905, 304], [1287, 378], [172, 488], [232, 317], [614, 303]],
    [[1007, 625], [82, 580], [264, 588], [1194, 576], [709, 405], [388, 421]],
    [[1074, 590], [517, 80], [800, 455], [1212, 348], [432, 322], [197, 79]]
]


//[1228, 616], [590, 243], [477, 390]],

var menu = [
    [400, 660], [500, 660], [600, 660], [700, 660], [800, 660], [900, 660], [1000, 660], [300, 660], [1100, 660]
]

var collided = [];


function preload ()
{
    //Start
    this.load.image('start', "assets/start.png");
    this.load.image('gameName', "assets/gameName.png");
    this.load.image('playW', "assets/playW.png");
    this.load.image('playY', "assets/playY.png");

    //end
    this.load.image('end', "assets/end.png");
    this.load.image('gameOver', "assets/gameOver.png");
    this.load.image('playAgain', "assets/playAgain.png");


    //Scene0
    this.load.image('s0crimeScene', ['assets/scene0/crimeScene.png', 'assets/scene0/crimeSceneN.png']);
    this.load.image('s0playScene', ["assets/scene0/playScene.png", "assets/scene0/playSceneN.png"]);

    this.load.image('s0item0', "assets/scene0/item0.png");
    this.load.image('s0item1', "assets/scene0/item1.png");
    this.load.image('s0item2', "assets/scene0/item2.png");
    this.load.image('s0item3', "assets/scene0/item3.png");
    this.load.image('s0item4', "assets/scene0/item4.png");
    this.load.image('s0item5', "assets/scene0/item5.png");

    //Scene1
    this.load.image('s1crimeScene', 'assets/scene1/crimeScene.png');
    this.load.image('s1playScene', ["assets/scene1/playScene.png", "assets/scene1/playSceneN.png"]);

    this.load.image('s1item0', "assets/scene1/item0.png");
    this.load.image('s1item1', "assets/scene1/item1.png");
    this.load.image('s1item2', "assets/scene1/item2.png");
    this.load.image('s1item3', "assets/scene1/item3.png");
    this.load.image('s1item4', "assets/scene1/item4.png");
    this.load.image('s1item5', "assets/scene1/item5.png");

    //Scene2
    this.load.image('s2crimeScene', ['assets/scene2/crimeScene.png', 'assets/scene2/crimeSceneN.png']);
    this.load.image('s2playScene', ["assets/scene2/playScene.png", "assets/scene2/playSceneN.png"]);

    this.load.image('s2item0', "assets/scene2/item0.png");
    this.load.image('s2item1', "assets/scene2/item1.png");
    this.load.image('s2item2', "assets/scene2/item2.png");
    this.load.image('s2item3', "assets/scene2/item3.png");
    this.load.image('s2item4', "assets/scene2/item4.png");
    this.load.image('s2item5', "assets/scene2/item5.png");
    // this.load.image('s2item6', "assets/scene2/item6.png");
    // this.load.image('s2item7', "assets/scene2/item7.png");
    // this.load.image('s2item8', "assets/scene2/item8.png");

    //Scene3
    this.load.image('s3crimeScene', ['assets/scene3/crimeScene.png', 'assets/scene3/crimeSceneN.png']);
    this.load.image('s3playScene', ["assets/scene3/playScene.jpg", "assets/scene3/playSceneN.png"]);

    this.load.image('s3item0', "assets/scene3/item0.png");
    this.load.image('s3item1', "assets/scene3/item1.png");
    this.load.image('s3item2', "assets/scene3/item2.png");
    this.load.image('s3item3', "assets/scene3/item3.png");
    this.load.image('s3item4', "assets/scene3/item4.png");
    this.load.image('s3item5', "assets/scene3/item5.png");



    this.load.image('menu', "assets/menu.png");
    this.load.image('textMessage', "assets/textMessage.png");

    this.load.image('green', "assets/green.png");
    this.load.image('red', "assets/red.png");
    this.load.image('next', "assets/next.png");

}

function create()
{
    startingGame(this);
}

function init(scene){
    timer = timers[level];
    score = 0;
    playBool = false;
    crimeBool = false;
    messageBool = false;
    itemsNum = map[level].length;
    originalItems = [];

    displayMessage(displayedTexts[txtLevel++], scene);

    setTimeout(function(){
        crimeBool = true;
    }, 5000);

    setTimeout(function(){
        messageBool = true;
    }, 20000)

    setTimeout(function (){
        playBool = true;
    },30000);
}


function update()
{
    if(crimeBool){
        crimeScene(this);
        crimeBool = false;
    }

    if(messageBool){
        cbackground.setVisible(false);
        displayMessage(displayedTexts[txtLevel++], this);
        messageBool = false;
    }

    if(playBool){
        playScene(this);
        playBool = false;
    }  
}

var l = 1;

function crimeScene(scene)
{
    txt.destroy();
    txtbackround.destroy();

    for(let i = 0; i < itemsNum; i++){
        originalItems[i] = scene.physics.add.image(map[level][i][0], map[level][i][1], `s${level}item${i}`)
    }
    cbackground = scene.add.sprite(740, 350, `s${level}crimeScene`);
    cbackground.setPipeline('Light2D');

    if(l == 1){
        var light  = scene.lights.addLight(300, 300, 150).setIntensity(7);
        l = 0;
    }

    scene.lights.enable().setAmbientColor(0x888888);

    scene.input.on('pointermove', function (pointer) {

        light.x = pointer.x;
        light.y = pointer.y;

    });
}

function playScene(scene){
    pbackground = scene.physics.add.image(740, 350, `s${level}playScene`);
    itemBar = scene.physics.add.image(750, 660, "menu").setScale(1.1, 1.5);;


    for(let i = 0; i < itemsNum; i++){
        items[i] = scene.physics.add.image(menu[i][0], menu[i][1], `s${level}item${i}`);
        items[i].setInteractive();
        red[i] = scene.physics.add.image(-100, -100, 'red');
        green[i] = scene.physics.add.image(-100, -100, 'green');
        scene.input.setDraggable(items[i]);
        collided[i] = timer;
        scene.physics.add.overlap(items[i], originalItems[i], onBoxCollision);
        scene.physics.add.overlap(items[i], pbackground, onBackgroundCollision);
    }

    scene.input.on('drag', function (pointer, gameObject, dragX, dragY) {
        gameObject.x = dragX;
        gameObject.y = dragY;
    });

    timerTxt = scene.add.text(50, 50, `TIMER: ${timer}`, {fontFamily: 'Freckle Face', fontSize: '30px', fill: 'white'})
    levelTxt = scene.add.text(50, 20, `LEVEL: ${level + 1}`, {fontFamily: 'Freckle Face', fontSize: '30px', fill: 'white'})
    startTimer(scene);
}


function onBoxCollision(item, pos){
    var curItem = item.texture.key;
    collided[curItem[6]] = timer;
}

function onBackgroundCollision(item, pos){
    if(item.x >= 250 && item.x <= 1250 && item.y >= 600)
        item.setScale(0.7)
    else
        item.setScale(1);
}


function startTimer(scene){
    var countDown = setInterval(() => {
        timer--;
        timerTxt.text = `TIMER: ${timer}`
        if(timer == 0){
            clearInterval(countDown);
            scoring(scene);
        } 
    }, 1000);
}


function displayMessage(message, scene){
    txtbackround = scene.add.image(740, 350, 'textMessage').setScale(2);
    txt = "";
    txt = scene.add.text(50, 200, txt, {fontSize: '20px', fill: 'white'});
    let i = 0;
    var DisplayMsg = setInterval(function(){
        txt.text += message[i];
        i++;
        if(i === message.length) {
            clearInterval(DisplayMsg);
        }
    }, 1);
}


function scoring(scene){
    for(let i = 0; i < collided.length; i++)
    {
        console.log(level)
        console.log(green)
        console.log(red)
        if(collided[i] == 1 || collided[i] == 0){
            green[i].x = map[level][i][0];
            green[i].y = map[level][i][1];
            score++;
        }
        else{
            red[i].x = map[level][i][0];
            red[i].y = map[level][i][1];
        }
        items[i].x = map[level][i][0];
        items[i].y = map[level][i][1];
    }
    scene.add.text(470, 645, `You got ${score} out of ${itemsNum} correct `, {fontSize: '30px', fill: 'white'}); 
    nextButton = scene.physics.add.image(1385, 660, 'next').setScale(0.5);
    nextButton.setInteractive();
    nextButton.on('pointerdown', function (pointer) {
        deleteItems(scene);
    },);
}

function deleteItems(scene){
    console.log(itemsNum);
    for(let i = 0 ; i < itemsNum; i++){
        originalItems[i].destroy();
        items[i].destroy();
        green[i].destroy();
        red[i].destroy();
    }
    cbackground.destroy();
    pbackground.destroy();
    nextButton.destroy();
    txtbackround.destroy();
    timerTxt.destroy();
    levelTxt.destroy();
    itemBar.destroy();
    txt.destroy();
    level++;
    if(level >= 4)
        endGame(scene)
    else
        init(scene);
}

function startingGame(scene){
    var startBackground = scene.add.image(740, 350, 'start');
    var gameName = scene.add.image(740, 350, 'gameName').setScale(0.7);

    var playbuttonW = scene.physics.add.image(740, 450, 'playW').setScale(0.5);

    playbuttonW.setInteractive();

    playbuttonW.on('pointerdown', function (pointer) {
        startBackground.destroy();
        gameName.destroy();
        playbuttonW.destroy();
        init(scene);
    },);
}

function endGame(scene){
    var endBackground = scene.add.image(740, 350, 'end');
    var gameover = scene.add.image(530, 250, 'gameOver');
    var playagain = scene.physics.add.image(530, 450, 'playAgain').setScale(0.5);

    playagain.setInteractive();
    playagain.on('pointerdown', function (pointer) {
        endBackground.destroy();
        gameover.destroy();
        playagain.destroy();
        level = 0;
        txtLevel = 0;
        init(scene);
    },);
}
