///// 이미지업로드화면 none으로 준거 프로필 변경하기 누르면 보이게하기 //////
document.querySelector('.change_profile').addEventListener('click', function(){
    document.querySelector('#test').classList.remove('myimage')
});


//////// 이미지 업로드 화면 띄어져있는상태에서 주변빈곳누르면 사라지게 만들기 /////// 
top.onclick = (e) => {
    console.log(e.target)
    if(e.target == nickname){
    document.querySelector('#test').classList.add('myimage');
    }
}



document.querySelector(".change_button").addEventListener("click", function(){
    function saveData(){
        localStorage.setItem("item","hello world");
    }
    saveData();    

    function getData(){
        localStorage.getItem("item");
        console.log(localStorage.getItem("item"));
    
    }
    getData();
    
    // ///// 20200517 날 할일 javascript 인풋값을 인풋에넣는법 닉네임변경하는 안에 로컬스토리지에 저장되있는거 화면에출력시키기 /////
    console.log(document.querySelector('#loc').value)
    document.querySelector('#loc').innerHTML = document.querySelector('#loc').value
    
});










