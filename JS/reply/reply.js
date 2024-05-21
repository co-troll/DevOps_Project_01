let comments = [];

// 저장된 댓글 불러오기
window.onload = function() {
  const savedComments = localStorage.getItem("comments");
  if (savedComments) {
    comments = JSON.parse(savedComments);
    renderComments();
  }
};
  // 댓글
function addComment() {
  const commentInput = document.getElementById("commentInput");
  const commentText = commentInput.value.trim();
  if (commentText === "") return;

  // 새로운 댓글 생성
  const newComment = {
    id:Date.now(),
    password:"",
    nick:"",
    image:"",
    text: commentText,
    replies: []
  };

  // 댓글 목록에 추가
  comments.push(newComment);
  // 댓글 목록을 렌더링
  renderComments();
  // local storage에 저장
  localStorage.setItem("comments", JSON.stringify(comments)); 
  // 입력 필드 초기화
  commentInput.value = "";
}
  //대댓글
function addReply(commentId) {
  const replyText = prompt("답글을 작성하세요");
  if (replyText === null || replyText.trim() === "") return;

  // 댓글 객체 찾기
  const comment = comments.find(comment => comment.id === commentId);
  if (!comment) return;

  // 새로운 대댓글 생성
  const newReply = {
    id:Date.now(),
    password:"",
    nick:"",
    image:"",
    text: replyText
  };

  // 대댓글을 댓글에 추가
  comment.replies.push(newReply);
  // 댓글 목록을 렌더링
  renderComments();
  // local storage에 저장
  localStorage.setItem("comments", JSON.stringify(comments));
}

function renderComments() {
  const commentList = document.getElementById("commentList");
  commentList.innerHTML = "";

  // 댓글 목록 순회
  comments.forEach(comment => {
    const commentItem = document.createElement("li");
    commentItem.style.color='white';
    commentItem.textContent = comment.text;
    // 댓글 수정 버튼
    const editCommentButton = document.createElement("button");
    editCommentButton.textContent = "수정";
    editCommentButton.style.backgroundColor = '#7289da';
    editCommentButton.style.borderRadius = '8px';
    editCommentButton.style.marginLeft = "8px";
    editCommentButton.style.color = "white";
    editCommentButton.onclick = function () {
      editComment(comment.id);
    };
    commentItem.appendChild(editCommentButton);
    // 댓글 삭제 버튼
    const deleteCommentButton = document.createElement("button");
    deleteCommentButton.textContent = "삭제";
    deleteCommentButton.style.backgroundColor='#7289da';
    deleteCommentButton.style.borderRadius = '8px'
    deleteCommentButton.style.marginLeft ="8px";
    deleteCommentButton.style.color = "white";
    deleteCommentButton.onclick = function () {
      deleteComment(comment.id);
    };
    commentItem.appendChild(deleteCommentButton);

    const replyButton = document.createElement("button");
    replyButton.textContent = "답글 작성";
    replyButton.style.marginLeft ="8px";
    replyButton.style.borderRadius = '8px';
    replyButton.style.backgroundColor='#7289da'
    replyButton.style.color = "white";
    replyButton.onclick = function () {
      addReply(comment.id);
    };

    commentItem.appendChild(replyButton);

    // 대댓글 추가
    if (comment.replies.length > 0) {
      const replyList = document.createElement("ul");
      comment.replies.forEach(reply => {
        const replyItem = document.createElement("li");
        replyItem.textContent = reply.text;
        // 대댓글 수정 버튼        
        const editReplyButton = document.createElement("button");
        editReplyButton.textContent = "수정";
        editReplyButton.style.marginLeft = "8px";
        editReplyButton.style.borderRadius = '8px';
        editReplyButton.style.backgroundColor = '#7289da';
        editReplyButton.style.color = "white";
        editReplyButton.onclick = function(){
          editReply(comment.id, reply.id);
        };
        replyItem.appendChild(editReplyButton);
        // 댓글 삭제 버튼
        const deleteReplyButton = document.createElement("button");
        deleteReplyButton.textContent = "삭제";
        deleteReplyButton.style.marginLeft ="8px";
        deleteReplyButton.style.borderRadius = '8px';
        deleteReplyButton.style.backgroundColor='#7289da';
        deleteReplyButton.style.color = "white";
        deleteReplyButton.onclick = function(){
          deleteReply(comment.id, reply.id);
        };
        replyItem.appendChild(deleteReplyButton);

        replyList.appendChild(replyItem);
      });
      commentItem.appendChild(replyList);
    }

    commentItem.classList.add("comment");
    commentList.appendChild(commentItem);
  });
}

// 댓글 수정
function editComment(commentId) {
  const comment = comments.find(comment => comment.id === commentId);
  if (comment) {
    const newText = prompt("댓글을 수정하세요", comment.text);
    if (newText !== null && newText.trim() !== "") {
      comment.text = newText.trim();
      localStorage.setItem("comments", JSON.stringify(comments));
      renderComments();
    }
  }
}

// 대댓글 수정
function editReply(commentId, replyId) {
  const comment = comments.find(comment => comment.id === commentId);
  if (comment) {
    const reply = comment.replies.find(reply => reply.id === replyId);
    if (reply) {
      const newText = prompt("대댓글을 수정하세요", reply.text);
      if (newText !== null && newText.trim() !== "") {
        reply.text = newText.trim();
        localStorage.setItem("comments", JSON.stringify(comments));
        renderComments();
      }
    }
  }
}

// 댓글 삭제
function deleteComment(commentId) {
  comments = comments.filter(comment => comment.id !== commentId);
  localStorage.setItem("comments", JSON.stringify(comments));
  renderComments();
}
// 대댓글 삭제
function deleteReply(commentId, replyId){
  const comment = comments.find(comment => comment.id === commentId);
  if (comment) {
      comment.replies = comment.replies.filter(reply => reply.id !== replyId);
      // comments.find(comment => comment.id === commentId) = comment;
      localStorage.setItem("commentsList", JSON.stringify(comments));
      renderComments();
  }
}
