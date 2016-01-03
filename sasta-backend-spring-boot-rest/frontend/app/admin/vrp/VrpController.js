app.controller('VrpController',['$http','$window','$scope','$rootScope','notify','$location','$state','storage','vrpfactory',
	function($http,$window,$scope,$rootScope,notify,$location,$state,storage,vrpfactory){

		$scope.aufactory = vrpfactory;
		$scope.crudServiceBaseUrl = $rootScope.appConfig.baseUrl;
		
	    //Popup Titles
	    $scope.modelDialogTitle = {
	    	AddAuditTitle : "Add VRP",
	    	EditAuditTitle : "Edit VRP"
	    };

		$scope.rounds = [];
		$scope.districts = [];
		$scope.blocks = [];
		$scope.villages = [];
		$scope.grades = [];
		$scope.payments = [];
		$scope.qualifications = [];
		$scope.communities = [];
		$scope.banks = [];
		$scope.genders = [];

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

		$scope.defaultgrades = {
		    "value": 0,
		    "text": "Select"
		};

		$scope.defaultbanks = {
		    "value": 0,
		    "text": "Select"
		};

		$scope.defaultcommunities = {
		    "value": 0,
		    "text": "Select"
		};

		$scope.defaultqualifications = {
		    "value": 0,
		    "text": "Select"
		};

		$scope.defaultpayments = [{
            "value": 0,
            "text": "Select"
	        }, {
	            "value": 1,
	            "text": "Cash"
	        }, {
	            "value": 2,
	            "text": "Cheque"
	        }, {
	            "value": 3,
	            "text": "DD"
	        }];

		$scope.defaultgender = [{
            "value": 0,
            "text": "Select"
	        }, {
	            "value": 1,
	            "text": "Male"
	        }, {
	            "value": 2,
	            "text": "Female"
	        }];
		$scope.genders = [{
            "value": 0,
            "text": "Select"
	        }, {
	            "value": 1,
	            "text": "Male"
	        }, {
	            "value": 2,
	            "text": "Female"
	        }];

		$scope.payments = [{
            "value": 0,
            "text": "Select"
	        }, {
	            "value": 1,
	            "text": "Cash"
	        }, {
	            "value": 2,
	            "text": "Cheque"
	        }, {
	            "value": 3,
	            "text": "DD"
	        }];

        $scope.OnGradeSelectedValue = function(defaultgrades){
	    	$scope.defaultgrades = defaultgrades;
	    }

	    $scope.OnBankSelectedValue = function(defaultbanks){
	    	$scope.defaultbanks = defaultbanks;
	    }

	    $scope.OnCommunitySelectedValue = function(defaultcommunities){
	    	$scope.defaultcommunities = defaultcommunities;
	    }

	    $scope.OnQualificationSelectedValue = function(defaultqualifications){
	    	$scope.defaultqualifications = defaultqualifications;
	    }

	    $scope.OnGenderSelectedValue = function(defaultgender){
	    	$scope.defaultgender = defaultgender;
	    }

	    $scope.OnPaymentSelectedValue = function(defaultpayments){
	    	$scope.defaultpayments = defaultpayments;
	    }


        $scope.kaddWindowOptions = {
            content: 'admin/vrp/add.html',
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
		        $scope.add1jQueryValidator = new Validator($scope.AddAuditFormName); 

		        //$scope.genders.push($scope.defaultgender);
            }
        };

        $scope.add1jQueryValidator = null;
        $scope.edit1jQueryValidator = null;


        $scope.AddAuditFormName = '#frmaddbanks';
        $scope.EditAuditFormName = '#frmaddbanks';    

        $scope.keditWindowOptions = {
            content: 'admin/vrp/edit.html',
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
		        $scope.edit1jQueryValidator = new Validator($scope.EditAuditFormName);            	
            }
        };

        $scope.OpenAuditWindow = function($event){
        	alert(decodeURIComponent($location.search().aid));
        	$scope.addAuditWindow.wrapper.addClass("col-md-12 col-lg-12 no-padding auto-margin");
            $scope.doReset();
        	
            GetAudit(decodeURIComponent($location.search().aid)).done(function(result){
            	GetLookupValues(14,$scope.vrp.auditBlockId);
            	$scope.addAuditWindow.center().open();
        	});
        }

        $scope.CloseAuditWindow  = function(){
            $scope.addAuditWindow.close();
        }

        $scope.OpenEditAuditWindow = function(){
        	alert($location.search().aid);
			$scope.editAuditWindow.wrapper.addClass("col-md-12 col-lg-12 no-padding auto-margin"); 
			$scope.editAuditWindow.center().open();
			      	
            
        }

        $scope.CloseEditAuditWindow = function(){
            $scope.editAuditWindow.close();
        }

        $scope.doReset = function(){
        	$scope.vrp = angular.copy($scope.defaultOptions);
        	$scope.editvrp =  angular.copy($scope.defaultOptions);
        	$scope.defaultdistricts = [];
        	$scope.defaultblocks = [];
        	$scope.defaultvillages = [];
        	$scope.defaultrounds = [];
        	$scope.defaultgender = [];
        	$scope.defaultqualifications=[];
        	$scope.defaultpayments=[];
        	$scope.defaultcommunities=[];
        	$scope.defaultgrades=[];

        	

			var ba = jQuery.map( $scope.banks, function( n, i ) {
				if(0 === n.value)
			  		return n;
			});	  
			if(ba instanceof Array){
				$scope.defaultbanks =  ba[0];
			}else{
				$scope.defaultbanks = $scope.defaultbanks;
			}	   
			var c = jQuery.map( $scope.communities, function( n, i ) {
				if(0 === n.value)
			  		return n;
			});	  
			if(c instanceof Array){
				$scope.defaultcommunities =  c[0];
			}else{
				$scope.defaultcommunities = $scope.defaultcommunities;
			}	 	
			var q = jQuery.map( $scope.qualifications, function( n, i ) {
				if(0 === n.value)
			  		return n;
			});	  
			if(q instanceof Array){
				$scope.defaultqualifications =  q[0];
			}else{
				$scope.defaultqualifications = $scope.defaultqualifications;
			}
			var g = jQuery.map( $scope.grades, function( n, i ) {
				if(0 === n.value)
			  		return n;
			});	  
			if(g instanceof Array){
				$scope.defaultgrades =  g[0];
			}else{
				$scope.defaultgrades = $scope.defaultgrades;
			}	
			var p = jQuery.map( $scope.payments, function( n, i ) {
				if(0 === n.value)
			  		return n;
			});	  
			if(p instanceof Array){
				$scope.defaultpayments =  p[0];
			}else{
				$scope.defaultpayments = $scope.defaultpayments;
			}


        	//$scope.villages=[];
        	//$scope.districts=[];
        	//$scope.rounds = [];
        	//$scope.blocks=[];

        }

        $scope.defaultOptions = {
	      		"id" : 0,
				"name" : null,
				"createdByName" : null,
				"modifiedByName" : null,
				"createdDate" : null,
				"auditDistrictId" : null,
				"auditBlockId" : null,
				"villagePanchayatId" : null,
				"modifiedDate" : null,
				"status" : null,
				"roundDescription" : null,
				"roundStartDate" : null,
				"roundEndDate" : null,
				"qualificationId" : null,
				"vrpGradeName" : null,
				"auditDistrictName" : null,
				"auditFinancialYear" : null,
				"vrpQualificationName" : null,
				"jobCardNumber" : null,
				"auditBlockName" : null,
				"vrpBankName" : null,
				"contactNumber" : null,
				"auditVpName" : null,
				"auditFinancialDescription" : null,
				"accountNumber" : null,
				"vrpPanchayatName" : null,
				"communityId" : null,
				"guardianName" : null,
				"vrpCommunityName" : null,
				"createdBy" : null,
				"roundId" : null,
				"roundName" : null,
				"modifiedBy" : null,
				"auditId" : null,
				"bankId" : null,
				"genderId" : null,
				"ifscCode" : null,
				"active" : null,
				"auditVpId" : null,
				"payMode" : null,
				"gradeId" : null,
				"paidAmount" : null,
				"totalDays" : null
	    };

	    $scope.vrp = {
	      		"id" : 0,
				"name" : null,
				"createdByName" : null,
				"modifiedByName" : null,
				"createdDate" : null,
				"auditDistrictId" : null,
				"auditBlockId" : null,
				"villagePanchayatId" : null,
				"modifiedDate" : null,
				"status" : null,
				"roundDescription" : null,
				"roundStartDate" : null,
				"roundEndDate" : null,
				"qualificationId" : null,
				"vrpGradeName" : null,
				"auditDistrictName" : null,
				"auditFinancialYear" : null,
				"vrpQualificationName" : null,
				"jobCardNumber" : null,
				"auditBlockName" : null,
				"vrpBankName" : null,
				"contactNumber" : null,
				"auditVpName" : null,
				"auditFinancialDescription" : null,
				"accountNumber" : null,
				"vrpPanchayatName" : null,
				"communityId" : null,
				"guardianName" : null,
				"vrpCommunityName" : null,
				"createdBy" : null,
				"roundId" : null,
				"roundName" : null,
				"modifiedBy" : null,
				"auditId" : null,
				"bankId" : null,
				"genderId" : null,
				"ifscCode" : null,
				"active" : null,
				"auditVpId" : null,
				"payMode" : null,
				"gradeId" : null,
				"paidAmount" : null,
				"totalDays" : null
	    };

	    $scope.Submit = function(){
	    	if($scope.add1jQueryValidator.doValidate()){
		    	//$scope.vrp.roundId =1;// $scope.defaultrounds.value;
		    	//$scope.vrp.auditDistrictId =1;// $scope.defaultdistricts.value;
		    	//$scope.vrp.auditBlockId =1;// $scope.defaultblocks.value;
		    	//$scope.vrp.villagePanchayatId =1;// $scope.defaultvillages.value;
				//$scope.vrp.roundId =1;// $scope.defaultvillages.value;
				$scope.vrp.communityId = $scope.defaultcommunities.value;
				//$scope.vrp.auditId=1;
				$scope.vrp.genderId = $scope.defaultgender.value;
				$scope.vrp.bankId = $scope.defaultbanks.value;
				$scope.vrp.gradeId = $scope.defaultgrades.value;
				$scope.vrp.payMode = $scope.defaultpayments.value;
				$scope.vrp.qualificationId = $scope.defaultqualifications.value;

		    	//$scope.vrp.startdate = '2015-12-25';
		    	//$scope.vrp.enddate = '2015-12-25';
		    	//$scope.vrp.gramasabhadate = '2015-12-25';
		    	$scope.vrp.createdBy = $rootScope.sessionConfig.userId;

		    	var responseText = vrpfactory.doSubmitData($scope.vrp);
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

	    $scope.Update = function(){
			if($scope.edit1jQueryValidator.doValidate()){
		    	//$scope.editexpenditure.roundid = $scope.editdefaultrounds.value;
		    	//$scope.editexpenditure.districtid = $scope.editdefaultdistricts.value;
		    	//$scope.editexpenditure.blockid = $scope.editdefaultblocks.value;
		    	//$scope.editexpenditure.panchayatid = $scope.editdefaultvillages.value;

				//$scope.editvrp.roundId =1;// $scope.defaultrounds.value;
		    	//$scope.editvrp.auditDistrictId =1;// $scope.defaultdistricts.value;
		    	//$scope.editvrp.auditBlockId =1;// $scope.defaultblocks.value;
		    	//$scope.editvrp.villagePanchayatId =1;// $scope.defaultvillages.value;
				//$scope.editvrp.roundId =1;// $scope.defaultvillages.value;
				$scope.editvrp.communityId = $scope.defaultcommunities.value;
				$scope.editvrp.genderId = $scope.defaultgender.value;
				$scope.editvrp.bankId = $scope.defaultbanks.value;
				$scope.editvrp.gradeId = $scope.defaultgrades.value;
				$scope.editvrp.payMode = $scope.defaultpayments.value;
				$scope.editvrp.qualificationId = $scope.defaultqualifications.value;
		    	var responseText = vrpfactory.doUpdateData($scope.editvrp);
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
				$scope.defaultrounds =  r[0];
			}else{
				$scope.defaultrounds = $scope.defaultrounds;
			}	  
			var d = jQuery.map( $scope.districts, function( n, i ) {
				if(data.auditDistrictId === n.value)
			  		return n;
			});	  
			if(d instanceof Array){
				$scope.defaultdistricts =  d[0];
			}else{
				$scope.defaultdistricts = $scope.defaultdistricts;
			}	  
			var b = jQuery.map( $scope.blocks, function( n, i ) {
				if(data.auditBlockId === n.value)
			  		return n;
			});	  
			if(b instanceof Array){
				$scope.defaultblocks =  b[0];
			}else{
				$scope.defaultblocks = $scope.defaultblocks;
			}	   
			var v = jQuery.map( $scope.villages, function( n, i ) {
				if(data.villagePanchayatId === n.value)
			  		return n;
			});	  
			if(v instanceof Array){
				$scope.defaultvillages =  v[0];
			}else{
				$scope.defaultvillages = $scope.defaultvillages;
			}	

			var ba = jQuery.map( $scope.banks, function( n, i ) {
				if(data.bankId === n.value)
			  		return n;
			});	  
			if(ba instanceof Array){
				$scope.defaultbanks =  ba[0];
			}else{
				$scope.defaultbanks = $scope.defaultbanks;
			}	   
			var c = jQuery.map( $scope.communities, function( n, i ) {
				if(data.communityId === n.value)
			  		return n;
			});	  
			if(c instanceof Array){
				$scope.defaultcommunities =  c[0];
			}else{
				$scope.defaultcommunities = $scope.defaultcommunities;
			}	 	
			var q = jQuery.map( $scope.qualifications, function( n, i ) {
				if(data.qualificationId === n.value)
			  		return n;
			});	  
			if(q instanceof Array){
				$scope.defaultqualifications =  q[0];
			}else{
				$scope.defaultqualifications = $scope.defaultqualifications;
			}
			var g = jQuery.map( $scope.grades, function( n, i ) {
				if(data.gradeId === n.value)
			  		return n;
			});	  
			if(g instanceof Array){
				$scope.defaultgrades =  g[0];
			}else{
				$scope.defaultgrades = $scope.defaultgrades;
			}	
			var p = jQuery.map( $scope.payments, function( n, i ) {
				if(data.payMode === n.value)
			  		return n;
			});	  
			if(p instanceof Array){
				$scope.defaultpayments =  p[0];
			}else{
				$scope.defaultpayments = $scope.defaultpayments;
			}	
			

			var ge = jQuery.map( $scope.genders, function( n, i ) {
				if(data.genderId === n.value)
			  		return n;
			});	  
			if(ge instanceof Array){
				$scope.defaultgender =  ge[0];
			}else{
				$scope.defaultgender = $scope.defaultgender;
			}	

	    	$scope.editvrp = {
					id : data.id,
					name : data.name,
					createdByName : data.createdByName,
					modifiedByName : data.modifiedByName,
					createdDate : data.createdDate,
					auditDistrictId : data.auditDistrictId,
					auditBlockId : data.auditBlockId,
					villagePanchayatId : data.villagePanchayatId,
					modifiedDate : data.modifiedDate,
					status : data.status,
					roundDescription : data.roundDescription,
					roundStartDate : data.roundStartDate,
					roundEndDate : data.roundEndDate,
					qualificationId : data.qualificationId,
					vrpGradeName : data.vrpGradeName,
					auditDistrictName : data.auditDistrictName,
					auditFinancialYear : data.auditFinancialYear,
					vrpQualificationName : data.vrpQualificationName,
					jobCardNumber : data.jobCardNumber,
					auditBlockName : data.auditBlockName,
					vrpBankName : data.vrpBankName,
					contactNumber : data.contactNumber,
					auditVpName : data.auditVpName,
					auditFinancialDescription : data.auditFinancialDescription,
					accountNumber : data.accountNumber,
					vrpPanchayatName : data.vrpPanchayatName,
					communityId : data.communityId,
					guardianName : data.guardianName,
					vrpCommunityName : data.vrpCommunityName,
					createdBy : data.createdBy,
					roundId : data.roundId,
					roundName : data.roundName,
					modifiedBy : data.modifiedBy,
					auditId : data.auditId,
					bankId : data.bankId,
					genderId : data.genderId,
					ifscCode : data.ifscCode,
					active : data.active,
					auditVpId : data.auditVpId,
					payMode : data.payMode,
					gradeId : data.gradeId,
					paidAmount : data.paidAmount,
					totalDays : data.totalDays

	    	};
	    	$scope.OpenEditAuditWindow();
	    }

	    $scope.gridOptions = {
	        columns: [ 
		        		{ field: "id", title:'Audit ID', hidden: true, editable : false },
		        		{ field: "roundName", title:'Round', editable : false  },
		        		{ field: "roundStartDate", title:'Start Date',editable: false,template: "#= kendo.toString(kendo.parseDate(new Date(roundStartDate), 'yyyy-MM-dd'), 'MM/dd/yyyy') #"  },
		        		{ field: "roundEndDate", title:'End Date',editable: false,template: "#= kendo.toString(kendo.parseDate(new Date(roundEndDate), 'yyyy-MM-dd'), 'MM/dd/yyyy') #"  },
		        		{ field: "roundName", title : "District", editable : false},
		        		{ field: "roundName", title : "Block", editable : false },
		        		{ field: "roundName", title : "Village", editable : false},
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
				         url: $scope.crudServiceBaseUrl + '/vrp/getvrpdetailslist'
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

	    function GetAudit(id,type)
	    {
	    	var deffered = jQuery.Deferred();
	    	vrpfactory.getAudit(id).success(function(result){
	    		
		    		$scope.vrp.auditId= result.data.auditId;
		    		$scope.vrp.roundId =result.data.roundId;
			    	$scope.vrp.auditDistrictId =result.data.auditDistrictId;
			    	$scope.vrp.auditBlockId =result.data.auditBlockId;
			    	$scope.vrp.villagePanchayatId =result.data.villagePanchayatId;
					$scope.vrp.roundId =result.data.roundId;
	    		
				
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
	    	vrpfactory.getLookupValues(type).success(function(result){
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
					else if(type==6){
						$scope.communities.push(defaultOptions);
						for (var i=0; i<result.length; i++){
						    $scope.communities.push(result[i]);
						}	
					}
					else if(type==4)
					{
						$scope.banks.push(defaultOptions);
						for (var i=0; i<result.length; i++){
						    $scope.banks.push(result[i]);
						}	
					}
					else if(type==10)
					{
						$scope.grades.push(defaultOptions);
						for (var i=0; i<result.length; i++){
						    $scope.grades.push(result[i]);
						}	
					}
					else if(type==12)
					{
						$scope.qualifications.push(defaultOptions);
						for (var i=0; i<result.length; i++){
						    $scope.qualifications.push(result[i]);
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
		GetLookupValues(6); 
		GetLookupValues(10); 
		GetLookupValues(12); 
		GetLookupValues(4); 

}]);

app.factory('vrpfactory',function($http,$q,$rootScope){

	var service = {};
	var crudServiceBaseUrl = $rootScope.appConfig.baseUrl;
	var createbankUrl = '/vrp/create';

	service.getAudit = function(id){
		return $http({
            method : 'GET',
            url : crudServiceBaseUrl + '/audit/getconfiguration?id=' + id
        });
	}

	service.getLookupValues = function(id){
		return $http({
            method : 'GET',
            url : crudServiceBaseUrl + '/lookup/getlookup?id='+id + '&where=0'
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
            url : crudServiceBaseUrl + '/vrp/update',
            data : JSON.stringify(model),
		    headers: {
		        "Content-Type": "application/json"
		    }
        });
	}	

	return service;

});