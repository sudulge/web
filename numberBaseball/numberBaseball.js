const $form = document.querySelector('#form');
const $input = document.querySelector('#input');
const $submit = document.querySelector('#submit');
const $result = document.querySelector('#result');
const $logs = document.querySelector('#logs'); 
const HRnumber = [];
const HRnumberLength = parseInt(prompt('몇자리수로 하시겠습니까?', 4));




while(HRnumber.length < HRnumberLength){
    n = Math.floor(Math.random()*10)
    if (!HRnumber.includes(n)) {
        HRnumber.push(n)
    }
}

console.log(HRnumber)
const tries = []

const checkInput = (input) => {
    if (input.length != HRnumberLength) {
        return alert(`${HRnumberLength}자리 수를 입력해 주세요`);
    }
    if (new Set(input).size != HRnumberLength) {
        return alert('중복되지 않게 입력해 주세요');
    }
    if (tries.includes(input)) {
        return alert('이미 시도한 숫자입니다.');
    }
    return true;
}

$form.addEventListener('submit', (event) => {
    event.preventDefault(); // 기본동작막기 form태그 안에서 버튼클릭했을때 새로고침되는것 막기 (ex a태그 링크이동 등..)
    const value = $input.value;
    $input.value = '';
    $input.focus()
    const valid = checkInput(value)
    if (!valid) {
        return;
    }

    let strike = 0;
    let ball = 0;

    // for (let i = 0; i < HRnumberLength; i++) {
    //     if (value[i] == HRnumber[i]) {
    //         strike += 1;
    //     }
    //     else if (HRnumber.includes(Number(value[i]))) {
    //         ball += 1;
    //     }
    // }
    // forEach 문으로 바꿀 수 있음.
    HRnumber.forEach((element, i) => {
        if (value[i] == element) {
            strike += 1;
        }
        else if (HRnumber.includes(Number(value[i]))) {
            ball += 1;
        }
    });

    if (strike == HRnumberLength){
        $logs.append(`${value}: ${strike}S ${ball}B`, document.createElement('br'))
        tries.push(value)
        $result.textContent = `홈런! ${tries.length}회 만에 맞추셨습니다`
        $input.disabled = true
        $submit.disabled = true
        
    }
    else if (strike == 0 && ball == 0){
        $result.textContent = (`${value}: OUT`)
        $logs.append(`${value}: OUT`, document.createElement('br'))
        tries.push(value)
    }
    else {
        $result.textContent = (`${value}: ${strike}S ${ball}B`)
        $logs.append(`${value}: ${strike}S ${ball}B`, document.createElement('br'))
        tries.push(value)
    }
})