const registerBtn = document.querySelector('.registerBtn');
const haveId = document.querySelector('.alreadyHave');

registerBtn.addEventListener('click', function(){ // 회원가입 링크 누를시 이벤트 주는 함수

    let loginbox = document.querySelector('#rightInfoBox');
    loginbox.style.transform = 'translateX(400px)';
    loginbox.style.transitionDelay = '0s'

    let rightregBox = document.querySelector('.regBox');
    rightregBox.style.transform = 'translateX(450px)';
    rightregBox.style.transitionDelay = '1s'
    
})

haveId.addEventListener('click', function(){ // 아이디 이미 있으세요? 누를시 이벤트 주는 함수

    let loginbox = document.querySelector('#rightInfoBox');
    loginbox.style.transform = 'translateX(0px)';
    loginbox.style.transitionDelay = '1s'

    let rightregBox = document.querySelector('.regBox');
    rightregBox.style.transform = 'translateX(805px)';
    rightregBox.style.transitionDelay = '0s'

})
