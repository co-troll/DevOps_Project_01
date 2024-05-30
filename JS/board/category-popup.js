class Category {
    constructor() {
    }

    setNo(no) { this.no = no; }

    setName(name) { this.name = name; }

    setImage(img) { this.image = img; }

    getNo() { return this.no; }

    getName() { return this.name; }

    getImage() { return this.image; }

}

const category = new Category();

const categoryTitle = document.querySelector(".category-popup-box > h2");
const categoryDes = document.querySelector(".category-popup-img-text");
const categoryInput = document.querySelector(".category-popup-input");
const categoryBtn = document.querySelector(".category-popup-create-btn");
const categoryPopupEnter = (type) => {
    categoryBtn.disabled = true;
    document.querySelector(".category-popup").classList.add("clicked");
    switch (type) {
        case "create":
            categoryTitle.innerHTML = "카테고리 생성";
            categoryDes.innerHTML = "이미지 업로드";
            categoryInput.placeholder = "";
            categoryInput.value = "";
            categoryBtn.innerHTML = "생성";
            categoryBtn.onclick = (e) => {
                createCategory(e);
            }
            break;
        case "modify":
            categoryBtn.disabled = false;
            categoryTitle.innerHTML = "카테고리 수정";
            categoryDes.innerHTML = "이미지 변경";
            categoryInput.placeholder = document.querySelector(".selected > div").innerHTML;
            categoryInput.value = document.querySelector(".selected > div").innerHTML;
            categoryBtn.innerHTML = "변경";
            categoryBtn.onclick = (e) => {
                modifyCategory(e);
            };
            break;
        case "delete":
            categoryTitle.innerHTML = "카테고리 삭제";
            categoryDes.innerHTML = "삭제하시려면 카테고리 이름을 입력해주세요.";
            categoryInput.placeholder = document.querySelector(".selected > div").innerHTML;
            categoryInput.value = "";
            categoryBtn.innerHTML = "삭제";
            categoryBtn.onclick = (e) => {
                deleteCategory(e);
            };
            break;
    }
}

const categoryPopupLeave = () => {
    if (categoryArr.length == 0 ) {
        return;
    }
    document.querySelector(".category-popup").classList.remove("clicked");
    categoryInput.value = null;
    category.setImage(null)
    if (imgBox.lastChild == document.querySelector(".category-popup-add-img"))  
        document.querySelector(".category-popup-add-img").remove();
}

// input 태그 대신 클릭될 요소
const imgBox = document.querySelector(".category-popup-img-box");
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
    if (imgBox.lastChild == document.querySelector(".category-popup-add-img")) {
        document.querySelector(".category-popup-add-img").remove();
        category.setImage(null);
    }
    const img = e.target.files[0];
    console.log(img.type);
    if (img.type.split("/")[0] != "image")
        return
        console.log(1);
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
});

// 카테고리 생성 함수
const createCategory = (e) => {
    category.setNo(categoryArr.length);
    for (let i of categoryArr) {
        if (i.name == categoryInput.value) {
            categoryDes.innerHTML = "존재하는 카테고리 이름입니다.";
            return;
        }
    }
    category.setName(categoryInput.value);
    
    categoryArr.push({
        "no": category.getNo(),
        "name": category.getName(),
        "image": category.getImage()? category.getImage(): null
    });
    localStorage.setItem("Category", JSON.stringify(categoryArr));
    
    categoryPopupLeave();
    render(category.getName());
    console.log("create");
}

// 카테고리 변경 함수
const modifyCategory = (e) => {
    for (let i of categoryArr) {
        if (i.name == categoryInput.value && categoryInput.placeholder != categoryInput.value) {
            categoryDes.innerHTML = "존재하는 카테고리 이름입니다.";
            return;
        }
    }
    for (let i of categoryArr) {
        const selected = document.querySelector(".selected > div");
        if (i.name == selected.innerHTML) {
            category.setName(categoryInput.value);
            i.name = categoryInput.value;
            i.image = category.getImage()? category.getImage(): i.image;
        }

    }
    
    localStorage.setItem("Category", JSON.stringify(categoryArr));
    
    categoryPopupLeave();
    render(category.getName());
    console.log("modify");
}

// 카테고리 삭제 함수
const deleteCategory = (e) => {
    if (categoryInput.placeholder != categoryInput.value) {
        categoryDes.innerHTML = "일치하지 않습니다.";
        return;
    }
    for (let i = 0; i < categoryArr.length; i++) {
        if (categoryArr[i].name == document.querySelector(".category-name > h2").innerHTML) {
            for (let j = 0; j < commentArr.length; j++) {
                if (commentArr[j].categoryNo == categoryArr[i].no) {
                    commentArr.splice(j, 1);
                    j--;
                }
            }
            for (let j of arrByCategory()) {
                
                deleteForceBoard(j);
            }
            
            categoryArr.splice(i, 1);
            let index = 0;
            for (let j of categoryArr) 
                j.no = index++;

            localStorage.setItem("Category", JSON.stringify(categoryArr));
            categoryPopupLeave();
            render();
            return;
        }
    }
    console.log("delete");
}


// input의 값 존재 여부 확인
categoryInput.addEventListener('keyup', () => {
    
    if (categoryInput.value) 
        categoryBtn.disabled = false;
    else 
        categoryBtn.disabled = true;
})

document.querySelector(".category-popup-leave-btn").addEventListener("click", () => {
    categoryPopupLeave();
});