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
const boardPopupEnter = (type, item) => {
    boardBtn.disabled = true;
    document.querySelector(".board-popup").classList.add("clicked");
    const selectArr = arrByCategory();
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
        case "modify":
            boardBtn.disabled = false;
            boardTitle.innerHTML = "게시글 수정";
            boardTitleInput.value = selectArr[item.dataset.index].title;
            boardContentInput.placeholder = selectArr[item.dataset.index].content;
            boardBtn.innerHTML = "수정";
            boardBtn.onclick = () => {
                modifyBoard(selectArr[item.dataset.index]);
            };
            break;
        case "delete":
            boardTitle.innerHTML = "게시글 삭제";
            boardTitleInput.placeholder = selectArr[item.dataset.index].title;
            boardContentInput.placeholder = "삭제하시려면 게시글 제목을 제목란에 입력해주세요.";
            boardBtn.innerHTML = "삭제";
            boardBtn.onclick = () => {
                deleteBoard(selectArr[item.dataset.index]);
            };
            break;
    }
}

const boardPopupLeave = () => {
    document.querySelector(".board-popup").classList.remove("clicked");
    boardTitleInput.value = null;
    boardContentInput.value = null;
}

// 게시글 생성 함수
const createBoard = (e) => {
    const categoryNo = currentCategoryNo();
    
    board.setCategoryNo(categoryNo);
    board.setNo(arrByCategory(categoryNo).length);
    board.setTitle(boardTitleInput.value);
    board.setContent(boardContentInput.value);
    board.setAuthor(loginUser.id);
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
    render(document.querySelector(".selected > div").innerHTML, board.getNo());
    console.log("create");
}

// 게시글 변경 함수
const modifyBoard = (arr) => {
    console.log(arr);
    arr.title = boardTitleInput.value;
    arr.content = boardContentInput.value;
    localStorage.setItem("Board", JSON.stringify(boardArr));
    boardPopupLeave();
    render(document.querySelector(".selected > div").innerHTML, arr.no);
    console.log("modify");
}

// 카테고리 강제 삭제 함수 
const deleteForceBoard = (arr) => {
    for (let i = 0; i < boardArr.length; i++) {
        if (boardArr[i] == arr) {
            for (let j = 0; j < commentArr.length; j++) {
                if (commentArr[j].categoryNo == arr.categoryNo && commentArr[j].boardNo == arr.no) {
                    commentArr.splice(j, 1);
                    j--;
                }
            }
            boardArr.splice(i, 1);
            let index = 0;
            for (let j of arrByCategory()) 
                j.no = index++;
            localStorage.setItem("Comment", JSON.stringify(commentArr));
            localStorage.setItem("Board", JSON.stringify(boardArr));
            boardPopupLeave();
            render(document.querySelector(".selected > div").innerHTML);
            console.log("delete");
            return;
        }
    }
}

// 카테고리 삭제 함수
const deleteBoard = (arr) => {
    if (boardTitleInput.placeholder != boardTitleInput.value) {
        boardContentInput.value = "";
        boardContentInput.placeholder = "일치하지 않습니다.";
        return;
    }
    deleteForceBoard(arr);
}


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