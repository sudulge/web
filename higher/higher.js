const canvas = document.querySelector("#main")
const ctx = canvas.getContext('2d')
const score = document.querySelector("#score") 

bar_list = []
let keydown = false
let gameover = false

// 초기 bar
let bar = {
    x: 350,
    y: 450,
    vx: 0,
    vy: 0,
    width: 800,
    height: 50,
    color: 'black',
    draw: function() {
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = this.color;
    }
}
bar_list.push(bar)
bar.draw();


function bardraw() {
    ctx.clearRect(bar.x-bar.vx, bar.y, bar.width, bar.height);
    bar.draw();
    // ctx.strokeRect(bar_list[bar_list.length -1].x, 450, bar_list[bar_list.length -1].width, 50) 타이밍 윤곽선 표시
    bar.x += bar.vx;
    if (bar.x + bar.width > canvas.width || bar.x + bar.vx < 0) {
        bar.vx = -bar.vx
    }
    raf = window.requestAnimationFrame(bardraw);
}


window.addEventListener('keydown', function(e) {
    if (keydown) return;
    else if (e.code == 'Space') {
        keydown = true
        window.cancelAnimationFrame(raf);
        let bar_ = JSON.parse(JSON.stringify(bar))
        bar_.x -= bar_.vx
        
        if (bar_.x + bar_.width <= bar_list[bar_list.length -1].x || bar_.x >= bar_list[bar_list.length -1].x + bar_list[bar_list.length -1].width) {
            ctx.clearRect(0, 0, canvas.width, 400)
            ctx.font = '100px selif'
            ctx.textAlign = 'center'
            ctx.fillText('Game over!', 750, 250)
            gameover = true
        }
        else if (bar_.x - bar_list[bar_list.length -1].x > -10 && bar_.x - bar_list[bar_list.length -1].x < 10) {
            bar_.x = bar_list[bar_list.length -1].x
            ctx.clearRect(0, 0, canvas.width, 400)
            ctx.font = '100px selif'
            ctx.textAlign = 'center'
            ctx.fillText('Perfect!', 750, 250)
        }
        else if (bar_.x < bar_list[bar_list.length -1].x && bar_list[bar_list.length -1].x < bar_.x + bar_.width) {
            bar_.width = bar_.x + bar_.width - bar_list[bar_list.length -1].x
            bar_.x = bar_list[bar_list.length -1].x
            ctx.clearRect(0, 0, canvas.width, 400)
        }
        else if (bar_.x < bar_list[bar_list.length -1].x + bar_list[bar_list.length -1].width && bar_.x + bar_.width > bar_list[bar_list.length -1].x + bar_list[bar_list.length -1].width) {
            bar_.width = bar_list[bar_list.length -1].x + bar_list[bar_list.length -1].width - bar_.x
            ctx.clearRect(0, 0, canvas.width, 400)
        }
        bar_list.push(bar_)
        if (bar_list.length > 10) {
            bar_list.shift()
        }
        
    }
})

window.addEventListener('keyup', function(e) {
    if (gameover) return;
    else if (e.code == 'Space') {
        keydown = false
        if (bar_list.length > 1) {
            score.textContent = Number(score.textContent) + 1
        }
        ctx.clearRect(0, 450, canvas.width, 50)
        bar = {
            x: [0, 1500-bar_list[bar_list.length -1].width][Math.floor(Math.random() * 2)],
            y: 450,
            vx: Math.floor(Math.random() * 10) + 10,
            vy: 0,
            width: bar_list[bar_list.length -1].width,
            height: 50,
            color: "#" + Math.round(Math.random() * 0xffffff).toString(16),
            draw: function() {
                ctx.fillRect(this.x, this.y, this.width, this.height);
                ctx.fillStyle = this.color;
            }
        }
        ctx.clearRect(0, 400, canvas.width, canvas.height)
        for (let i in bar_list) {
            ctx.fillStyle = bar_list[i].color
            ctx.fillRect(bar_list[i].x, 450 + 50*(bar_list.length-i), bar_list[i].width, 50)
        }

        raf = window.requestAnimationFrame(bardraw);
    }
})