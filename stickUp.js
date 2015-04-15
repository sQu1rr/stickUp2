(function ($) {

    var contentButton = [],
        contentTop = [],
        content = [],
        lastScrollTop = 0,
        scrollDir = '',
        itemClass = '',
        itemHover = '',
        menuSize = null,
        stickyHeight = 0,
        stickyMarginB = 0,
        currentMarginT = 0,
        $element = $(),
        topMargin = 0,
        vartop = 0,
        varscroll = 0,
        contentView = $(),
        testView = $();

    $(window).scroll(function (event) {
        var st = $(this).scrollTop();
        if (st > lastScrollTop) {
            scrollDir = 'down';
        } else {
            scrollDir = 'up';
        }
        lastScrollTop = st;
    });

    $.fn.stickUp = function (options) {
        //getting options
        var objn = 0;
        $element = $(this);
        
        $element.addClass('stuckMenu');
        if (options != null) {
            for (var o in options.parts) {
                if (options.parts.hasOwnProperty(o)) {
                    content[objn] = options.parts[objn];
                    objn++;
                }
            }
            if (objn == 0) {
                console.log('error:needs arguments');
            }

            itemClass = options.itemClass;
            itemHover = options.itemHover;
            if (options.topMargin != null) {
                if (options.topMargin == 'auto') {
                    topMargin = parseInt($element.css('margin-top'));
                } else {
                    if (isNaN(options.topMargin) && options.topMargin.search("px") > 0) {
                        topMargin = parseInt(options.topMargin.replace("px", ""));
                    } else if (!isNaN(parseInt(options.topMargin))) {
                        topMargin = parseInt(options.topMargin);
                    } else {
                        console.log("incorrect argument, ignored.");
                        topMargin = 0;
                    }
                }
            } else {
                topMargin = 0;
            }
            menuSize = $('.' + itemClass).size();
        }
        stickyHeight = parseInt($(this).height());
        stickyMarginB = parseInt($(this).css('margin-bottom'));
        currentMarginT = parseInt($(this).next().closest('div').css('margin-top'));
        vartop = parseInt($(this).offset().top);
        //$(this).find('*').removeClass(itemHover);

        return this;
    };
    $(document).on('scroll', function () {
        varscroll = parseInt($(document).scrollTop());
        if (menuSize != null) {
            for (var i = 0; i < menuSize; i++) {
                contentTop[i] = $('#' + content[i] + '').offset().top;

                function bottomView(i) {
                    contentView = $('#' + content[i] + '').height() * .4;
                    testView = contentTop[i] - contentView;
                    //console.log(varscroll);
                    if (varscroll > testView) {
                        $('.' + itemClass).removeClass(itemHover);
                        $('.' + itemClass + ':eq(' + i + ')').addClass(itemHover);
                    } else if (varscroll < 50) {
                        $('.' + itemClass).removeClass(itemHover);
                        $('.' + itemClass + ':eq(0)').addClass(itemHover);
                    }
                }
                if (scrollDir == 'down' && varscroll > contentTop[i] - 50 && varscroll < contentTop[i] + 50) {
                    $('.' + itemClass).removeClass(itemHover);
                    $('.' + itemClass + ':eq(' + i + ')').addClass(itemHover);
                }
                if (scrollDir == 'up') {
                    bottomView(i);
                }
            }
        }
        


        if (vartop < varscroll + topMargin && !$element.hasClass('isStuck')) {
            $element.addClass('isStuck');
            $element.next().closest('div').css({
               'margin-top': stickyHeight + stickyMarginB + currentMarginT + 'px'
            }, 10);
            $element.css("position", "fixed");
            $('.isStuck').css({
                top: '0px'
            }, 10, function () {

            });
        }
        if (varscroll + topMargin < vartop && $element.hasClass('isStuck')) {
            $element.removeClass('isStuck');
            $element.next().closest('div').css({
                'margin-top': currentMarginT + 'px'
            }, 10);
            $element.css("position", "relative");
        };

    });

})(jQuery);
