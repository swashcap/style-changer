/* global angular */

'use strict';

angular.module('styleChangerApp', []);

angular.module('styleChangerApp')
    .controller('FormCtrl', function ($scope, Settings) {
        /**
         * Set current user settings. In a real-world app, this would
         * rely on a service to pull in the user's settings from the
         * server.
         */
        $scope.currentTheme = 'default';
        $scope.currentTextSize = 2;
        $scope.currentWidth = 2;
        $scope.currentLineSpacing = 3;

        /**
         * All available themes should be retrieved form the server
         * via a service/factory/whatever. These could even be hard-
         * coded if themes don't often change.
         */
        $scope.themes = [{
            slug: 'default',
            name: 'Default'
        }, {
            slug: 'classic',
            name: 'Traditional'
        }, {
            slug: 'dark',
            name: 'Dark'
        }];

        $scope.setTheme = function (newTheme) {
            $scope.currentTheme = newTheme;

            Settings.theme(newTheme);
        };

        $scope.$watch('currentTextSize', function (newTextSize) {
            Settings.textSize(newTextSize);
        });
        $scope.$watch('currentWidth', function (newWidth) {
            Settings.width(newWidth);
        });
        $scope.$watch('currentLineSpacing', function(newLineSpacing) {
            Settings.lineSpacing(newLineSpacing);
        });

        // Initialize the theme
        Settings.theme($scope.currentTheme);
    });

angular.module('styleChangerApp')
    .factory('Settings', function () {
        var THEME_CLASS_PREFIX = 'is-theme-';
        var TEXT_SIZE_CLASS_PREFIX = 'is-text-size-';
        var WIDTH_CLASS_PREFIX = 'is-width-';
        var LINE_SPACING_CLASS_PREFIX = 'is-line-spacing-';
        var themeClassPattern = new RegExp(THEME_CLASS_PREFIX + '\\w+', 'g');
        var textSizeClassPattern = new RegExp(TEXT_SIZE_CLASS_PREFIX + '\\w+', 'g');
        var widthClassPattern = new RegExp(WIDTH_CLASS_PREFIX + '\\d', 'g');
        var lineSpacingClassPattern = new RegExp(LINE_SPACING_CLASS_PREFIX + '\\d', 'g');

        var $body = angular.element('body');

        return {
            theme: function (theme) {
                /**
                 * Use a function to replace the class name.
                 *
                 * @link {http://stackoverflow.com/a/5182103}
                 */
                $body.removeClass(function (index, className) {
                    return (className.match(themeClassPattern) || []).join(' ');
                });
                $body.addClass(THEME_CLASS_PREFIX + theme);
            },
            textSize: function (textSize) {
                $body.removeClass(function (index, className) {
                    return (className.match(textSizeClassPattern) || []).join(' ');
                });
                $body.addClass(TEXT_SIZE_CLASS_PREFIX + textSize);
            },
            width: function (width) {
                $body.removeClass(function (index, className) {
                    return (className.match(widthClassPattern) || []).join(' ');
                });
                $body.addClass(WIDTH_CLASS_PREFIX + width);
            },
            lineSpacing: function (lineSpacing) {
                $body.removeClass(function (index, className) {
                    return (className.match(lineSpacingClassPattern) || []).join(' ');
                });
                $body.addClass(LINE_SPACING_CLASS_PREFIX + lineSpacing);
            }
        };
    });
