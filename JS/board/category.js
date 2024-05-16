class Category {
    constructor() {
    }

    setNo(no) {
        this.no = no;
    }

    setName(name) {
        this.name = name;
    }

    setImage(img) {
        this.image = img;
    }

    getNo() {
        return this.no;
    }

    getName() {
        return this.name;
    }

    getImage() {
        return this.image;
    }

}

const category = new Category();

const leave = () => {
    document.querySelector(".category-popup").classList.remove("clicked");
}

document.querySelector(".category-popup-leave-btn").addEventListener("click", leave);

document.onmouseup = (e) => {
    if (e.target === document.querySelector(".category-popup")) {
        leave();
    }
}

const imgBox = document.querySelector(".category-popup-img-box");
const imgInput = document.querySelector(".category-popup-input-img");
imgBox.addEventListener('click', () => {
    const resetFileList = (target) => {
        const dataTransfer = new DataTransfer();
        target.files = dataTransfer.files;
    };
    resetFileList(imgInput);
    imgInput.click()
});

imgInput.addEventListener("change", (e) => {
    const img = e.target.files[0];
    if (img == undefined) 
        return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
        const imgBase64 = e.target.result;
        category.setImage(imgBase64);

        const newImg = document.createElement("img");
        newImg.src = imgBase64;
        newImg.style.width = "100%";
        newImg.style.height = "100%";
        newImg.draggable = false;
        newImg.style.borderRadius = "50%";
        newImg.style.position = "absolute";
        newImg.style.top = 0;

        imgBox.append(newImg);
    }

    reader.readAsDataURL(img);
});

const categoryInput = document.querySelector(".category-popup-input");
const createBtn = document.querySelector(".category-popup-create-btn");
categoryInput.addEventListener('keyup', () => {
    if (categoryInput.value) 
        createBtn.disabled = false;
    else 
        createBtn.disabled = true;
})

createBtn.addEventListener("click", (e) => {
    category.setNo(categoryArr.length);
    category.setName(categoryInput.value);

    const no = category.getNo();
    const name = category.getName();
    const image = category.getImage()? category.getImage(): null;
    categoryArr.push({no, name, image});
    localStorage.setItem("Category", JSON.stringify(categoryArr));

    leave();
    render();
    if (categoryArr.length == 1) 
        init();
});