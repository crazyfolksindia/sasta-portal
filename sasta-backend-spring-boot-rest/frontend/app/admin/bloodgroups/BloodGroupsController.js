app.controller('BloodGroupsController',['$http','$window','$scope','$rootScope','notify','$location','$state','storage','bloodgroupfactory','exDialog',
	function($http,$window,$scope,$rootScope,notify,$location,$state,storage,bloodgroupfactory,exDialog){

		$scope.crudServiceBaseUrl = $rootScope.appConfig.baseUrl;
		
	    //Action of clicking product name link.
	    $scope.callType = {};
	    $scope.modelDialogTitle = {
	    	add : "Add Blood Group",
	    	edit : "Edit Blood Group"
	    };

	    $scope.AddDialog = function (id) {
	        $scope.callType.id = id;
	        exDialog.openPrime({
	            scope: $scope,
	            template: 'admin/bloodgroups/add.html',
	            controller: 'BloodGroupsController',
	            width: '600px',
	            animation: true,
	            grayBackground: true            
	        });
	    };

	    $scope.bloodgroups = 	{
	      "id": 0,
	      "name": "",
	      "description": "",
	      "status": true,
	      "modifiedBy": $rootScope.sessionConfig.userId,
	      "createdBy": $rootScope.sessionConfig.userId,
	      "modifiedDate": null,
	      "createdDate": null,
	      "createdByName": null,
	      "modifiedByName": null,
	      "bloodGroupId": null
	    };

	    $scope.Submit = function(){
	    	var responseText = bloodgroupfactory.doSubmitData($scope.bloodgroups);
			responseText.success(function(result){
				if(result.status){
					// scope.grid is the widget reference
  					$scope.grid.dataSource.read();
					$scope.$emit("ShowSuccess",result.data);
		  		}else{
		  			$scope.$emit("ShowError","Unable to add bank!");
		  		}
			}).error(function(error,status){
				$scope.$emit("ShowError","Unable to add bank!");
			});	    	
	    }

	    $scope.Update = function(){
	    	var responseText = bloodgroupfactory.doUpdateData($scope.editbloodgroups);
			responseText.success(function(result){
				if(result.status){
					// scope.grid is the widget reference
  					$scope.grid.dataSource.read();
					$scope.$emit("ShowSuccess",result.data);
		  		}else{
		  			$scope.$emit("ShowError","Unable to update bank!");
		  		}
			}).error(function(error,status){
				$scope.$emit("ShowError","Unable to update bank!");
			});	    	
	    }

	    $scope.EditData = function(data){
	    	$scope.editbloodgroups = {
	    		bloodGroupId : data.bloodGroupId,
				createdBy : $rootScope.sessionConfig.userId,
				description: data.description || '',
				modifiedBy : $rootScope.sessionConfig.userId,
				name : data.name,
				status: true
	    	};
	    	$scope.callType.id = 1;
	        exDialog.openPrime({
	            scope: $scope,
	            template: 'admin/bloodgroups/edit.html',
	            controller: 'BloodGroupsController',
	            width: '600px',
	            animation: true,
	            grayBackground: true            
	        });
	    }

	    $scope.Cancel = function() {
	      $scope.closeThisDialog("close");
	    }

	    $scope.gridOptions = {
	        columns: [ 
		        		{ field: "bloodGroupId", title:'Blood Group Id', hidden: true, editable : false },
		        		{ field: "name", title:'Name'  },
		        		{ field: "description", title:'Description'  },
		        		{ field: "createdByName", title:'Created By'  },
		        		{ field: "modifiedByName", title:'Modified By'  },
		        		{ field: "createdBy", title : "Created By", hidden : true },
		        		{ field: "modifiedBy", title : "Modified By", hidden : true },
		        		{ field: "createdDate", title : "Created Date", editable : false, template: "#= kendo.toString(kendo.parseDate(new Date(createdDate), 'yyyy-MM-dd'), 'MM/dd/yyyy') #" },
		        		{ field: "modifiedDate", title : "Modified Date", editable : false, template: "#= kendo.toString(kendo.parseDate(new Date(modifiedDate), 'yyyy-MM-dd'), 'MM/dd/yyyy') #" },
		        		{ title : "", template: "<button type=\"button\" class=\"btn btn-success btn-sm\" ng-click=\"EditData(dataItem);\">Edit</button>&nbsp;<button type=\"button\" class=\"btn btn-danger btn-sm\" ng-click=\"Delet(dataItem);\">Delete</button>" }
		        	],
	        pageable: true,
	        filterable :true,
	        groupable : true,
	        dataSource: {
	            pageSize: 5,
	            transport: {
	                read: function (e) {
	                  $http({
				         method: 'GET',
				         url: $scope.crudServiceBaseUrl + '/bloodgroup/getlist'
				      }).
	                  success(function(data, status, headers, config) {
	                  	if(data.status)
	                      e.success(data.data)
	                  }).
	                  error(function(data, status, headers, config) {
	                  });
	              }
	           }
	        }
	    }
}]);		


app.factory('bloodgroupfactory',function($http,$q,$rootScope){

	var service = {};
	var crudServiceBaseUrl = $rootScope.appConfig.baseUrl;

	service.doSubmitData = function(model){
		return $http({
            method : 'POST',
            url : crudServiceBaseUrl + '/bloodgroup/create',
            params : model,
		    headers: {
		        "Content-Type": "application/json"
		    }
        });
	}

	service.doUpdateData = function(model){
		return $http({
            method : 'POST',
            url : crudServiceBaseUrl + '/bloodgroup/update',
            params : model,
		    headers: {
		        "Content-Type": "application/json"
		    }
        });
	}	

	return service;

});