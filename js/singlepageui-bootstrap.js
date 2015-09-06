// create our angular app and inject ui.bootstrap
angular.module('app', ['ui.bootstrap', 'ngRoute', 'duScroll'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/:elementid', {
            template: ' ',
            controller: ['$scope','$routeParams', '$document', function($scope, $routeParams, $document) {
                var someElement = angular.element(document.getElementById($routeParams.elementid));
                var nOffset = 60;
                if($scope.$parent.bAboveMenu){
                    nOffset = 140;
                }
                if($scope.$parent.navCollapsed == false){
                    nOffset = 270;
                }
                $document.scrollToElement(someElement, nOffset, 500);
                $scope.$parent.navCollapsed = true;
            }]
        });
    }])

    .controller('mainController', function($scope, $document) {
    $scope.myInterval = 5000;
    $scope.noWrapSlides = false;
    var slides = $scope.slides = [];
    $scope.addSlide = function() {
        var newWidth = 600 + slides.length + 1;
        slides.push({
            image: '//placekitten.com/' + newWidth + '/300',
            text: ['More','Extra','Lots of','Surplus'][slides.length % 4] + ' ' +
            ['Cats', 'Kittys', 'Felines', 'Cutes'][slides.length % 4]
        });
    };
    for (var i=0; i<10; i++) {
        $scope.addSlide();
    }
    $scope.bAboveMenu = true;
    $scope.navClass = "navbar-static-top";
    window.onscroll = function() {
        // we use the window.onscroll here because to do it in Angular is too slow.
        var el = document.body.firstElementChild;
        var navTop = el.getBoundingClientRect().bottom;
        if(navTop < 0){
            if($scope.bAboveMenu){
                $scope.bAboveMenu = false;
                $scope.navClass = 'navbar-fixed-top';
                $scope.$apply();
            }
        }else{
            if(!$scope.bAboveMenu){
                $scope.bAboveMenu = true;
                $scope.navClass = 'navbar-static-top';
                $scope.$apply();
            }
        }

    };



});
