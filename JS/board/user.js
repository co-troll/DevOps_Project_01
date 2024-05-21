const userInit = () => {
    const img = loginUser.image;
    document.querySelector(".user-name").innerHTML = loginUser.nick;
    if (!img) {
        return;
    }
    document.querySelector(".user-img").style.backgroundImage = `url(${img})`;
}

const logoutBtn = document.querySelector(".user-logout");
logoutBtn.addEventListener("click", (e) => {
    if (confirm("로그아웃 하시겠습니까?")) {
        location.href = "./../../HTML/login/login.html";
    }
})
