// 게시판 렌더 함수
const boardListRender = (index) => {
    const item = arrByCategory()[index];
    const board = document.createElement("li");

    board.classList.add("board");
    board.draggable = true;
    board.innerHTML = `
    <div class="board-no">
        <div class="board-box" data-index="${item.no}"> <!-- 게시판칸 -->
            <div class="board-sharp">
                <svg class="icon__67ab4" aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M10.99 3.16A1 1 0 1 0 9 2.84L8.15 8H4a1 1 0 0 0 0 2h3.82l-.67 4H3a1 1 0 1 0 0 2h3.82l-.8 4.84a1 1 0 0 0 1.97.32L8.85 16h4.97l-.8 4.84a1 1 0 0 0 1.97.32l.86-5.16H20a1 1 0 1 0 0-2h-3.82l.67-4H21a1 1 0 1 0 0-2h-3.82l.8-4.84a1 1 0 1 0-1.97-.32L15.15 8h-4.97l.8-4.84ZM14.15 14l.67-4H9.85l-.67 4h4.97Z" clip-rule="evenodd" class=""></path></svg>
            </div> <!-- # -->
            <div class="board-title">${item.title}</div> <!-- 제목 -->
            <div class="board-icons">
                <div class="board-setting">
                    <svg class="icon__0bfbf" aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="m13.96 5.46 4.58 4.58a1 1 0 0 0 1.42 0l1.38-1.38a2 2 0 0 0 0-2.82l-3.18-3.18a2 2 0 0 0-2.82 0l-1.38 1.38a1 1 0 0 0 0 1.42ZM2.11 20.16l.73-4.22a3 3 0 0 1 .83-1.61l7.87-7.87a1 1 0 0 1 1.42 0l4.58 4.58a1 1 0 0 1 0 1.42l-7.87 7.87a3 3 0 0 1-1.6.83l-4.23.73a1.5 1.5 0 0 1-1.73-1.73Z" class=""></path></svg>
                </div> <!-- 톱니 -->
                <div class="board-delete">
                    <svg class="icon__0bfbf" aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="M14.25 1c.41 0 .75.34.75.75V3h5.25c.41 0 .75.34.75.75v.5c0 .41-.34.75-.75.75H3.75A.75.75 0 0 1 3 4.25v-.5c0-.41.34-.75.75-.75H9V1.75c0-.41.34-.75.75-.75h4.5Z" class=""></path><path fill="currentColor" fill-rule="evenodd" d="M5.06 7a1 1 0 0 0-1 1.06l.76 12.13a3 3 0 0 0 3 2.81h8.36a3 3 0 0 0 3-2.81l.75-12.13a1 1 0 0 0-1-1.06H5.07ZM11 12a1 1 0 1 0-2 0v6a1 1 0 1 0 2 0v-6Zm3-1a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0v-6a1 1 0 0 1 1-1Z" clip-rule="evenodd" class=""></path></svg>
                </div>
            </div>
        </div>
    </div> 
    `
    return board;
}

// 게시판 렌더 함수
const boardRender = (arr) => {
    const board = document.querySelector(".board-content");
    const boardInfo = document.querySelector(".board-info");

    board.innerHTML = arr.content;

    boardInfo.innerHTML = `
    <div class="board-info-top">${arr.title}</div>
    <ul>
        <li class="board-info-field">
            <div class="board-info-title">카테고리</div>
            <div class="board-info-content">${document.querySelector(".selected > div").innerHTML}</div>
        </li>
        <li class="board-info-field">
            <div class="board-info-title">저자</div>
            <div class="board-info-content">${arr.author}</div>
        </li>
        <li class="board-info-field">
            <div class="board-info-title">조회수</div>
            <div class="board-info-content">${arr.view}</div>
        </li>
    </ul>
    <div class="board-info-footer">작성일 : ${arr.date}</div>
    `
}

// 현재 선택된 카테고리번호 탐색 함수 
const currentCategoryNo = () => {
    const selected = document.querySelector(".selected > div");
    for (let i of categoryArr) {
        if (i.name == selected.innerHTML) {
            return i.no;
        }
    }
}

// 카테고리번호별 게시글 배열 함수
const arrByCategory = (no = currentCategoryNo()) => {
    return boardArr.filter((i) => i.categoryNo == no).sort((a,b) => a.no - b.no )
}

// 게시글 생성 버튼
const boardCreateBtn = document.querySelector(".board-first");
boardCreateBtn.addEventListener("click", (e) => {
    boardPopupEnter("create");
})

// // 카테고리 삭제버튼
// const categoryDeleteBtn = document.querySelector(".category-delete");
// categoryDeleteBtn.addEventListener("click", (e) => {
//     if (categoryArr.length == 1) {
//         alert("카테고리가 1개 있으므로 삭제할 수 없어요.");
//         return;
//     }
//     if (document.querySelector(".selected > div").style.backgroundImage) {
//         const newImg = document.createElement("img");
//         newImg.src = document.querySelector(".selected > div").style.backgroundImage.slice(5, -2);
//         newImg.draggable = false;
//         newImg.classList.add("category-popup-add-img");
        
//         imgBox.append(newImg);
//     }
//     categoryPopupEnter("delete");
// })

// 게시글 버튼 이벤트 부여 함수 
const boardBtnEvent = () => {
    // 게시글 수정 버튼
    const boardModifyBtn = document.querySelectorAll(".board-setting");
    for (let i of boardModifyBtn) {
        i.addEventListener("click", (e) => {
            boardPopupEnter("modify");
        })
    }

    // 게시글 삭제 버튼
    const boardDeleteBtn = document.querySelectorAll(".board-delete");
    for (let i of boardDeleteBtn) {
        i.addEventListener("click", (e) => {
            boardPopupEnter("delete");
        })
    }

}
// 게시판 선택 함수
const boardSelect = (e) => {
    if (e.target.classList.contains("board-box")) {
        for (let i of document.querySelectorAll(".board-box")) {
            i.classList.remove("board-select");
        }
        e.target.classList.add("board-select");
        if (arrByCategory().length < 1) {
            document.querySelector(".board-top-title").innerHTML = "";
            return
        }
        document.querySelector(".board-top-title").innerHTML = document.querySelector(".board-select > .board-title").innerHTML;
        boardRender(arrByCategory()[e.target.dataset.index]);

        boardBtnEvent();
    }
}

// 게시판 드롭 함수
const boardDrop = (e) => {
    const arr = arrByCategory();
    if(!e.target.classList.contains("board-box") || !dragElement.classList.contains("board")) 
        return;
    const dragIndex = dragElement.firstElementChild.firstElementChild.dataset.index;
    const dropIndex = e.target.dataset.index;

    [arr[dragIndex], arr[dropIndex]] = [arr[dropIndex], arr[dragIndex]];
    let index = 0;
    for (let j of arr) {
        console.log(j.no);
        j.no = index++;

    }
    localStorage.setItem("Board", JSON.stringify(boardArr));
    render(document.querySelector(".selected > div").innerHTML);
    return;
    for(let i of document.querySelectorAll(".category-box")) {
        if (i.firstChild.innerHTML == document.querySelector(".category-name > h2").innerHTML) 
            i.classList.add("selected");
    };
}

// 게시판 정보 함수
const boardInfo = (e) => {
    if (e.target == document.querySelector(".board-top-info")) {
        const info = document.querySelector(".board-info");
        switch (getComputedStyle(info).display) {
            case "none":
                info.style.display = "flex";
                break;
            case "flex":
                info.style.display = "none";
                break;
        }
    }
}