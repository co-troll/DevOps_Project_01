let content = document.querySelector('.text_content');
let title = document.querySelector('.text_title');
let createContent = document.querySelector('.create_content');
let categoryList = document.querySelector('.category_list');


let pageLoad = JSON.parse(localStorage.getItem('Board')) || []; // 페이지 로드시 board local 빈값이면 빈배열 반환

class Board {
    constructor(category, title, content, nick, date, view){
        this.category = category;
        this.title = title;
        this.content = content;
        this.nick = nick;
        this.date = date;
        this.view = view;
    }
}

createContent.onclick = function move() { // 작성 버튼 누를 시 작성 값들 다 저장 후, html 파일 이동
    let content = document.querySelector('.text_content');
    let title = document.querySelector('.text_title');
    let categoryList = document.querySelector('.category_list');
    let view = 0;

    function getDate() { // 로컬에 날짜 출력하려고 만든 함수
        const today = new Date();
      
        const year = today.getFullYear(); // 년도
        const month = (today.getMonth() + 1).toString().padStart(2, '0'); // 월
        const day = today.getDate().toString().padStart(2, '0'); // 일
      
        const dateString = year + '-' + month + '-' + day;  // 년 - 월 - 일
      
        return dateString;
      }


    //////// 글 작성시 로컬에 작성자 닉네임 저장하려고 작성함

    let loginID = sessionStorage.getItem('login'); // 세션 값 가져오기
    let localArray = JSON.parse(localStorage.getItem('User')); // 로컬 값 가져오기.
    let saveID;

    if(localArray !== null){ // 로컬이 null이 아니라면 for문을 돌림
        for(let i=0; i < localArray.length; i++){
            if(loginID === localArray[i].id){ // loginID와 local[i].id가 같다면
                saveID = localArray[i].nick // id와 일치하는 객체의 닉네임을 saveID에 할당.
            }
        }
    }

    /////////////

    let boardObject = new Board(categoryList.value, title.value, content.value, saveID, getDate(), view); // 작성자도 넣어야 됨.
    
    if(title.value === "" || content.value === ""){ // content, title 빈값이면 작성 못하게 막음
        return;
    }
    pageLoad.push(boardObject)
    localStorage.setItem('Board', JSON.stringify(pageLoad));
    
    location.href = 'Board.html'
}