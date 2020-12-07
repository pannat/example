import jQuery from "jquery";
import "./src/js/tabs";
import "./src/js/draggable";
import "./src/js/movable";

import "./src/scss/styles.scss";

(function($) {
    'use strict';

    var HEADER_HEIGHT = 160;
    var HEADER_COMPACT_CLASS = 'header--compact';
    var $header = $('header.header');

    $(window).on('scroll', function()  {
        if ($(window).scrollTop() > HEADER_HEIGHT) {
            $header.addClass(HEADER_COMPACT_CLASS);
        } else {
            $header.removeClass(HEADER_COMPACT_CLASS);
        }
    })
})(jQuery)
