Gradebook.controller('CourseShowCtrl', ['$scope', 'course', "StudentService", function($scope, course, StudentService){

  var cols =[];
  var allRows= [];

  $scope.course = course;

  $scope.students = $scope.course.students;

  $scope.assignments = $scope.course.assignments.reverse();


  for (var i = 0; i < $scope.assignments.length; i++){
      cols.push($scope.assignments[i].assignment_type +
       $scope.assignments[i].id + ": " + ($scope.assignments[i].title) 
       + "(" + ($scope.assignments[i].possible_score) +")"  );
  }
  cols.push("Overall")

  var rowData = [];
  for(var j = 0; j < $scope.students.length; j++ ) {
    var rawTotal = 0;
    var possibleTotal = 0;
    rowData.push($scope.students[j].first_name)
    rowData.push($scope.students[j].last_name)
    rowData.push($scope.students[j].email + $scope.students[j].id )
    for(var i = 0; i < $scope.students[j].submissions.length; i++) {
      var rawScore = $scope.students[j].submissions[i].raw_score;
      var possibleScore = $scope.assignments[i].possible_score;
      //Put default value here;
      if(rawScore === -1) {
        
      }
      else {
        rawTotal += rawScore;
        possibleTotal += possibleScore;
      }
      rowData.push(rawScore + " / " + possibleScore);
    }
    rowData.push(Number(rawTotal / possibleTotal * 100).toFixed(2));
    allRows.push(rowData)
    rowData = []
  }
  
  
  $scope.colCount = $scope.assignments.length + 4;
  $scope.rowCount = $scope.students.length;
  
  $scope.incrementCol = function(direction){
    if(direction === "up") {
      $scope.colCount ++;
    }
    else {
      if($scope.colCount > 3) {
        $scope.colCount --;
      } 
    }
  }

  $scope.incrementRow = function(direction){
    if(direction === "up") {
      $scope.rowCount ++;
    }
    else {
      if($scope.rowCount > 0) {
        $scope.rowCount --;
      } 
    }
  }
  
  $scope.cols = cols;
  $scope.allRows = allRows;

}])