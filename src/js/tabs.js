import jQuery from "jquery";
import "./select";

(function($) {
    'use strict';

    /**
     * Табы
     */
    $.fn.tabs = function () {
        var $self = $(this);

        var $tabHeaders = $self.find('.js-tab-header').filter(function (index, el) {
            return $(el).parentsUntil($self).length === 1;
        });
        var $tabContent = $self.find('.js-tab-content').filter(function (index, el) {
            return $(el).parentsUntil($self).length === 1;
        });

        /**
         * Активация таба по его индексу
         * @param {Number} index - индекс таба, который нужно активировать
         */
        var currentTabIndex = 0;
        var selectTab = function (index) {
            currentTabIndex = index;
            $tabHeaders.removeClass('active').eq(index).addClass('active');
            $tabContent.removeClass('active').eq(index).addClass('active');
        };

        /**
         * Удаление обработчик клика по заголовку таба
         */
        var destroyHandlers = function() {
            $tabHeaders.off('click', onTabClick);
        }
        /**
         * Добавление обработчик клика по заголовку таба
         */
        var restoreHandlers = function() {
            $tabHeaders.on('click', onTabClick);
        }

        /**
         * @returns {string}
         */
        var getSelectedTabTitle = function() { return $tabHeaders.eq(currentTabIndex).text() };

        /**
         * Инициализаиця
         */
        var init = function () {
            selectTab(currentTabIndex);
            restoreHandlers();
        };

        /**
         * Обработчик клика по заголовку таба
         */
        var onTabClick = function () {
            if (currentTabIndex === $(this).index()) { return; }
            selectTab($(this).index());
        }

        init();

        /**
         * Активирует таб и возвращает его заголовок.
         * @callback tabCallback
         * @param {number} index
         * @returns {string}
         */
        this.selectTab = function(index) {
            selectTab(index);
            return getSelectedTabTitle();
        };
        // получить заголовок выбранного таба
        this.getSelectedTabTitle = getSelectedTabTitle;
        // Удаляет обработчики
        this.destroyHandlers = destroyHandlers;
        // Устанавливает обработчики
        this.restoreHandlers = restoreHandlers;

        return this;
    };

    // Инициализируем табы на всех блоках с классом 'js-tabs'
    $('.js-tabs').each(function () {
        var MOBILE_WIDTH = 768;
        var tabs;
        var select;
        var $self = $(this);

        var initSelect = function() {
            select = $self.data().select;
            select.init(tabs.getSelectedTabTitle());
            tabs.destroyHandlers();
        }
        var destroySelect = function() {
            select.destroy();
            select = null;
            tabs.restoreHandlers();
        }

        var setView = function() {
            if ($(window).width() < MOBILE_WIDTH && !select) {
                initSelect();
            } else if ($(window).width() > MOBILE_WIDTH && select) {
                destroySelect();
            }
        }

        $(this).data('tabs', $(this).tabs());
        tabs = $(this).data().tabs;

        $(this).data('select', $(this).selectBox(tabs.selectTab));

        setView();
        $(window).on('resize', function() {
            setView();
        })
    });

})(jQuery);
