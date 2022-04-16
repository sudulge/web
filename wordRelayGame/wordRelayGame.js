const number = parseInt(prompt('몇명이 참가하나요?'));
const $button = document.querySelector('button');
const $input = document.querySelector('input');
const $word = document.querySelector('#word')
const $order = document.querySelector('#order');
const $turn = document.querySelector('#turn');
let word; // 제시어
let newword; // 입력한 단어

const wordInput = () => {
    word = newword;
    console.log(word, '입력')
    $word.textContent = word;
    const order = Number($order.textContent);
    if (order + 1 > number) {
        $order.textContent = 1;
    }
    else {
        $order.textContent = order + 1;
    }

}

const onClickButton = () => {
    if (!word || word[word.length - 1] === newword[0]) {
        wordInput()
    }
    else {
        alert('다시 입력해주세요')
    }
    $input.value = '';
    $input.focus();
};

const onInput = (event) => {
    newword = event.target.value;
};

$button.addEventListener('click', onClickButton);
$input.addEventListener('input', onInput);
$input.addEventListener('keypress', (key) => {
    if (key.key == 'Enter') {
        onClickButton()
    }
})

$input.focus();