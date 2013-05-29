/*
* jQuery UI Datepicker 1.8.16
* Taiwan's Minguo calendar extender
* This extender modified the year to Taiwan's Minguo calendar
* Extended by Eddie Chen
*/

//dpuuid = new Date().getTime();
(function ($) {

    dpuuid = new Date().getTime();

    $.extend($.datepicker, {
        /* Parse existing date and initialise date picker. */

        _setDateFromField: function (inst, noDefault) {
            if (inst.input.val() == inst.lastVal) {
                return;
            }
            var dateFormat = this._get(inst, 'dateFormat');
            var dates = inst.lastVal = inst.input ? inst.input.val() : null;
            var date, defaultDate;
            date = defaultDate = this._getDefaultDate(inst);
            var settings = this._getFormatConfig(inst);
            try {
                //date = this.parseDate(dateFormat, dates, settings) || defaultDate;
                if (dates.couny > 0) {
                    var dateArr = dates.split("/");
                    var year = parseInt(dateArr[0], 10) + 1911;
                    var month = parseInt(dateArr[1], 10);
                    var day = parseInt(dateArr[2], 10);
                    date = new Date(year, month, day);
                }

            } catch (event) {
                this.log(event);
                dates = (noDefault ? '' : dates);
            }
            inst.selectedDay = date.getDate();
            inst.drawMonth = inst.selectedMonth = date.getMonth();
            inst.drawYear = date.getFullYear();
            inst.selectedYear = date.getFullYear();
            inst.currentDay = (dates ? date.getDate() : 0);
            inst.currentMonth = (dates ? date.getMonth() : 0);
            inst.currentYear = (dates ? date.getFullYear() : 0);
            this._adjustInstDate(inst);
        },

        _daylightSavingAdjust: function (date) {
            if (!date) return null;
            date.setHours(date.getHours() > 12 ? date.getHours() + 2 : 0);
            if (!date) return null;
            if ((date.getFullYear() - 1911) > 0)
                date.getFullYear((date.getFullYear() - 1911));
            else
                date.getFullYear((date.getFullYear()));
            return date;

        },

        _taiwanDateAdjust: function (date) {
            if (!date) return null;
            if ((date.getFullYear() - 1911) > 0)
                date.setFullYear((date.getFullYear() - 1911), date.getMonth(), date.getDay());
            else
                date.setFullYear((date.getFullYear()), date.getMonth(), date.getDay());
            return date;

        },

        /* Generate the month and year header. */

        _generateMonthYearHeader: function (inst, drawMonth, drawYear, minDate, maxDate,
    secondary, monthNames, monthNamesShort) {
            var changeMonth = this._get(inst, 'changeMonth');
            var changeYear = this._get(inst, 'changeYear');
            var showMonthAfterYear = this._get(inst, 'showMonthAfterYear');
            var html = '<div class="ui-datepicker-title">';
            var monthHtml = '';

            // month selection

            if (secondary || !changeMonth)
                monthHtml += '<span class="ui-datepicker-month">' + monthNames[drawMonth] + '</span>';
            else {
                var inMinYear = (minDate && minDate.getFullYear() == drawYear);
                var inMaxYear = (maxDate && maxDate.getFullYear() == drawYear);
                monthHtml += '<select class="ui-datepicker-month" ' +
    'onchange="DP_jQuery_' + dpuuid + '.datepicker._selectMonthYear(\'#' + inst.id + '\', this, \'M\');" ' +
    '>';

                for (var month = 0; month < 12; month++) {

                    if ((!inMinYear || month >= minDate.getMonth()) &&

    (!inMaxYear || month <= maxDate.getMonth()))

                        monthHtml += '<option value="' + month + '"' +

    (month == drawMonth ? ' selected="selected"' : '') +

    '>' + monthNamesShort[month] + '</option>';

                }

                monthHtml += '</select>';

            }

            if (!showMonthAfterYear)

                html += monthHtml + (secondary || !(changeMonth && changeYear) ? '&#xa0;' : '');

            // year selection

            if (!inst.yearshtml) {

                inst.yearshtml = '';

                if (secondary || !changeYear)

                    if ((drawYear - 1911) > 0)

                        html += '<span class="ui-datepicker-year">' + (drawYear - 1911) + '</span>';

                    else

                        html += '<span class="ui-datepicker-year">' + drawYear + '</span>';

                else {

                    // determine range of years to display

                    var years = this._get(inst, 'yearRange').split(':');

                    var thisYear = new Date().getFullYear();

                    var determineYear = function (value) {

                        var year = (value.match(/c[+-].*/) ? drawYear + parseInt(value.substring(1), 10) :
    (value.match(/[+-].*/) ? thisYear + parseInt(value, 10) :
    parseInt(value, 10)));
                        return (isNaN(year) ? thisYear : year);
                    };
                    var year = determineYear(years[0]);
                    var endYear = Math.max(year, determineYear(years[1] || ''));
                    year = (minDate ? Math.max(year, minDate.getFullYear()) : year);
                    endYear = (maxDate ? Math.min(endYear, maxDate.getFullYear()) : endYear);
                    inst.yearshtml += '<select class="ui-datepicker-year" ' +
    'onchange="DP_jQuery_' + dpuuid + '.datepicker._selectMonthYear(\'#' + inst.id + '\', this, \'Y\');" ' +
    '>';

                    if ((drawYear - 1911) > 0) {

                        for (; year <= endYear; year++) {

                            inst.yearshtml += '<option value="' + year + '"' +

    (year == drawYear ? ' selected="selected"' : '') +

    '>' + (year - 1911) + '年' + '</option>';

                        }

                    }

                    else {

                        for (; year <= endYear; year++) {

                            inst.yearshtml += '<option value="' + year + '"' +

    (year == drawYear ? ' selected="selected"' : '') +

    '>' + (year) + '</option>';

                        }

                    }

                    inst.yearshtml += '</select>';



                    html += inst.yearshtml;

                    inst.yearshtml = null;

                }

            }

            html += this._get(inst, 'yearSuffix');

            if (showMonthAfterYear)

                html += (secondary || !(changeMonth && changeYear) ? '&#xa0;' : '') + monthHtml;

            html += '</div>'; // Close datepicker_header

            return html;

        },

        _formatDate: function (inst, day, month, year) {
            if (!day) {
                inst.currentDay = inst.selectedDay;
                inst.currentMonth = inst.selectedMonth;
                inst.currentYear = inst.selectedYear;
            }
            var date = (day ? (typeof day == 'object' ? day :
    this._daylightSavingAdjust(new Date(year, month, day))) :
    this._daylightSavingAdjust(new Date(inst.currentYear, inst.currentMonth, inst.currentDay)));
            return (date.getFullYear() - 1911).toString() +
    (date.getMonth() < 9 ? "0" + (parseInt(date.getMonth(), 10) + 1) : (parseInt(date.getMonth(), 10) + 1)).toString() +
    (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()).toString();
            }
//        },

//        _selectDay: function (id, month, year, td) {
//            var target = $(id);
//            if ($(td).hasClass(this._unselectableClass) || this._isDisabledDatepicker(target[0])) {
//                return;
//            }
//            var inst = this._getInst(target[0]);

//            //alert(inst.currentDay + "__" + inst.currentMonth + "__" + inst.currentYear);

//            inst.selectedDay = inst.currentDay = $('a', td).html();
//            inst.selectedMonth = inst.currentMonth = month;
//            inst.selectedYear = inst.currentYear = year;
//            this._selectDate(id, this._formatDate(inst,
//        			inst.currentDay, inst.currentMonth, inst.currentYear));
//        },

//        /* Update the input field with the selected date. */
//        _selectDate: function (id, dateStr) {
//            var target = $(id);
//            var inst = this._getInst(target[0]);
//            
//            dateStr = (dateStr != null ? dateStr : this._formatDate(inst));
//            if (inst.input)
//                inst.input.val(dateStr);
//            this._updateAlternate(inst);
//            var onSelect = this._get(inst, 'onSelect');
//            document.getElementById("thisone").innerHTML = inst.inline;
//            if (onSelect) {
//                onSelect.apply((inst.input ? inst.input[0] : null), [dateStr, inst]);  // trigger custom callback
//                alert("onSelect");
//            } else if (inst.input) {
//                inst.input.trigger('change');
//                //alert("change");
//            } // fire the change event
//            if (inst.inline) {
//                this._updateDatepicker(inst);
//                //alert("inline");
//            } else {
//                this._hideDatepicker();
//                this._lastInput = inst.input[0];
//                if (typeof (inst.input[0]) != 'object')
//                    inst.input.focus(); // restore focus
//                this._lastInput = null;
//                //alert("uninline");
//            }
//        }
    });

    $.datepicker.regional['zh-TW'] = {
        clearText: '清除', clearStatus: '清除已選日期',
        closeText: '關閉', closeStatus: '不改變目前的選擇',
        prevText: '&#x3c;上月', prevStatus: '顯示上月',
        prevBigText: '&#x3c;&#x3c;', prevBigStatus: '顯示上一年',
        nextText: '下月&#x3e;', nextStatus: '顯示下月',
        nextBigText: '&#x3e;&#x3e;', nextBigStatus: '顯示下一年',
        currentText: '今天', currentStatus: '顯示本月',
        monthNames: ['1月', '2月', '3月', '4月', '5月', '6月',
	'7月', '8月', '9月', '10月', '11月', '12月'],
        monthNamesShort: ['1月', '2月', '3月', '4月', '5月', '6月',
	'7月', '8月', '9月', '10月', '11月', '12月'],
        monthStatus: '選擇月份', yearStatus: '選擇年份',
        weekHeader: '周', weekStatus: '年內周次',
        dayNames: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
        dayNamesShort: ['日', '一', '二', '三', '四', '五', '六'],
        dayNamesMin: ['日', '一', '二', '三', '四', '五', '六'],
        dayStatus: '設定 DD 為一周起始', dateStatus: '選擇 m月 d日, DD',
        dateFormat: 'yy-mm-dd', firstDay: 1,
        initStatus: '請選擇日期', isRTL: false,
        showMonthAfterYear: true, yearSuffix: ''
    };
    $.datepicker.setDefaults($.datepicker.regional['zh-TW']);


    window['DP_jQuery_' + dpuuid] = $;

})(jQuery);