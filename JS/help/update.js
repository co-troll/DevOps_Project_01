let getValue = JSON.parse(sessionStorage.getItem('update'));
let getBoardValue = JSON.parse(localStorage.getItem('Help'));


for(let i = 0; i < getBoardValue.length; i++){
    if(getValue === getBoardValue[i].writeNum){
        let categoryValue = document.querySelector('.category_list');
        let textTitleValue = document.querySelector('.text_title');
        let textContentValue = document.querySelector('.text_content');

        categoryValue.value = getBoardValue[i].category;
        textTitleValue.value = getBoardValue[i].title;
        textContentValue.value = getBoardValue[i].content;
    }
}

let updateContent = document.querySelector('.create_content');
let updateCancle = document.querySelector('.cancle_button');

updateContent.addEventListener('click', () => {
    for(let i = 0; i < getBoardValue.length; i++){
        if(getValue === getBoardValue[i].writeNum){
            let content = document.querySelector('.text_content');
            let title = document.querySelector('.text_title');
            let categoryList = document.querySelector('.category_list');


            getBoardValue[i].title = title.value;
            getBoardValue[i].content = content.value;
            getBoardValue[i].category = categoryList.value;

            localStorage.setItem('Help', JSON.stringify(getBoardValue));
            location.href = `../../HTML/help/Detail.html?writeNum=${getValue}`;
        }
    }
});

updateCancle.addEventListener('click', () => {
    location.href = '../../HTML/help/Board.html';
});