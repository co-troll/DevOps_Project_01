class Board {
    constructor() {
    }

    setCategoryNo(no) { this.categoryNo = no; }

    setNo(no) { this.no = no; }

    setTitle(title) { this.title = title; }

    setContent(content) { this.content = content; }

    setAuthor(author) { this.author = author; }

    setView() { this.view = 0; }

    setDate() {
        const date = new Date();
        let year = date.getFullYear();
        let month = ("00" + (date.getMonth() + 1)).slice(-2);
        let day = ("00" + date.getDate()).slice(-2);

        this.date = [year, month, day].join("-");
    }

    getCategoryNo() { return this.categoryNo; }

    getNo() { return this.no; }

    getTitle() { return this.title; }

    getContent() { return this.content; }

    getAuthor() { return this.author; }

    getView() { return this.view; }

    getDate() { return this.date; }
}

const board = new Board();

const boardTitle = document.querySelector(".board-popup-box > h2");
const popupDes = document.querySelector(".category-popup-img-text"); // 삭제 예정
const boardTitleInput = document.querySelector(".board-popup-input-title");
const boardContentInput = document.querySelector(".board-popup-input-content");
const boardBtn = document.querySelector(".board-popup-create-btn");
const boardPopupEnter = (type) => {
    boardBtn.disabled = true;
    document.querySelector(".board-popup").classList.add("clicked");
    switch (type) {
        case "create":
            boardTitle.innerHTML = "게시글 쓰기";
            boardTitleInput.placeholder = "";
            boardContentInput.placeholder = "";
            boardBtn.innerHTML = "작성";
            boardBtn.onclick = (e) => {
                createBoard(e);
            }
            break;
        /* case "modify":
            boardTitle.innerHTML = "카테고리 수정";
            popupDes.innerHTML = "이미지 변경"; // 삭제 예정
            boardTitleInput.placeholder = document.querySelector(".selected > div").innerHTML;
            boardBtn.innerHTML = "변경";
            boardBtn.onclick = (e) => {
                modifyCategory(e);
            };
            break;
        case "delete":
            boardTitle.innerHTML = "카테고리 삭제";
            popupDes.innerHTML = "삭제하시려면 카테고리 이름을 입력해주세요."; // 삭제 예정
            boardTitleInput.placeholder = document.querySelector(".selected > div").innerHTML;
            boardBtn.innerHTML = "삭제";
            boardBtn.onclick = (e) => {
                deleteCategory(e);
            };
            break; */
    }
}

const boardPopupLeave = () => {
    document.querySelector(".board-popup").classList.remove("clicked");
    boardTitleInput.value = null;
    boardContentInput.value = null;
}

// input 태그 대신 클릭될 요소
/* const imgBox = document.querySelector(".category-popup-img-box");
imgBox.addEventListener('click', () => {
    const resetFileList = (target) => {
        const dataTransfer = new DataTransfer();
        target.files = dataTransfer.files;
    };
    resetFileList(imgInput);
    imgInput.click()
});

// input 태그 변경 함수
const imgInput = document.querySelector(".category-popup-input-img");
imgInput.addEventListener("change", (e) => {
    if (imgBox.lastChild == document.querySelector(".category-popup-add-img")) 
        document.querySelector(".category-popup-add-img").remove();
    const img = e.target.files[0];
    if (img == undefined) 
        return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
        const imgBase64 = e.target.result;
        category.setImage(imgBase64);

        const newImg = document.createElement("img");
        newImg.src = imgBase64;
        newImg.draggable = false;
        newImg.classList.add("category-popup-add-img");

        imgBox.append(newImg);
    }

    reader.readAsDataURL(img);
}); */

// 게시글 생성 함수
const createBoard = (e) => {
    const categoryNo = currentCategoryNo();
    
    board.setCategoryNo(categoryNo);
    board.setNo(arrByCategory(categoryNo).length);
    board.setTitle(boardTitleInput.value);
    board.setContent(boardContentInput.value);
    board.setAuthor(loginUser.nick);
    board.setView();
    board.setDate();

    boardArr.push({
        "categoryNo": board.getCategoryNo(),
        "no": board.getNo(),
        "title": board.getTitle(),
        "content": board.getContent(),
        "author": board.getAuthor(),
        "view": board.getView(),
        "date": board.getDate()
    });
    localStorage.setItem("Board", JSON.stringify(boardArr));
    boardPopupLeave();
    render(document.querySelector(".selected > div").innerHTML);
    return;
    for(let i of document.querySelectorAll(".category-box")) {
        if (i.firstChild.innerHTML == name) {
            i.classList.add("selected");
            continue;
        }
        i.classList.remove("selected");
    };

    document.querySelector(".category-name > h2").innerHTML = document.querySelector(".selected > div").innerHTML;
    console.log("create");
}

/* // 카테고리 변경 함수
const modifyCategory = (e) => {
    for (let i of boardArr) {
        if (i.name == boardTitleInput.value && boardTitleInput.placeholder != boardTitleInput.value) {
            popupDes.innerHTML = "존재하는 카테고리 이름입니다."; // 삭제 예정
            return;
        }
    }
    for (let i of boardArr) {
        const selected = document.querySelector(".selected > div");
        if (i.name == selected.innerHTML) {
            category.setName(boardTitleInput.value);
            i.name = boardTitleInput.value;
            i.image = category.getImage()? category.getImage(): i.image;
        }

    }
    
    localStorage.setItem("Category", JSON.stringify(boardArr));
    
    categoryPopupLeave();
    render();
    for(let i of document.querySelectorAll(".category-box")) {
        if (i.firstChild.innerHTML == category.getName()) {
            i.classList.add("selected");
            continue;
        }
        i.classList.remove("selected");
    };
    
    document.querySelector(".category-name > h2").innerHTML = document.querySelector(".selected > div").innerHTML;
    console.log("modify");
}

// 카테고리 삭제 함수
const deleteCategory = (e) => {
    
    if (boardTitleInput.placeholder != boardTitleInput.value) {
        popupDes.innerHTML = "입력 값이 다릅니다."; // 삭제 예정
        return;
    }
    for (let i = 0; i < boardArr.length; i++) {
        if (boardArr[i].name == document.querySelector(".category-name > h2").innerHTML) {
            boardArr.splice(i, 1);
            let index = 0;
            for (let j of boardArr) 
                j.no = index++;
            localStorage.setItem("Category", JSON.stringify(boardArr));
            render();
            categoryPopupLeave();
            init();
            return;
        }
    }
    console.log("delete");
} */


// input의 값 존재 여부 확인
boardTitleInput.addEventListener('keyup', () => {
    
    if (boardTitleInput.value) 
        boardBtn.disabled = false;
    else 
        boardBtn.disabled = true;
})

document.querySelector(".board-popup-leave-btn").addEventListener("click", () => {
    boardPopupLeave();
});