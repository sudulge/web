const $container = document.querySelector(".container")
const $images = document.querySelector("#images")
const $side = document.querySelector(".side")

let board = []
let list = []
const row = 3
const column = 3
const N = 3
let imagenumber = 0

function initPuzzle() {
    list = [1,2,3,4,5,6,7,8]
    list.sort(() => Math.random() - 0.5)
    list.push('blank')
    let inversion = 0

    for (let i=0; i< N*N-2; i++) {
        for (let j=i+1; j<N*N-1; j++) {
            if (list[i] && list[j] && list[i] > list[j]) {
                inversion += 1
            }
        }
    }

    if (inversion%2!=0) {
        initPuzzle()
    } else {
        for (let i=0; i<N; i++) {
            board[i] = []
            for (let j=0; j<N; j++) {
                let index = i*N + j
                board[i][j] = list[index]
            }
        }
        console.log(board)
        return
    }
}

function updateBoard() {
    $container.textContent = "";

    for (let i=0; i<N*N-1; i++) {
        const div = document.createElement("div")
        div.className = "item"
        div.id = list[i]
        div.style.backgroundImage = `url(images/${imagenumber}/${list[i]}.png`
        div.style.order = i
        $container.appendChild(div)
    }
    const div = document.createElement("div")
    div.className = "blank"
    div.id = 'blank'
    div.style.order = 8
    $container.appendChild(div)
    $side.style.backgroundImage = `url(images/${imagenumber}/image.jpg)`
}

function clickImage(event) {
    Element = event.target
    const index = Element.style.order
    const x = index%N
    const y = parseInt(index/N)

    if (x > 0 && board[y][x-1] == 'blank') {
        board[y][x-1] = board[y][x]
        board[y][x] = 'blank'
        move(Element)
    } 
    else if (x < N - 1 && board[y][x+1] == 'blank') {
        board[y][x+1] = board[y][x]
        board[y][x] = 'blank'
        move(Element)
    }
    else if (y > 0 && board[y-1][x] == 'blank') {
        board[y-1][x] = board[y][x]
        board[y][x] = 'blank'
        move(Element)
    }
    else if (y < N - 1 && board[y+1][x] == 'blank') {
        board[y+1][x] = board[y][x]
        board[y][x] = 'blank'
        move(Element)
    }
}

function move(Element) {
    const blank = document.querySelector('#blank')

    tmp = Element.style.order
    Element.style.order = blank.style.order
    blank.style.order = tmp

    endCheck()
}

function endCheck() {
    for (let i=0; i<N; i++) {
        for (let j=0; j<N; j++) {
            expect = i*N + j + 1
            if (i==2 && j==2) { expect = 'blank'}
            if (board[i][j] != expect) {
                return
            }
        }
    }
    console.log('완성')

    const div = document.createElement('div')
    div.style.backgroundImage = `url(images/${imagenumber}/image.jpg)`
    div.className = "original"
    $container.appendChild(div)
}

$container.addEventListener('click', clickImage)

$images.addEventListener('click', function(event) {
    Element = event.target
    if (!Element.classList.contains('image')) return
    imagenumber = parseInt(Element.getAttribute('index'))

    initPuzzle()
    updateBoard()
})