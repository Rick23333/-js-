

var ul = document.getElementsByTagName('ul')[0],
    li = [];
var start = document.getElementsByClassName('start')[0],
    startKey = true;
var sLen = 2,
    head = [0,2],
    theSnake = [head, [0, 1], [0, 0]];
var timer;
var oApple = [];
var oDirection = 'right';

//分数：
var point = document.getElementsByClassName('pointNum')[0],
    pointNum = 0;

appendLi();

//生成li
function appendLi() {
    for(var i = 0; i < 12; i ++) {
        li[i] = [];
        for(var j = 0; j < 16; j ++) {
            li[i][j] = document.createElement('li');

            ul.appendChild(li[i][j]);
        }
        
    }
}




// 生成苹果
function apple() {
    iApple = Math.floor(Math.random() * 12);
    jApple = Math.floor(Math.random() * 16);
    checkApple();
    li[iApple][jApple].className = 'apple';
    oApple = [iApple,jApple];

    
}


// 判断苹果是否重合
function checkApple() {
    var checkKey = true;
    for( ; checkKey; ) {
        for(var h = 0; h < sLen; h ++) {
            if(iApple == theSnake[h][0]) {
                if(jApple == theSnake[h][1]) {
                    iApple = Math.floor(Math.random() * 12);
                    jApple = Math.floor(Math.random() * 16);
                }
    
            }else {
                checkKey = false;
            }
        }
        
    }
    
    
}

//开始游戏
start.addEventListener('click', function () {
    if(startKey) {
        startSnake();
        var i = Math.floor(Math.random() * 9 + 3),
            j = Math.floor(Math.random() * 16);
        li[i][j].className = 'apple';
        oApple = [i,j];
        timer = setInterval(function () {
            // console.log(theSnake[sLen - 1][0] + ' + ' + theSnake[sLen - 1][1]);
            if(head[0] == oApple[0] && head[1] == oApple[1]) {
                eat();
            }else {
                bodyDelete();
            }
            snakeChange();
            headMove();
            bodyMove();
            for(var h = 2; h < sLen; h ++) {
                if(head[0] == theSnake[h][0] && head[1] == theSnake[h][1]) {
                    youLost();                    
                }
            }
            


        }, 100)
        startKey = false;
    }
    
        
}, false)

//开始时形成蛇
function startSnake() {
    li[head[0]][head[1]].className = 'head';
    for(var i = 0; i < sLen; i ++) {
        li[0][i].className = 'sBody';
    }
}

//头部移动
function headMove() {
    li[head[0]][head[1]].className = ' ';
    switch (oDirection) {
        case 'right':
            if (head[1] == 15) {
                head[1] = 0;

            }else {
            head[1] ++; 
            }
            break;
        case 'left':
            if (head[1] == 0) {
                head[1] = 15;

            }else {
            head[1] --; 
            }
            break; 
        case 'top':
            if (head[0] == 0) {
                head[0] = 11;

            }else {
                head[0] --; 
            }
            break; 
        case 'bottom':
            if (head[0] == 11) {
                head[0] = 0;

            }else {
            head[0] ++; 
            }
    }

    li[head[0]][head[1]].className = 'head';

      
}

function bodyMove() {
    for (var i = 1; i < sLen; i ++) {
        li[theSnake[i][0]][theSnake[i][1]].className = 'sBody';
    }
}


function bodyDelete() {
    li[theSnake[sLen][0]][theSnake[sLen][1]].className = ' ';
}

//每节身子跟着上一节走
function snakeChange() {
    for(var i = sLen; i  > 0; i --) {
        if(theSnake[i] == undefined) {
            theSnake.push([theSnake[i - 1][0], theSnake[i - 1][1]]);

        }
        theSnake[i][0] = theSnake[i - 1][0];
        theSnake[i][1] = theSnake[i - 1][1];
        
    }
}

//吃果果
function eat() {
    sLen ++;
    apple();
    pointAdd();
    
}

//加分分
function pointAdd() {
    pointNum ++;
    point.innerHTML = pointNum;
}






addEventListener('keydown', function (e) {
    switch (e.which) {
        case 38:
            if(oDirection != 'bottom') {
            oDirection = 'top';
            }
            break;
        case 40:
            if(oDirection != 'top') {
                oDirection = 'bottom';
                }
            break;
        case 37:
            if(oDirection != 'right') {
                oDirection = 'left';
                }
            break;
        case 39:
            if(oDirection != 'left') {
                oDirection = 'right';
                }
    }
}, false)

function youLost() {
    clearInterval(timer);
    alert('You Lost!!Point:' + pointNum);
    init();

}

function init() {
    sLen = 2,
    head = [0,2],
    theSnake = [head, [0, 1], [0, 0]];
    oApple = [];
    oDirection = 'right';
    startKey = true;
    pointNum = 0;
    point.innerHTML = pointNum;
    var aLi = document.getElementsByTagName('li');
    Array.prototype.forEach.call(aLi, function (ele) {
        ele.className = ' ';
    })

}

