///// 이미지업로드화면 none으로 준거 프로필 변경하기 누르면 보이게하기 //////
document.querySelector('.change_profile').addEventListener('click', function(){
    document.querySelector('#test').style.visibility = 'unset';
    document.querySelector('#test').classList.add('black-bg');
    // document.querySelector('.blackBackground').classList.add('hidden_see_frame');
});

//////모덜창 떠있는 주변에 클릭하면 모덜창 사라지게하기 //////////
document.querySelector('.change_profile').addEventListener('click', function(){
    document.querySelector('#test').style.visibility = 'visible';
});

document.querySelector('#test').addEventListener('click', function(event){
    if (event.target === document.querySelector('#test')) {
        document.querySelector('#test').style.visibility = 'hidden';
    }
});



/////////// 객체를 묶는  이미지에 값을 null이 아닌 이미지 값으로 넣기 //////////
//  localStorage.setItem('User', JSON.stringify([{id : "이경재", password : "1234", nick : "bb", image : null }]))
/////////////////////////////////////////////////////////////////
sessionStorage.setItem('login', "이경재" );




/////// 닉네임변경 글씨입력하는곳에 변경하기 하면 로컬에 넣고 재부팅하면 변경한값들어가있기 ////
document.querySelector(".change_button").addEventListener("click", function(){

    const uid = sessionStorage.getItem("login");
    const deee = JSON.parse(localStorage.getItem("User"));

    for(let i =0; i< deee.length; i++){
        if(deee[i].id === uid){
            deee[i].nick = document.querySelector("#loc").value;
            localStorage.setItem("User", JSON.stringify(deee))
        }
    }
});
// document.querySelector('#loc').value = localStorage.getItem("User");


////// 닉네임 객체배열안에 꺼내오기 /////
const nick_change = JSON.parse(localStorage.getItem("User"));
const login_id = sessionStorage.getItem("login");
// 만약에 세션스토리지에있는 유저안에 아이디가 로컬스토리지 배열안에 있는 아이디와 같다면 그안에있는 닉네임만 #loc안에 불러와줘
for(let i = 0; i<nick_change.length; i++){
    if(nick_change[i].id === login_id){
        document.querySelector("#loc").value = nick_change[i].nick;
    }
}




//////// 이미지 사진 업로드 할때 로컬스토리지에 저장하기 /////////
document.querySelector("#chooseFile").addEventListener("change", function(e){
     function saveData(){
        const reader = new FileReader();
        
        reader.onload=(e)=>{
            const base64Image = e.target.result;
            localStorage.setItem("User",base64Image);
        }
        reader.readAsDataURL(e.target.files[0]);

       
    }
    saveData();    

    function getData(){
        localStorage.getItem("User");
    
    }
    getData();
    
    console.log(document.querySelector('.tow_frame').imgBase64)
    document.querySelector('.tow_frame').imgBase64 = localStorage.getItem(".tow_frame");
});
document.querySelector('.tow_frame').imgBase64 = localStorage.getItem(".tow_frame");


///// 사진넣으면 미리보기로 넣어지면서 창은 사라지기 //////
chooseFile.addEventListener("change", (e) => {
    const img = e.target.files[0];
    if (img == undefined){ 
        return;
    }
    
    document.querySelector('.preview_oen').innerHTML="";
    const reader = new FileReader();
    reader.onload = (e) => {
        const imgBase64 = e.target.result;
        
        const newImg = document.createElement("img");
        newImg.src = imgBase64;


        newImg.style.width = "170px";
        newImg.style.height = "170px";
        newImg.draggable = false;
        newImg.style.borderRadius = "50%";
       
        document.querySelector('.preview_oen').append(newImg);
        document.querySelector('#test').style.visibility = 'hidden';
        ////// 사진 이미지 로컬스토리지 배열안에 저장해줌 //////// 
        localStorage.setItem('User', JSON.stringify([{id : "이경재", password : "1234" , nick : "bb", "image" : imgBase64 }]))
    }

    reader.readAsDataURL(img);
});

document.querySelector("#chooseFile").addEventListener("change", function(){
    document.querySelector('#test').classList.add('myimage');
})




////////////////// x표시 누르면 다른 페이지로 이동 //////////////////////////
document.querySelector(".x_imge").addEventListener("click",function(){
   location.href = "../../HTML/board/board.html"
})














