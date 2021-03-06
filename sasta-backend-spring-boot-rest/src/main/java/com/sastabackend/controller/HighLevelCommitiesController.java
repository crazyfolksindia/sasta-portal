package com.sastabackend.controller;

import com.sastabackend.domain.Grievances;
import com.sastabackend.domain.HighLevelCommities;
import com.sastabackend.domain.ReportsProperty;
import com.sastabackend.domain.ResponseModel;
import com.sastabackend.service.grievances.GrievancesServices;
import com.sastabackend.service.highlevel.HighLevelCommitiesService;
import com.sastabackend.util.Constants;
import com.sastabackend.util.CryptoUtil;
import com.wordnik.swagger.annotations.ApiOperation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;
import  com.sastabackend.util.TextUtil;
/**
 * Created by SARVA on 27/Dec/2015.
 */
@RestController
@RequestMapping("/api/highLevelcommities")
public class HighLevelCommitiesController {

    private static final Logger LOGGER = LoggerFactory.getLogger(DeviationController.class);
    private final HighLevelCommitiesService highLevelCommitiesService;

    @Inject
    public HighLevelCommitiesController(final HighLevelCommitiesService highLevelCommitiesService) {
        this.highLevelCommitiesService = highLevelCommitiesService;
    }

    @ApiOperation(value = "Create High Level Commities", response = ResponseModel.class, httpMethod = "POST")
    @RequestMapping(value = "/create", method = RequestMethod.POST)
    public ResponseModel Create(@RequestBody HighLevelCommities hl) {
        return highLevelCommitiesService.Add(hl);
    }

    @ApiOperation(value = "Update High Level Commities", response = ResponseModel.class, httpMethod = "POST")
    @RequestMapping(value = "/update", method = RequestMethod.POST)
    public ResponseModel Update(@RequestBody HighLevelCommities hl) {
        return highLevelCommitiesService.Update(hl);
    }

    @ApiOperation(value = "Read High Level Commities List", response = ResponseModel.class, httpMethod = "GET")
    @RequestMapping(value = "/getlist", method = RequestMethod.GET)
    public ResponseModel getList(@RequestParam(value = "userid", required = false, defaultValue = "") Long userid,
                                 @RequestParam(value = "key", required = false, defaultValue = "") String key) {
        CryptoUtil crypt = new CryptoUtil();
        Long value = 0L;
        try {
            //LOGGER.debug("user id  : {}", userid);
            //LOGGER.debug("key  : {}", key);    
            key = TextUtil.DecodeString(key); 
            //LOGGER.debug("key  : {}", key);        
            value = Long.valueOf(key).longValue();
        }catch (Exception err){
            // do nothing
        }
        return highLevelCommitiesService.findAll(userid, value);
    }

    @ApiOperation(value = "Read High Level Commities By Id", response = ResponseModel.class, httpMethod = "GET")
    @RequestMapping(value = "/getgrievances", method = RequestMethod.GET)
    public ResponseModel getList(@RequestParam("id") Long id) {
        LOGGER.debug("Reading  : {}", id);
        return highLevelCommitiesService.findOne(id);
    }

    @ApiOperation(value = "Read All High Level Commities based on end user search criteria", response = ResponseModel.class, httpMethod = "POST")
    @RequestMapping(value = "/highlevelcommitiesreports", method = RequestMethod.POST)
    public ResponseModel getHighLevelCommitiesReports(@RequestBody ReportsProperty prop) {
        return highLevelCommitiesService.getHighLevelCommitiesReports(prop);
    }
}
