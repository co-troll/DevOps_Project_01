// 게시글을 눌렀을때, 거기에 작성되있는 정보에 따라 출력해줘야됨.

function getQueryParam(param) {
    let urlParams = new URLSearchParams(window.location.search); // url ?writeNum=번호를 찍어옴
    return urlParams.get(param);
}

let writeNum = getQueryParam('writeNum');

if (writeNum !== null){

    let showContent = JSON.parse(localStorage.getItem('Board'));
    let selectedContent = showContent.find(content => content.writeNum == writeNum);

    if (selectedContent !== null) {
        let category = document.querySelector('._category'); // 카테고리
        let title = document.querySelector('._title'); // 제목
        let content = document.querySelector('._content'); // 내용
        let nick = document.querySelector('._nick'); // 닉네임
        let date = document.querySelector('._date'); // 날짜

        category.innerHTML = selectedContent.category;
        title.innerHTML = selectedContent.title;
        nick.innerHTML = selectedContent.nick;
        date.innerHTML = selectedContent.date;
        content.innerHTML = selectedContent.content;
    }
}

let goBoard = document.querySelector('.main_board');


goBoard.onclick = () => {
    // location.href = ('../../HTML/help/Board.html')
}

// console.log(window.location.search);