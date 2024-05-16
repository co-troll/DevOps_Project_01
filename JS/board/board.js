const categoryArr = JSON.parse(localStorage.getItem("Category"));
if (!categoryArr || categoryArr.length == 0) {
    localStorage.setItem("Category", "[]");
    document.querySelector(".category-popup").classList.add("clicked");
}
console.log(categoryArr);

const categoryCreateBtn = document.querySelector(".category-create-btn");
categoryCreateBtn.addEventListener("click", (e) => {
    document.querySelector(".category-popup").classList.add("clicked");
})

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

const categoryDeleteBtn = document.querySelector(".category-delete");
categoryDeleteBtn.addEventListener("click", (e) => {
    if (categoryArr.length == 1) {
        alert("카테고리가 1개 있으므로 삭제할 수 없어요.");
        return;
    }
    if (!confirm(`정말 ${11} 카테고리를 삭제하시겠어요? 삭제된 카테고리는 복구할 수 없어요.`))
        return;
    for (let i = 0; i < categoryArr.length; i++) {
        if (categoryArr[i].name == document.querySelector(".category-name > h2").innerHTML) {
            categoryArr.splice(i, 1);
            break;
        }
        localStorage.setItem("Category", JSON.stringify(categoryArr));
        init();
    }
})

const categorySelect = (e) => {
    if (e.target.parentNode.classList.contains("category-box")) {
        for(let i of document.querySelectorAll(".category-box")) {
            i.classList.remove("selected");
        };
        e.target.parentNode.classList.add("selected");
        document.querySelector(".category-name > h2").innerHTML = document.querySelector(".selected > div").innerHTML;
    }
}


const render = () => {
    const categoryList = document.querySelector("#category > ul");
    categoryList.innerHTML = "";
    for (let i = 0; i < categoryArr.length; i++) {
        const item = categoryRender(i);
        categoryList.append(item);
    }
}

const init = () => {
    console.log(document.querySelector("#category > ul"));
    document.querySelector('#category > ul').firstChild.classList.add("selected");
    document.querySelector(".category-name > h2").innerHTML = document.querySelector(".selected > div").innerHTML;
}

render();

document.onmouseup = (e) => {
    categorySelect(e);
}
