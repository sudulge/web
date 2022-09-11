# 야추

## 닌텐도 스위치 51 Worldwide Games에 있는 yacht 따라만듦

# 나를 위한 설명

# 함수

## selectdice() - 주사위 클릭 이벤트리스너
주사위를 클릭했을때 $dices에 있다면 $selected로, 혹은 그 반대로 옮겨줌  
numberOfDice를 1 줄임 

## rolldice(number) - roll 버튼 mousedown 이벤트리스너
턴이 남아있고 $dices에 주사위가 남아 있다면 $dices에 남은 주사위를 모두 제거함  
numberOfDice 만큼 새로 주사위를 굴림  
턴을 1 줄임  
isPressed를 true로 바꿔줌  
shake() 함수 실행

## confirmdice() - roll 버튼 mouseup, mouseout 이벤트리스너
isPressed가 true라면 실행  
isPressed를 false로 바꾸고 shake() 함수를 멈춰줌  
주사위들을 멈추고 정렬한 뒤 selectDice() 이벤트리스너 추가해줌  
turn이 0이라면 $dices에 있는 주사위들을 모두 $selected로 옮기고 $sselected에 있는 주사위들의 selectDice() 이벤트 리스너 제거  
prefill_number(), prefill_set() 함수 실행  

## shake()
isPressed가 true라면 실행  
\$dices에 있는 주사위들의 이미지와 마진을 바꾸면서 흔들리는 효과를 줌  
setTImeout 함수로 밀리세컨드 마다 계속 실행

## nextturn() - 스코어보드 각 칸의 클릭 이벤트리스너
턴을 3으로 설정 numberOfDice를 5로 설정 게임 턴 1 올려줌  
\$selected 와 $dices에 있는 주사위들을 모두 제거함  
스코어보드의 status가 filled가 아닌 칸들의 status를 unfilled로 바꾸고 textContent를 지워줌

## prefill_number() 
\$dices와 $selected의 주사위들의 숫자 점수를 계산해줌  
숫자칸의 status가 filled가 아닌 칸들의 status를 prefilled로 바꿔주고 textContent에 계산된 점수를 넣어줌

## numberScore(div_element) - 스코어보드 숫자칸의 클릭 이벤트리스너
턴이 3이 아니고 숫자칸의 status가 filled가 아니면 실행  
subtotal과 total에 점수를 더해줌  
숫자칸의 클래스를 row_filled로 바꿔줌  
숫자칸의 status를 filled로 바꿔줌
만약 subtotal이 63보다 크다면 +35로 표시해주고 total에 35점 추가  
nextturn() 함수 실행

## prefill_set()
\$dices와 $selected의 주사위들의 족보 점수를 계산해줌  
족보칸의 status가 filled가 아닌 칸들의 status를 prefilled로 바꿔주고 textContent에 0을 우선적으로 넣어줌  
주사위들에 족보가 있다면 해당되는 족보칸의 status가 filled인지 체크 후 아니라면 textContent에 계산된 점수를 넣어줌  

## setScore(div_element) - 스코어보드 족보칸의 클릭 이벤트리스너
턴이 3이 아니고 족보칸의 status가 filled가 아니라면 실행  
족보칸의 클래스를 row_filled로 바꿔줌  
족보칸의 status를 filled로 바꿔줌  
nextturn() 함수 실행



# 이벤트리스너
## subtotal, bonus, total을 제외한 모든 행
click - nextturn()   

## 숫자행
click - numberScore(this)

## 족보행
click - setScore(this)

## 주사위 
click - selectdice()

## roll 버튼
mousedown - rolldice() (rolldice()에서 shake() 함수 실행)  
mouseup - confirmdice()  
mouseout - confirmdice()

# 할것

* 턴 12 되면 결과 보여주고 끝내기

* 주사위 옮기는 애니메이션

* 주사위 굴리고 족보 나오면 보여주기 그리고 그 스코어칸 반짝이게 , 족보가 되는 주사위 강조표시
* 숫자 row 에 올렸을때 해당 숫자 주사위 테두리 강조 1차 
* 족보 row 에 올렸을때 해당 족보 주사위 테두리 강조 2차
* 더해지는 주사위 테두리 강조

* 키보드로 움직이기

* 플레이어 추가
* socket io 연결

* 코드 정리