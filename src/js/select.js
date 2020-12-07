import jQuery from "jquery";

(function($) {
    'use strict';


    /**
     * Выпадающий список
     * @param {tabCallback} callback.
     */
    $.fn.selectBox = function(callback) {
        var $self = $(this);
        var $list = $self.find('.js-select-list');
        var $options = $self.find('.js-select-item').filter(function (index, el) {
            return $(el).parentsUntil($self).length === 1;
        });
        var $selectBoxElement =
            $('<div class="select js-select">' +
                '<p class="select-val-wrap">' +
                '<input type="text" class="select-val js-select-val" value="" readonly>' +
                '<span class="select-arrow"></span>' +
                '</p>' +
                '</div>');

        /**
         * Устанавливаем ярлык выбранной опции
         * @param {string} val - название выбранной опции
         */
        var setSelectVal = function(val) {
            $selectBoxElement.find('input.select-val').val(val);
            $selectBoxElement.removeClass('select-expanded');
            $list.slideUp();
        }

        /**
         * Обработчик клика по опции
         */
        var onOptionClick = function() {
            if ($(this).hasClass('active')) return;

            var optionVal = callback($(this).index());
            setSelectVal(optionVal);
        }

        /**
         * Инициализация
         * @param {string} val - название выбранной опции
         */
        this.init = function (val) {
            setSelectVal(val)
            $list.addClass('select-list');

            $self.prepend($selectBoxElement);
            $selectBoxElement.append($list);

            $options.on('click', onOptionClick);
            $selectBoxElement.find('.select-val-wrap').on('click', function() {
                $selectBoxElement.toggleClass('select-expanded');
                if ($list.css('display') === 'none') {
                    $list.css('display', 'block');
                    $list.slideDown();
                } else {
                    $list.slideUp();
                }
            })
        };

        /**
         * Деактивация
         */
        this.destroy = function() {
            $self.prepend($list);
            $list.css('display', '');
            $selectBoxElement.remove();
            $options.off('click', onOptionClick);
        };

        return this;
    }
})(jQuery)
