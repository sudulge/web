const $dices = document.querySelector("#dices")
const $selected = document.querySelector("#selected")
const $roll = document.querySelector("#roll")
const $turn = document.querySelector("#turn")
const $gameturn = document.querySelector("#gameturn")

const $rows = document.querySelectorAll(".row")
const $numbers = document.querySelectorAll(".number")
const $sets = document.querySelectorAll(".set")

const $choice_score = document.querySelector("#choice_score")
const $four_kind_score = document.querySelector("#four_kind_score")
const $fullhouse_score = document.querySelector("#fullhouse_score")
const $s_straight_score = document.querySelector("#s_straight_score")
const $l_straight_score = document.querySelector("#l_straight_score")
const $yacht_score = document.querySelector("#yacht_score")

const $subtotal = document.querySelector("#subtotal_score")
const $bonus = document.querySelector("#bonus_score")
const $total = document.querySelector("#total_score")

let gameturn = 1
let numberOfDice = 5
let turn = 3
let bonus = false
let isPressed = false

function selectDice() {
    if (this.parentNode.id == "dices") {
        $selected.appendChild(this)
        numberOfDice -= 1
    }
    else if (this.parentNode.id == "selected") {
        $dices.appendChild(this)
        numberOfDice += 1
    }
}

function rolldice(number) {
    if (turn <= 0) {
        console.log('not your turn')
        return
    }

    if ($selected.hasChildNodes() == true && $dices.hasChildNodes() == false) {
        console.log('주사위를 굴릴 수 없습니다.')
        return
    }

    for (row of $rows) {
        if (row.children[1].getAttribute('status') != 'filled') {
            row.children[1].textContent = '';
            row.children[1].setAttribute('status', 'unfilled')
        }
    }

    turn -= 1
    $turn.textContent = turn
    isPressed = true
    
    while ($dices.hasChildNodes()){
        $dices.removeChild($dices.firstChild)
    }

    const dices = []
    for (let i = 0; i < number; i++) {
        n = Math.floor(Math.random()*6)+1
        dices.push(n)
    }
    dices.sort()
    
    for (const dice of dices) {
        let newdiv = document.createElement("div")
        newdiv.setAttribute('id' , dice)
        newdiv.setAttribute('class', 'dice')
        $dices.appendChild(newdiv)
    }

    shake()
}

function confirmdice() {
    if (isPressed == false) {
        return
    }
    isPressed = false
    for (const dice of $dices.children) {
        dice.style.backgroundImage = `url(image/dice${dice.id}.png)`
        dice.style.margin = '50px'
        dice.addEventListener('click', selectDice)
    }

    if (turn == 0) {
        while ($dices.hasChildNodes()) {
            $selected.appendChild($dices.firstChild)
        }
        for (const dice of $selected.children) {
            dice.removeEventListener('click', selectDice)
        }
    }

    prefill_number()
    prefill_set()
}

$roll.addEventListener('mousedown', function() {
    rolldice(numberOfDice)
})

$roll.addEventListener('mouseup', function() {
    confirmdice()
})

$roll.addEventListener('mouseout', function() {
    confirmdice()
})

function shake() {
    if(isPressed) {
        for (const dice of $dices.children) {
            dice.style.backgroundImage = `url(image/dice${Math.floor(Math.random()*6)+1}.png)`
            dice.style.marginTop = `${Math.floor(Math.random()*25)+40}px`
            dice.style.marginLeft = `${Math.floor(Math.random()*25)+40}px`
            dice.style.marginBottom = `${Math.floor(Math.random()*25)+40}px`
            dice.style.marginRight = `${Math.floor(Math.random()*25)+40}px`
        }
        setTimeout(function() {
            shake ()
        }, 50)
    }
}

function nextturn() {
    turn = 3
    $turn.textContent = turn
    numberOfDice = 5
    gameturn += 1
    $gameturn.textContent = gameturn
    while ($selected.hasChildNodes()) {
        $selected.removeChild($selected.firstChild)
    }
    while ($dices.hasChildNodes()) {
        $dices.removeChild($dices.firstChild)
    }
    for (row of $rows) {
        if (row.children[1].getAttribute('status') != 'filled') {
            row.children[1].textContent = '';
            row.children[1].setAttribute('status', 'unfilled')
        }
    }
}


function prefill_number() {
    const dice_list = []
    for (dice of $selected.children) {
        dice_list.push(dice.id)
    }
    for (dice of $dices.children) {
        dice_list.push(dice.id)
    }
    for (number of $numbers) {
        if (number.children[1].getAttribute('status') != 'filled'){
            count = dice_list.filter(element => number.children[0].getAttribute('data') == element).length
            number.children[1].textContent = Number(number.children[0].getAttribute('data')) * count
            number.children[1].setAttribute('status', 'prefilled')
        }
        
    }
}

function numberScore(div_element) {
    if (turn == 3) {
        console.log("주사위를 굴려주세요")
        return
    }
    const $score = div_element.children[1]
    if ($score.getAttribute('status') == 'filled') {
        console.log("선택할 수 없습니다")
        return
    }

    $subtotal.textContent = Number($subtotal.textContent) + Number($score.textContent)
    $total.textContent = Number($total.textContent) + Number($score.textContent)
    div_element.setAttribute('class', 'row_filled')
    $score.setAttribute('status', 'filled')

    if (Number($subtotal.textContent) >= 63 && bonus == false) {
        $bonus.textContent = "+35"
        bonus = true
        $total.textContent = Number($total.textContent) + 35
    }
    nextturn()
}

function prefill_set() {
    const dice_list = []
    for (dice of $selected.children) {
        dice_list.push(dice.id)
    }
    for (dice of $dices.children) {
        dice_list.push(dice.id)
    }
    dice_list.sort()

    const dice_set = new Set(dice_list)
    const sum = dice_list.reduce((acc, el) => {
        return acc + Number(el);
    }, 0);

    for (set of $sets) {
        if (set.children[1].getAttribute('status') != 'filled') {
            set.children[1].textContent = "0"
            set.children[1].setAttribute('status', 'prefilled')
        }
    }

    if ($choice_score.getAttribute('status') != 'filled') {
        $choice_score.textContent = sum;
    }

    if (dice_set.size == 1) {
        if ($four_kind_score.getAttribute('status') != 'filled') {
            $four_kind_score.textContent = sum;
        }
        if ($yacht_score.getAttribute('status') != 'filled') {
            $yacht_score.textContent = "50";
        }
    }
    if (dice_set.size == 2) {
        count = dice_list.filter(element => Number(dice_list[0]) == element).length
        if (count == 1 || count == 4) {
            if ($four_kind_score.getAttribute('status') != 'filled') {
                $four_kind_score.textContent = sum;
            }
        }
        if (count == 2 || count == 3) {
            if ($fullhouse_score.getAttribute('status') != 'filled') {
                $fullhouse_score.textContent = sum;
            }
        }
    }
    if (dice_set.size == 4) {
        if (JSON.stringify(Array.from(dice_set)) == JSON.stringify(['1','2','3','4']) ||
            JSON.stringify(Array.from(dice_set)) == JSON.stringify(['2','3','4','5']) ||
            JSON.stringify(Array.from(dice_set)) == JSON.stringify(['3','4','5','6'])) {
                if ($s_straight_score.getAttribute('status') != 'filled') {
                    $s_straight_score.textContent = "15";
                }
        }
    }
    if (dice_set.size == 5) {
        if (JSON.stringify(Array.from(dice_set)) == JSON.stringify(['1','2','3','4','5']) ||
            JSON.stringify(Array.from(dice_set)) == JSON.stringify(['2','3','4','5','6'])) {
                if ($s_straight_score.getAttribute('status') != 'filled'){
                    $s_straight_score.textContent = "15";
                }
                if ($l_straight_score.getAttribute('status') != 'filled') {
                    $l_straight_score.textContent = "30"; 
                }
        }
        if (JSON.stringify(Array.from(dice_set)) == JSON.stringify(['1','2','3','4','6']) ||
            JSON.stringify(Array.from(dice_set)) == JSON.stringify(['1','3','4','5','6'])) {
                if ($s_straight_score.getAttribute('status') != 'filled'){
                    $s_straight_score.textContent = "15";
                }
            }
    }
}

function setScore(div_element) {
    const $score = div_element.children[1]
    if (turn == 3) {
        console.log("주사위를 굴려주세요")
        return
    }
    if ($score.getAttribute('status') == 'filled') {
        console.log("선택할 수 없습니다")
        return
    }
    
    $total.textContent = Number($total.textContent) + Number($score.textContent)
    div_element.setAttribute('class', 'row_filled')
    $score.setAttribute('status', 'filled')
    nextturn()
}


for (number of $numbers) {
    number.addEventListener('click', function() {
        numberScore(this)
    })
    number.children[0].children[0].style.backgroundImage = `url(image/rdice${number.children[0].getAttribute('data')}.png)`
}
for (set of $sets) {
    set.addEventListener('click', function() {
        setScore(this)
    })
}
