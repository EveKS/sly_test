$(function () {
    (function () {
        let isSyncingLeftScroll = false,
            isSyncingRightScroll = false,
            leftDiv = $('#first-table .table-body').get(0),
            rightDiv = $('#second-table .table-body').get(0);

        leftDiv.onscroll = function () {
            if (!isSyncingLeftScroll) {
                isSyncingRightScroll = true;
                rightDiv.scrollTop = this.scrollTop;
            }

            isSyncingLeftScroll = false;
        };

        rightDiv.onscroll = function () {
            if (!isSyncingRightScroll) {
                isSyncingLeftScroll = true;
                leftDiv.scrollTop = this.scrollTop;
            }

            isSyncingRightScroll = false;
        };
    }());

    (function () {
        let $firstTable = $('#first-table').parent(),
            $secondTable = $('#second-table').parent(),
            options = {
                horizontal: 1,
                itemNav: 'basic',
                smart: 1,
                activateOn: 'click',
                mouseDragging: 1,
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
            scrollBar: $firstTable.find('.scrollbar')
        }));
        $secondTable.sly(Object.assign(options, {
            scrollBar: $secondTable.find('.scrollbar')
        }));
    }());

    (function () {
        let $secondTable = $('#first-table .table-body, #second-table .table-body');
        console.log($secondTable.closest('.second-table-container').find('.scrollbar-v'))
        // Call Sly on frame
        $secondTable.sly({
            speed: 50,
            scrollBar: $secondTable.closest('.second-table-container').find('.scrollbar-v'),
            scrollSource: $secondTable,
            scrollBy: 50,
            dragHandle: 1,
            dynamicHandle: 1,
            clickBar: 1,
        });
    }());
})