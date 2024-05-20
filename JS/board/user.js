const userIcon = () => {
    const img = loginUser.image;
    if (!img) {
        document.querySelector(".user-img").style.backgroundColor = `#5865f2`
        return;
    }
    document.querySelector(".user-img").style.backgroundImage = `url(${img})`;
    document.querySelector(".user-img").innerHTML = "";
}