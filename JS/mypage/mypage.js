///// 이미지업로드화면 none으로 준거 프로필 변경하기 누르면 보이게하기 //////
document.querySelector('.change_profile').addEventListener('click', function(){
    document.querySelector('#test').classList.remove('myimage');
    document.querySelector('#image_head').style.zIndex ='2'
});


//////// 이미지 업로드 화면 띄어져있는상태에서 주변빈곳누르면 사라지게 만들기 /////// 
top.onclick = (e) => {
    // console.log(e.target)
    if(e.target == nickname){
    document.querySelector('#test').classList.add('myimage');
    }
}


/////////// 객체를 묶는  이미지에 값을 null이 아닌 이미지 값으로 넣기 //////////
 localStorage.setItem('User', JSON.stringify([{id : "이경재", password : "1234", nick : "bb", image : null }]))
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
        // console.log(localStorage.getItem("User"));
    
    }
    getData();
    
    console.log(document.querySelector('.background').imgBase64)
    document.querySelector('.background').imgBase64 = localStorage.getItem(".background");
});
document.querySelector('.background').imgBase64 = localStorage.getItem(".background");










////// 사진넣으면 미리보기로 넣어지면서 창은 사라지기 //////
chooseFile.addEventListener("change", (e) => {
    const img = e.target.files[0];
    if (img == undefined){ 
        return;
    }
    
    document.querySelector('.button2').innerHTML="";
    const reader = new FileReader();
    reader.onload = (e) => {
        const imgBase64 = e.target.result;
        
        const newImg = document.createElement("img");
        newImg.src = imgBase64;


        newImg.style.width = "170px";
        newImg.style.height = "170px";
        newImg.draggable = false;
        newImg.style.borderRadius = "50%";
       
        document.querySelector('.button2').append(newImg);
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




///////////////////////  유저 정보가 담긴 객체를 여러개 만들어서 여러개 있는 객체 정보중에 한개 찝어서 거기 있는 nick 바꾸기 ////////////////




/////// 로컬스토리지에 저장하기 
// document.querySelector('.change_button').addEventListener("click", () => {
// const uid = sessionStorage.getItem("login");
// const deee = JSON.parse(localStorage.getItem("user"));

// for(let i =0; i< deee.length; i++){
//     if(deee[i].id === uid){
//         deee[i].nick = document.querySelector("#loc").value;
//         localStorage.setItem("user", JSON.stringify(deee))
//     }
// }
// });






// 여기서부터해야 할것은 id/password/nick/image 배열안에객체로만들어서 로컬에 저장하기
// 이미지를 넣음 기존이미지 삭제 추가 이미지보여줌 
// 프로필변경 페이지로 들어옴 기존닉네임과 함께 같이 로컬로 저장된걸 받아서 가져옴
// 닉네임 변경하기를 누르면 닉네임이 변경됨
// 프로필 변경하기를 누르면 이미지 업로드페이지가 뜸
// 업로드페이지에서 이미지 사진을 바꾸면 미리보기에 사진이 들어감
// 사진이 맘에안들면 삭제도됨 
// 업로드페이지가 뜬걸 빈곳아무곳이나 눌러서 없애기
// 이미지 로컬로 받아온거 미리보기에 들어올수있게 하기
// 





