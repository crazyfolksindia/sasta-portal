app.controller('AuditBlocksController',['$http','$window','$scope','$rootScope','notify','$location','$state','storage','blocksfactory','exDialog',
	function($http,$window,$scope,$rootScope,notify,$location,$state,storage,blocksfactory,exDialog){


		$scope.blocksfactory = blocksfactory;
		$scope.blocks = [];
		$scope.crudServiceBaseUrl = $rootScope.appConfig.baseUrl;

	    //Action of clicking product name link.
	    $scope.callType = {};
	    $scope.modelDialogTitle = {
	    	add : "Add Blocks",
	    	edit : "Edit Blocks"
	    };

	    $scope.Districts = [];
	    $scope.defaultDistricts = {
				    "value": 0,
				    "text": "Select"
		};

	    $scope.AddDialog = function (id) {
	        $scope.callType.id = id;
	        exDialog.openPrime({
	            scope: $scope,
	            template: 'admin/blocks/add.html',
	            controller: 'AuditBlocksController',
	            width: '600px',
	            animation: true,
	            grayBackground: true            
	        });
	    };

	    $scope.block = {
	      "modifiedBy": $rootScope.sessionConfig.userId,
	      "createdBy": $rootScope.sessionConfig.userId,
	      "description" : "",
	      "blockName": "",
	      "districtID": null,
	      "blockID": null,
	      "createdDate": null,
	      "modifiedDate": null,
	      "createdByName": "",
	      "modifiedByName": ""
	    };

	    $scope.Submit = function(){
	    	$scope.block.districtID = $scope.defaultDistricts.value;
	    	var responseText = blocksfactory.doSubmitData($scope.block);
			responseText.success(function(result){
				if(result.status){
					// scope.grid is the widget reference
  					$scope.grid.dataSource.read();
					$scope.$emit("ShowSuccess",result.data);
		  		}else{
		  			$scope.$emit("ShowError","Unable to add blocks!");
		  		}
			}).error(function(error,status){
				$scope.$emit("ShowError","Unable to add blocks!");
			});	    	
	    }

	    $scope.Update = function(){
	    	$scope.editblocks.districtID = $scope.editdefaultOptions.value;
	    	var responseText = blocksfactory.doUpdateData($scope.editblocks);
			responseText.success(function(result){
				if(result.status){
					// scope.grid is the widget reference
  					$scope.grid.dataSource.read();
					$scope.$emit("ShowSuccess",result.data);
		  		}else{
		  			$scope.$emit("ShowError","Unable to update blocks!");
		  		}
			}).error(function(error,status){
				$scope.$emit("ShowError","Unable to update blocks!");
			});	    	
	    }

	    $scope.EditData = function(data){
	    	var s = jQuery.map( $scope.Districts, function( n, i ) {
				if(data.districtID === n.value)
			  		return n;
			});	  
			if(s instanceof Array){
				$scope.editdefaultOptions =  s[0];
			}else{
				$scope.editdefaultOptions = $scope.defaultDistricts;
			}
	    	$scope.editblocks = {
	    		districtID : $scope.editdefaultOptions.value,
				createdBy : $rootScope.sessionConfig.userId,
				description: data.description || '',
				modifiedBy : $rootScope.sessionConfig.userId,
				blockName : data.blockName,
				blockID : data.blockID,
				status: true
	    	};
	    	$scope.callType.id = 1;
	        exDialog.openPrime({
	            scope: $scope,
	            template: 'admin/blocks/edit.html',
	            controller: 'AuditBlocksController',
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
		        		{ field: "blockID", title:'ID', hidden: true, editable : false },
		        		{ field: "blockName", title:'Name'  },
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
				         url: $scope.crudServiceBaseUrl + '/block/blocklist'
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

	    $scope.GetDistricts = function(){
	    	var obj = $scope.selectedDistricts;
	    	GetLookupValues(2);
	    }

	    function GetLookupValues(type){
	    	blocksfactory.getLookupValues(type).success(function(result){
	    		var defaultOptions = {
				    "value": 0,
				    "text": "Select"
				};
				if(result instanceof Array){
					$scope.Districts.push(defaultOptions);
					for (var i=0; i<result.length; i++){
					    $scope.Districts.push(result[i]);
					}						
		  		}else{
		  			notify({
			            messageTemplate: '<span>Unable to read look up values!!!</span>',
			            position: $rootScope.appConfig.notifyConfig.position,
			            scope:$scope
		        	});
		  		}
			}).error(function(error,status){
	  			notify({
		            messageTemplate: '<span>Unable to read look up values!!!</span>',
		            position: $rootScope.appConfig.notifyConfig.position,
		            scope:$scope
	        	});
			})
		}

		GetLookupValues(2);

}]);

app.factory('blocksfactory',function($http,$q,$rootScope){

	var service = {};
	var crudServiceBaseUrl = $rootScope.appConfig.baseUrl;
	var createblocksUrl = '/block/addblock';

	service.getLookupValues = function(id){
		return $http({
            method : 'GET',
            url : crudServiceBaseUrl + '/lookup/getlookup?id='+id
        });
	}

	service.doSubmitData = function(model){
		return $http({
            method : 'POST',
            url : crudServiceBaseUrl + createblocksUrl,
            params : model,
		    headers: {
		        "Content-Type": "application/json"
		    }
        });
	}

	service.doUpdateData = function(model){
		return $http({
            method : 'POST',
            url : crudServiceBaseUrl + '/block/updateblock',
            params : model,
		    headers: {
		        "Content-Type": "application/json"
		    }
        });
	}	

	return service;

});