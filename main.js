$(function () {
    (function () {
        let $firstTable = $('.first-table-container'),
            $secondTable = $('.second-table-container'),
            options = {
                horizontal: 1,
                itemNav: 'basic',
                smart: 1,
                activateOn: 'click',
                //mouseDragging: 1,
                touchDragging: 1,
                releaseSwing: 1,
                scrollBy: 1,
                speed: 40,
                dragHandle: 1,
                dynamicHandle: 1,
                clickBar: 1
            };

        // Call Sly on frame
        $firstTable.sly(Object.assign(options, {
            scrollBar: $firstTable.find('.scrollbar'),
            scrollSource: $('#first-table .table-head')
        }));
        $secondTable.sly(Object.assign(options, {
            scrollBar: $secondTable.find('.scrollbar'),
            scrollSource: $('#second-table .table-head')
        }));

        setTimeout(function () {
            hideScroll($firstTable.find('.scrollbar'), false);
            hideScroll($secondTable.find('.scrollbar'), false);
        }, 1);
    }());

    (function () {
        let $secondTable = $('#first-table .table-body, #second-table .table-body'),
            $scroll = $secondTable.closest('.second-table-container').find('.scrollbar-v');

        // Call Sly on frame
        $secondTable.sly({
            speed: 50,
            scrollBar: $scroll,
            scrollSource: $secondTable,
            scrollBy: 50,
            dragHandle: 1,
            dynamicHandle: 1,
            clickBar: 1,
        });

        setTimeout(function () {
            hideScroll($scroll, true);
        }, 1);
    }());

    (function () {
        let translateX = 0,
            tableTranslateX = 0,
            minWidth = 200,
            $firstTable = $('.first-table-container');

        $firstTable.resizable({
            handles: "e",
            resize: function (ev, e) {
                hideScroll($firstTable.find('.scrollbar'), false);
                hideScroll($('.second-table-container').find('.scrollbar'), false);

                let fTableWidth = $('#first-table').width();

                if (e.size.width > fTableWidth) {
                    e.size.width = fTableWidth;
                } else if (e.size.width < minWidth) {
                    e.size.width = minWidth;
                    return;
                }

                let tMid = $('.second-table-container').width() - $('#second-table').width(),
                    innerWidth = $(document.body).width(),
                    tableWidth = $('.second-table-container').width(),
                    sumWidth = e.size.width + tableWidth,
                    middleWidth = innerWidth - sumWidth + tMid,
                    newTranslateX = middleWidth > 0 ? 0 : middleWidth;

                $('.second-table-container').width(innerWidth - e.size.width);
                $firstTable.sly('reload');
                $('.second-table-container').sly('reload');

                if (tableTranslateX > -newTranslateX) {
                    translateX = -tableTranslateX;
                } else {
                    translateX = newTranslateX;
                }

                $('.scrollbar-v').css({
                    transform: `translateZ(0) translateX(${translateX}px)`
                });
            }
        });

        $('.second-table-container').get(0).addEventListener('sly.scroll', (e) => {
            if ($('.second-table-container').is(e.target)) {
                tableTranslateX = e.pos.cur;

                $('.scrollbar-v').css({
                    transform: `translateZ(0) translateX(${translateX + tableTranslateX}px)`
                });

                hideScroll($firstTable.find('.scrollbar'), false);
                hideScroll($('.second-table-container').find('.scrollbar'), false);
            }
        }, false);
    }());

    function hideScroll($scroll, vertical) {
        let $handle = $scroll.find('.handle'),
            hide = true;

        if (vertical) {
            hide = $scroll.height() <= $handle.height();
        } else {
            hide = $scroll.width() <= $handle.width();
        }
        console.log($scroll.width(), $handle.width())
        console.log(hide)
        $scroll[hide ? 'hide' : 'show']()
    }
})