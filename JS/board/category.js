// 카테고리 렌더 함수
const categoryRender = (index) => {
    const item = categoryArr[index];
    const categoryBox = document.createElement("li");
    const categoryImg = document.createElement("div");

    categoryBox.classList.add("category-box");
    categoryImg.classList.add("category-img");

    categoryBox.draggable = "true";

    categoryImg.innerHTML = item.name;
    if (item.image == null) {
    } else {
        categoryImg.style.color = "transparent";
        categoryImg.style.backgroundImage = `url(${item.image})`;
    }

    categoryBox.append(categoryImg);
    return categoryBox;
}

// 카테고리 생성 버튼
const categoryCreateBtn = document.querySelector(".category-create-btn");
categoryCreateBtn.addEventListener("click", (e) => {
    categoryPopupEnter("create");
})

// 카테고리 수정버튼
const categoryModifyBtn = document.querySelector(".category-setting");
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
        render(e.target.innerHTML);
        // for(let i of document.querySelectorAll(".category-box")) {
        //     i.classList.remove("selected");
        // };
        // e.target.parentNode.classList.add("selected");
        // document.querySelector(".category-name > h2").innerHTML = document.querySelector(".selected > div").innerHTML;
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
    for (let i of categoryArr) 
            i.no = index++;

    console.log(dragIndex, dropIndex);
    localStorage.setItem("Category", JSON.stringify(categoryArr));

    for (let i of boardArr) {
        if (i.categoryNo == dragIndex)  
            i.categoryNo = dropIndex;
        else if (i.categoryNo == dropIndex) 
            i.categoryNo = dragIndex;
    }
    localStorage.setItem("Board", JSON.stringify(boardArr));
    render(document.querySelector(".category-name > h2").innerHTML);
}