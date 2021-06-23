
class ToggleLike {
    constructor(toggleElement) {

        this.toggler = toggleElement;
        this.toggleLike();
    }

    toggleLike() {
        $(this.toggler).click(function (e) {
            e.preventDefault();
            let self = this;
            $.ajax({
                type: 'post',
                url: $(self).attr('href'),

            }).done(function (data) {
                let likeCount = parseInt($(self).attr('data-like'));
                console.log(likeCount);
                if (data.data.deleted == true) {
                    likeCount = likeCount - 1;
                } else {
                    likeCount = likeCount + 1;

                }
                $(self).attr('data-like', likeCount);
                $(self).html(`${likeCount} Likes`);
            }).fail(function (err) {
                console.log('error in increamenting likes', err);
            });




        });


    }



}


