
angular.module('styleChangerApp', []);

angular.module('styleChangerApp')
    .controller('FormCtrl', function ($scope) {
        /**
         * Set current user settings. In a real-world app, this would
         * rely on a service to pull in the user's settings from the
         * server.
         */
        $scope.currentTheme = 'dark';
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
        };

        $scope.$watch('currentWidth', function (newWidth) {
            console.log('width changed:', newWidth);
        });
        $scope.$watch('currentLineSpacing', function(newLineSpacing) {
            console.log('lineSpacing changed:', newLineSpacing);
        });
    });
