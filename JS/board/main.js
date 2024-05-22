const userArr = JSON.parse(localStorage.getItem("User")) || [];
if (userArr.length == 0) {
    location.href = "./../../HTML/login/login.html";
}
const loginUser = userArr.filter((i) => i.id == sessionStorage.getItem("login"))[0] || { "id": "guest", "password": 111, "nick": "게스트", "image": null };
const categoryArr = JSON.parse(localStorage.getItem("Category")) || [];
const boardArr = JSON.parse(localStorage.getItem("Board")) || [];
const commentArr = JSON.parse(localStorage.getItem("Comment")) || [];


// 랜더 함수
const render = (selectedCategory = null, selectedBoardNo = null) => {
    userInit();
    const categoryList = document.querySelector("#category > ul");
    const boardList = document.querySelector(".board-list > ul");
    categoryList.innerHTML = "";
    boardList.innerHTML = "";document.querySelector(".reply-input").dataset.type = "write";
    for (let i = 0; i < categoryArr.length; i++) {
        const item = categoryRender(i);
        categoryList.append(item);
    }
    if (selectedCategory == null) {
        init();
        return;
    }
    for(let i of document.querySelectorAll(".category-box")) {
        if (i.firstChild.innerHTML == selectedCategory) {
            i.classList.add("selected");
            continue;
        }
        i.classList.remove("selected");
    };
    
    document.querySelector(".category-name > h2").innerHTML = document.querySelector(".selected > div").innerHTML;

    for (let i = 0; i < arrByCategory().length; i++) {
        const item = boardListRender(i);
        boardList.append(item);
    }

    if (arrByCategory().length < 1) {
        document.querySelector(".board-top-title").innerHTML = "";
        document.querySelector(".board-content").innerHTML = "";
        document.querySelector(".board-top-info").style.display = "none";
        document.querySelector(".board-info").style.display = "none";
        document.querySelector(".reply-input").disabled = true;
        document.querySelector(".reply-box > ul").innerHTML = "";
        return
    }
    document.querySelector(".reply-input").disabled = false;
    document.querySelector(".board-top-info").style.display = "flex";
    if (selectedBoardNo)
        document.querySelectorAll(".board-box")[selectedBoardNo].classList.add("board-select");
    else 
        document.querySelector('.board-list > ul').firstElementChild.firstElementChild.firstElementChild.classList.add("board-select");
    document.querySelector(".board-top-title").innerHTML = document.querySelector(".board-select > .board-title").innerHTML;

    boardRender(arrByCategory()[document.querySelector(".board-select").dataset.index]);
    boardBtnEvent();

    if (arrByCategory().length > 24) 
        boardList.parentNode.style.paddingRight = "8px";
    else 
        boardList.parentNode.style.paddingRight = "0px";    

    commentListRender();
    
    console.log("render");
}

// 초기값 정하는 함수
const init = () => {
    const boardList = document.querySelector(".board-list > ul");
    if (categoryArr.length < 1) {
        document.querySelector(".board-top-info").style.display = "none";
        document.querySelector(".board-info").style.display = "none";
        return 
    }
    document.querySelector('#category > ul').firstChild.classList.add("selected");
    document.querySelector(".category-name > h2").innerHTML = document.querySelector(".selected > div").innerHTML;
    for (let i = 0; i < arrByCategory().length; i++) {
        const item = boardListRender(i);
        document.querySelector(".board-list > ul").append(item);
    }
    if (arrByCategory().length < 1) {
        document.querySelector(".board-top-title").innerHTML = "";
        document.querySelector(".board-content").innerHTML = "";
        document.querySelector(".board-top-info").style.display = "none";
        document.querySelector(".board-info").style.display = "none";
        document.querySelector(".reply-input").disabled = true;
        document.querySelector(".reply-box > ul").innerHTML = "";
        return
    }
    document.querySelector('.board-list > ul').firstElementChild.firstElementChild.firstElementChild.classList.add("board-select");
    document.querySelector(".board-top-title").innerHTML = document.querySelector(".board-select > .board-title").innerHTML;
    boardRender(arrByCategory()[document.querySelector(".board-select").dataset.index]);
    boardBtnEvent();

    if (arrByCategory().length > 24)
        boardList.parentNode.style.paddingRight = "8px";
    else
        boardList.parentNode.style.paddingRight = "0px";

    commentListRender();

    console.log("init");
}

// 메인 함수
const main = () => {
    if (!categoryArr || categoryArr.length == 0) {
        localStorage.setItem("Category", "[]");
        categoryPopupEnter("create");
    }

    render();
}

main();
