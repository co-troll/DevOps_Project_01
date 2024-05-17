// 로컬스토리지 categoryNo / no / title / content / author / view / date

const createList = document.querySelector('.createList')

createList.onclick = function () {
    location.href = 'write.html'
}

function render (){
    let listCreate = document.querySelector('.board_list')
    let show = JSON.parse(localStorage.getItem('Board'));

    console.log(show)
    for(let i = 0; i < show.length; i++){
        let list_ul = document.createElement('ul');
        // let list_category = document.createElement('li');
        let list_no = document.createElement('li');
        let list_title = document.createElement('li');
        let list_writer = document.createElement('li');
        let list_view = document.createElement('li');
        let list_date = document.createElement('li');

        listCreate.append(list_ul);
        list_ul.append(list_no, list_title, list_writer, list_date, list_view);

        list_no.innerHTML = i + 1;
        list_title.innerHTML = show[i].title;
        list_writer.innerHTML = '안중현'; // 나중에 바꿔야 함
        // list_date.innerHTML = new date()
        list_view.innerHTML = i + 1; // 나중에 바꿔야 함
    }

    let loginID = sessionStorage.getItem('login');
    let localArray = JSON.parse(localStorage.getItem('User'));
    let showID = document.querySelector('.login_id');

    for(let i=0; i < localArray.length; i++){
        if(loginID === localArray[i].id){
            showID.innerHTML = localArray[i].nick
        }
    }
}

render();

let login_btn = document.querySelector('.loginBtn');
