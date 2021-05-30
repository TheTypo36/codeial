{
    let createComment = function () {
        let newCommentForm = $('#new-comment-form');
        newCommentForm.submit(function (e) {
            e.preventDefault();

            $.ajax({
                type: 'post',
                url: '/comments/create',
                data: newCommentForm.serialize(),
                success: function (data) {
                    console.log(data.data);
                    let newComment = newCommentDom(data.data.comment, data.data.username);
                    console.log(newComment);
                    $('.post-comments-list>ol').prepend(newComment);
                    new Noty({
                        theme: 'relax',
                        type: 'success',
                        text: 'comment created by ajax',
                        layout: 'topRight',
                        timeout: 1500
                    }).show();
                    deleteComment(' .comment-delete-button', newComment);
                }, error: function (error) {
                    console.log(error.responseText);
                }
            });
        });
    }

    let newCommentDom = function (comment, username) {
        return $(`<li id="comment-${comment._id}">


        <p>
                <small>
                    <a class="comment-delete-button" href="/comments/destroy/${comment._id}">
                        X</a>
                </small>
                ${comment.content}
    
                        <br>
                        <small>
                        ${username}
                        </small>
    
        </p>
    
    
    
    </li>`);
    }
    let deleteComment = function (deleteLink) {
        $(deleteLink).click(function (e) {
            e.preventDefault();
            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function (data) {
                    $(`#comment-${data.data.comment}`).remove();
                    new Noty({
                        theme: 'relax',
                        type: 'success',
                        text: 'comment del by ajax',
                        layout: 'topRight',
                        timeout: 1500
                    }).show();

                }, error: function (err) {
                    console.log(err.responseText);
                }
            });
        });
    }

    createComment();
    // console.log('hello comment');
}