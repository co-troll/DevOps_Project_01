const loginUser = JSON.parse(localStorage.getItem("User")).filter((i) => i.id == sessionStorage.getItem("login"))[0];
const categoryArr = JSON.parse(localStorage.getItem("Category")) || [];
const boardArr = JSON.parse(localStorage.getItem("Board")) || [];

// 랜더 함수
const render = (selectedName = null) => {
    const categoryList = document.querySelector("#category > ul");
    categoryList.innerHTML = "";
    for (let i = 0; i < categoryArr.length; i++) {
        const item = categoryRender(i);
        categoryList.append(item);
    }
    if (selectedName == null) {
        init();
        return;
    }
    for(let i of document.querySelectorAll(".category-box")) {
        if (i.firstChild.innerHTML == selectedName) {
            i.classList.add("selected");
            continue;
        }
        i.classList.remove("selected");
    };

    document.querySelector(".category-name > h2").innerHTML = document.querySelector(".selected > div").innerHTML;

    console.log("render");
}

// 초기값 정하는 함수
const init = () => {
    if (categoryArr.length < 1) 
        return 
    document.querySelector('#category > ul').firstChild.classList.add("selected");
    document.querySelector(".category-name > h2").innerHTML = document.querySelector(".selected > div").innerHTML;
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
