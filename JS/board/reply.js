class Comment {
    constructor() {}

    setCategoryNo(no) { this.categoryNo = no; }
    setBoardNo(no) { this.boardNo = no; }
    setNo(no) { this.no = no; }
    setComment(comment) { this.comment = comment; }
    setAuthor(author) { this.author = author; }
    setReply() { this.reply = []; }

    getCategoryNo() { return this.categoryNo; }
    getBoardNo() { return this.boardNo; }
    getNo() { return this.no; }
    getComment() { return this.comment; }
    getAuthor() { return this.author; }
    getReply() {return this.reply; }
}

class Reply {
    constructor() {}

    setNo(no) { this.no = no; }
    setReply(reply) { this.reply = reply; }
    setAuthor(author) { this.author = author; }

    getNo() { return this.no; }
    getReply() { return this.reply; }
    getAuthor() { return this.author; }
}

const comment = new Comment();
const reply = new Reply();

// 현재 선택된 게시글번호 탐색 함수 
const currentBoardNo = () => {
    const selected = document.querySelector(".board-select");
    return selected.dataset.index;
}

// 게시글별 댓글 객체 함수
const arrByBoardAndCategory = (categoryNo = currentCategoryNo(), boardNo = currentBoardNo()) => {
    return commentArr.filter((i) => i.categoryNo == categoryNo && i.boardNo == boardNo).sort((a,b) => a.no - b.no );
}

// 댓글리스트 랜더 함수
const commentListRender = () => {
    document.querySelector(".reply-input").value = null;
    replyBtnSetting("write");
    const commentList = document.querySelector(".reply-box > ul");
    commentList.innerHTML = "";
    if (!arrByBoardAndCategory().length) 
        return;
    for (let i = 0; i < arrByBoardAndCategory().length; i++) {
        commentRender(i);
    }
    
    commentList.lastChild.scrollIntoView(); 
    replyBtnEvent();
}

// 댓글 랜더 함수
const commentRender = (index) => {
    const replyBox = document.querySelector(".reply-box > ul");
    const item = arrByBoardAndCategory()[index];
    const comment = document.createElement("li");

    comment.classList.add("reply");

    comment.dataset.index = item.no;

    const img = loginUser.image;
    if (!img) {
        comment.innerHTML = `<div class="reply-user-img"></div>`
    } 
    else {
        comment.innerHTML = `<div class="reply-user-img" style="background-image: "url(${img})"></div>`
    }
    comment.innerHTML += `
    <div class="reply-user-box">
        <span class="reply-user-name">${item.author}</span>
        <span class="reply-user-comment">${item.comment}</span>
    </div>
    <div class="reply-icons">
        <div class="reply-setting">
            <svg class="icon__0bfbf" aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="m13.96 5.46 4.58 4.58a1 1 0 0 0 1.42 0l1.38-1.38a2 2 0 0 0 0-2.82l-3.18-3.18a2 2 0 0 0-2.82 0l-1.38 1.38a1 1 0 0 0 0 1.42ZM2.11 20.16l.73-4.22a3 3 0 0 1 .83-1.61l7.87-7.87a1 1 0 0 1 1.42 0l4.58 4.58a1 1 0 0 1 0 1.42l-7.87 7.87a3 3 0 0 1-1.6.83l-4.23.73a1.5 1.5 0 0 1-1.73-1.73Z" class=""></path></svg>
        </div>
        <div class="reply-reply">
            <svg class="icon__0bfbf" aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="M2.3 7.3a1 1 0 0 0 0 1.4l5 5a1 1 0 0 0 1.4-1.4L5.42 9H11a7 7 0 0 1 7 7v4a1 1 0 1 0 2 0v-4a9 9 0 0 0-9-9H5.41l3.3-3.3a1 1 0 0 0-1.42-1.4l-5 5Z" class=""></path></svg>
        </div>
        <div class="reply-delete">
            <svg class="icon__0bfbf" aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="M14.25 1c.41 0 .75.34.75.75V3h5.25c.41 0 .75.34.75.75v.5c0 .41-.34.75-.75.75H3.75A.75.75 0 0 1 3 4.25v-.5c0-.41.34-.75.75-.75H9V1.75c0-.41.34-.75.75-.75h4.5Z" class=""></path><path fill="currentColor" fill-rule="evenodd" d="M5.06 7a1 1 0 0 0-1 1.06l.76 12.13a3 3 0 0 0 3 2.81h8.36a3 3 0 0 0 3-2.81l.75-12.13a1 1 0 0 0-1-1.06H5.07ZM11 12a1 1 0 1 0-2 0v6a1 1 0 1 0 2 0v-6Zm3-1a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0v-6a1 1 0 0 1 1-1Z" clip-rule="evenodd" class=""></path></svg>
        </div>
    </div>
    `

    replyBox.append(comment);
    for (let i = 0; i < item.Reply.length; i++) {
        replyRender(i, item);
    }
}

// 대댓글 랜더함수
const replyRender = (index, arr) => {
    const replyBox = document.querySelector(".reply-box > ul");
    const item = arr.Reply[index];
    const reply = document.createElement("li");

    reply.classList.add("re-reply");
    reply.dataset.index = item.no;
    reply.dataset.parentIndex = arr.no;

    reply.innerHTML = "<p>╰</p>";

    const img = loginUser.image;
    if (!img) {
        reply.innerHTML += `<div class="reply-user-img"></div>`
    } 
    else {
        reply.innerHTML += `<div class="reply-user-img" style="background-image: "url(${img})"></div>`
    }
    reply.innerHTML += `
    <div class="reply-user-box">
        <span class="reply-user-name">${item.author}</span>
        <span class="reply-user-comment">${item.reply}</span>
    </div>
    <div class="reply-icons">
        <div class="reply-setting">
            <svg class="icon__0bfbf" aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="m13.96 5.46 4.58 4.58a1 1 0 0 0 1.42 0l1.38-1.38a2 2 0 0 0 0-2.82l-3.18-3.18a2 2 0 0 0-2.82 0l-1.38 1.38a1 1 0 0 0 0 1.42ZM2.11 20.16l.73-4.22a3 3 0 0 1 .83-1.61l7.87-7.87a1 1 0 0 1 1.42 0l4.58 4.58a1 1 0 0 1 0 1.42l-7.87 7.87a3 3 0 0 1-1.6.83l-4.23.73a1.5 1.5 0 0 1-1.73-1.73Z" class=""></path></svg>
        </div>
        <div class="reply-delete">
            <svg class="icon__0bfbf" aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="M14.25 1c.41 0 .75.34.75.75V3h5.25c.41 0 .75.34.75.75v.5c0 .41-.34.75-.75.75H3.75A.75.75 0 0 1 3 4.25v-.5c0-.41.34-.75.75-.75H9V1.75c0-.41.34-.75.75-.75h4.5Z" class=""></path><path fill="currentColor" fill-rule="evenodd" d="M5.06 7a1 1 0 0 0-1 1.06l.76 12.13a3 3 0 0 0 3 2.81h8.36a3 3 0 0 0 3-2.81l.75-12.13a1 1 0 0 0-1-1.06H5.07ZM11 12a1 1 0 1 0-2 0v6a1 1 0 1 0 2 0v-6Zm3-1a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0v-6a1 1 0 0 1 1-1Z" clip-rule="evenodd" class=""></path></svg>
        </div>
    </div>
    `
    replyBox.append(reply);
}


const replyBtnSetting = (type, selected) => {
    const replyInput = document.querySelector(".reply-input");
    const commentlist = document.querySelectorAll(".reply-box > ul > li");
    for (let i of commentlist) {
        i.classList.remove("reply-select");
    }
    replyInput.value = null;
    switch (type) {
        case "write":
            replyInput.dataset.type = "write";
            replyInput.placeholder = "댓글 쓰기";
            break;

            // boardBtn.onclick = (e) => {
            //     createBoard(e);
            // }
        case "modify":
            replyInput.dataset.type = "modify";
            replyInput.placeholder = "댓글 수정";
            replyInput.focus();
            selected.classList.add("reply-select");
            break;
        case "reply":
            replyInput.dataset.type = "reply";
            replyInput.placeholder = "답글 달기";
            replyInput.focus();
            selected.classList.add("reply-select");
            break;
    }
}

// 댓글 버튼 이벤트 부여 함수 
const replyBtnEvent = () => {
    // 댓글 수정 버튼
    const replyModifyBtn = document.querySelectorAll(".reply-setting");
    for (let i of replyModifyBtn) {
        i.onclick = (e) => {
            if (loginUser.nick != i.parentNode.previousElementSibling.firstElementChild.innerHTML) {
                alert("다른 유저의 댓글입니다.");
                return;
            }
            replyBtnSetting("modify", i.parentNode.parentNode);
        }
    }

    // 댓글 대댓글 버튼
    const replyReplyBtn = document.querySelectorAll(".reply-reply");
    for (let i of replyReplyBtn) {
        i.onclick = (e) => {
            replyBtnSetting("reply", i.parentNode.parentNode);
        }
    }

    // 댓글 삭제 버튼
    const replyDeleteBtn = document.querySelectorAll(".reply-delete");
    for (let i of replyDeleteBtn) {
        i.onclick = (e) => {
            deleteComment(i);
        }
    }
}

// 댓글 쓰기 함수
const writeComment = () => {
    const commentInput = document.querySelector(".reply-input").value;
    if (!commentInput) 
        return;
    const categoryNo = currentCategoryNo();
    const boardNo = currentBoardNo();
    
    comment.setCategoryNo(categoryNo);
    comment.setBoardNo(boardNo);
    comment.setNo(arrByBoardAndCategory(categoryNo, boardNo).length);
    comment.setComment(commentInput);
    comment.setAuthor(loginUser.nick);
    comment.setReply();

    commentArr.push({
        "categoryNo": comment.getCategoryNo(),
        "boardNo": comment.getBoardNo(),
        "no": comment.getNo(),
        "comment": comment.getComment(),
        "author": comment.getAuthor(),
        "Reply": comment.getReply()
    });
    localStorage.setItem("Comment", JSON.stringify(commentArr));
    commentListRender();
    console.log("comment");
}

// 댓글 수정 함수
const modifyComment = () => {
    const selectedComment = document.querySelector(".reply-select");
    if (selectedComment.classList.contains("reply")) {
        const arr = arrByBoardAndCategory().filter((i) => i.no == selectedComment.dataset.index)[0];
        for (let i = 0; i < commentArr.length; i++) {
            if (commentArr[i] == arr) {
                commentArr[i].comment = document.querySelector(".reply-input").value;
                localStorage.setItem("Comment", JSON.stringify(commentArr));
                    commentListRender();
                    console.log("modify");
                    return;
            }
        }
    }
    else if (selectedComment.classList.contains("re-reply")) {
        const arr = arrByBoardAndCategory().filter((i) => i.no == selectedComment.dataset.parentIndex)[0];
        for (let i = 0; i < commentArr.length; i++) {
            if (commentArr[i] == arr) {
                commentArr[i].Reply[selectedComment.dataset.index].reply = document.querySelector(".reply-input").value;
                localStorage.setItem("Comment", JSON.stringify(commentArr));
                    commentListRender();
                    console.log("modify");
                    return;
            }
        }
    }
    
}

// 대댓글 함수
const replyComment = () => {
    const selectedComment = document.querySelector(".reply-select");
    const arr = arrByBoardAndCategory().filter((i) => i.no == selectedComment.dataset.index)[0];
    for (let i = 0; i < commentArr.length; i++) {
        if (commentArr[i] == arr) {
            reply.setNo(commentArr[i].Reply.length);
            reply.setReply(document.querySelector(".reply-input").value)
            reply.setAuthor(loginUser.nick);

            commentArr[i].Reply.push({
                "no": reply.getNo(),
                "reply": reply.getReply(),
                "author": reply.getAuthor(),
            })
            localStorage.setItem("Comment", JSON.stringify(commentArr));
            commentListRender();
            console.log("reply");
            return;
        }
    }
}
// 댓글 강제 삭제 함수 
const deleteForceComment = (comment) => {
    if (comment.classList.contains("reply")) {
        const arr = arrByBoardAndCategory().filter((i) => i.no == comment.dataset.index)[0];
        for (let i = 0; i < commentArr.length; i++) {
            if (commentArr[i] == arr) {
                commentArr.splice(i, 1);
                let index = 0;
                for (let j of arrByBoardAndCategory()) 
                    j.no = index++;
                localStorage.setItem("Comment", JSON.stringify(commentArr));
                commentListRender();
                console.log("delete");
                return;
            }
        }
    }
    else if (comment.classList.contains("re-reply")) {
        const arr = arrByBoardAndCategory().filter((i) => i.no == comment.dataset.parentIndex)[0];
        for (let i = 0; i < commentArr.length; i++) {
            if (commentArr[i] == arr) {
                commentArr[i].Reply.splice(comment.dataset.index, 1);
                let index = 0;
                for (let j of arr.Reply) 
                    j.no = index++;
                localStorage.setItem("Comment", JSON.stringify(commentArr));
                commentListRender();
                console.log("modify");
                return;
            }
        }
    }
}


// 댓글 삭제 함수
const deleteComment = (item) => {
    const comment = item.parentNode.parentNode;
    if (loginUser.nick != item.parentNode.previousElementSibling.firstElementChild.innerHTML) {
        alert("다른 유저의 댓글입니다.");
        return;
    }
    deleteForceComment(comment);
}