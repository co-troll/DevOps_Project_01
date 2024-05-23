// 게시글을 눌렀을때, 거기에 작성되있는 정보에 따라 출력해줘야됨.

function getQueryParam(param) {
    let urlParams = new URLSearchParams(window.location.search); // url ?writeNum=번호를 찍어옴
    return urlParams.get(param);
}

let writeNumPage = getQueryParam('writeNum');
if (writeNumPage !== null){

    let showContent = JSON.parse(localStorage.getItem('Board'));
    let selectedContent = showContent.find(content => content.writeNum == writeNumPage);
    console.log(selectedContent)

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

let goBoard = document.querySelector('.home_image');


goBoard.onclick = () => { // 집 모양 누르면 메인페이지로 이동
    location.href = ('../../HTML/help/Board.html')
}

let updateContent = document.querySelector('.update_content');

updateContent.addEventListener('click', () => {
    let showContent = JSON.parse(localStorage.getItem('Board'));
    let selectedContent = showContent.find(content => content.writeNum == writeNumPage);
    let getUser = sessionStorage.getItem('login');
    if(getUser === selectedContent.id){
        location.href = ('../../HTML/help/update.html');
    }
    return sessionStorage.setItem('update', writeNumPage);
});


let delete_content = document.querySelector('.main_board'); // 게시글 삭제 버튼

delete_content.addEventListener('click', () => { // 게시글 삭제, 세션 값 비교해서 게시글 작성한 아이디가 다르면 삭제 못하게
    let showContent = JSON.parse(localStorage.getItem('Board'));
    let getUser = sessionStorage.getItem('login');
    let selectedContent = showContent.find(content => content.writeNum == writeNumPage);
    for(let i = 0; i < showContent.length; i++){
        if(selectedContent.id === getUser){
            if(selectedContent === showContent[i]){
                showContent.splice(writeNumPage-1, 1);
                location.href = ('../../HTML/help/Board.html');
            }
        }
    showContent[i].writeNum = i + 1;
    localStorage.setItem('Board', JSON.stringify(showContent));
    }
});

