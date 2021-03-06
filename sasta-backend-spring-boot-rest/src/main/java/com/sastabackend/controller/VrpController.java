package com.sastabackend.controller;

import com.sastabackend.domain.ReportsProperty;
import com.sastabackend.domain.Expenditure;
import com.sastabackend.domain.ResponseModel;
import com.sastabackend.domain.VrpDetails;
import com.sastabackend.service.vrpdetails.VrpDetailsService;
import com.sastabackend.util.Constants;
import com.sastabackend.util.CryptoUtil;
import com.wordnik.swagger.annotations.ApiOperation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;
import java.math.BigDecimal;
import  com.sastabackend.util.TextUtil;

/**
 * Created by SARVA on 11/Nov/2015.
 */
@RestController
@RequestMapping("/api/vrp")
public class VrpController {

    private static final Logger LOGGER = LoggerFactory.getLogger(BankController.class);
    private final VrpDetailsService vrpdetailsService;

    @Inject
    public VrpController(final VrpDetailsService vrpdetailsService) {
        this.vrpdetailsService = vrpdetailsService;
    }



    @ApiOperation(value = "Create VRP", response = ResponseModel.class, httpMethod = "POST")
    @RequestMapping(value = "/create", method = RequestMethod.POST)
    public ResponseModel Create(@RequestBody VrpDetails vrp)  {
        return vrpdetailsService.Add(vrp.getAuditId(), vrp.getName(), vrp.getGenderId(), vrp.getVillagePanchayatId(),
                vrp.getJobCardNumber(),vrp.getGuardianName(),vrp.getQualificationId(),vrp.getCommunityId(),
                vrp.getContactNumber(),vrp.getTotalDays(),vrp.getPaidAmount(),vrp.getPayMode(),
                vrp.getBankId(),vrp.getAccountNumber(),vrp.getIfscCode(),vrp.getGradeId(),
                vrp.getCreatedBy());
    }

    @ApiOperation(value = "Update VRP", response = ResponseModel.class, httpMethod = "POST")
    @RequestMapping(value = "/update", method = RequestMethod.POST)
    public ResponseModel Update(@RequestBody VrpDetails vrp) {
        return vrpdetailsService.Update(vrp.getId(), vrp.getAuditId(), vrp.getName(), vrp.getGenderId(), vrp.getVillagePanchayatId(),
                vrp.getJobCardNumber(), vrp.getGuardianName(), vrp.getQualificationId(), vrp.getCommunityId(),
                vrp.getContactNumber(), vrp.getTotalDays(), vrp.getPaidAmount(), vrp.getPayMode(),
                vrp.getBankId(), vrp.getAccountNumber(), vrp.getIfscCode(), vrp.getGradeId(),
                vrp.getModifiedBy(), vrp.getStatus());
    }

    @ApiOperation(value = "Read VRP details from server", response = ResponseModel.class, httpMethod = "GET")
    @RequestMapping(value = "/getvrpdetailslist", method = RequestMethod.GET)
    public ResponseModel getList(@RequestParam(value = "userid", required = false, defaultValue = "") Long userid,
                                 @RequestParam(value = "key", required = false, defaultValue = "") String key) {
        CryptoUtil crypt = new CryptoUtil();
        Long value = null;       
        try {
            //LOGGER.debug("user id  : {}", userid);
            //LOGGER.debug("key  : {}", key);    
            key = TextUtil.DecodeString(key); 
            //LOGGER.debug("key  : {}", key);        
            value = Long.valueOf(key).longValue();
        }catch (Exception err){
            // do nothing
        }
        //LOGGER.debug("user id  : {}", userid);
        //LOGGER.debug("key  : {}", value);
        return vrpdetailsService.findAll(userid,value);
    }

    @ApiOperation(value = "Read VRP details by ID", response = ResponseModel.class, httpMethod = "GET")
    @RequestMapping(value = "/getvrpdetails", method = RequestMethod.GET)
    public ResponseModel getList(@RequestParam("id") Long id) {
        LOGGER.debug("Reading  : {}", id);
        return vrpdetailsService.findOne(id);
    }

    @ApiOperation(value = "Read All Vrp based on end user search criteria", response = ResponseModel.class, httpMethod = "POST")
    @RequestMapping(value = "/vrpdetailsreports", method = RequestMethod.POST)
    public ResponseModel getVrpReports(@RequestBody ReportsProperty prop) {return vrpdetailsService.getVrpReports(prop);
    }    
}
