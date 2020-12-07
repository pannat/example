import jQuery from "jquery";

(function($) {
    'use strict';

    /**
     * Перемещение
     */
    $.fn.movable = function() {
        var $self = $(this);
        var $parent = $self.parent();
        var init = function() {
            // Обработчик перемещения
            var onMouseMove = function (evt) {
                var parentRect = $parent.get(0).getBoundingClientRect();
                var rect = $self.get(0).getBoundingClientRect();

                if (evt.pageX < parentRect.left || evt.pageX > parentRect.right
                || evt.pageY < parentRect.top || evt.pageY > parentRect.bottom) { return; }

                var shiftX = evt.clientX - parentRect.left;
                var shiftY = evt.clientY - parentRect.top;
                var ratioX = shiftX / parentRect.width;
                var ratioY = shiftY / parentRect.height;

                var translateX = rect.width * ratioX - parentRect.width;
                translateX = translateX < 0 ? 0 : translateX;
                var translateY = rect.height * ratioY - parentRect.height;
                translateY = translateY < 0 ? 0 : translateY;

                $self.css({
                    'transform': 'translate(' + -translateX + 'px, ' + -translateY + 'px)'
                });
            }

            $(document).on('mousemove', onMouseMove)
        }

        init();

        this.destroy = function() {
            $(document).off('mousemove', onMouseMove)
        }

        return this;
    }

    $('.js-movable').each(function () {
        $(this).data('movable', $(this).movable());
    })
})(jQuery);
