const $start = document.querySelector(".start")
const $background = document.querySelector(".background")
const $timer = document.querySelector(".timer")
const $clear = document.querySelector(".clear")
const $bgm = document.querySelector("#bgm")
const $hit = document.querySelector("#hit")

let time = 60;
let timerid = 0;
const keys = [37, 38, 39, 40]
let list = []
let count = 0
const round = [4,6,7,7,7,8,8,8,10,10]
let roundcount = 0
let started = false
const bgm = new Audio('src/[MapleStory BGM] Wolf and Sheep.mp3')
const hit = new Audio('src/hit.mp3')
bgm.volume = 0.1;
bgm.loop = true;
hit.volume = 0.0;

function timer() {
    timerid = setInterval(()=>{
        time-=0.01;
        $timer.textContent = `남은시간 ${time.toFixed(2)} 초`;
        if (time<=0.00999999999999835) {
            clearInterval(timerid)
            $timer.textContent = "남은시간 0.00 초"
            $background.textContent = "게임 오버"
        }
    }, 10);
}

$start.addEventListener('click', start)

$bgm.addEventListener('click', ()=>{
    if($bgm.class=="off") {
        $bgm.class = "on"
        $bgm.textContent = "BGM ON"
        bgm.volume = 0.1;
    }else{
        $bgm.class = "off"
        $bgm.textContent = "BGM OFF"
        bgm.volume = 0.0;
    }
})

$hit.addEventListener('click', ()=>{
    if($hit.class=="on") {
        $hit.class = "off"
        $hit.textContent = "effect OFF"
        hit.volume = 0.0;
    }else{
        $hit.class = "on"
        $hit.textContent = "effect ON"
        hit.volume = 0.5;
    }
})

function start() {
    bgm.play();
    started = true
    $start.disabled = true;
    timer()
    reset()
}

function reset() {
    while ($background.hasChildNodes()) {
        $background.removeChild($background.firstChild)
    }

    if (roundcount==10){
        clearInterval(timerid)
        console.log("게임이 끝났습니다, 새로고침을 해주세요")
        $background.textContent = ""
        $clear.style.backgroundImage = "url(src/clear.png)"
        
        return
    }

    list = []
    count = 0
    game(round[roundcount])
    roundcount += 1
}

function game(num) { //리스트 생성 화면 그리기
    $background.style.backgroundImage = `url(src/${num}.png)`
    // $background.src = `src/${num}.png`
    for(let i = 0; i<num; i++){
        index = Math.floor(Math.random()*4)
        list.push(keys[index])

        arrow = document.createElement("img")
        arrow.id = list[i]
        arrow.src = `src/${arrow.id}.png`
        $background.appendChild(arrow);
    }
}

function keycheck(keycode) {
    hit.currentTime = 0;
    hit.play()
    if (keycode==list[count]) {
        arrow = $background.childNodes[count]
        arrow.src = "src/hidden.png"
        count += 1
    }else{
        count = 0
        for(let i=0; i<list.length; i++){
            arrow = $background.childNodes[i]
            arrow.src = `src/${arrow.id}.png`
        }
    }
    if (count==list.length) {
        reset()
    }
}

window.onkeydown = (event)=>{
    if (started) {
    keycheck(event.keyCode)
    }
    else if (event.keyCode==32){
        $background.style.color = "#666666"
    }
}

window.onkeyup = (event)=>{
    if (!started&&event.keyCode==32){
        $background.style.color = "#FFFFFF"
        $background.style.fontSize = "130px"
        start()
        return
    }
}   
