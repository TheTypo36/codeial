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
                    deleteComment(' .comment-delete-button', newComment);
                    new ToggleLike($(' .toggle-like-btn', newComment));
                    new Noty({
                        theme: 'relax',
                        type: 'success',
                        text: 'comment created by ajax',
                        layout: 'topRight',
                        timeout: 1500
                    }).show();
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

                        <small>
                        <a class="toggle-like-btn" data-like="0" href="/likes/toggle?id=${comment._id}&type=Comment">
                            0 Likes
                        </a>
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
    let convertToAjx = function () {
        let deleteLinks = $('.comment-delete-button');
        for (deleteLink of deleteLinks) {
            deleteComment(deleteLink);
        }
    };

    createComment();
    convertToAjx();
    // console.log('hello comment');
}