/**
 * Created by zhanghh on 2015/2/2.
 */

define(['jQuery'], function ($) {
    /**
     *  Note that .width(value) sets the content width of the box regardless of the value of the CSS box-sizing property.
     *  $.fn.width()获取元素的content width；$.fn.width(value)将元素的content width设置为value值，根据box-sizing计算目标style width字面值(非value)间接设置。
     *  $.fn.css('width')直接获取元素的style width字面值；$.fn.css('width',value)将元素的style width字面值直接设置为value值。
     *
     *  Note that .height(value) sets the content height of the box regardless of the value of the CSS box-sizing property.
     *  $.fn.height()获取元素的content height；$.fn.height(value)将元素的content height设置为value值，根据box-sizing计算目标style height字面值(非value)间接设置。
     *  $.fn.css('height')直接获取元素的style height字面值；$.fn.css('height',value)将元素的style height字面值直接设置为value值。
     */

    //页面resize时触发grid的winRefresh事件
    $(window).on('resize', function () {
        $('.gg-pin-grid,.gg-grid').each(function () {
            var event = $.Event('winRefresh');
            event.target = this;
            $(this).trigger(event);
        });
    });

    //页面scroll时触发grid的winScroll事件
    $(window).on('scroll', function () {
        $('.gg-pin-grid,.gg-grid').each(function () {
            var event = $.Event('winScroll');
            event.target = this;
            $(this).trigger(event);
        });
    });

    //祖先元素scroll事件处理方法
    function elderScrollHandler(e) {
        var $trigger = $(e.target);
        var $listener = $trigger.find('.ggGrid-elderScrollListen');
        if ($listener.length >= 1) {
            $listener.each(function () {
                var event = $.Event('ggGrid-elderScroll');
                event.target = this;
                $(this).trigger(event);
            });
        } else {
            $trigger.off('scroll', elderScrollHandler);
            $trigger.toggleClass('ggGrid-scrollTrigger', false);
        }
    }

    //测试是否为HTMLElement对象
    function isHTMLElement(variable) {
        if (window.HTMLElement != null) {
            return variable instanceof window.HTMLElement;
        } else {
            return variable != null && typeof (variable.tagName) === 'string' && typeof (variable.outerHTML) === 'string' && variable.nodeType === 1 && variable.nodeName === variable.tagName && variable.ownerDocument === document;
        }
    }

    //获取浏览器客户区(可视区域)滚动条滚动位置
    function getFixedScroll() {
        var top = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        var left = window.scrollX || window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft;
        return { top: top, left: left };
    }

    //获取元素相对于浏览器可视区域(客户区)左上角的偏移位置，不含元素本身margin值（但含border值）
    function getFixedOffset(elem) {
        var $elem = $(elem);
        if ($elem.length === 1 && isHTMLElement($elem[0])) {
            var elemOffset = $elem.offset();        //offset()的计算不含元素本身margin值（但含border值），position()的计算包含元素本身margin值。
            var bodyOffset = $(document.body).offset();
            var scroll = getFixedScroll();
            return {
                top: elemOffset.top - bodyOffset.top - scroll.top,
                left: elemOffset.left - bodyOffset.left - scroll.left
            };
        } else {
            return { top: 0, left: 0 };
        }
    }

    function Grid($elem, options) {
        var base = null;
        var defaults = {
            autoResize: true,
            unSortable: true,
            clockwise: false
        };

        function calcHeadRowNum(cols) {
            var rows = 1;
            for (var i in cols) {
                var cellRows = 1;
                if ($.isNumeric(cols[i].span)) {
                    var span = Math.ceil(Number(cols[i].span));
                    if (span > cellRows) {
                        cellRows = span;
                    }
                }
                if ($.isArray(cols[i].cols)) {
                    cellRows += calcHeadRowNum(cols[i].cols);
                }
                rows = rows >= cellRows ? rows : cellRows;
            }
            return rows;
        }

        function calcHeadRowSpan(col, rows) {
            var subRows = 0;
            if ($.isArray(col.cols)) {
                subRows = calcHeadRowNum(col.cols);
            }
            return rows - subRows;
        }

        function calcHeadColSpan(col) {
            var span = 0;
            if ($.isArray(col.cols)) {
                for (var i in col.cols) {
                    span += calcHeadColSpan(col.cols[i]);
                }
            } else {
                span = 1;
            }
            return span;
        }

        function reCalcHeight(callback) {
            base.$root.css('max-height', 'none');
            base.$bodyWrap.css('max-height', 'none');
            var wrapOverflowHeight = base.$wrap[0].scrollHeight - base.$wrap.innerHeight();
            if (wrapOverflowHeight > 0 && base.$root.outerHeight(true) > base.$wrap.height()) {
                base.$root.css('max-height', (base.$wrap.height() - (base.$root.outerHeight(true) - base.$root.outerHeight(false))) + 'px');//base.$root.css('max-height', (base.$root.outerHeight(false) - wrapOverflowHeight) + 'px');
            }

            var rootOverflowHeight = base.$root[0].scrollHeight - base.$root.innerHeight();
            if (rootOverflowHeight > 0 && base.$bodyWrap.is(':visible') && base.$headWrap.outerHeight(true) + base.$bodyWrap.outerHeight(true) > base.$root.height()) {
                var scrollTop = base.$bodyWrap[0].scrollTop;
                base.$bodyWrap.css('max-height', (base.$root.height() - base.$headWrap.outerHeight(true) - (base.$bodyWrap.outerHeight(true) - base.$bodyWrap.outerHeight(false))) + 'px');//base.$bodyWrap.css('max-height', (base.$bodyWrap.outerHeight(false) - rootOverflowHeight) + 'px');
                base.$bodyWrap[0].scrollTop = scrollTop;
            }

            if (typeof (callback) === 'function') {
                callback();
            }
        }

        function reCalcWidth(callback) {
            var headEdgeWidth = base.$bodyWrap[0].offsetWidth - base.$bodyWrap[0].clientWidth;
            base.$headWrap.css('padding-right', headEdgeWidth + 'px');

            var $headRulerCells = base.$headRuler.children('td:not(:last-child)');
            base.$bodyRuler.children('td:not(:last-child)').each(function (index) {
                var $headCell = $headRulerCells.eq(index);
                var $bodyCell = $(this);
                $headCell.css('min-width', $headCell.attr('data-css-min-width'));
                $bodyCell.css('min-width', $headCell.attr('data-css-min-width'));
                $headCell.css('width', $headCell.attr('data-css-width'));
                $bodyCell.css('width', $headCell.attr('data-css-width'));
                $headCell.css('max-width', $headCell.attr('data-css-max-width'));
                $bodyCell.css('max-width', $headCell.attr('data-css-max-width'));
            });

            base.$bodyRuler.children('td:not(:last-child)').each(function (index) {
                var $headCell = $headRulerCells.eq(index);
                var $bodyCell = $(this);
                var headCellWidth = $headCell.outerWidth(false);
                var bodyCellWidth = $bodyCell.outerWidth(false);
                var cellWidth = headCellWidth > bodyCellWidth ? headCellWidth : bodyCellWidth;
                $headCell.css('min-width', cellWidth + 'px');
                $bodyCell.css('min-width', cellWidth + 'px');
                $headCell.css('max-width', cellWidth + 'px');
                $bodyCell.css('max-width', cellWidth + 'px');
            });

            base.$bodyRuler.children('td:not(:last-child)').each(function (index) {
                var $headCell = $headRulerCells.eq(index);
                var $bodyCell = $(this);

                $headCell.css('min-width', 0);
                $bodyCell.css('min-width', 0);
                var cssMinWidth = $headCell.attr('data-css-min-width');
                $headCell.css('min-width', cssMinWidth);
                $bodyCell.css('min-width', cssMinWidth);

                var headCellWidth = $headCell.outerWidth(false);
                var bodyCellWidth = $bodyCell.outerWidth(false);
                var cellWidth = headCellWidth > bodyCellWidth ? headCellWidth : bodyCellWidth;
                $headCell.css('min-width', cellWidth + 'px');
                $bodyCell.css('min-width', cellWidth + 'px');
                $headCell.css('max-width', cellWidth + 'px');
                $bodyCell.css('max-width', cellWidth + 'px');
            });

            if (typeof (callback) === 'function') {
                callback();
            }
        }

        function pinHeadHandler() {
            if (base.$root.children().length >= 1 && base.$root.is(':visible')) {
                //base.$headWrap.css('top','auto');
                //var gap = base.$headWrap.offset().top - base.$root.offset().top;
                //base.pinHeadOffset += gap;

                var top = 0;
                var $refer = $(base.pinHeadRefer);
                if ($refer.length === 1 && isHTMLElement($refer[0])) {
                    top = base.pinHeadOffset - (base.$root.offset().top - $refer.offset().top);
                } else {
                    if (base.pinHeadRefer === 'relative') {
                        top = base.pinHeadOffset;
                    } else/* if(base.pinHeadRefer === 'fixed')*/ {
                        top = base.pinHeadOffset - getFixedOffset(base.$root[0]).top;
                    }
                }
                top = top > 0 ? top : 0;
                base.$headWrap.css('top', top);
            }

            return false;
        }

        function unPinHead() {
            // var $refer = $(base.pinHeadRefer);

            base.$root.toggleClass('ggGrid-elderScrollListen', false);
            base.$root.parentsUntil('body').each(function () {
                var $this = $(this);
                if ($this.has('.ggGrid-elderScrollListen').length < 1) {
                    $this.off('scroll', elderScrollHandler);
                    $this.toggleClass('ggGrid-scrollTrigger', false);
                }
            });

            base.$root.off('ggGrid-elderScroll', pinHeadHandler);
            base.$root.off('winScroll', pinHeadHandler);

            base.pinHeadOffset = null;
            base.pinHeadRefer = null;

            if (base.pinHeadTop != null) {
                base.$headWrap.css('top', base.pinHeadTop);
                base.pinHeadTop = null;
            }
        }

        function pinHead(topOffset, refer) {
            unPinHead();

            base.pinHeadTop = base.$headWrap.css('top');

            base.pinHeadRefer = refer;
            // var $refer = $(base.pinHeadRefer);
            topOffset = Number(topOffset);
            if (topOffset !== topOffset) {
                topOffset = 0;
            }
            base.pinHeadOffset = topOffset;

            base.$root.toggleClass('ggGrid-elderScrollListen', true);
            base.$root.parentsUntil('body').each(function () {
                var $this = $(this);
                if (!$this.is('.ggGrid-scrollTrigger')) {
                    $this.toggleClass('ggGrid-scrollTrigger', true);
                    $this.on('scroll', elderScrollHandler);
                }
            });

            base.$root.on('ggGrid-elderScroll', pinHeadHandler);
            base.$root.on('winScroll', pinHeadHandler);
            pinHeadHandler();
        }

        function unExtWidth() {
            if (base.extWidthMax != null) {
                base.$root.css('max-width', base.extWidthMax);
                base.extWidthMax = null;
            }
            if (base.extWidthMin != null) {
                base.$root.css('min-width', base.extWidthMin);
                base.extWidthMin = null;
            }

            //if(base.$root.children().length >= 1 && base.$root.is(':visible')){
            //    reCalcWidth();
            //}
        }

        function extWidth() {
            unExtWidth();

            base.extWidthMin = base.$root.css('min-width');
            base.extWidthMax = base.$root.css('max-width');

            var width = (base.$root.outerWidth(false) - base.$headWrap.width() + base.$headTable.outerWidth(true)) + 'px';
            base.$root.css('min-width', width);
            base.$root.css('max-width', width);

            //if(base.$root.children().length >= 1 && base.$root.is(':visible')){
            //    reCalcWidth();
            //}
        }

        function resize(callback) {
            if (base.$root.children().length >= 1 && base.$root.is(':visible')) {     //base.$root.closest(':not(:visible)').length <= 0
                reCalcHeight(function () {
                    reCalcWidth(function () {
                        setTimeout(function () {
                            base.$bodyWrap.trigger('scroll');
                        }, 0);
                        if (typeof (callback) === 'function') {
                            callback();
                        }
                    });
                });
            } else {
                if (typeof (callback) === 'function') {
                    callback();
                }
            }
        }

        function sort($orderBy, order, sortCompare) {
            if ($orderBy.length <= 0) {
                return;
            }

            var colIndex = $orderBy.attr('data-col-index');
            var bodyRowList = [];
            base.$tbody.children('tr').each(function () {
                bodyRowList.push($(this));
            });
            bodyRowList.sort(function ($trA, $trB) {
                var rowSeqA = Number($trA.attr('data-sequence'));
                var rowSeqB = Number($trB.attr('data-sequence'));
                var $tdA = null;
                var posA = 0;
                $trA.children('td').each(function () {
                    var $this = $(this);
                    var span = $this.attr('colspan');
                    span = Number(span ? span : 1);
                    posA += span;
                    if (span === 0 || posA > colIndex) {
                        $tdA = $this;
                        return false;
                    }
                });
                var $tdB = null;
                var posB = 0;
                $trB.children('td').each(function () {
                    var $this = $(this);
                    var span = $this.attr('colspan');
                    span = Number(span ? span : 1);
                    posB += span;
                    if (span === 0 || posB > colIndex) {
                        $tdB = $this;
                        return false;
                    }
                });
                //var $tdA = $trA.children('td').eq(colIndex);
                //var $tdB = $trB.children('td').eq(colIndex);
                var sortLevelA = Number($tdA.attr('data-sort-level'));
                var sortLevelB = Number($tdB.attr('data-sort-level'));
                if (!$.isNumeric(sortLevelA)) {
                    sortLevelA = 0;
                }
                if (!$.isNumeric(sortLevelB)) {
                    sortLevelB = 0;
                }
                var sortValueA = $tdA.attr('data-sort-value');
                var sortValueB = $tdB.attr('data-sort-value');
                if (sortValueA == null) {
                    sortValueA = $tdA.text();
                }
                if (sortValueB == null) {
                    sortValueB = $tdB.text();
                }
                var userDataA = $tdA.data('gg-grid-user-data');
                var userDataB = $tdB.data('gg-grid-user-data');

                if (typeof (sortCompare) === 'function') {
                    return sortCompare(
                        {
                            rowSeq: rowSeqA,
                            sortLevel: sortLevelA,
                            sortValue: sortValueA,
                            userData: userDataA
                        },
                        {
                            rowSeq: rowSeqB,
                            sortLevel: sortLevelB,
                            sortValue: sortValueB,
                            userData: userDataB
                        }
                    );
                } else {
                    if (order === 0) {
                        return rowSeqA - rowSeqB;
                    }
                    if (sortLevelA !== sortLevelB) {
                        return sortLevelA - sortLevelB;
                    } else {
                        var c = 0;
                        if ($.isNumeric(sortValueA) && $.isNumeric(sortValueB)) {
                            c = Number(sortValueA) - Number(sortValueB);
                        } else {
                            c = String(sortValueA).localeCompare(String(sortValueB));
                        }
                        if (c === 0) {
                            c = rowSeqA - rowSeqB;
                        }
                        if (order < 0) {
                            c = -c;
                        }
                        return c;
                    }
                }
            });
            for (var i = 1; i < bodyRowList.length; i++) {
                var event = $.Event('gg-grid-row-move-after');
                event.target = $orderBy[0];
                base.$root.trigger(event, [bodyRowList[i].index(), bodyRowList[i - 1].index()]);

                bodyRowList[i - 1].after(bodyRowList[i]);
            }
            if (typeof (base.options.sortCallback) === 'function') {
                base.options.sortCallback();
            }
        }

        function buildBodyRow(rowData, noResize) {
            var $tr = $('<tr></tr>');
            $tr.css('position', 'relative');
            $tr.css('margin', '0 0 0 0');
            $tr.css('padding', '0 0 0 0');
            $tr.css('min-width', '100%');
            $tr.css('width', '100%');
            $tr.css('max-width', '100%');
            $tr.css('min-height', 0);
            $tr.css('height', 'auto');
            $tr.css('max-height', 'none');
            $tr.attr('data-sequence', base.bodyRowSeq++);
            var cells = null;
            if ($.isArray(rowData)) {
                cells = rowData;
            } else if ($.isPlainObject(rowData)) {
                if (typeof (rowData.cssClass) === 'string') {
                    $tr.toggleClass(rowData.cssClass, true);
                }
                if (rowData.userData != null) {
                    $tr.data('gg-grid-user-data', rowData.userData);
                }
                if ($.isArray(rowData.data)) {
                    cells = rowData.data;
                }
            }
            var $headRulerCells = base.$headRuler.children('td:not(:last-child)');
            for (var i in cells) {
                var $td = $('<td></td>');
                $td.css('position', 'relative');
                $td.css('overflow', 'hidden');
                $td.css('margin', '0 0 0 0');
                var $headCell = $headRulerCells.eq(i);
                $td.css('min-width', $headCell.attr('data-css-min-width'));
                $td.css('width', $headCell.attr('data-css-width'));
                $td.css('max-width', $headCell.attr('data-css-max-width'));
                $td.css('min-height', 0);
                $td.css('height', 'auto');
                $td.css('max-height', 'none');
                $td.css('text-overflow', 'ellipsis');
                if ($.isPlainObject(cells[i])) {
                    if (typeof (cells[i].cssClass) === 'string') {
                        $td.toggleClass(cells[i].cssClass, true);
                    }
                    if ($.isNumeric(cells[i].sortLevel)) {
                        $td.attr('data-sort-level', cells[i].sortLevel);
                    } else {
                        $td.attr('data-sort-level', 0);
                    }
                    if (cells[i].sortValue != null) {
                        $td.attr('data-sort-value', cells[i].sortValue);
                    }
                    if (cells[i].userData != null) {
                        $td.data('gg-grid-user-data', cells[i].userData);
                    }
                    if (cells[i].content != null) {
                        $td.append(cells[i].content);
                    }
                    if (cells[i].tooltip === true) {
                        $td.attr('title', $td.text());
                    } else if (typeof (cells[i].tooltip) === 'string') {
                        $td.attr('title', cells[i].tooltip);
                    }
                    if (RegExp('^0|([1-9]+[0-9]*)$').test(String(cells[i].span))) {
                        $td.attr('colspan', cells[i].span);
                    }
                } else if (cells[i] != null) {
                    $td.append(cells[i]);
                }
                $tr.append($td);
            }
            var $td = $('<td></td>');
            $td.css('position', 'relative');
            $td.css('overflow', 'hidden');
            $td.css('margin', '0 0 0 0');
            $td.css('padding', '0 0 0 0');
            $td.css('min-width', 0);
            $td.css('width', 'auto');
            $td.css('max-width', 'none');
            $td.css('min-height', 0);
            $td.css('height', 'auto');
            $td.css('max-height', 'none');
            $td.css('text-overflow', 'ellipsis');
            $td.append('&nbsp;');
            $tr.append($td);

            if (noResize !== true) {
                resize();
            }
            return $tr[0];
        }

        function initNotice() {
            base.$noticeWrap = $('<div></div>');
            base.$noticeWrap.css('display', 'none');
            base.$noticeWrap.css('position', 'relative');
            base.$noticeWrap.css('z-index', 0);
            base.$noticeWrap.css('box-sizing', 'border-box');
            base.$noticeWrap.css('overflow', 'hidden');
            base.$noticeWrap.css('margin', '0 0 0 0');
            base.$noticeWrap.css('padding', '0 0 0 0');
            base.$noticeWrap.css('min-width', '100%');
            base.$noticeWrap.css('width', '100%');
            base.$noticeWrap.css('max-width', '100%');
            base.$noticeWrap.css('min-height', 0);
            base.$noticeWrap.css('height', '65px');
            base.$noticeWrap.css('line-height', '65px');
            base.$noticeWrap.css('max-height', 'none');
            base.$noticeWrap.css('background-color', '#f2f2f2');
            base.$noticeWrap.css('border', '1px solid #f2f2f2');
            base.$noticeWrap.css('text-align', 'center');
            base.$noticeWrap.toggleClass('gg-grid-notice-wrapper', true);
            base.$root.append(base.$noticeWrap);
        }

        function initBody() {
            base.$bodyWrap = $('<div></div>');
            base.$bodyWrap.css('position', 'relative');
            base.$bodyWrap.css('z-index', 0);
            base.$bodyWrap.css('box-sizing', 'border-box');
            base.$bodyWrap.css('overflow', 'auto');
            base.$bodyWrap.css('margin', '0 0 0 0');
            base.$bodyWrap.css('padding', '0 0 0 0');
            base.$bodyWrap.css('min-width', '100%');
            base.$bodyWrap.css('width', '100%');
            base.$bodyWrap.css('max-width', '100%');
            base.$bodyWrap.css('min-height', '0%');//规避IE9下Bug:table在hover状态时导致上层div被撑大
            base.$bodyWrap.css('height', 'auto');
            base.$bodyWrap.css('max-height', 'none');
            base.$bodyWrap.toggleClass('gg-grid-body-wrapper', true);
            base.$root.append(base.$bodyWrap);

            base.$bodyWrap.on('scroll', function (e) {
                base.$headTable.css('left', -$(this).scrollLeft());

                var event = $.Event('gg-grid-scroll');
                event.target = e.target;
                base.$root.trigger(event, [{
                    top: $(this).scrollTop(),
                    maxTop: $(this)[0].scrollHeight - $(this).innerHeight(),
                    left: $(this).scrollLeft(),
                    maxLeft: $(this)[0].scrollWidth - $(this).innerWidth()
                }]);
            });

            base.$bodyTable = $('<table></table>');
            base.$bodyTable.css('position', 'relative');
            base.$bodyTable.css('box-sizing', 'border-box');
            base.$bodyTable.css('empty-cells', 'show');
            base.$bodyTable.css('left', 0);
            base.$bodyTable.css('margin', '0 0 0 0');
            base.$bodyTable.css('padding', '0 0 0 0');
            base.$bodyTable.css('min-width', '100%');
            base.$bodyTable.css('width', 'auto');
            base.$bodyTable.css('max-width', 'none');
            base.$bodyTable.css('min-height', 0);
            base.$bodyTable.css('height', 'auto');
            base.$bodyTable.css('max-height', 'none');
            base.$bodyWrap.append(base.$bodyTable);

            base.$tbody = $('<tbody></tbody>');
            base.$tbody.css('position', 'relative');
            base.$tbody.css('margin', '0 0 0 0');
            base.$tbody.css('padding', '0 0 0 0');
            base.$tbody.css('min-width', '100%');
            base.$tbody.css('width', '100%');
            base.$tbody.css('max-width', '100%');
            base.$tbody.css('min-height', '100%');
            base.$tbody.css('height', '100%');
            base.$tbody.css('max-height', '100%');
            base.$bodyTable.append(base.$tbody);
            base.bodyRowSeq = 0;

            base.$tbody.on('mouseenter', 'tr', function (e) {
                var index = $(this).index();
                base.$tbody.children('tr:nth-of-type(' + (index + 1) + ')').toggleClass('-hover-');

                var event = $.Event('gg-grid-row-hover-on');
                event.target = e.target;
                base.$root.trigger(event, [index]);
            }).on('mouseleave', 'tr', function (e) {
                var index = $(this).index();
                base.$tbody.children('tr:nth-of-type(' + (index + 1) + ')').toggleClass('-hover-');

                var event = $.Event('gg-grid-row-hover-off');
                event.target = e.target;
                base.$root.trigger(event, [index]);
            });

            base.$tbody.on('click', 'tr', function (e) {
                if (e.button === 0) {
                    base.$tbody.find('tr.-select-').toggleClass('-select-', false);
                    $(this).toggleClass('-select-', true);

                    var event = $.Event('gg-grid-row-select');
                    event.target = e.target;
                    base.$root.trigger(event, [$(this).index()]);
                }
            });

            base.$bodyTfoot = $('<tfoot></tfoot>');
            base.$bodyTfoot.css('position', 'relative');
            base.$bodyTfoot.css('margin', '0 0 0 0');
            base.$bodyTfoot.css('padding', '0 0 0 0');
            base.$bodyTfoot.css('min-width', '100%');
            base.$bodyTfoot.css('width', '100%');
            base.$bodyTfoot.css('max-width', '100%');
            base.$bodyTfoot.css('min-height', 0);
            base.$bodyTfoot.css('height', 0);
            base.$bodyTfoot.css('max-height', 0);
            base.$bodyTfoot.css('line-height', '1px');
            base.$bodyTable.append(base.$bodyTfoot);
            base.$bodyRuler = $('<tr></tr>');
            base.$bodyRuler.css('position', 'relative');
            base.$bodyRuler.css('margin', '0 0 0 0');
            base.$bodyRuler.css('padding', '0 0 0 0');
            base.$bodyRuler.css('min-width', '100%');
            base.$bodyRuler.css('width', '100%');
            base.$bodyRuler.css('max-width', '100%');
            base.$bodyRuler.css('min-height', 0);
            base.$bodyRuler.css('height', 0);
            base.$bodyRuler.css('max-height', 0);
            base.$bodyRuler.css('line-height', '1px');
            base.$bodyTfoot.append(base.$bodyRuler);
            base.$headRuler.children('td:not(:last-child)').each(function () {
                var $this = $(this);
                var $td = $('<td></td>');
                $td.css('position', 'relative');
                $td.css('overflow', 'hidden');
                $td.css('margin', '0 0 0 0');
                $td.css('min-width', $this.attr('data-css-min-width'));
                $td.css('width', $this.attr('data-css-width'));
                $td.css('max-width', $this.attr('data-css-max-width'));
                $td.css('min-height', 0);
                $td.css('height', 0);
                $td.css('max-height', 0);
                $td.css('line-height', '1px');
                $td.css('text-overflow', 'ellipsis');
                base.$bodyRuler.append($td);
            });
            var $td = $('<td></td>');
            $td.css('position', 'relative');
            $td.css('overflow', 'hidden');
            $td.css('margin', '0 0 0 0');
            $td.css('padding', '0 0 0 0');
            $td.css('min-width', 0);
            $td.css('width', 'auto');
            $td.css('max-width', 'none');
            $td.css('min-height', 0);
            $td.css('height', 0);
            $td.css('max-height', 0);
            $td.css('line-height', '1px');
            $td.css('text-overflow', 'ellipsis');
            $td.append('&nbsp;');
            base.$bodyRuler.append($td);
        }

        function initHeadCells(cols, rowNum, rowIndex) {
            var $tr = base.$thead.children('tr').eq(rowIndex);
            for (var i in cols) {
                var col = cols[i];
                var colSpan = calcHeadColSpan(col);
                var rowSpan = calcHeadRowSpan(col, rowNum);
                var $th = $('<th></th>');
                $th.attr('colspan', colSpan);
                $th.attr('rowspan', rowSpan);
                $th.css('position', 'relative');
                $th.css('overflow', 'hidden');
                $th.css('margin', '0 0 0 0');
                if (col.width != null) {
                    $th.css('min-width', col.width);
                    $th.css('width', col.width);
                } else {
                    $th.css('min-width', 0);
                    $th.css('width', 'auto');
                }
                if (col.minWidth != null) {
                    $th.css('min-width', col.minWidth);
                }
                if (col.maxWidth != null) {
                    $th.css('max-width', col.maxWidth);
                } else {
                    $th.css('max-width', 'none');
                }
                $th.css('min-height', 0);
                $th.css('height', 'auto');
                $th.css('max-height', 'none');
                $th.css('text-overflow', 'ellipsis');
                if (col.title != null) {
                    $th.append(col.title);
                }
                if (col.tooltip === true) {
                    $th.attr('title', $th.text());
                } else if (typeof (col.tooltip) === 'string') {
                    $th.attr('title', col.tooltip);
                }
                if (typeof (col.cssClass) === 'string') {
                    $th.toggleClass(col.cssClass, true);
                }
                if (col.sortable === true) {
                    $th.toggleClass('gg-grid-sortable', true);
                    $th.attr('data-col-index', base.$headRuler.children('td').length);
                    $th.append('<span class="gg-grid-sort-flag"></span>');

                    if (col.orderBy === true) {
                        var order = Number(col.order);
                        if (order === order) {
                            if (order < 0) {
                                $th.toggleClass('-order-by-', true);
                                $th.toggleClass('-desc-', true);
                            } else if (order > 0) {
                                $th.toggleClass('-order-by-', true);
                                $th.toggleClass('-asc-', true);
                            }
                        }
                    }

                    if (typeof (col.unSortable) === 'boolean') {
                        $th.data('gg-grid-unSortable', col.unSortable);
                    }
                    if (typeof (col.clockwise) === 'boolean') {
                        $th.data('gg-grid-clockwise', col.clockwise);
                    }
                    if (typeof (col.sortFunc) === 'function') {
                        $th.data('gg-grid-sort-func', col.sortFunc);
                    }
                    if (typeof (col.sortCompare) === 'function') {
                        $th.data('gg-grid-sort-comp', col.sortCompare);
                    }
                }
                if (col.userData != null) {
                    $th.data('gg-grid-user-data', col.userData);
                }
                $tr.append($th);
                var $cell = $th;
                if (col.cols != null) {
                    initHeadCells(col.cols, rowNum - rowSpan, rowIndex + rowSpan);
                } else {
                    var $td = $('<td></td>');
                    $td.attr('colspan', '1');
                    $td.attr('rowspan', '1');
                    $td.css('position', 'relative');
                    $td.css('overflow', 'hidden');
                    $td.css('margin', '0 0 0 0');
                    if (col.width != null) {
                        $td.css('min-width', col.width);
                        $td.css('width', col.width);
                    } else {
                        $td.css('min-width', 0);
                        $td.css('width', 'auto');
                    }
                    if (col.minWidth != null) {
                        $td.css('min-width', col.minWidth);
                    }
                    if (col.maxWidth != null) {
                        $td.css('max-width', col.maxWidth);
                    } else {
                        $td.css('max-width', 'none');
                    }
                    $td.css('min-height', 0);
                    $td.css('height', 0);
                    $td.css('max-height', 0);
                    $td.css('text-overflow', 'ellipsis');
                    base.$headRuler.append($td);
                    $cell = $td;
                }
                if (col.width != null) {
                    $cell.attr('data-css-width', col.width);
                    $cell.attr('data-css-min-width', col.width);
                } else {
                    $cell.attr('data-css-width', 'auto');
                    $cell.attr('data-css-min-width', 0);
                }
                if (col.minWidth != null) {
                    $cell.attr('data-css-min-width', col.minWidth);
                }
                if (col.maxWidth != null) {
                    $cell.attr('data-css-max-width', col.maxWidth);
                } else {
                    $cell.attr('data-css-max-width', 'none');
                }
            }
        }

        function initHeadTable() {
            base.headRowNum = calcHeadRowNum(base.options.cols);
            if ($.isNumeric(base.options.headRowNum)) {
                base.headRowNum = base.headRowNum >= base.options.headRowNum ? base.headRowNum : base.options.headRowNum;
            }
            for (var i = 0; i < base.headRowNum; i++) {
                var $tr = $('<tr></tr>');
                $tr.css('position', 'relative');
                $tr.css('margin', '0 0 0 0');
                $tr.css('padding', '0 0 0 0');
                $tr.css('min-width', '100%');
                $tr.css('width', '100%');
                $tr.css('max-width', '100%');
                $tr.css('min-height', 0);
                $tr.css('height', 'auto');
                $tr.css('max-height', 'none');
                base.$thead.append($tr);
            }

            initHeadCells(base.options.cols, base.headRowNum, 0);
            base.$sortables = base.$thead.find('.gg-grid-sortable');
            base.$sortflags = base.$sortables.children('.gg-grid-sort-flag');

            for (var i = 0; i < base.headRowNum; i++) {
                var $th = $('<th></th>');
                $th.attr('colspan', '1');
                $th.attr('rowspan', '1');
                $th.css('position', 'relative');
                $th.css('overflow', 'hidden');
                $th.css('margin', '0 0 0 0');
                $th.css('padding', '0 0 0 0');
                $th.css('min-width', 0);
                $th.css('width', 'auto');
                $th.css('max-width', 'none');
                $th.css('min-height', 0);
                $th.css('height', 'auto');
                $th.css('max-height', 'none');
                $th.css('text-overflow', 'ellipsis');
                $th.append('&nbsp;');
                base.$thead.children('tr').eq(i).append($th);
            }
            var $td = $('<td></td>');
            $td.attr('colspan', '1');
            $td.attr('rowspan', '1');
            $td.css('position', 'relative');
            $td.css('overflow', 'hidden');
            $td.css('margin', '0 0 0 0');
            $td.css('padding', '0 0 0 0');
            $td.css('min-width', 0);
            $td.css('width', 'auto');
            $td.css('max-width', 'none');
            $td.css('min-height', 0);
            $td.css('height', 0);
            $td.css('max-height', 0);
            $td.css('line-height', '1px');
            $td.css('text-overflow', 'ellipsis');
            $td.append('&nbsp;');
            base.$headRuler.append($td);
        }

        function initHead() {
            base.$headWrap = $('<div></div>');
            base.$headWrap.css('position', 'relative');
            base.$headWrap.css('z-index', 1);
            base.$headWrap.css('box-sizing', 'border-box');
            base.$headWrap.css('overflow', 'hidden');
            base.$headWrap.css('top', 0);
            base.$headWrap.css('margin', '0 0 0 0');
            base.$headWrap.css('padding', '0 0 0 0');
            base.$headWrap.css('min-width', 0);
            base.$headWrap.css('width', '100%');
            base.$headWrap.css('max-width', 'none');
            base.$headWrap.css('min-height', '0%');//规避IE9下Bug:table在hover状态时导致上层div被撑大
            base.$headWrap.css('height', 'auto');
            base.$headWrap.css('max-height', 'none');
            base.$headWrap.toggleClass('gg-grid-head-wrapper', true);
            base.$root.append(base.$headWrap);

            base.$headTable = $('<table></table>');
            base.$headTable.css('position', 'relative');
            base.$headTable.css('box-sizing', 'border-box');
            base.$headTable.css('empty-cells', 'show');
            base.$headTable.css('left', 0);
            base.$headTable.css('margin', '0 0 0 0');
            base.$headTable.css('padding', '0 0 0 0');
            base.$headTable.css('min-width', '100%');
            base.$headTable.css('width', 'auto');
            base.$headTable.css('max-width', 'none');
            base.$headTable.css('min-height', 0);
            base.$headTable.css('height', 'auto');
            base.$headTable.css('max-height', 'none');
            base.$headWrap.append(base.$headTable);

            base.$thead = $('<thead></thead>');
            base.$thead.css('position', 'relative');
            base.$thead.css('margin', '0 0 0 0');
            base.$thead.css('padding', '0 0 0 0');
            base.$thead.css('min-width', '100%');
            base.$thead.css('width', '100%');
            base.$thead.css('max-width', '100%');
            base.$thead.css('min-height', '100%');
            base.$thead.css('height', '100%');
            base.$thead.css('max-height', '100%');
            base.$headTable.append(base.$thead);
            base.$headTfoot = $('<tfoot></tfoot>');
            base.$headTfoot.css('position', 'relative');
            base.$headTfoot.css('margin', '0 0 0 0');
            base.$headTfoot.css('padding', '0 0 0 0');
            base.$headTfoot.css('min-width', '100%');
            base.$headTfoot.css('width', '100%');
            base.$headTfoot.css('max-width', '100%');
            base.$headTfoot.css('min-height', 0);
            base.$headTfoot.css('height', 0);
            base.$headTfoot.css('max-height', 0);
            base.$headTfoot.css('line-height', '1px');
            base.$headTable.append(base.$headTfoot);
            base.$headRuler = $('<tr></tr>');
            base.$headRuler.css('position', 'relative');
            base.$headRuler.css('margin', '0 0 0 0');
            base.$headRuler.css('padding', '0 0 0 0');
            base.$headRuler.css('min-width', '100%');
            base.$headRuler.css('width', '100%');
            base.$headRuler.css('max-width', '100%');
            base.$headRuler.css('min-height', 0);
            base.$headRuler.css('height', 0);
            base.$headRuler.css('max-height', 0);
            base.$headRuler.css('line-height', '1px');
            base.$headTfoot.append(base.$headRuler);
            initHeadTable();

            base.$thead.on('click', '.gg-grid-sortable', function (e) {
                if (e.button === 0) {
                    var $this = $(this);

                    var order = 0;
                    var unSortable = $this.data('gg-grid-unSortable');
                    if (unSortable == null) {
                        unSortable = base.options.unSortable;
                    }
                    var clockwise = $this.data('gg-grid-clockwise');
                    if (clockwise == null) {
                        clockwise = base.options.clockwise;
                    }
                    if ($this.is('.-desc-')) {
                        if (unSortable === true) {
                            order = (clockwise === true) ? 0 : 1;
                        } else {
                            order = 1;
                        }
                    } else if ($this.is('.-asc-')) {
                        if (unSortable === true) {
                            order = (clockwise === true) ? -1 : 0;
                        } else {
                            order = -1;
                        }
                    } else {
                        order = (clockwise === true) ? 1 : -1;
                    }

                    base.$sortables.toggleClass('-order-by-', false);
                    base.$sortables.toggleClass('-desc-', false);
                    base.$sortables.toggleClass('-asc-', false);
                    $this.toggleClass('-order-by-', true);
                    if (order < 0) {
                        $this.toggleClass('-desc-', true);
                    } else if (order > 0) {
                        $this.toggleClass('-asc-', true);
                    }

                    var sortFunc = $this.data('gg-grid-sort-func');
                    var sortCompare = $this.data('gg-grid-sort-comp');
                    if (typeof (sortFunc) === 'function') {
                        sortFunc($this.attr('data-col-index'), order, $this.data('gg-grid-user-data'));
                    } else if (typeof (sortCompare) === 'function') {
                        sort($this, order, sortCompare);
                    } else {
                        sort($this, order);
                    }
                }
            });
        }

        function init(options) {
            if ($.isPlainObject(options)) {
                if (options.hasOwnProperty('cols') && $.isArray(options.cols) && options.cols.length > 0) {
                    var opts = $.extend(true, {}, defaults);
                    base.options = $.extend(true, opts, options);

                    base.$root.empty();
                    base.$root.css('position', 'relative');
                    base.$root.css('z-index', 0);
                    base.$root.css('box-sizing', 'border-box');
                    base.$root.css('overflow', 'hidden');
                    base.$root.css('margin', '0 0 0 0');
                    base.$root.css('padding', '0 0 0 0');
                    base.$root.css('min-width', '100%');
                    base.$root.css('width', '100%');
                    base.$root.css('max-width', '100%');
                    base.$root.css('min-height', '100%');
                    base.$root.css('height', '100%');
                    base.$root.css('max-height', '100%');
                    base.$root.css('white-space', 'nowrap');
                    base.$root.css('word-break', 'keep-all');
                    base.$root.toggleClass('gg-grid', true);

                    initHead();
                    initBody();
                    initNotice();
                    resize();
                }
            }
        }

        function GG($elem, options) {
            base = this;
            base.$wrap = $elem;
            base.$root = $('<div></div>').appendTo($elem);
            base.options = defaults;

            base.$root.on('winRefresh', function (e) {
                if (base.options.autoResize === true) {
                    resize();
                }
                e.stopPropagation();
            });

            init(options);
        }

        GG.prototype = {
            init: function (options) {
                init(options);
                return base.$wrap;
            },

            resize: function (callback) {
                resize(callback);
            },

            reSort: function () {
                var $orderBy = base.$sortables.filter('.-order-by-');

                var order = 0;
                if ($orderBy.is('.-desc-')) {
                    order = -1;
                } else if ($orderBy.is('.-asc-')) {
                    order = 1;
                } else {
                    order = 0;
                }

                var sortFunc = $orderBy.data('gg-grid-sort-func');
                var sortCompare = $orderBy.data('gg-grid-sort-comp');
                if (typeof (sortFunc) === 'function') {
                    sortFunc($orderBy.attr('data-col-index'), order, $orderBy.data('gg-grid-user-data'));
                } else if (typeof (sortCompare) === 'function') {
                    sort($orderBy, order, sortCompare);
                } else {
                    sort($orderBy, order);
                }
            },

            clear: function (noResize) {
                base.$tbody.empty();
                base.$root.toggleClass('gg-grid-notice-state', false);
                base.$noticeWrap.css('display', 'none');
                base.$bodyWrap.css('display', '');
                base.bodyRowSeq = 0;
                base.$sortables.toggleClass('-order-by-', false);
                base.$sortables.toggleClass('-desc-', false);
                base.$sortables.toggleClass('-asc-', false);
                if (noResize !== true) {
                    resize();
                }
            },

            empty: function (noResize) {
                base.$tbody.empty();
                base.$root.toggleClass('gg-grid-notice-state', false);
                base.$noticeWrap.css('display', 'none');
                base.$bodyWrap.css('display', '');
                base.bodyRowSeq = 0;
                if (noResize !== true) {
                    resize();
                }
            },

            notice: function (content) {
                if ($.isPlainObject(content)) {
                    if (typeof (content.cssClass) === 'string') {
                        base.$noticeWrap.removeClass();
                        base.$noticeWrap.toggleClass('gg-grid-notice-wrapper', true);
                        base.$noticeWrap.toggleClass(content.cssClass, true);
                    }
                    if (typeof (content.addClass) === 'string') {
                        base.$noticeWrap.toggleClass(content.addClass, true);
                    }
                    if (typeof (content.removeClass) === 'string') {
                        base.$noticeWrap.toggleClass(content.removeClass, false);
                    }
                    if (typeof (content.toggleClass) === 'string') {
                        base.$noticeWrap.toggleClass(content.toggleClass);
                    }
                    if (content.content != null) {
                        base.$noticeWrap.empty();
                        base.$noticeWrap.append(content.content);
                    }
                } else if (content != null) {
                    base.$noticeWrap.empty();
                    base.$noticeWrap.append(content);
                }
                base.$noticeWrap.children().toggleClass('gg-grid-notice', true);
                base.$bodyWrap.css('display', 'none');
                base.$noticeWrap.css('display', '');
                base.$root.toggleClass('gg-grid-notice-state', true);
            },

            loading: function (content) {
                if ($.isPlainObject(content)) {
                    if (typeof (content.addClass) === 'string') {
                        base.$root.toggleClass(content.addClass, true);
                    }
                    if (typeof (content.removeClass) === 'string') {
                        base.$root.toggleClass(content.removeClass, false);
                    }
                    if (typeof (content.toggleClass) === 'string') {
                        base.$root.toggleClass(content.toggleClass);
                    }
                } else if (typeof (content) === 'string') {
                    base.$root.toggleClass(content);
                }
            },

            valid: function (params) {
                base.$root.toggleClass('gg-grid-notice-state', false);
                base.$noticeWrap.css('display', 'none');
                base.$bodyWrap.css('display', '');
                if ($.isPlainObject(params)) {
                    if (typeof (params.cssClass) === 'string') {
                        base.$noticeWrap.removeClass();
                        base.$noticeWrap.toggleClass('gg-grid-notice-wrapper', true);
                        base.$noticeWrap.toggleClass(params.cssClass, true);
                    }
                    if (typeof (params.addClass) === 'string') {
                        base.$noticeWrap.toggleClass(params.addClass, true);
                    }
                    if (typeof (params.removeClass) === 'string') {
                        base.$noticeWrap.toggleClass(params.removeClass, false);
                    }
                    if (typeof (params.toggleClass) === 'string') {
                        base.$noticeWrap.toggleClass(params.toggleClass);
                    }
                }
            },

            prepend: function (rowData, noResize) {
                var tr = buildBodyRow(rowData, noResize);
                base.$tbody.prepend(tr);
                return tr;
            },

            append: function (rowData, noResize) {
                var tr = buildBodyRow(rowData, noResize);
                base.$tbody.append(tr);
                return tr;
            },

            update: function (colBuilder, col, row, rowBuilder, noResize) {
                var $rows = null;
                if (isHTMLElement(row) || row instanceof $) {
                    $rows = $(row);
                } else if ($.isNumeric(row)) {
                    $rows = base.$tbody.children('tr').eq(row);
                } else if (row == null) {
                    $rows = base.$tbody.children('tr');
                } else {
                    return null;
                }
                $rows.each(function () {
                    var tr = this;
                    var $tr = $(tr);
                    if (typeof (rowBuilder) === 'function') {
                        var rowData = rowBuilder({
                            index: base.$tbody.children('tr').index(tr),
                            userData: $tr.data('gg-grid-user-data'),
                            elem: tr
                        });
                        if ($.isPlainObject(rowData)) {
                            if (typeof (rowData.cssClass) === 'string') {
                                $tr.removeClass();
                                $tr.toggleClass(rowData.cssClass, true);
                            }
                            if (typeof (rowData.addClass) === 'string') {
                                $tr.toggleClass(rowData.addClass, true);
                            }
                            if (typeof (rowData.removeClass) === 'string') {
                                $tr.toggleClass(rowData.removeClass, false);
                            }
                            if (typeof (rowData.toggleClass) === 'string') {
                                $tr.toggleClass(rowData.toggleClass);
                            }
                            if (rowData.userData != null) {
                                $tr.data('gg-grid-user-data', rowData.userData);
                            }
                        }
                    }

                    var $cells = null;
                    if ($.isNumeric(col)) {
                        $cells = $tr.children('td').eq(col);
                    } else {
                        $cells = $tr.children('td');
                    }
                    $cells.each(function () {
                        var td = this;
                        var $td = $(td);
                        if (typeof (colBuilder) === 'function') {
                            var cellData = colBuilder(
                                {
                                    index: $tr.children('td').index(td),
                                    userData: $td.data('gg-grid-user-data'),
                                    elem: td
                                },
                                {
                                    index: base.$tbody.children('tr').index(tr),
                                    userData: $tr.data('gg-grid-user-data'),
                                    elem: tr
                                }
                            );
                            if ($.isPlainObject(cellData)) {
                                if (typeof (cellData.cssClass) === 'string') {
                                    $td.removeClass();
                                    $td.toggleClass(cellData.cssClass, true);
                                }
                                if (typeof (cellData.addClass) === 'string') {
                                    $td.toggleClass(cellData.addClass, true);
                                }
                                if (typeof (cellData.removeClass) === 'string') {
                                    $td.toggleClass(cellData.removeClass, false);
                                }
                                if (typeof (cellData.toggleClass) === 'string') {
                                    $td.toggleClass(cellData.toggleClass);
                                }
                                if ($.isNumeric(cellData.sortLevel)) {
                                    $td.attr('data-sort-level', cellData.sortLevel);
                                }
                                if (cellData.sortValue != null) {
                                    $td.attr('data-sort-value', cellData.sortValue);
                                }
                                if (cellData.userData != null) {
                                    $td.data('gg-grid-user-data', cellData.userData);
                                }
                                if (cellData.content != null) {
                                    $td.empty();
                                    $td.append(cellData.content);
                                }
                                if (cellData.tooltip === true) {
                                    $td.attr('title', $td.text());
                                } else if (typeof (cellData.tooltip) === 'string') {
                                    $td.attr('title', cellData.tooltip);
                                }
                                if (RegExp('^0|([1-9]+[0-9]*)$').test(String(cellData.span))) {
                                    $td.attr('colspan', cellData.span);
                                }
                            } else if (cellData != null) {
                                $td.empty();
                                $td.append(cellData);
                            }
                        }
                    });
                });
                if (noResize !== true) {
                    resize();
                }
            },

            insert: function (row, data, noResize) {
                var tr = buildBodyRow(data, noResize);
                if (isHTMLElement(row) || row instanceof $) {
                    $(tr).insertBefore(row);
                } else if ($.isNumeric(row)) {
                    var $row = base.tbody.children('td').eq(row);
                    if ($row.length > 0) {
                        $(tr).insertBefore($row);
                    } else {
                        base.$tbody.append(tr);
                    }
                }
                return tr;
            },

            remove: function (row, noResize) {
                var $tr = null;
                if ($.isNumeric(row)) {
                    $tr = base.$tbody.children('tr').eq(row);
                } else if (isHTMLElement(row) || row instanceof $) {
                    $tr = $(row);
                } else {
                    return null;
                }
                $tr.remove();

                if (noResize !== true) {
                    resize();
                }

                return $tr[0];
            },

            moveAfter: function (moveIndex, afterIndex) {
                base.$sortables.toggleClass('-desc-', false);
                base.$sortables.toggleClass('-asc-', false);

                var $move = base.$tbody.find('tr').eq(moveIndex);
                var $after = base.$tbody.find('tr').eq(afterIndex);
                $after.after($move);
            },

            rowHoverOff: function (index) {
                base.$tbody.find('tr.-hover-').toggleClass('-hover-', false);
            },

            rowHoverOn: function (index) {
                base.rowHoverOff(index);
                base.$tbody.find('tr:nth-of-type(' + (index + 1) + ')').toggleClass('-hover-', true);
            },

            selectRow: function (index) {
                base.$tbody.find('tr.-select-').toggleClass('-select-', false);
                base.$tbody.find('tr:nth-of-type(' + (index + 1) + ')').toggleClass('-select-', true);
            },

            pinHead: pinHead,
            unPinHead: unPinHead,

            extWidth: extWidth,
            unExtWidth: unExtWidth
        };

        return new GG($elem, options);
    }

    $.fn.ggGrid = function () {
        var args = Array.apply(null, arguments);
        //var args = Array.prototype.slice.call(arguments,0);
        var grid = this.data('gg-Grid');
        if (grid != null) {
            var ret = null;
            if ($.isPlainObject(args[0])) {
                var func = eval('grid.init');
                ret = func.apply(grid, args);
            } else if (typeof (args[0]) === 'string') {
                var func = eval('grid.' + $.trim(args[0]));
                if (typeof (func) === 'function') {
                    ret = func.apply(grid, args.slice(1));
                }
            }
            this.data('gg-Grid', grid);
            return ret;
        } else if ($.isPlainObject(args[0])) {
            grid = Grid(this, args[0]);
            this.data('gg-Grid', grid);
            return this;
        }
    };

    function PinGrid($elem, options) {
        var base = null;
        var defaults = {
            autoResize: true
        };

        function reCalcWidth(callback) {
            base.$right.css('width', 0);
            base.$left.css('width', 0);
            base.$left.ggGrid('resize', function () {
                base.$left.width(base.$left.width() + base.$leftHeadWrap[0].scrollWidth - base.$leftHeadWrap.innerWidth());//IE9下如果没有显式设置宽度，hover状态下将被拉伸到100%。
                base.$right.width(base.$root.width() - base.$left.outerWidth(true) - (base.$right.outerWidth(true) - base.$right.width()));

                base.$right.ggGrid('resize', function () {
                    if (typeof (callback) === 'function') {
                        callback();
                    }
                });
            });
        }

        function reCalcHeight(callback) {
            base.$root.css('max-height', 'none');
            base.$left.css('max-height', 'none');
            base.$right.css('max-height', 'none');
            base.$leftBodyWrap.css('max-height', 'none');
            base.$rightBodyWrap.css('max-height', 'none');
            var wrapOverflowHeight = base.$wrap[0].scrollHeight - base.$wrap.innerHeight();
            if (wrapOverflowHeight > 0 && base.$root.outerHeight(true) > base.$wrap.height()) {
                base.$root.css('max-height', (base.$wrap.height() - (base.$root.outerHeight(true) - base.$root.outerHeight(false))) + 'px');//base.$root.css('max-height', (base.$root.outerHeight(false) - wrapOverflowHeight) + 'px');
            }

            var rootOverflowHeight = base.$root[0].scrollHeight - base.$root.innerHeight();
            if (rootOverflowHeight > 0 && base.$right.is(':visible') && base.$left.outerHeight(true) > base.$root.height()) {
                base.$right.css('max-height', (base.$root.height() - (base.$right.outerHeight(true) - base.$right.outerHeight(false))) + 'px');//base.$right.css('max-height', (base.$right.outerHeight(false) - rootOverflowHeight) + 'px');
            }

            if (typeof (callback) === 'function') {
                callback();
            }
        }

        function unPinHead() {
            base.$left.ggGrid('unPinHead');
            base.$right.ggGrid('unPinHead');
        }

        function pinHead(topOffset, refer) {
            // base.$left.ggGrid('pinHead', topOffset + (base.$left.offset().top - base.$root.offset().top), refer);
            // base.$right.ggGrid('pinHead', topOffset + (base.$right.offset().top - base.$root.offset().top), refer);
            base.$left.ggGrid('pinHead', topOffset, refer);
            base.$right.ggGrid('pinHead', topOffset, refer);
        }

        function pinLeftHandler() {
            if (base.$root.children().length >= 1 && base.$root.is(':visible')) {
                //base.$left.css('left','auto');
                //var gap = base.$left.offset().left - base.$root.offset().left;
                //base.pinLeftOffset += gap;

                var left = 0;
                var $refer = $(base.pinLeftRefer);
                if ($refer.length === 1 && isHTMLElement($refer[0])) {
                    left = base.pinLeftOffset - (base.$root.offset().left - $refer.offset().left);
                } else {
                    if (base.pinLeftRefer === 'relative') {
                        left = base.pinLeftOffset;
                    } else /*if(base.pinLeftRefer === 'fixed')*/ {
                        left = base.pinLeftOffset - getFixedOffset(base.$root[0]).left;
                    }
                }
                left = left > 0 ? left : 0;
                base.$left.css('left', left);
            }

            return false;
        }

        function unPinLeft() {
            // var $refer = $(base.pinLeftRefer);

            base.$root.toggleClass('ggGrid-elderScrollListen', false);
            base.$root.parentsUntil('body').each(function () {
                var $this = $(this);
                if ($this.has('.ggGrid-elderScrollListen').length < 1) {
                    $this.off('scroll', elderScrollHandler);
                    $this.toggleClass('ggGrid-scrollTrigger', false);
                }
            });

            base.$root.off('ggGrid-elderScroll', pinLeftHandler);
            base.$root.off('winScroll', pinLeftHandler);

            base.pinLeftOffset = null;
            base.pinLeftRefer = null;

            if (base.pinLeftStyle != null) {
                base.$left.css('left', base.pinLeftStyle);
                base.pinLeftStyle = null;
            }
        }

        function pinLeft(leftOffset, refer) {
            unPinLeft();

            base.pinLeftStyle = base.$left.css('left');

            base.pinLeftRefer = refer;
            // var $refer = $(base.pinLeftRefer);
            leftOffset = Number(leftOffset);
            if (leftOffset !== leftOffset) {
                leftOffset = 0;
            }
            base.pinLeftOffset = leftOffset;

            base.$root.toggleClass('ggGrid-elderScrollListen', true);
            base.$root.parentsUntil('body').each(function () {
                var $this = $(this);
                if (!$this.is('.ggGrid-scrollTrigger')) {
                    $this.toggleClass('ggGrid-scrollTrigger', true);
                    $this.on('scroll', elderScrollHandler);
                }
            });

            base.$root.on('ggGrid-elderScroll', pinLeftHandler);
            base.$root.on('winScroll', pinLeftHandler);
            pinLeftHandler();
        }

        function unExtWidth() {
            if (base.extWidthMax != null) {
                base.$root.css('max-width', base.extWidthMax);
                base.extWidthMax = null;
            }
            if (base.extWidthMin != null) {
                base.$root.css('min-width', base.extWidthMin);
                base.extWidthMin = null;
            }

            if (base.$root.children().length >= 2 && base.$root.is(':visible')) {
                base.$right.ggGrid('resize');
            }
        }

        function extWidth() {
            unExtWidth();

            base.extWidthMin = base.$root.css('min-width');
            base.extWidthMax = base.$root.css('max-width');

            base.$right.css('min-width', 0);
            base.$right.css('max-width', 'none');
            if (base.$root.children().length >= 2 && base.$root.is(':visible')) {
                base.$right.ggGrid('resize');
            }

            var width = (base.$root.outerWidth(false) - base.$root.width() + base.$left.outerWidth(true) + base.$right.outerWidth(true)) + 'px';
            base.$root.css('min-width', width);
            base.$root.css('max-width', width);
        }

        function resize(callback) {
            if (base.$root.children().length >= 2 && base.$root.is(':visible')) {     //base.$root.closest(':not(:visible)').length <= 0
                reCalcHeight(function () {
                    reCalcWidth(function () {
                        if (typeof (callback) === 'function') {
                            callback();
                        }
                    });
                });
            } else {
                if (typeof (callback) === 'function') {
                    callback();
                }
            }
        }

        function initLeft() {
            base.$left = $('<div></div>');
            base.$left.css('display', 'inline-block');
            // base.$left.css('float', 'left');
            base.$left.css('position', 'relative');
            base.$left.css('z-index', 1);
            base.$left.css('box-sizing', 'border-box');
            base.$left.css('overflow', 'hidden');
            base.$left.css('left', 0);
            base.$left.css('margin', '0 0 0 0');
            base.$left.css('padding', '0 0 0 0');
            base.$left.css('min-width', 0);
            base.$left.css('width', 'auto');
            base.$left.css('max-width', '100%');
            base.$left.css('min-height', '100%');
            base.$left.css('height', '100%');
            base.$left.css('max-height', '100%');
            base.$left.css('vertical-align', 'top');
            base.$left.toggleClass('-left-', true);
            base.$root.append(base.$left);
            base.options.left.autoResize = false;
            base.$left.ggGrid(base.options.left);

            base.$leftHeadWrap = base.$left.find('.gg-grid-head-wrapper');
            base.$leftBodyWrap = base.$left.find('.gg-grid-body-wrapper');

            base.$leftBodyWrap.css('overflow', 'hidden');

            base.$leftBodyWrap.on('mousewheel', function (e) {
                var delta = 0;
                if (e.originalEvent.wheelDelta) {
                    delta = e.originalEvent.wheelDelta;
                } else if (e.originalEvent.detail) {
                    delta = e.originalEvent.detail;
                }
                base.$rightBodyWrap.scrollTop(base.$rightBodyWrap.scrollTop() - delta);

                e.stopPropagation();
            });

            base.$left.on('gg-grid-row-move-after', function (e, moveIndex, afterIndex) {
                base.$right.ggGrid('moveAfter', moveIndex, afterIndex);
            });

            base.$left.on('gg-grid-row-hover-on', function (e, index) {
                base.$right.ggGrid('rowHoverOn', index);
            }).on('gg-grid-row-hover-off', function (e, index) {
                base.$right.ggGrid('rowHoverOff', index);
            });

            base.$left.on('gg-grid-row-select', function (e, index) {
                base.$right.ggGrid('selectRow', index);
            });
        }

        function initRight() {
            base.$right = $('<div></div>');
            base.$right.css('display', 'inline-block');
            // base.$right.css('float', 'left');
            base.$right.css('position', 'relative');
            base.$right.css('z-index', 0);
            base.$right.css('box-sizing', 'border-box');
            base.$right.css('overflow', 'hidden');
            base.$right.css('margin', '0 0 0 0');
            base.$right.css('padding', '0 0 0 0');
            base.$right.css('min-width', 0);
            base.$right.css('width', 'auto');
            base.$right.css('max-width', '100%');
            base.$right.css('min-height', '100%');
            base.$right.css('height', '100%');
            base.$right.css('max-height', '100%');
            base.$right.css('vertical-align', 'top');
            base.$right.toggleClass('-right-', true);
            base.$root.append(base.$right);
            base.options.right.autoResize = false;
            base.$right.ggGrid(base.options.right);

            base.$rightHeadWrap = base.$right.find('.gg-grid-head-wrapper');
            base.$rightBodyWrap = base.$right.find('.gg-grid-body-wrapper');

            base.$rightBodyWrap.on('mousewheel', function (e) {
                e.stopPropagation();
            });

            base.$rightBodyWrap.on('scroll', function () {
                base.$left.find('.gg-grid-body-wrapper>table').css('top', -$(this).scrollTop());
                base.$left.scroll();
            });

            base.$right.on('gg-grid-row-move-after', function (e, moveIndex, afterIndex) {
                base.$left.ggGrid('moveAfter', moveIndex, afterIndex);
            });

            base.$right.on('gg-grid-row-hover-on', function (e, index) {
                base.$left.ggGrid('rowHoverOn', index);
            }).on('gg-grid-row-hover-off', function (e, index) {
                base.$left.ggGrid('rowHoverOff', index);
            });

            base.$right.on('gg-grid-row-select', function (e, index) {
                base.$left.ggGrid('selectRow', index);
            });
        }

        function initNotice() {
            base.$noticeWrap = $('<div></div>');
            base.$noticeWrap.css('display', 'none');
            base.$noticeWrap.css('position', 'relative');
            base.$noticeWrap.css('z-index', 0);
            base.$noticeWrap.css('box-sizing', 'border-box');
            base.$noticeWrap.css('overflow', 'hidden');
            base.$noticeWrap.css('margin', '0 0 0 0');
            base.$noticeWrap.css('padding', '0 0 0 0');
            base.$noticeWrap.css('min-width', '100%');
            base.$noticeWrap.css('width', '100%');
            base.$noticeWrap.css('max-width', '100%');
            base.$noticeWrap.css('min-height', 0);
            base.$noticeWrap.css('height', '65px');
            base.$noticeWrap.css('line-height', '65px');
            base.$noticeWrap.css('max-height', 'none');
            base.$noticeWrap.css('background-color', '#f2f2f2');
            base.$noticeWrap.css('border', '1px solid #f2f2f2');
            base.$noticeWrap.css('text-align', 'center');
            base.$noticeWrap.toggleClass('gg-grid-notice-wrapper', true);
            base.$root.append(base.$noticeWrap);
        }

        function init(options) {
            if ($.isPlainObject(options)) {
                if (options.hasOwnProperty('left') && options.hasOwnProperty('right')) {
                    var opts = $.extend(true, {}, defaults);
                    base.options = $.extend(true, opts, options);

                    base.$root.empty();
                    base.$root.css('position', 'relative');
                    base.$root.css('z-index', 0);
                    base.$root.css('box-sizing', 'border-box');
                    base.$root.css('overflow', 'hidden');
                    base.$root.css('margin', '0 0 0 0');
                    base.$root.css('padding', '0 0 0 0');
                    base.$root.css('min-width', '100%');
                    base.$root.css('width', '100%');
                    base.$root.css('max-width', '100%');
                    base.$root.css('min-height', '100%');
                    base.$root.css('height', '100%');
                    base.$root.css('max-height', '100%');
                    base.$root.css('white-space', 'nowrap');
                    base.$root.css('word-break', 'keep-all');
                    base.$root.toggleClass('gg-pin-grid', true);

                    initLeft();
                    initRight();
                    initNotice();
                    resize();
                }
            }
        }

        function GG($elem, options) {
            base = this;
            base.$wrap = $elem;
            base.$root = $('<div></div>').appendTo($elem);
            base.options = defaults;

            base.$root.on('winRefresh', function (e) {
                if (base.options.autoResize === true) {
                    resize();
                }
                e.stopPropagation();
            });

            init(options);
        }

        GG.prototype = {
            init: function (options) {
                init(options);
                return base.$wrap;
            },

            resize: function (callback) {
                resize(callback);
            },

            clear: function (noResize) {
                base.$right.ggGrid('clear', true);
                base.$left.ggGrid('clear', true);
                base.$root.toggleClass('gg-grid-notice-state', false);
                base.$noticeWrap.css('display', 'none');
                if (noResize !== true) {
                    resize();
                }
            },

            empty: function (noResize) {
                base.$right.ggGrid('empty', true);
                base.$left.ggGrid('empty', true);
                base.$root.toggleClass('gg-grid-notice-state', false);
                base.$noticeWrap.css('display', 'none');
                if (noResize !== true) {
                    resize();
                }
            },

            notice: function (content) {
                if ($.isPlainObject(content)) {
                    if (typeof (content.cssClass) === 'string') {
                        base.$noticeWrap.removeClass();
                        base.$noticeWrap.toggleClass('gg-grid-notice-wrapper', true);
                        base.$noticeWrap.toggleClass(content.cssClass, true);
                    }
                    if (typeof (content.addClass) === 'string') {
                        base.$noticeWrap.toggleClass(content.addClass, true);
                    }
                    if (typeof (content.removeClass) === 'string') {
                        base.$noticeWrap.toggleClass(content.removeClass, false);
                    }
                    if (typeof (content.toggleClass) === 'string') {
                        base.$noticeWrap.toggleClass(content.toggleClass);
                    }
                    if (content.content != null) {
                        base.$noticeWrap.empty();
                        base.$noticeWrap.append(content.content);
                    }
                } else if (content != null) {
                    base.$noticeWrap.empty();
                    base.$noticeWrap.append(content);
                }
                base.$noticeWrap.children().toggleClass('gg-grid-notice', true);
                base.$leftBodyWrap.css('display', 'none');
                base.$rightBodyWrap.css('display', 'none');
                base.$noticeWrap.css('display', '');
                base.$root.toggleClass('gg-grid-notice-state', true);
            },

            loading: function (content) {
                if ($.isPlainObject(content)) {
                    if (typeof (content.addClass) === 'string') {
                        base.$root.toggleClass(content.addClass, true);
                    }
                    if (typeof (content.removeClass) === 'string') {
                        base.$root.toggleClass(content.removeClass, false);
                    }
                    if (typeof (content.toggleClass) === 'string') {
                        base.$root.toggleClass(content.toggleClass);
                    }
                } else if (typeof (content) === 'string') {
                    base.$root.toggleClass(content);
                }
            },

            valid: function (params) {
                base.$root.toggleClass('gg-grid-notice-state', false);
                base.$noticeWrap.css('display', 'none');
                base.$rightBodyWrap.css('display', '');
                base.$leftBodyWrap.css('display', '');
                if ($.isPlainObject(params)) {
                    if (typeof (params.cssClass) === 'string') {
                        base.$noticeWrap.removeClass();
                        base.$noticeWrap.toggleClass('gg-grid-notice-wrapper', true);
                        base.$noticeWrap.toggleClass(params.cssClass, true);
                    }
                    if (typeof (params.addClass) === 'string') {
                        base.$noticeWrap.toggleClass(params.addClass, true);
                    }
                    if (typeof (params.removeClass) === 'string') {
                        base.$noticeWrap.toggleClass(params.removeClass, false);
                    }
                    if (typeof (params.toggleClass) === 'string') {
                        base.$noticeWrap.toggleClass(params.toggleClass);
                    }
                }
            },

            prepend: function (left, right, noResize) {
                var leftTr = base.$left.ggGrid('prepend', left, true);
                var rightTr = base.$right.ggGrid('prepend', right, true);
                if (noResize !== true) {
                    resize();
                }
                return { left: leftTr, right: rightTr };
            },

            append: function (left, right, noResize) {
                var leftTr = base.$left.ggGrid('append', left, true);
                var rightTr = base.$right.ggGrid('append', right, true);
                if (noResize !== true) {
                    resize();
                }
                return { left: leftTr, right: rightTr };
            },

            update: function (left, right, noResize) {
                base.$left.ggGrid('update', left.colBuilder, left.col, left.row, left.rowBuilder, true);
                base.$right.ggGrid('update', right.colBuilder, right.col, right.row, right.rowBuilder, true);
                if (noResize !== true) {
                    resize();
                }
            },

            insert: function (row, left, right, noResize) {
                var leftTr = base.$left.ggGrid('insert', row, left, true);
                var rightTr = base.$right.ggGrid('insert', row, right, true);
                if (noResize !== true) {
                    resize();
                }
                return { left: leftTr, right: rightTr };
            },

            remove: function (row) {
                var leftTr = base.$left.ggGrid('remove', row);
                var rightTr = base.$right.ggGrid('remove', row);
                return { left: leftTr, right: rightTr };
            },

            pinHead: pinHead,
            unPinHead: unPinHead,

            pinLeft: pinLeft,
            unPinLeft: unPinLeft,

            extWidth: extWidth,
            unExtWidth: unExtWidth
        };

        return new GG($elem, options);
    }

    $.fn.ggPinGrid = function (options) {
        var args = Array.apply(null, arguments);
        //var args = Array.prototype.slice.call(arguments,0);
        var pinGrid = this.data('gg-PinGrid');
        if (pinGrid != null) {
            var ret = null;
            if ($.isPlainObject(args[0])) {
                var func = eval('pinGrid.init');
                ret = func.apply(pinGrid, args);
            } else if (typeof (args[0]) === 'string') {
                var func = eval('pinGrid.' + $.trim(args[0]));
                if (typeof (func) === 'function') {
                    ret = func.apply(pinGrid, args.slice(1));
                }
            }
            this.data('gg-PinGrid', pinGrid);
            return ret;
        } else if ($.isPlainObject(args[0])) {
            pinGrid = PinGrid(this, args[0]);
            this.data('gg-PinGrid', pinGrid);
            return this;
        }
    };
});
