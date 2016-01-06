app.controller('HLCommitteeController',['$http','$window','$scope','$rootScope','notify','$location','$state','storage','hlcommitteefactory',
	function($http,$window,$scope,$rootScope,notify,$location,$state,storage,hlcommitteefactory){

		$scope.aufactory = hlcommitteefactory;
		$scope.crudServiceBaseUrl = $rootScope.appConfig.baseUrl;
		
	    //Popup Titles
	    $scope.modelDialogTitle = {
	    	AddAuditTitle : "Add High Level Committee",
	    	EditAuditTitle : "Edit High Level Committee"
	    };

		$scope.rounds = [];
		$scope.districts = [];
		$scope.blocks = [];
		$scope.villages = [];

		// default selected rounds
		$scope.defaultrounds = {
		    "value": 0,
		    "text": "Select"
		};

		// default selected rounds
		$scope.defaultdistricts = {
		    "value": 0,
		    "text": "Select"
		};

		// default selected rounds
		$scope.defaultblocks = {
		    "value": 0,
		    "text": "Select"
		};

		// default selected rounds
		$scope.defaultvillages = {
		    "value": 0,
		    "text": "Select"
		};


        $scope.kaddWindowOptions = {
            content: 'admin/hlcommittee/add.html',
            title: $scope.modelDialogTitle.AddAuditTitle,
            iframe: false,
            draggable: true,
            modal: true, 
            resizable: true,
            visible: false,      
            animation: {
                close: {
                    effects: "fade:out"
                }
            },
            open : function() {
		        $($scope.AddAuditFormName).validationEngine('attach', {
		            promptPosition: "topLeft",
		            scroll: true
		        });         
		        $scope.addjQueryValidator = new Validator($scope.AddAuditFormName); 
            }
        };

        $scope.AddAuditFormName = '#frmAddAuditDeviation';
        $scope.EditAuditFormName = '#frmEditAuditDeviation';    

        $scope.keditWindowOptions = {
            content: 'admin/hlcommittee/edit.html',
            title: $scope.modelDialogTitle.EditAuditTitle,
            iframe: false,
            draggable: true,
            modal: true,
            resizable: false,
            visible: false,      
            animation: {
                close: {
                    effects: "fade:out"
                }
            },
            open : function(){
		        $($scope.EditAuditFormName).validationEngine('attach', {
		            promptPosition: "topLeft",
		            scroll: true
		        });		        
		        $scope.editjQueryValidator = new Validator($scope.EditAuditFormName);            	
            }
        };

        $scope.OpenAuditWindow = function($event){
        	$scope.addAuditWindow.wrapper.addClass("col-md-12 col-lg-12 no-padding auto-margin");
            //$scope.addAuditWindow.center().open();
            $scope.doReset();
        	GetAudit(decodeURIComponent($location.search().aid)).done(function(result){
            	
            	$scope.addAuditWindow.center().open();
        	});
        }


        $scope.CloseAuditWindow  = function(){
            $scope.addAuditWindow.close();
        }

        $scope.OpenEditAuditWindow = function(){
			$scope.editAuditWindow.wrapper.addClass("col-md-12 col-lg-12 no-padding auto-margin");        	
            $scope.editAuditWindow.center().open();
            
        }

        $scope.CloseEditAuditWindow = function(){
            $scope.editAuditWindow.close();
        }

        $scope.doReset = function(){
        	$scope.hlcommittee = angular.copy($scope.defaultOptions);
        	$scope.edithlcommittee =  angular.copy($scope.defaultOptions);
        }

        $scope.defaultOptions = {
			"id" : null,
			"status" : null,
			"roundId" : null,
			"vpName" : null,
			"blockName" : null,
			"auditId" : null,
			"createdBy" : null,
			"modifiedBy" : null,
			"roundName" : null,
			"blockId" : null,
			"vpId" : null,
			"financialYear" : null,
			"createdByName" : null,
			"modifiedByName" : null,
			"modifiedDate" : null,
			"roundDescription" : null,
			"createdDate" : null,
			"auditDistrictId" : null,
			"financialDescription" : null,
			"districtName" : null,
			"roundEndDate" : null,
			"roundStartDate" : null,
			"pendingParasCount" : null,
			"amountToBeRecovered" : null,
			"totalParasCount" : null,
			"totalParasAmt" : null,
			"paraSettledDuringDSAmt" : null,
			"paraSettledDuringHLCCount" : null,
			"paraSettledDuringHLCAmt" : null,
			"amountRecovered" : null,
			"paraSettledDuringDSCount" : null,
			"pendingParasAmt" : null

	    };

	    $scope.hlcommittee = {
			"id" : 0,
			"status" : null,
			"roundId" : null,
			"vpName" : null,
			"blockName" : null,
			"auditId" : null,
			"createdBy" : null,
			"modifiedBy" : null,
			"roundName" : null,
			"blockId" : null,
			"vpId" : null,
			"financialYear" : null,
			"createdByName" : null,
			"modifiedByName" : null,
			"modifiedDate" : null,
			"roundDescription" : null,
			"createdDate" : null,
			"auditDistrictId" : null,
			"financialDescription" : null,
			"districtName" : null,
			"roundEndDate" : null,
			"roundStartDate" : null,
			"pendingParasCount" : null,
			"amountToBeRecovered" : null,
			"totalParasCount" : null,
			"totalParasAmt" : null,
			"paraSettledDuringDSAmt" : null,
			"paraSettledDuringHLCCount" : null,
			"paraSettledDuringHLCAmt" : null,
			"amountRecovered" : null,
			"paraSettledDuringDSCount" : null,
			"pendingParasAmt" : null

	    };

	    $scope.Submit = function(){
	    	if($scope.addjQueryValidator.doValidate()){
		    	//$scope.deviation.roundId = $scope.defaultrounds.value;
		    	//$scope.deviation.auditDistrictId = $scope.defaultdistricts.value;
		    	//$scope.deviation.blockId = $scope.defaultblocks.value;
		    	//$scope.deviation.vpId = $scope.defaultvillages.value;

		    	//$scope.deviation.roundStartDate = '2015-12-25';
		    	//$scope.deviation.roundEndDate = '2015-12-25';
		    	
		    	$scope.hlcommittee.createdBy = $rootScope.sessionConfig.userId;

		    	var responseText = hlcommitteefactory.doSubmitData($scope.hlcommittee);
				responseText.success(function(result){
					if(result.status){
				  		notify({
				            messageTemplate: '<span>'+result.data+'</span>',
				            position: $rootScope.appConfig.notifyConfig.position,
				            scope:$scope
				        });							
						// scope.grid is the widget reference
	  					$scope.grid.dataSource.read();
						$scope.CloseAuditWindow();
				        $scope.doReset();
			  		}else{
				  		notify({
				            messageTemplate: '<span>Unable to add audit!</span>',
				            position: $rootScope.appConfig.notifyConfig.position,
				            scope:$scope
				        });
			  		}
				}).error(function(error,status){
			  		notify({
			            messageTemplate: '<span>Unable to add audit!</span>',
			            position: $rootScope.appConfig.notifyConfig.position,
			            scope:$scope
			        });
				});
	    	}
	    }

	    $scope.Delete = function(data){
	    	$scope.delData = angular.copy($scope.defaultOptions);
	    	$scope.delData.id = data.id;
	    	$scope.delData.status = false;

	    	$scope.delData.modifiedBy = $rootScope.sessionConfig.userId;

		    	var responseText = hlcommitteefactory.doUpdateData($scope.delData);
				responseText.success(function(result){
					if(result.status){
				  		notify({
				            messageTemplate: '<span>'+result.data+'</span>',
				            position: $rootScope.appConfig.notifyConfig.position,
				            scope:$scope
				        });							
						// scope.grid is the widget reference
	  					$scope.grid.dataSource.read();
						$scope.CloseEditAuditWindow();
				        $scope.doReset();
			  		}else{
				  		notify({
				            messageTemplate: '<span>Unable to delete HLC!.</span>',
				            position: $rootScope.appConfig.notifyConfig.position,
				            scope:$scope
				        });	
			  		}
				}).error(function(error,status){
			  		notify({
			            messageTemplate: '<span>Unable to delete HLC!.</span>',
			            position: $rootScope.appConfig.notifyConfig.position,
			            scope:$scope
			        });	
				});	

	    }

	    $scope.Update = function(){
			if($scope.editjQueryValidator.doValidate()){
		    	//$scope.editmisappropriation.roundid = $scope.editdefaultrounds.value;
		    	//$scope.editmisappropriation.districtid = $scope.editdefaultdistricts.value;
		    	//$scope.editmisappropriation.blockid = $scope.editdefaultblocks.value;
		    	//$scope.editmisappropriation.panchayatid = $scope.editdefaultvillages.value;
		    	$scope.edithlcommittee.modifiedBy = $rootScope.sessionConfig.userId;

		    	var responseText = hlcommitteefactory.doUpdateData($scope.edithlcommittee);
				responseText.success(function(result){
					if(result.status){
				  		notify({
				            messageTemplate: '<span>'+result.data+'</span>',
				            position: $rootScope.appConfig.notifyConfig.position,
				            scope:$scope
				        });							
						// scope.grid is the widget reference
	  					$scope.grid.dataSource.read();
						$scope.CloseEditAuditWindow();
				        $scope.doReset();
			  		}else{
				  		notify({
				            messageTemplate: '<span>Unable to update audit!.</span>',
				            position: $rootScope.appConfig.notifyConfig.position,
				            scope:$scope
				        });	
			  		}
				}).error(function(error,status){
			  		notify({
			            messageTemplate: '<span>Unable to update audit!.</span>',
			            position: $rootScope.appConfig.notifyConfig.position,
			            scope:$scope
			        });	
				});	 
			}
	    }

	    $scope.EditData = function(data){
	    	var r = jQuery.map( $scope.rounds, function( n, i ) {
				if(data.roundId === n.value)
			  		return n;
			});	  
			if(r instanceof Array){
				$scope.editdefaultrounds =  r[0];
			}else{
				$scope.editdefaultrounds = $scope.defaultrounds;
			}	  
			var d = jQuery.map( $scope.districts, function( n, i ) {
				if(data.auditDistrictId === n.value)
			  		return n;
			});	  
			if(d instanceof Array){
				$scope.editdefaultdistricts =  d[0];
			}else{
				$scope.editdefaultdistricts = $scope.defaultdistricts;
			}	  
			var b = jQuery.map( $scope.blocks, function( n, i ) {
				if(data.auditBlockId === n.value)
			  		return n;
			});	  
			if(b instanceof Array){
				$scope.editdefaultblocks =  b[0];
			}else{
				$scope.editdefaultblocks = $scope.defaultblocks;
			}	   
			var v = jQuery.map( $scope.villages, function( n, i ) {
				if(data.villagePanchayatId === n.value)
			  		return n;
			});	  
			if(v instanceof Array){
				$scope.editdefaultvillages =  v[0];
			}else{
				$scope.editdefaultvillages = $scope.defaultvillages;
			}	   	
	    	$scope.edithlcommittee = {
					id : data.id,
					status : data.status,
					roundId : data.roundId,
					vpName : data.vpName,
					blockName : data.blockName,
					auditId : data.auditId,
					createdBy : data.createdBy,
					modifiedBy : data.modifiedBy,
					roundName : data.roundName,
					blockId : data.blockId,
					vpId : data.vpId,
					financialYear : data.financialYear,
					createdByName : data.createdByName,
					modifiedByName : data.modifiedByName,
					modifiedDate : data.modifiedDate,
					roundDescription : data.roundDescription,
					createdDate : data.createdDate,
					auditDistrictId : data.auditDistrictId,
					financialDescription : data.financialDescription,
					districtName : data.districtName,
					roundEndDate : data.roundEndDate,
					roundStartDate : data.roundStartDate,
					pendingParasCount : data.pendingParasCount,
					amountToBeRecovered : data.amountToBeRecovered,
					totalParasCount : data.totalParasCount,
					totalParasAmt : data.totalParasAmt,
					paraSettledDuringDSAmt : data.paraSettledDuringDSAmt,
					paraSettledDuringHLCCount : data.paraSettledDuringHLCCount,
					paraSettledDuringHLCAmt : data.paraSettledDuringHLCAmt,
					amountRecovered : data.amountRecovered,
					paraSettledDuringDSCount : data.paraSettledDuringDSCount,
					pendingParasAmt : data.pendingParasAmt

	    	};
	    	$scope.OpenEditAuditWindow();
	    }

	    $scope.gridOptions = {
	        columns: [ 
		        		{ field: "auditId", title:'Audit ID', hidden: true, editable : false },
		        		{ field: "roundName", title:'Round', editable : false  },
		        		{ field: "roundStartDate", title:'Start Date',editable: false,template: "#= kendo.toString(kendo.parseDate(new Date(roundStartDate), 'yyyy-MM-dd'), 'MM/dd/yyyy') #"  },
		        		{ field: "roundEndDate", title:'End Date',editable: false,template: "#= kendo.toString(kendo.parseDate(new Date(roundEndDate), 'yyyy-MM-dd'), 'MM/dd/yyyy') #"  },
		        		{ field: "districtName", title : "District", editable : false},
		        		{ field: "blockName", title : "Block", editable : false },
		        		{ field: "vpName", title : "Village", editable : false},
		        		{
 							title : "",
		                    width: '30px',
		                    template: kendo.template($("#toggle-template").html())
		                }
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
				         url: $scope.crudServiceBaseUrl + '/highLevelcommities/getlist'
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

	    function GetAudit(id)
	    {
	    	var deffered = jQuery.Deferred();
			    	hlcommitteefactory.getAudit(id).success(function(result){
		    		$scope.hlcommittee.auditId= result.data.auditId;
		    		$scope.hlcommittee.roundId =result.data.roundId;
			    	$scope.hlcommittee.auditDistrictId =result.data.auditDistrictId;
			    	$scope.hlcommittee.blockId =result.data.auditBlockId;
			    	$scope.hlcommittee.vpId =result.data.villagePanchayatId;
					
	    		
				
		  		return deffered.resolve('Ok');
			}).error(function(error,status){
	  			notify({
		            messageTemplate: '<span>Unable to read look up values!!!</span>',
		            position: $rootScope.appConfig.notifyConfig.position,
		            scope:$scope
	        	});
			})
			return deffered.promise();

	    }

	    function GetLookupValues(type){
	    	hlcommitteefactory.getLookupValues(type).success(function(result){
	    		var defaultOptions = {
				    "value": 0,
				    "text": "Select"
				};
				if(result instanceof Array){
					if(type==13){
						$scope.rounds.push(defaultOptions);
						for (var i=0; i<result.length; i++){
						    $scope.rounds.push(result[i]);
						}	
					}
					else if(type==2)
					{
						$scope.districts.push(defaultOptions);
						for (var i=0; i<result.length; i++){
						    $scope.districts.push(result[i]);
						}	
					}
					else if(type==1)
					{
						$scope.blocks.push(defaultOptions);
						for (var i=0; i<result.length; i++){
						    $scope.blocks.push(result[i]);
						}	
					}
					else if(type==14)
					{
						$scope.villages.push(defaultOptions);
						for (var i=0; i<result.length; i++){
						    $scope.villages.push(result[i]);
						}	
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

		GetLookupValues(13); 
		GetLookupValues(2); 
		GetLookupValues(1); 
		GetLookupValues(14); 
}]);

app.factory('hlcommitteefactory',function($http,$q,$rootScope){

	var service = {};
	var crudServiceBaseUrl = $rootScope.appConfig.baseUrl;
	var createbankUrl = '/highLevelcommities/create';

	service.getAudit = function(id){
		return $http({
            method : 'GET',
            url : crudServiceBaseUrl + '/audit/getconfiguration?id=' + id
        });
	}

	service.getLookupValues = function(id){
		return $http({
            method : 'GET',
            url : crudServiceBaseUrl + '/lookup/getlookup?id='+id
        });
	}

	service.doSubmitData = function(model){
		return $http({
            method : 'POST',
            url : crudServiceBaseUrl + createbankUrl,
            data : JSON.stringify(model),
            headers: {
                "Content-Type": "application/json"
            }
        });
		
	}

	service.doUpdateData = function(model){
		return $http({
            method : 'POST',
            url : crudServiceBaseUrl + '/highLevelcommities/update',
            data : JSON.stringify(model),
		    headers: {
		        "Content-Type": "application/json"
		    }
        });
	}	

	return service;

});