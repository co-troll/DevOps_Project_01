let content = document.querySelector('.text_content');
let title = document.querySelector('.text_title');
let createContent = document.querySelector('.create_content');
let categoryList = document.querySelector('.category_list');


let pageLoad = JSON.parse(localStorage.getItem('Board')) || []; // 페이지 로드시 board local 빈값이면 빈배열 반환

class Board {
    constructor(category, title, content){
        this.category = category;
        this.title = title;
        this.content = content;
    }
}

createContent.onclick = function move() { // 작성 버튼 누를 시 작성 값들 다 저장 후, html 파일 이동
    let content = document.querySelector('.text_content');
    let title = document.querySelector('.text_title');
    let categoryList = document.querySelector('.category_list');
    
    let boardObject = new Board(categoryList.value, title.value, content.value);
    
    if(title.value === "" || content.value === ""){ // content, title 빈값이면 작성 못하게 막음
        return;
    }
    pageLoad.push(boardObject)
    localStorage.setItem('Board', JSON.stringify(pageLoad));
    
    location.href = 'Board.html'
}

// createContent.addEventListener('click', function(){
//     let content = document.querySelector('.text_content');
//     let title = document.querySelector('.text_title');
//     let categoryList = document.querySelector('.category_list');

//     let boardObject = new Board(categoryList.value, title.value, content.value);

//     if((title.value && content.value) === ""){ // content, title 빈값이면 작성 못하게 막음
//         return;
//     }
//     pageLoad.push(boardObject)
//     localStorage.setItem('Board', JSON.stringify(pageLoad));

//     render();

//     location.href = 'Board.html'
// })