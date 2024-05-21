const userInit = () => {
    const img = loginUser.image;
    document.querySelector(".user-name").innerHTML = loginUser.nick;
    if (!img) {
        document.querySelector(".user-img").style.backgroundColor = `#5865f2`
        return;
    }
    document.querySelector(".user-img").style.backgroundImage = `url(${img})`;
    document.querySelector(".user-img").innerHTML = "";
}

const logoutBtn = document.querySelector(".user-logout");
logoutBtn.addEventListener("click", (e) => {
    if (confirm("로그아웃 하시겠습니까?")) {
        location.href = "./../../HTML/login/login.html";
    }
})