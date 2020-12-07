import jQuery from "jquery";

(function($) {
    'use strict';

    /**
     * Перетаскивание
     */
    $.fn.draggable = function() {
        var $self = $(this);

        var init = function() {
            // Обработчик удерживания кнопки мыши
            $self.on('mousedown', function(evt) {
                var rect = $self.get(0).getBoundingClientRect();
                var parentRect = $self.parent().get(0).getBoundingClientRect();
                var shiftX = evt.clientX - rect.left;
                var shiftY = evt.clientY - rect.top;

                $self.css({ 'position': 'absolute', 'z-index': '9', 'transition': ''});

                // Обработчик перемещения
                var onMouseMove = function (evt) {
                    $self.css('left', evt.pageX - parentRect.left - shiftX + 'px');
                    $self.css('top', evt.pageY - parentRect.top - shiftY + 'px');

                    if (evt.pageX < parentRect.left || evt.pageX > parentRect.right
                        || evt.pageY < parentRect.top || evt.pageY > parentRect.bottom) {
                        onMouseUp();
                    }
                }
                // Обработчик отпускания мыши
                var onMouseUp = function() {
                    if (parseInt($self.css('top'), 10) - 10 < -rect.height ||
                        parseInt($self.css('top'), 10) + 10 > parentRect.height) {
                        $self.css('top', '0px');
                        $self.css('transition', 'top 400ms ease-out');
                    }
                    if (parseInt($self.css('left'), 10) - 10 < -rect.width ||
                        parseInt($self.css('left'), 10) + 10 > parentRect.width) {
                        $self.css('left', '0px');
                        $self.css('transition', 'left 400ms ease-out');
                    }
                    $(document).off('mousemove', onMouseMove);
                    $self.off('mouseup', onMouseUp);
                }

                $(document).on('mousemove', onMouseMove);
                $self.on('dragstart', function() { return false; });
                $self.on('mouseup', onMouseUp);
            })
        }

        init();

        return this;
    }

    $('.js-draggable').each(function () {
        $(this).data('draggable', $(this).draggable());
    })
})(jQuery);
