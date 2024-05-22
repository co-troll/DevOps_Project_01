const registerBtn = document.querySelector('.registerBtn');
const haveId = document.querySelector('.alreadyHave');

registerBtn.addEventListener('click', function(){ // 회원가입 링크 누를시 이벤트 주는 함수

    let loginbox = document.querySelector('#rightInfoBox');
    loginbox.style.transform = 'translateX(400px)';
    loginbox.style.transitionDelay = '0s';

    let rightregBox = document.querySelector('.regBox');
    rightregBox.style.transform = 'translateX(450px)';
    rightregBox.style.transitionDelay = '0.4s';

    document.querySelector('.idInput').value = "";
    document.querySelector('.passwordInput').value = "";

    
})

haveId.addEventListener('click', function(){ // 아이디 이미 있으세요? 누를시 이벤트 주는 함수

    let loginbox = document.querySelector('#rightInfoBox');
    loginbox.style.transform = 'translateX(0px)';
    loginbox.style.transitionDelay = '0.4s';

    let rightregBox = document.querySelector('.regBox');
    rightregBox.style.transform = 'translateX(805px)';
    rightregBox.style.transitionDelay = '0s';

    document.querySelector('.regidInput').value = "";
    document.querySelector('.regPasswordInput').value = "";
    document.querySelector('.passwordreInput').value = "";
    document.querySelector('.nicknameInput').value = "";

})

const idCheck = document.querySelector('.regidInput');
const check = document.querySelector('.regPasswordInput');
const reCheck = document.querySelector('.passwordreInput');
const nickCheck = document.querySelector(".nicknameInput");
const idMessage = document.querySelector('.id-message');
const mismatchMessage = document.querySelector('.mismatch-message');
const strongPasswordMessage = document.querySelector('.strong-message');
const nickMessage = document.querySelector(".nick-message");

function strongId(str) {
    return /^(?=.*[a-zA-Z\d])[a-zA-z]+[a-zA-Z\d]{1,19}$/.test(str);
}

function strongPassword(str) {
    return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(str);
}

function strongNick(str) {
    return /^(?=.*[a-zA-Zㄱ-힣\d])[a-zA-Zㄱ-힣\d]{1,10}$/.test(str);
}

function isMatch(reg_pw1, reg_pw2) {
    return reg_pw1 === reg_pw2;
}


idCheck.onkeyup = function () { // 비밀번호칸 정규식 함수
    // 값을 입력한 경우
    if (idCheck.value.length !== 0) {
        if (strongId(idCheck.value)) {
            idMessage.classList.add('hide'); // 실패 메시지가 가려져야 함
            idMessage.classList.remove('text_show'); // 'text_show' 클래스 제거
        } else {
            idMessage.classList.remove('hide'); // 실패 메시지가 보여야 함
            idMessage.classList.add('text_show'); // 'text_show' 클래스 추가
        }
    } else {
        // 값을 입력하지 않은 경우 (지웠을 때)
        // 모든 메시지를 가린다.
        idMessage.classList.add('hide');
        idMessage.classList.remove('text_show'); // 'text_show' 클래스 제거
    }
};

check.onkeyup = function () { // 비밀번호칸 정규식 함수
    // 값을 입력한 경우
    if (check.value.length !== 0) {
        if (strongPassword(check.value)) {
            strongPasswordMessage.classList.add('hide'); // 실패 메시지가 가려져야 함
            strongPasswordMessage.classList.remove('text_show'); // 'text_show' 클래스 제거
        } else {
            strongPasswordMessage.classList.remove('hide'); // 실패 메시지가 보여야 함
            strongPasswordMessage.classList.add('text_show'); // 'text_show' 클래스 추가
        }
    } else {
        // 값을 입력하지 않은 경우 (지웠을 때)
        // 모든 메시지를 가린다.
        strongPasswordMessage.classList.add('hide');
        strongPasswordMessage.classList.remove('text_show'); // 'text_show' 클래스 제거
    }
};

reCheck.onkeyup = function () { // 비밀번호 확인 이벤트 함수
    if (reCheck.value.length !== 0) {
        if (isMatch(check.value, reCheck.value)) {
            mismatchMessage.classList.add('hide'); // 실패 메시지가 가려져야 함
        } else {
            mismatchMessage.classList.remove('hide'); // 실패 메시지가 보여야 함
            mismatchMessage.classList.add('text_show');
        }
    } else {
        mismatchMessage.classList.add('hide'); // 실패 메시지가 가려져야 함
    }
};

nickCheck.onkeyup = function () { // 닉네임 정규식 함수
    // 값을 입력한 경우
    if (nickCheck.value.length !== 0) {
        if (strongNick(nickCheck.value)) {
            nickMessage.classList.add('hide'); // 실패 메시지가 가려져야 함
            nickMessage.classList.remove('text_show'); // 'text_show' 클래스 제거
        } else {
            nickMessage.classList.remove('hide'); // 실패 메시지가 보여야 함
            nickMessage.classList.add('text_show'); // 'text_show' 클래스 추가
        }
    } else {
        // 값을 입력하지 않은 경우 (지웠을 때)
        // 모든 메시지를 가린다.
        nickMessage.classList.add('hide');
        nickMessage.classList.remove('text_show'); // 'text_show' 클래스 제거
    }
};

// 페이지 로드 시 로컬 스토리지에서 데이터 불러오기
let userArray = JSON.parse(localStorage.getItem('User')) || [];

class User {
    constructor(id, password, nick, image) {
        this.id = id;
        this.password = password;
        this.nick = nick;
        this.image = image;
    }
}

let regBtn = document.querySelector('.regBtn');

regBtn.addEventListener('click', function() { // 회원가입 버튼 누를시 로컬스토리지에 id,password,nick 값 저장
    let regIdInput = document.querySelector('.regidInput').value;
    let regPasswordInput = document.querySelector('.regPasswordInput').value;
    let nicknameInput = document.querySelector('.nicknameInput').value;
    let image = null; 

    // ID, nickname 빈칸 체크
    if(regIdInput === ''){
        alert('아이디를 입력해주세요.');
        return;
    }else if(nicknameInput === ''){
        alert('닉네임을 입력해주세요');
        return;
    }

    // 중복 ID 체크
    if (userArray.find(user => user.id === regIdInput)) { // 로컬스토리지 id 중복체크
        alert('이미 존재하는 ID입니다.'); // 나중에 class 추가해서 id 중복체크 할것임.
        return;
    }else if(userArray.find(user => user.nick === nicknameInput)){
        alert('이미 존재하는 닉네임입니다.'); // 나중에 class 추가해서 nickname 중복체크 할것임.
        return;
    }

    let userInfo = new User(regIdInput, regPasswordInput, nicknameInput, image);

    userArray.push(userInfo);

    localStorage.setItem('User', JSON.stringify(userArray));
    alert('회원가입이 완료되었습니다.');

    document.querySelector('.regidInput').value = "";
    document.querySelector('.regPasswordInput').value = "";
    document.querySelector('.passwordreInput').value = "";
    document.querySelector('.nicknameInput').value = "";
    
    let loginbox = document.querySelector('#rightInfoBox');
    loginbox.style.transform = 'translateX(0px)';
    loginbox.style.transitionDelay = '0.4s';

    let rightregBox = document.querySelector('.regBox');
    rightregBox.style.transform = 'translateX(805px)';
    rightregBox.style.transitionDelay = '0s';
});


// 로그인 버튼을 클릭 했을때 로컬스토리지 값 먼저 비교 후, true면 세션스토리지에 그 로컬스토리지 값과 같은것을 Input.value로 저장후 이동

const loginBtn = document.querySelector('.loginBtn');

loginBtn.addEventListener('click', function(){ // 로컬스토리지 id, password값과 id, password input값이 같으면 sessionStorage에 id input값을 저장후 메인페이지로 넘어가게 할것.
    let IdInput = document.querySelector('.idInput').value;
    let PasswordInput = document.querySelector('.passwordInput').value;
    if((userArray.find(user => user.id !== IdInput)) && (userArray.find(user => user.password !== PasswordInput))){
        alert('아이디(로그인 전용 아이디) 또는 비밀번호를 잘못 입력했습니다.')
    } else if((userArray.find(user => user.id === IdInput)) && (userArray.find(user => user.password === PasswordInput))){
        sessionStorage.setItem('login', IdInput);
        alert('로그인 완료');
        document.querySelector('.idInput').value = "";
        document.querySelector('.passwordInput').value = "";
        location.href = '../../HTML/board/board.html';
    }
});

loginBtn.addEventListener('mousedown', function(){
    loginBtn.classList.add('click');
})

loginBtn.addEventListener('mouseup', function(){
    loginBtn.classList.remove('click');
})

let checkbox = document.querySelector('#check_btn');

checkbox.addEventListener('click', function() {
    if(checkbox.checked){
        regBtn.disabled = false;
    }else{
        regBtn.disabled = true;
    }
})

regBtn.addEventListener('mousedown', function(){
    regBtn.classList.add('click');
})

regBtn.addEventListener('mouseup', function(){
    regBtn.classList.remove('click');
})

let click = 0;

document.querySelector('.eye_image').onclick = function () { // 비밀번호 옆, 눈 이미지 클릭시
    if(click === 0){
        document.querySelector('.passwordInput').type = 'text';
        click++;
    }else{
        document.querySelector('.passwordInput').type = 'password';
        click--;
    }
}