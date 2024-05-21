// onmouseup
document.addEventListener("mouseup", (e) => {
    categorySelect(e);
    boardSelect(e);
    boardInfo(e);
})

// onmousedown
document.addEventListener("mousedown", (e) => {
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

document.addEventListener("keydown", (e) => {
    let key = e.key || e.keyCode;
    if (key === "Escape" || key === 27) {
        boardPopupLeave();
        categoryPopupLeave();
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