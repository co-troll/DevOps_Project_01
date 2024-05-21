// 로컬스토리지 categoryNo / no / title / content / author / view / date

const createList = document.querySelector('.createList')

createList.onclick = function () {
    location.href = 'write.html'
}

function render (){
    let listCreate = document.querySelector('.board_list')
    let show = JSON.parse(localStorage.getItem('Board'));
    
    if(show !== null){
        for(let i = 0; i < show.length; i++){
            let list_ul = document.createElement('ul');
            let list_no = document.createElement('li');
            let list_title = document.createElement('a');
            list_title.classList.add('view_up')
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
                localStorage.setItem('Board', JSON.stringify(show));
            }
            // a 태그를 클릭했을때 로컬스토리지 view 값이 1증가하게 해야됨.
            list_title.href = `../../HTML/help/Detail.html?writeNum=${i + 1}`
        }
    }
    let loginID = sessionStorage.getItem('login');
    let localArray = JSON.parse(localStorage.getItem('User'));
    let showID = document.querySelector('.login_id');
    if(localArray !== null){ // 헤더 닉네임 출력 칸
        for(let i=0; i < localArray.length; i++){
            if(loginID === localArray[i].id){
                showID.innerHTML = localArray[i].nick
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
    location.href = "write.html"
}

let helpBoard = document.querySelector('.help_board');
let helpBoard2 = document.querySelector('.help_board2');
let firstTab = document.querySelector('.category_test');
let secondTab = document.querySelector('.no_test');
let hide = document.querySelector('.hide');
let mainShow = document.querySelector('.main_show')


firstTab.onclick = () => { // 첫번째 탭을 눌렀을 시 발생하는 이벤트
    mainShow.classList.add('hide');
    firstTab.classList.add('checking');
    secondTab.classList.remove('checking');
    helpBoard.classList.add('animate');
    helpBoard.classList.remove('hide');
    helpBoard.style.display = '';
    helpBoard.style.zIndex = '4';
    helpBoard2.style.zIndex = '3';
    helpBoard2.style.display = 'none'
    setTimeout(() => { // 0.5초 뒤에 helpBoard에 no1color Class 추가
        helpBoard.classList.add('no1color')
    }, 500)
    setTimeout(() => { // 1초 뒤에 helpBoard에 animate Class 삭제
        // let helpBoard = document.querySelector('.help_board');
        helpBoard.classList.remove('animate')
    }, 1000);
}

secondTab.onclick = () => { // 두번쨰 탭을 눌렀을 시 발생하는 이벤트
    mainShow.classList.add('hide');
    secondTab.classList.add('checking');
    firstTab.classList.remove('checking');
    helpBoard.classList.add('hide');
    helpBoard2.classList.add('animate');
    helpBoard2.classList.remove('hide');
    helpBoard.style.display = 'none'
    helpBoard.style.zIndex = '3';
    helpBoard2.style.zIndex = '4';
    helpBoard2.style.display = '';
    setTimeout(() => { // 0.5초 뒤에 helpBoard2에 no2color Class 추가
        helpBoard2.classList.add('no2color')
    }, 500)
    setTimeout(() => { // 1초 뒤에 helpBoard2에 animate Class 삭제
        // let helpBoard = document.querySelector('.help_board');
        helpBoard2.classList.remove('animate')
    }, 1000);
}


let logout_button = document.querySelector('.logout_button');

logout_button.onclick = () => {
    let headID = document.querySelector('.login_id');
    if(sessionStorage.getItem('login') === null){
        alert('로그인이 되지 않았습니다.')
    }else if(sessionStorage.getItem('login') !== null){
        headID.innerHTML = "";
        sessionStorage.clear();
        alert('로그아웃 됬습니다.');
        location.href = '../../HTML/login/login.html'
    }
}

// 클릭을 했을때, 화면이 지워지면서 밑으로 접히는 애니메이션 넣기