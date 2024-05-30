// 로컬스토리지 categoryNo / no / title / content / author / view / date

const createList = document.querySelector('.createList');

createList.onclick = function () {
    location.href = 'write.html';
}

function render (){
    let listCreate = document.querySelector('.board_list');
    let show = JSON.parse(localStorage.getItem('Help'));
    
    if(show !== null){
        for(let i = 0; i < show.length; i++){
            let list_ul = document.createElement('ul');
            let list_no = document.createElement('li');
            let list_title = document.createElement('a');
            list_title.classList.add('view_up');
            let list_writer = document.createElement('li');
            let list_view = document.createElement('li');
            let list_date = document.createElement('li');
    
            listCreate.append(list_ul);
            list_ul.append(list_no, list_title, list_writer, list_date, list_view);
    
            list_no.innerHTML = i + 1;
            list_title.innerHTML = show[i].title; // 제목 출력
            list_date.innerHTML = show[i].date; // 날짜 출력
            list_writer.innerHTML = show[i].nick; // 작성자 출력
            list_view.innerHTML = show[i].view;

            list_title.onclick = function(){
                show[i].view = ++show[i].view;
                localStorage.setItem('Help', JSON.stringify(show));
            }
            // a 태그를 클릭했을때 로컬스토리지 view 값이 1증가하게 해야됨.
            list_title.href = `../../HTML/help/Detail.html?writeNum=${i + 1}`;
        }
    }
    let loginID = sessionStorage.getItem('login');
    let localArray = JSON.parse(localStorage.getItem('User'));
    let showID = document.querySelector('.login_id');
    if(localArray !== null){ // 헤더 닉네임 출력 칸
        for(let i=0; i < localArray.length; i++){
            if(loginID === localArray[i].id){
                showID.innerHTML = localArray[i].nick;
            }
        }
    }
}

render();

let createWrite = document.querySelector('.createList');

createWrite.onclick = () => { // 문의글 작성 버튼 누를시 onclick 작동
    if(sessionStorage.getItem('login') === null){
        alert('로그인이 되지 않아 게시글을 작성 할 수 없습니다.');
        return;
    }
    location.href = "write.html";
}

let helpBoard = document.querySelector('.help_board');
let locationBoard = document.querySelector('.locationBoard');
let userGuideBoard = document.querySelector('.userGuideBoard');
let help_bar = document.querySelector('.help_bar');
let location_bar = document.querySelector('.location_bar');
let userguide_bar = document.querySelector('.userguide_bar');
let hide = document.querySelector('.hide');
let mainShow = document.querySelector('.main_show');
let home = document.querySelector('.home');

// home.onclick = () => {
//     location.href = location.href
// }
let tabName = "home";
let prveEl = helpBoard;
document.addEventListener("click", (e) => {
    if(e.target.classList[1] === "tab"){
        if(tabName === e.target.classList[0]) return;
        tabName = e.target.classList[0];
        switch (e.target.classList[0]) {
            case "home":
                setTimeout(()=>{
                    mainShow.classList.remove('animate-off')
                    mainShow.classList.remove('hide');
                    home.classList.add('checking');
                    help_bar.classList.remove('checking');
                    location_bar.classList.remove('checking');
                    userguide_bar.classList.remove('checking');
                    mainShow.classList.add('animate-active');
                    mainShow.classList.remove('hide');
                    mainShow.style.display = '';
                    mainShow.style.zIndex = '4';
                    helpBoard.style.display = 'none';
                    helpBoard.style.zIndex = '3';
                    locationBoard.style.zIndex = '3';
                    locationBoard.style.display = 'none';
                    userGuideBoard.style.zIndex = '3';
                    userGuideBoard.style.display = 'none';
                },300)
                prveEl.classList.add('animate-off');
                prveEl = mainShow;
                break;
            case "help_bar":
                setTimeout(()=>{
                    helpBoard.classList.remove('animate-off')
                    mainShow.classList.add('hide');
                    help_bar.classList.add('checking');
                    home.classList.remove('checking');
                    location_bar.classList.remove('checking');
                    userguide_bar.classList.remove('checking');
                    helpBoard.classList.add('animate-active');
                    helpBoard.classList.remove('hide');
                    mainShow.style.display = 'none';
                    mainShow.style.zIndex = '3';
                    helpBoard.style.display = '';
                    helpBoard.style.zIndex = '4';
                    locationBoard.style.display = 'none';
                    locationBoard.style.zIndex = '3';
                    userGuideBoard.style.display = 'none';
                    userGuideBoard.style.zIndex = '3';
                },300)
                prveEl.classList.add('animate-off');
                prveEl = helpBoard;
                break;
            case "location_bar":
                setTimeout(()=>{
                    locationBoard.classList.remove('animate-off')
                    location_bar.classList.add('checking');
                    home.classList.remove('checking');
                    help_bar.classList.remove('checking');
                    userguide_bar.classList.remove('checking');
                    mainShow.classList.add('hide');
                    helpBoard.classList.add('hide');
                    locationBoard.classList.add('animate-active');
                    locationBoard.classList.remove('hide');
                    mainShow.style.display = 'none'
                    mainShow.style.zIndex = '3'
                    helpBoard.style.display = 'none';
                    helpBoard.style.zIndex = '3';
                    locationBoard.style.display = '';
                    locationBoard.style.zIndex = '4';
                    userGuideBoard.style.display = 'none';
                    userGuideBoard.style.zIndex = '3';
                },300)
                prveEl.classList.add('animate-off');
                prveEl = locationBoard;
                tabName = "location_bar";
                break;
            case "userguide_bar":
                setTimeout(() => {
                    userGuideBoard.classList.remove('animate-off')
                    home.classList.remove('checking');
                    help_bar.classList.remove('checking');
                    location_bar.classList.remove('checking');
                    userguide_bar.classList.add('checking');
                    mainShow.classList.add('hide');
                    helpBoard.classList.add('hide');
                    locationBoard.classList.add('hide');
                    userGuideBoard.classList.add('animate-active');
                    userGuideBoard.classList.remove('hide');
                    mainShow.style.display = 'none';
                    mainShow.style.zIndex = '3'
                    helpBoard.style.display = 'none';
                    helpBoard.style.zIndex = '3';
                    locationBoard.style.display = 'none';
                    locationBoard.style.zIndex = '3';
                    userGuideBoard.style.display = '';
                    userGuideBoard.style.zIndex = '4';
                }, 300)
                    prveEl.classList.add('animate-off');
                    prveEl = userGuideBoard;
                    tabName = "userguide_bar";
                break;
        
            default:
                break;
        }
    }
})

let logout_button = document.querySelector('.logout_button');

logout_button.onclick = () => {
    let headID = document.querySelector('.login_id');
    if(sessionStorage.getItem('login') === null){
        alert('로그인이 되지 않았습니다.');
    }else if(sessionStorage.getItem('login') !== null){
        headID.innerHTML = "";
        sessionStorage.clear();
        alert('로그아웃 됬습니다.');
        location.href = '../../HTML/login/login.html';
    }
}

let exit_button = document.querySelector('.exit_button');

exit_button.onclick = () => {
    location.href = '../../HTML/board/board.html';
}

// 클릭을 했을때, 화면이 지워지면서 밑으로 접히는 애니메이션 넣기


document.querySelector('.police1').onclick = () => {
    location.href = 'https://www.police.go.kr/index.do';
}
document.querySelector('.police2').onclick = () => {
    location.href = 'https://www.police.go.kr/index.do';
}

document.querySelector('.nuna').onclick = () => {
    location.href = '../../HTML/help/fake.html';
}

document.querySelector('.fake').onclick = () => {
    location.href = '../../HTML/help/becareful.html';
}