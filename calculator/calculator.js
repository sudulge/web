let numOne = '';
let numTwo = '';
let operator = '';
const $operator = document.querySelector('#operator');
const $result = document.querySelector('#result');

/*
const onClickNumber = (event) => {
    if (operator) {
        if (!numTwo) {
            $result.value = '';
        }
        numTwo += event.target.textContent;
    }
    else {
        numOne += event.target.textContent;
    }
    $result.value += event.target.textContent;
};
   // event.target.textContent로 버튼의 텍스트 컨텐트를 가져와서 사용 가능. 
   // 아래의 코드는 위의 코드를 if else 중첩 줄이기를 통해 간소화 한것.
*/
const onClickNumber = (event) => {
    if (!operator) {
        numOne += event.target.textContent;
        $result.value += event.target.textContent;
        return;
    }
    if (!numTwo) {
        $result.value = '';
    }
    numTwo += event.target.textContent;
    $result.value += event.target.textContent;
}; 

document.querySelector('#num-0').addEventListener('click', onClickNumber);
document.querySelector('#num-1').addEventListener('click', onClickNumber);
document.querySelector('#num-2').addEventListener('click', onClickNumber);
document.querySelector('#num-3').addEventListener('click', onClickNumber);
document.querySelector('#num-4').addEventListener('click', onClickNumber);
document.querySelector('#num-5').addEventListener('click', onClickNumber);
document.querySelector('#num-6').addEventListener('click', onClickNumber);
document.querySelector('#num-7').addEventListener('click', onClickNumber);
document.querySelector('#num-8').addEventListener('click', onClickNumber);
document.querySelector('#num-9').addEventListener('click', onClickNumber);

const onClickOperator = (op) => () => { 
    if (numOne) {
        operator = op;
        $operator.value = op;
    }
    else {
        alert('숫자를 먼저 입력하세요');
    }
}
// 고차함수 (high order function) { 뒤에 바로 return 이 나올 경우 생략 가능.

document.querySelector('#plus').addEventListener('click', onClickOperator('+'));
document.querySelector('#minus').addEventListener('click', onClickOperator('-'));
document.querySelector('#divide').addEventListener('click', onClickOperator('/'));
document.querySelector('#multiply').addEventListener('click', onClickOperator('x'));

const onClickCalculate =  () => {
    // if (numTwo) {
    //     switch (operator) {
    //         case '+':
    //             $result.value = Number(numOne) + Number(numTwo);
    //             break;
    //         case '-':
    //             $result.value = Number(numOne) - Number(numTwo);
    //             break;
    //         case '/':
    //             $result.value = Number(numOne) / Number(numTwo);
    //             break;
    //         case 'x':
    //             $result.value = Number(numOne) * Number(numTwo);
    //             break;
    //         default:
    //             break;
    //     }
    // }
    // else {
    //     alert('숫자를 먼저 입력하세요.')
    // }

    if (!numTwo) {
        alert('숫자를 먼저 입력하세요.')
        return;
    }
    switch (operator) {
        case '+':
            $result.value = Number(numOne) + Number(numTwo);
            break;
        case '-':
            $result.value = numOne - numTwo;
            break;
        case '/':
            $result.value = numOne / numTwo;
            break;
        case 'x':
            $result.value = numOne * numTwo;
            break;
        default:
            break;
    }
}
// +연산자는 숫자보다 문자열이 우선시 됨. 숫자형이 문자형으로 변환되어 계산
// 그 외 연산자는 숫자형이 문자형보다 우선시 됨. 문자형이 숫자형으로 변환.

document.querySelector('#calculate').addEventListener('click', onClickCalculate);

const onClickClear = () => {
    numOne = '';
    operator = '';
    numTwo = '';
    $operator.value = '';
    $result.value = '';
}
document.querySelector('#clear').addEventListener('click', () => {
    numOne = '';
    operator = '';
    numTwo = '';
    $operator.value = '';
    $result.value = '';
});
