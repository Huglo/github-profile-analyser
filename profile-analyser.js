/* this is a quick and dirty Github controller to be considered as "fast protyping" */
function GithubCtrl($scope, $http) {
    $scope.search = function() {
        $scope.profile = '';
        $scope.repos = [];
        $scope.profileLanguages = {}
        $scope.preferredLanguage = ''
        $scope.error = ''
        if(!$scope.searchedProfile) {
            $scope.error = 'No user to look for. Please enter a profile name.';
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
            })
            .error(function (err) {
                $scope.error = err.message;
            });
    }
}