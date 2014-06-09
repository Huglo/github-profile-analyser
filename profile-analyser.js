/* this is a quick and dirty Github controller to be considered as "fast protyping" */
function GithubCtrl($scope, $http) {
    $scope.search = function() {
        $scope.profile = '';
        $scope.repos = [];
        $scope.profileLanguages = {}
        $scope.preferredLanguage = ''
        if(!$scope.searchedProfile) {
            return;
        }
        $http.get('https://api.github.com/users/' + $scope.searchedProfile + '/repos')
            .success(function(data) {
                /* in the same function, we count occurences of langauges in all the repos and we compute the most used */
                // count stores the most representative langauge
                var count = 0;
                $scope.profile = $scope.searchedProfile;
                for(var i=0; i<data.length; i++) {
                    $scope.repos[i] = data[i];
                    var lang = $scope.repos[i].language;
                    $scope.profileLanguages[lang] = $scope.profileLanguages[lang] ? $scope.profileLanguages[lang] + 1 : 1;
                    if($scope.profileLanguages[lang] > count) {
                        $scope.preferredLanguage = lang;
                        count = $scope.profileLanguages[lang];
                    } else if($scope.profileLanguages[lang] == count) {
                        $scope.preferredLanguage += ' or ' + lang;
                    }
                }
                if(!$scope.preferredLanguage) {
                    $scope.preferredLanguage = 'undefined';
                }
                $scope.preferredLanguage = $scope.searchedProfile + "'s preferred language is " + $scope.preferredLanguage + ' according to these repos:'; 
            })
            .error(function () {
                /* errors could be better handled. preferredLanguage is not supposed to be used for an error message */
                $scope.preferredLanguage = 'impossible to find the profile: ' + $scope.searchedProfile;
            });
    }
}

