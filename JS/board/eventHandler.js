// onclick
document.addEventListener("click", (e) => {
    if (e.ctrlKey && e.altKey) {
        if (e.target.classList.contains("board-box"))
            deleteForceBoard(arrByCategory()[e.target.dataset.index]);
        if (e.target.classList.contains("reply"))
            deleteForceComment(e.target);
        return;
    }
    categorySelect(e);
    boardSelect(e);
    boardInfo(e);
    if (e.target === document.querySelector(".category-popup"))
        categoryPopupLeave();
    if (e.target === document.querySelector(".board-popup")) 
        boardPopupLeave();   
})

// ondragstart
let dragElement;
document.addEventListener("dragstart", (e) => {
    if (!e.target.draggable) 
        return
    dragElement = e.target;
})

// ondragover
document.addEventListener("dragover", (e) => {
    e.preventDefault();
})

// ondrop
document.addEventListener("drop", (e) => {
    e.preventDefault();
    categoryDrop(e);
    boardDrop(e);
})

// onkeydown
document.addEventListener("keydown", (e) => {
    let key = e.key || e.keyCode;
    if (key === "Escape" || key === 27) {
        boardPopupLeave();
        categoryPopupLeave();
        replyBtnSetting("write");
    }

    if (key === "Enter" || key === 13) {
        switch (e.target.dataset.type) {
            case "write":
                writeComment();
                break;
            case "modify":
                modifyComment();
                break;
            case "reply":
                replyComment();
                break;

        }
    }
})