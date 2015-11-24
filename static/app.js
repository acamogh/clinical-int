//Define an angular module for our app
var sampleApp = angular.module('sampleApp', []);


sampleApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/call_queue', {
            templateUrl: 'static/templates/call_queue.html',
            controller: 'call_queue_ctrl'
        }).
        when('/email_queue', {
            templateUrl: 'static/templates/email_queue.html',
            controller: 'email_queue_ctrl'
        }).
        when('/Follow-up', {
            templateUrl: 'static/templates/Follow-up.html',
            controller: 'Follow_up_ctrl'
        }).
        when('/Draggable', {
            templateUrl: 'static/templates/Draggable.html',
            controller: 'Draggable_ctrl'
        }).
        when('/intro', {
            templateUrl: 'static/templates/Introduction.html',
            controller: 'Draggable_ctrl'
        }).
        when('/about/:person', {
            templateUrl: 'static/templates/person_details.html',
            controller: 'person_details_ctrl'
        }).
        otherwise({
            redirectTo: '/intro'
        });
    }
]);

sampleApp.directive('navCollapse', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var visible = false;

            element.on('show.bs.collapse', function () {
                visible = true;
            });

            element.on("hide.bs.collapse", function () {
                visible = false;
            });

            element.on('click', function (event) {
                if (visible && 'auto' == element.css('overflow-y') && $(event.target).attr('data-toggle')!="dropdown") {
                    element.collapse('hide');
                }
            });
        }
    };
});

sampleApp.directive('draggable', function($document) {
    return function(scope, element, attr) {
        var startX = 0,
            startY = 0,
            x = 0,
            y = 0;
        element.css({
            position: 'relative',
            border: '1px solid red',
            backgroundColor: '#eee',
            cursor: 'move',
            display: 'block',
            color: 'black',
            width: '150px',
            height: '50px',
            margin: '1%'

        });

        element.on('mousedown', function(event) {
            // Prevent default dragging of selected content

            startX = event.screenX - x;
            startY = event.screenY - y;
            $document.on('mousemove', mousemove);
            $document.on('mouseup', mouseup);
        });

        function mousemove(event) {
            y = event.screenY - startY;
            x = event.screenX - startX;
            element.css({
                top: y + 'px',
                left: x + 'px'
            });
        }

        function mouseup() {
            $document.off('mousemove', mousemove);
            $document.off('mouseup', mouseup);
        }
    };
});



// sampleApp.factory('myData', ['$http', function($http) {
//   return {
//     get: function() {
//       return $http.get('call_queue.json').then(function(response) {
//         return response.data;
//       });
//     }
//   };
// }]);


sampleApp.controller('call_queue_ctrl', function($scope, $http) {
    $scope.message = 'Call Queue';
    $http.get('call_queue.json')
        .success(function(response) {
            $scope.rows = response
                // console.log($scope.rows[0].name)
            $scope.setName = function(name) {
                $scope.selectedName = name;
                for (i = 0; i < $scope.rows.length; i++) {
                    if ($scope.rows[i].name == $scope.selectedName) {
                        $scope.selected_problem = $scope.rows[i].details.problems
                        $scope.selected_treatment = $scope.rows[i].details.solution
                        console.log($scope.selected_problem)
                        console.log($scope.selected_treatment)
                    }
                }


            }

        });


});



sampleApp.controller('email_queue_ctrl', function($scope, $http) {
    $scope.message = 'Call Queue';
    $http.get('email_queue.json')
        .success(function(response) {
            $scope.rows = response
                // console.log($scope.rows[0].name)
            $scope.setName = function(name) {
                $scope.selectedName = name;
                for (i = 0; i < $scope.rows.length; i++) {
                    if ($scope.rows[i].name == $scope.selectedName) {
                        $scope.selected_problem = $scope.rows[i].details.problems
                        $scope.selected_treatment = $scope.rows[i].details.solution
                        console.log($scope.selected_problem)
                        console.log($scope.selected_treatment)
                    }
                }


            }

        });


});



sampleApp.controller('Follow_up_ctrl', function($scope, $http) {
    $scope.message = 'Follow-up';
    $scope.submit = function() {
        console.log($scope.follow_up)
        $http.post("/json", $scope.follow_up)
            .success(function(submitJson, status) {

            })
            .error(function(err) {
                $scope.errormsg = 'unable to set followup. please try again later'
            })
    }

});


// sampleApp.controller('person_details_ctrl', function($scope, $routeParams, $http, myData) {
//     $scope.message = 'person details';
//     $scope.person = $routeParams.person;  
//     $scope.check ={}
//         myData.get().then (function (data) {
//             $scope.rows = data;//this is fine           
//             for (i = 0; i < data.length; i++) {
//               if (data[i].name == $scope.person) {             
//                     $scope.check = data[i].details
//                   }
//             }console.log( $scope.check)          
//           }) 
// });



sampleApp.controller('Draggable_ctrl', function($scope) {



});