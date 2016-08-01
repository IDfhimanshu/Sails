'use strict';

app.controller('plantripCtrl',function($scope,$http,$location,tripFactory) {

        $scope.init = function() {
        $scope.privacy_options  = {
            1 : "Friends",
            2 : "Friends Of Friends",
            3 : "Only Me"
        };
        $scope.months = [
            {'id' : 1,'month' : "Jan"},
            {'id' : 2,'month' : "Feb"},
            {'id':  3,'month' : "Mar"},
            {'id' : 4,'month' : "Apr"},
            {'id' : 5,'month' : "May"},
            {'id' : 6,'month' : "Jun"},
            {'id' : 7,'month' : "Jul"},
            {'id' : 8,'month' : "Aug"},
            {'id' : 9,'month' : "Sept"},
            {'id' : 10,'month' : "Oct"},
            {'id' : 11,'month' : "Nov"},
            {'id' : 12,'month' : "Dec"},
        ];

        $scope.trip = {};
        };

        $scope.UploadFiles = function() {

        };

        $scope.createPersonalTrip = function() {
            $scope.data = {
                '_csrf': document.getElementById("_csrfid").value,
                "date_added" : $scope.trip.year+"-"+$scope.trip.months+"-"+$scope.trip.day,
                "duration" : $scope.trip.duration,
                "type" : $scope.trip.type,
                "description" : $scope.trip.description,
                "place" : $scope.trip.place,
                "privacy" : 1
            };

            tripFactory.createPersonalTrip($scope.data).then(function onSuccess(response) {
                console.log(response);
            }).catch (function onError(sailsresponse) {
                console.log(sailsresponse);
            }).finally (function eitherWay() {
                console.log();
            });
        };

        $scope.filterValue = function($event){
            var keyEsc = $event.which ? $event.which : ($event.keyCode ? $event.keyCode : ($event.charCode ? $event.charCode : undefined));

            if ((keyEsc >= 48 && keyEsc<= 57) || keyEsc == 8) {

            }else {

                $event.preventDefault();
            }

        };
});