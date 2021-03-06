package com.sastabackend.service.calender;

import com.sastabackend.domain.DetailedSastaCalender;
import com.sastabackend.domain.ResponseModel;
import com.sastabackend.domain.SastaCalender;
import com.sastabackend.repository.CalenderRepository;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.SqlOutParameter;
import org.springframework.jdbc.core.SqlParameter;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.jdbc.core.simple.SimpleJdbcCall;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import javax.inject.Inject;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by Sarvaratchagan on 03-07-2016.
 */

@Service
@Validated
public class SastaCalenderServiceImpl implements SastaCalenderService{

    @Autowired
    private JdbcTemplate jdbcTemplate;
    private static final Logger LOGGER = LoggerFactory.getLogger(SastaCalenderServiceImpl.class);
    private final CalenderRepository repository;

    @Inject
    public SastaCalenderServiceImpl(final CalenderRepository repository){
        this.repository = repository;
    }

    @Override
    public ResponseModel findOne(Long id) {
        LOGGER.debug("Reading Sasta Calender By Id  : {0}",id);
        ResponseModel response = null;
        try{
            response = new ResponseModel<SastaCalender>();
            SastaCalender cl = selectSastaCalenderById(id);
            response.setData(cl);
            response.setStatus(true);
        }catch(Exception err){
            response = new ResponseModel<String>();
            response.setData(err.getMessage());
        }
        return response;
    }

    @Override
    public ResponseModel findAll() {
        LOGGER.debug("Reading Sasta Calender  : ");
        ResponseModel response = null;
        try{
            response = new ResponseModel<List<SastaCalender>>();
            response.setData(readSastaCalenderList());
            response.setStatus(true);
        }catch(Exception err){
            response = new ResponseModel<String>();
            response.setData(err.getMessage());
        }
        return response;
    }

    @Override
    public ResponseModel AddSastaCalender(SastaCalender cl) {
        LOGGER.debug("Creating  Sasta Calender : {0}", cl.toString());
        ResponseModel response = null;
        try{
            response = new ResponseModel<Boolean>();
            boolean flag = Create(cl) > 0 ? true : false;
            response.setStatus(flag);
            response.setData(flag == true ? "Sasta Calender Created Successfully!!" : "Unable to Create Sasta Calender!!");
        }catch(Exception err){
            response = new ResponseModel<String>();
            response.setData(err.getMessage());
        }
        return response;
    }

    @Override
    public ResponseModel UpdateSastaCalender(SastaCalender cl) {
        LOGGER.debug("Update Sasta Calender : {0}", cl.toString());
        ResponseModel response = null;
        try{
            response = new ResponseModel<Boolean>();
            boolean flag = Modify(cl);
            response.setStatus(flag);
            LOGGER.debug("Status : {0}", flag);
            response.setData(flag == true ? "Sasta Calender Updated Successfully!!" : "Unable to update Sasta Calender!!");
        }catch(Exception err){
            response = new ResponseModel<String>();
            response.setData(err.getMessage());
        }
        return response;
    }

    @Override
    public ResponseModel DeleteSastaCalender(Long id) {
        LOGGER.debug("Creating  Sasta Calender :{}", id);
        ResponseModel response = null;
        try{
            response = new ResponseModel<Boolean>();
            boolean flag = DeleteSastaCalenderById(id);
            response.setStatus(flag);
            response.setData(flag == true ? "Sasta Calender deleted Successfully!!" : "Unable to delete sasta calender!!");
        }catch(Exception err){
            response = new ResponseModel<String>();
            response.setData(err.getMessage());
        }
        return response;
    }

    @Override
    public ResponseModel GetDetailedCalender(Long id) {
        LOGGER.debug("Reading Detailed Sasta Calender  : ");
        ResponseModel response = null;
        try{
            response = new ResponseModel<List<DetailedSastaCalender>>();
            response.setData(readDetailedSastaCalenderById(id));
            response.setStatus(true);
        }catch(Exception err){
            response = new ResponseModel<String>();
            response.setData(err.getMessage());
        }
        return response;
    }

    @Override
    public ResponseModel AddDetailedCalender(DetailedSastaCalender rc) {
        LOGGER.debug("Creating Detailed Sasta Calender : {0}", rc.toString());
        ResponseModel response = null;
        try{
            response = new ResponseModel<Boolean>();
            boolean flag = CreateDetailedSastaCalender(rc) > 0 ? true : false;
            response.setStatus(flag);
            response.setData(flag == true ? "Detailed Sasta Calender Created Successfully!!" : "Unable to Create Detailed Sasta Calender!!");
        }catch(Exception err){
            response = new ResponseModel<String>();
            response.setData(err.getMessage());
        }
        return response;
    }

    @Override
    public ResponseModel UpdateDetailedCalender(DetailedSastaCalender rc) {
        LOGGER.debug("Update Detailed Sasta Calender : {0}", rc.toString());
        ResponseModel response = null;
        try{
            response = new ResponseModel<Boolean>();
            boolean flag = UpdateDetailedSastaCalender(rc);
            response.setStatus(flag);
            response.setData(flag == true ? "Detailed Sasta Calender Updated Successfully!!" : "Unable to update detailed Sasta Calender!!");
        }catch(Exception err){
            response = new ResponseModel<String>();
            response.setData(err.getMessage());
        }
        return response;
    }

    @Override
    public ResponseModel DeleteDetailedCalender(Long id) {
        LOGGER.debug("Deleting Detailed Sasta Calender :{}", id);
        ResponseModel response = null;
        try{
            response = new ResponseModel<Boolean>();
            boolean flag = DeleteDetailedSastaCalenderById(id);
            response.setStatus(flag);
            response.setData(flag == true ? "Detailed Sasta Calender deleted Successfully!!" : "Unable to delete detailed sasta calender!!");
        }catch(Exception err){
            response = new ResponseModel<String>();
            response.setData(err.getMessage());
        }
        return response;
    }

    /**
     * Update Sasta Calender
     * @param cl - news Sasta Calender
     * @return - true - successfully updated sasta calender , false - failed to update Sasta Calender
     */
    boolean Modify(SastaCalender cl){
        SimpleJdbcCall simplejdbcCall = new SimpleJdbcCall(jdbcTemplate).withProcedureName("update_sasta_calender")
                .declareParameters(
                        new SqlParameter("calender_title", Types.VARCHAR),
                        new SqlParameter("fy_id", Types.INTEGER),
                        new SqlParameter("modifiedby", Types.BIGINT),
                        new SqlParameter("calender_id", Types.BIGINT),
                        new SqlOutParameter("flag", Types.BIT)
                );
        Map<String, Object> inParamMap = new HashMap<String, Object>();
        inParamMap.put("calender_title", cl.getTitle());
        inParamMap.put("fy_id", cl.getFinancialId());
        inParamMap.put("modifiedby", cl.getCreatedBy());
        inParamMap.put("calender_id", cl.getId());
        SqlParameterSource paramMap = new MapSqlParameterSource(inParamMap);
        simplejdbcCall.compile();
        Map<String, Object> simpleJdbcCallResult = simplejdbcCall.execute(paramMap);
        if(!simpleJdbcCallResult.isEmpty())
            return (boolean)simpleJdbcCallResult.get("flag");
        else
            return false;
    }


    /**
     * Update Sasta Calender
     * @param cl - Sasta Calender object
     * @return - >0 - successfully created , 0 - failed to update Sasta Calender
     */
    Long Create(SastaCalender cl){
        SimpleJdbcCall simplejdbcCall = new SimpleJdbcCall(jdbcTemplate).withProcedureName("insert_sasta_calender")
                .declareParameters(
                        new SqlParameter("calender_title", Types.VARCHAR),
                        new SqlParameter("fy_id", Types.INTEGER),
                        new SqlParameter("createdby", Types.BIGINT),
                        new SqlOutParameter("id", Types.BIGINT)
                );
        Map<String, Object> inParamMap = new HashMap<String, Object>();
        inParamMap.put("calender_title", cl.getTitle());
        inParamMap.put("fy_id", cl.getFinancialId());
        inParamMap.put("createdby", cl.getCreatedBy());
        SqlParameterSource paramMap = new MapSqlParameterSource(inParamMap);
        simplejdbcCall.compile();
        Map<String, Object> simpleJdbcCallResult = simplejdbcCall.execute(paramMap);
        if(!simpleJdbcCallResult.isEmpty())
            return (Long)simpleJdbcCallResult.get("id");
        else
            return 0L;
    }


    /**
     * Delete Sasta Calender By Id
     * @param id
     * @return - true - deleted , false - fail to delete
     */
    private boolean DeleteSastaCalenderById(Long id) {
        SimpleJdbcCall simplejdbcCall = new SimpleJdbcCall(jdbcTemplate).withProcedureName("delete_sasta_calender")
                .declareParameters(
                        new SqlParameter("calender_id", Types.BIGINT),
                        new SqlOutParameter("flag", Types.BIT)
                );
        Map<String, Object> inParamMap = new HashMap<String, Object>();
        inParamMap.put("calender_id", id);
        SqlParameterSource paramMap = new MapSqlParameterSource(inParamMap);
        simplejdbcCall.compile();
        Map<String, Object> simpleJdbcCallResult = simplejdbcCall.execute(paramMap);
        if(!simpleJdbcCallResult.isEmpty())
            return (boolean)simpleJdbcCallResult.get("flag");
        else
            return false;
    }

    /**
     * Read Sasta Calender list
     * @return - Sasta Calender list
     */
    private List<SastaCalender> readSastaCalenderList() {
        List<SastaCalender> o = jdbcTemplate.query("call select_sasta_calender()", new SastaCalenderMapper());
        if(o.size()==0)
            return null;
        else {
            return o;
        }
    }

    /**
     *Read Sasta Calender By Id
     * @param id - Sasta Calender Id
     * @return - Sasta Calender
     */
    private SastaCalender selectSastaCalenderById(Long id){
        List<SastaCalender> o = new ArrayList<SastaCalender>();
        o = jdbcTemplate.query("call select_sasta_calender_by_id(?)", new Object[]{id}, new SastaCalenderMapper());
        if(o.size()==0)
            return null;
        else
            return o.get(0);
    }


    /**
     * Update Sasta Calender
     * @param cl - Sasta Calender object
     * @return - >0 - successfully created , 0 - failed to update Sasta Calender
     */
    Long CreateDetailedSastaCalender(DetailedSastaCalender cl){
        LOGGER.debug("Creating : {0}", cl);
        SimpleJdbcCall simplejdbcCall = new SimpleJdbcCall(jdbcTemplate).withProcedureName("insert_detailed_calender")
                .declareParameters(
                        new SqlParameter("calenderid", Types.BIGINT),
                        new SqlParameter("roundno", Types.VARCHAR),
                        new SqlParameter("startdate", Types.DATE),
                        new SqlParameter("enddate", Types.DATE),
                        new SqlParameter("gsdate", Types.DATE),
                        new SqlParameter("calender_remarks", Types.VARCHAR),
                        new SqlParameter("createdby", Types.BIGINT),
                        new SqlOutParameter("id", Types.BIGINT)
                );
        Map<String, Object> inParamMap = new HashMap<String, Object>();
        inParamMap.put("calender_remarks", cl.getRemarks());
        inParamMap.put("calenderid", cl.getCalenderId());
        inParamMap.put("roundno", cl.getRoundNo());
        inParamMap.put("startdate", cl.getStartDate());
        inParamMap.put("enddate", cl.getEndDate());
        inParamMap.put("gsdate", cl.getGsDate());
        inParamMap.put("createdby", cl.getCreatedBy());
        SqlParameterSource paramMap = new MapSqlParameterSource(inParamMap);
        simplejdbcCall.compile();
        Map<String, Object> simpleJdbcCallResult = simplejdbcCall.execute(paramMap);
        if(!simpleJdbcCallResult.isEmpty())
            return (Long)simpleJdbcCallResult.get("id");
        else
            return 0L;
    }


    /**
     * Update Sasta Calender
     * @param cl - Update Sasta Calender object
     * @return - > true - successfully created , false - failed to update Sasta Calender
     */
    boolean UpdateDetailedSastaCalender(DetailedSastaCalender cl){
        LOGGER.debug("Creating : {0}", cl);
        SimpleJdbcCall simplejdbcCall = new SimpleJdbcCall(jdbcTemplate).withProcedureName("update_detailed_calender")
                .declareParameters(
                        new SqlParameter("detailed_calender_id", Types.BIGINT),
                        new SqlParameter("calenderid", Types.BIGINT),
                        new SqlParameter("roundno", Types.VARCHAR),
                        new SqlParameter("startdate", Types.DATE),
                        new SqlParameter("enddate", Types.DATE),
                        new SqlParameter("gsdate", Types.DATE),
                        new SqlParameter("calender_remarks", Types.VARCHAR),
                        new SqlParameter("modifiedby", Types.BIGINT),
                        new SqlOutParameter("id", Types.BIGINT)
                );
        Map<String, Object> inParamMap = new HashMap<String, Object>();
        inParamMap.put("detailed_calender_id", cl.getId());
        inParamMap.put("calender_remarks", cl.getRemarks());
        inParamMap.put("calenderid", cl.getCalenderId());
        inParamMap.put("roundno", cl.getRoundNo());
        inParamMap.put("startdate", cl.getStartDate());
        inParamMap.put("enddate", cl.getEndDate());
        inParamMap.put("gsdate", cl.getGsDate());
        inParamMap.put("modifiedby", cl.getModifiedBy());
        SqlParameterSource paramMap = new MapSqlParameterSource(inParamMap);
        simplejdbcCall.compile();
        Map<String, Object> simpleJdbcCallResult = simplejdbcCall.execute(paramMap);
        if(!simpleJdbcCallResult.isEmpty())
            return (boolean)simpleJdbcCallResult.get("flag");
        else
            return false;
    }

    /**
     * Delete Sasta Calender By Id
     * @param id
     * @return - true - deleted , false - fail to delete
     */
    private boolean DeleteDetailedSastaCalenderById(Long id) {
        SimpleJdbcCall simplejdbcCall = new SimpleJdbcCall(jdbcTemplate).withProcedureName("delete_detailed_calender")
                .declareParameters(
                        new SqlParameter("detailed_calender_id", Types.BIGINT),
                        new SqlOutParameter("flag", Types.BIT)
                );
        Map<String, Object> inParamMap = new HashMap<String, Object>();
        inParamMap.put("detailed_calender_id", id);
        SqlParameterSource paramMap = new MapSqlParameterSource(inParamMap);
        simplejdbcCall.compile();
        Map<String, Object> simpleJdbcCallResult = simplejdbcCall.execute(paramMap);
        if(!simpleJdbcCallResult.isEmpty())
            return (boolean)simpleJdbcCallResult.get("flag");
        else
            return false;
    }

    /**
     * Read Detailed Sasta Calender By Id
     * @param id - Detailed Sasta Calender Id
     * @return - Detailed Sasta Calender
     */
    private List<DetailedSastaCalender> readDetailedSastaCalenderById(Long id){
        List<DetailedSastaCalender> o = new ArrayList<DetailedSastaCalender>();
        o = jdbcTemplate.query("call get_detailed_sasta_calender(?)", new Object[]{id}, new DetailedSastaCalenderMapper());
        return o;
    }

    protected static final class SastaCalenderMapper implements RowMapper {

        public Object mapRow(ResultSet set, int rowNo)throws SQLException {
            System.out.println("Read Row :" + rowNo);
            SastaCalender o = new SastaCalender();
            o.setId(set.getLong("id"));
            o.setTitle(StringUtils.trimToNull(set.getString("title")));
            o.setFinancialId(set.getInt("financial_year"));
            o.setFinancialName(StringUtils.trimToNull(set.getString("fy_name")));
            o.setCreatedDate(set.getTimestamp("created_date"));
            o.setModifiedDate(set.getTimestamp("modified_date"));
            o.setCreatedBy(set.getLong("created_by"));
            o.setModifiedBy(set.getLong("modified_by"));
            o.setCreatedByName(StringUtils.trimToNull(set.getString("created_by_name")));
            o.setModifiedByName(StringUtils.trimToNull(set.getString("modifed_by_name")));
            o.setIsActive(set.getBoolean("is_active"));
            LOGGER.debug("Recovery  : {}", o.toString());
            return o;
        }

    }

    protected static final class DetailedSastaCalenderMapper implements RowMapper {

        public Object mapRow(ResultSet set, int rowNo)throws SQLException {
            System.out.println("Read Row :" + rowNo);
            DetailedSastaCalender o = new DetailedSastaCalender();
            o.setId(set.getLong("id"));
            o.setCalenderId(set.getLong("calender_id"));
            o.setTitle(StringUtils.trimToNull(set.getString("title")));
            o.setFinancialYearId(set.getInt("financial_year"));
            o.setFinancialYearName(StringUtils.trimToNull(set.getString("fy_name")));
            o.setRoundNo(StringUtils.trimToNull(set.getString("round_no")));
            o.setStartDate(set.getTimestamp("start_date"));
            o.setEndDate(set.getTimestamp("end_date"));
            o.setGsDate(set.getTimestamp("gs_date"));
            o.setRemarks(StringUtils.trimToNull(set.getString("remarks")));
            o.setCreatedDate(set.getTimestamp("created_date"));
            o.setModifiedDate(set.getTimestamp("modified_date"));
            o.setCreatedBy(set.getLong("created_by"));
            o.setModifiedBy(set.getLong("modified_by"));
            o.setCreatedByName(StringUtils.trimToNull(set.getString("created_by_name")));
            o.setModifiedByName(StringUtils.trimToNull(set.getString("modifed_by_name")));
            o.setIsActive(set.getBoolean("is_active"));
            LOGGER.debug("Detailed Sasta Calender Mapper  : {}", o.toString());
            return o;
        }

    }


}
