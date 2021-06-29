class ToggleFriendship {
    constructor(toggleElement) {
        this.toggler = toggleElement;
        this.toggleFriendship();
    }
    toggleFriendship() {
        console.log('inside the toggleFriendship Function');
        $(this.toggler).click(function (e) {
            e.preventDefault();
            let self = this;
            $.ajax({
                type: 'post',
                url: $(self).attr('href')

            }).done(function (data) {
                if (data.data.deleted == true) {

                    $(self).html('add');
                } else {
                    $(self).html('remove');

                }
            }).fail(function (err) {
                if (err) {
                    console.log("ERROR in friendship by ajax", error);
                }
            })

        });
    }
}