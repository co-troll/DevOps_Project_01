// 게시글 렌더 함수
const boardRender = (catgoryNo, index) => {
    const item = arrByCategory(catgoryNo)[index];
    const board = document.createElement("li");

    board.classList.add("board");
    board.draggable = true;
    board.innerHTML = `
    <div class="board-no">
        <div class="board-box board-select"> <!-- 게시판칸 -->
            <div class="board-sharp">
                <svg class="icon__67ab4" aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M10.99 3.16A1 1 0 1 0 9 2.84L8.15 8H4a1 1 0 0 0 0 2h3.82l-.67 4H3a1 1 0 1 0 0 2h3.82l-.8 4.84a1 1 0 0 0 1.97.32L8.85 16h4.97l-.8 4.84a1 1 0 0 0 1.97.32l.86-5.16H20a1 1 0 1 0 0-2h-3.82l.67-4H21a1 1 0 1 0 0-2h-3.82l.8-4.84a1 1 0 1 0-1.97-.32L15.15 8h-4.97l.8-4.84ZM14.15 14l.67-4H9.85l-.67 4h4.97Z" clip-rule="evenodd" class=""></path></svg>
            </div> <!-- # -->
            <div class="board-title">${item.title}</div> <!-- 제목 -->
            <div class="board-icons">
                <div class="board-setting">
                    <svg class="actionIcon_b149a2" aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M10.56 1.1c-.46.05-.7.53-.64.98.18 1.16-.19 2.2-.98 2.53-.8.33-1.79-.15-2.49-1.1-.27-.36-.78-.52-1.14-.24-.77.59-1.45 1.27-2.04 2.04-.28.36-.12.87.24 1.14.96.7 1.43 1.7 1.1 2.49-.33.8-1.37 1.16-2.53.98-.45-.07-.93.18-.99.64a11.1 11.1 0 0 0 0 2.88c.06.46.54.7.99.64 1.16-.18 2.2.19 2.53.98.33.8-.14 1.79-1.1 2.49-.36.27-.52.78-.24 1.14.59.77 1.27 1.45 2.04 2.04.36.28.87.12 1.14-.24.7-.95 1.7-1.43 2.49-1.1.8.33 1.16 1.37.98 2.53-.07.45.18.93.64.99a11.1 11.1 0 0 0 2.88 0c.46-.06.7-.54.64-.99-.18-1.16.19-2.2.98-2.53.8-.33 1.79.14 2.49 1.1.27.36.78.52 1.14.24.77-.59 1.45-1.27 2.04-2.04.28-.36.12-.87-.24-1.14-.96-.7-1.43-1.7-1.1-2.49.33-.8 1.37-1.16 2.53-.98.45.07.93-.18.99-.64a11.1 11.1 0 0 0 0-2.88c-.06-.46-.54-.7-.99-.64-1.16.18-2.2-.19-2.53-.98-.33-.8.14-1.79 1.1-2.49.36-.27.52-.78.24-1.14a11.07 11.07 0 0 0-2.04-2.04c-.36-.28-.87-.12-1.14.24-.7.96-1.7 1.43-2.49 1.1-.8-.33-1.16-1.37-.98-2.53.07-.45-.18-.93-.64-.99a11.1 11.1 0 0 0-2.88 0ZM16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z" clip-rule="evenodd" class=""></path></svg>
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
const arrByCategory = (no) => {
    return boardArr.filter((i) => i.categoryNo == no);
}

// 카테고리 생성 버튼
const boardCreateBtn = document.querySelector(".board-first");
boardCreateBtn.addEventListener("click", (e) => {
    boardPopupEnter("create");
})

// 카테고리 수정버튼
/* const categoryModifyBtn = document.querySelector(".category-setting");
categoryModifyBtn.addEventListener("click", (e) => {
    if (document.querySelector(".selected > div").style.backgroundImage) {
        const newImg = document.createElement("img");
        newImg.src = document.querySelector(".selected > div").style.backgroundImage.slice(5, -2);
        newImg.draggable = false;
        newImg.classList.add("category-popup-add-img");
        
        imgBox.append(newImg);
    }
    categoryPopupEnter("modify");
})

// 카테고리 삭제버튼
const categoryDeleteBtn = document.querySelector(".category-delete");
categoryDeleteBtn.addEventListener("click", (e) => {
    if (categoryArr.length == 1) {
        alert("카테고리가 1개 있으므로 삭제할 수 없어요.");
        return;
    }
    if (document.querySelector(".selected > div").style.backgroundImage) {
        const newImg = document.createElement("img");
        newImg.src = document.querySelector(".selected > div").style.backgroundImage.slice(5, -2);
        newImg.draggable = false;
        newImg.classList.add("category-popup-add-img");
        
        imgBox.append(newImg);
    }
    categoryPopupEnter("delete");
})

// 카테고리 선택 함수
const categorySelect = (e) => {
    if (e.target.parentNode.classList.contains("category-box")) {
        for(let i of document.querySelectorAll(".category-box")) {
            i.classList.remove("selected");
        };
        e.target.parentNode.classList.add("selected");
        document.querySelector(".category-name > h2").innerHTML = document.querySelector(".selected > div").innerHTML;
    }
}

const categoryDrop = (e) => {
    if(!e.target.classList.contains("category-img") || !dragElement.classList.contains("category-box")) 
        return
    const dragNo = dragElement.firstChild.innerHTML;
    let dragIndex;
    let dropIndex;
    for (let i = 0; i < categoryArr.length; i++) {
        if (categoryArr[i].name == dragNo) 
            dragIndex = i;
        if (categoryArr[i].name == e.target.innerHTML) 
            dropIndex = i;
    }
    [categoryArr[dragIndex], categoryArr[dropIndex]] = [categoryArr[dropIndex], categoryArr[dragIndex]];
    let index = 0;
    for (let j of categoryArr) 
            j.no = index++;
    localStorage.setItem("Category", JSON.stringify(categoryArr));
    render();
    for(let i of document.querySelectorAll(".category-box")) {
        if (i.firstChild.innerHTML == document.querySelector(".category-name > h2").innerHTML) 
            i.classList.add("selected");
    };
} */