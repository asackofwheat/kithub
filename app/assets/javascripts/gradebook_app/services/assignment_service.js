Gradebook.factory('AssignmentService', ['Restangular', function(Restangular){
	var stub = {}

	stub.addAssignment = function(assignment) {
    return Restangular.all("assignments").post(assignment).then(function(createAssignment) {
      return createAssignment;
    })
	}

  stub.editAssignment = function(assignment) {
    Restangular.one("assignments").customPUT(assignment, assignment.id)
  }

  stub.removeAssignment = function(assignment) {
    return Restangular.one("assignments", assignment.id).remove();
  }

	Restangular.extendModel("assignments", function(model) {
    model.edit = function(data) {
      model.patch({assignment: data});
    };
    return model;
  });

	return stub;

}])