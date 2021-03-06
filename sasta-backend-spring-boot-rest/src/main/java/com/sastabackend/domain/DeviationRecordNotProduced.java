package com.sastabackend.domain;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.sql.Date;
import java.sql.Timestamp;

/**
 * Created by Sarvaratchagan on 10/13/2016.
 */

public class DeviationRecordNotProduced  implements CommonProperties {

    private Long id;
    private Long audit_id;

    private Integer works_takenup_without_gb_approval_count;
    private java.math.BigDecimal works_takenup_without_gb_approval_amt;
    private Integer estimates_not_produced_for_audit_count;
    private java.math.BigDecimal estimates_not_produced_for_audit_amt;
    private Integer AS_not_produced_for_audit_count;
    private java.math.BigDecimal AS_not_produced_for_audit_amt;
    private Integer TS_not_produced_for_audit_count;
    private java.math.BigDecimal TS_not_produced_for_audit_amt;
    private Integer others_count;
    private java.math.BigDecimal others_amt;

    private java.sql.Timestamp created_date;
    private java.sql.Timestamp modified_date;
    private Long created_by;
    private Long modified_by;
    private Boolean is_active;

    private String created_by_Name;
    private String modified_by_Name;

    private Integer round_id;
    private String round_name;
    private java.sql.Date round_start_date;
    private java.sql.Date round_end_date;
    private String round_description;
    private Integer audit_district_id;
    private String district_name;
    private String financial_year;
    private String financial_description;
    private Integer block_id;
    private String block_name;
    private Integer vp_id;
    private String vp_name;

    public DeviationRecordNotProduced(){}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getAuditId() {
        return audit_id;
    }

    public void setAuditId(Long audit_id) {
        this.audit_id = audit_id;
    }

    public Integer getWorksTakenUpWithoutGbApprovalCount() {
        return works_takenup_without_gb_approval_count;
    }

    public void setWorksTakenUpWithoutGbApprovalCount(Integer works_takenup_without_gb_approval_count) {
        this.works_takenup_without_gb_approval_count = works_takenup_without_gb_approval_count;
    }

    public BigDecimal getWorksTakenUpWithoutGbApprovalAmt() {
        return works_takenup_without_gb_approval_amt;
    }

    public void setWorksTakenUpWithoutGbApprovalAmt(BigDecimal works_takenup_without_gb_approval_amt) {
        this.works_takenup_without_gb_approval_amt = works_takenup_without_gb_approval_amt;
    }

    public Integer getEstimatesNotProducedForAuditCount() {
        return estimates_not_produced_for_audit_count;
    }

    public void setEstimatesNotProducedForAuditCount(Integer estimates_not_produced_for_audit_count) {
        this.estimates_not_produced_for_audit_count = estimates_not_produced_for_audit_count;
    }

    public BigDecimal getEstimatesNotProducedForAuditAmt() {
        return estimates_not_produced_for_audit_amt;
    }

    public void setEstimatesNotProducedForAuditAmt(BigDecimal estimates_not_produced_for_audit_amt) {
        this.estimates_not_produced_for_audit_amt = estimates_not_produced_for_audit_amt;
    }

    public Integer getASNotProducedForAuditCount() {
        return AS_not_produced_for_audit_count;
    }

    public void setASNotProducedForAuditCount(Integer AS_not_produced_for_audit_count) {
        this.AS_not_produced_for_audit_count = AS_not_produced_for_audit_count;
    }

    public BigDecimal getASNotProducedForAuditAmt() {
        return AS_not_produced_for_audit_amt;
    }

    public void setASNotProducedForAuditAmt(BigDecimal AS_not_produced_for_audit_amt) {
        this.AS_not_produced_for_audit_amt = AS_not_produced_for_audit_amt;
    }

    public Integer getTSNotProducedForAuditCount() {
        return TS_not_produced_for_audit_count;
    }

    public void setTSNotProducedForAuditCount(Integer TS_not_produced_for_audit_count) {
        this.TS_not_produced_for_audit_count = TS_not_produced_for_audit_count;
    }

    public BigDecimal getTSNotProducedForAuditAmt() {
        return TS_not_produced_for_audit_amt;
    }

    public void setTSNotProducedForAuditAmt(BigDecimal TS_not_produced_for_audit_amt) {
        this.TS_not_produced_for_audit_amt = TS_not_produced_for_audit_amt;
    }


    public Integer getOthersCount() {
        return this.others_count;
    }

    public void setOthersCount(Integer others_count) {
        this.others_count = others_count;
    }

    public BigDecimal getOthersAmount() {
        return this.others_amt;
    }

    public void setOthersAmount(BigDecimal others_amt) {
        this.others_amt = others_amt;
    }

    @Override
    public Timestamp getCreatedDate() {
        return this.created_date;
    }

    @Override
    public void setCreatedDate(Timestamp created_date) {
        this.created_date = created_date;
    }

    @Override
    public Timestamp getModifiedDate() {
        return this.modified_date;
    }

    @Override
    public void setModifiedDate(Timestamp modified_date) {
        this.modified_date = modified_date;
    }

    @Override
    public Long getCreatedBy() {
        return this.created_by;
    }

    @Override
    public void setCreatedBy(Long created_by) {
        this.created_by = created_by;
    }

    @Override
    public Long getModifiedBy() {
        return this.modified_by;
    }

    @Override
    public void setModifiedBy(Long modified_by) {
        this.modified_by = modified_by;
    }

    @Override
    public Boolean getStatus() {
        return this.is_active;
    }

    @Override
    public void setStatus(Boolean is_active) {
        this.is_active = is_active;
    }

    @Override
    public String getCreatedByName() {
        return this.created_by_Name;
    }

    @Override
    public void setCreatedByName(String createByName) {
        this.created_by_Name = createByName;
    }

    @Override
    public String getModifiedByName() {
        return this.modified_by_Name;
    }
    @Override
    public void setModifiedByName(String modifiedByName) {
        this.modified_by_Name = modifiedByName;
    }


    public Integer getRoundId() {
        return round_id;
    }

    public void setRoundId(Integer round_id) {
        this.round_id = round_id;
    }

    public String getRoundName() {
        return round_name;
    }

    public void setRoundName(String round_name) {
        this.round_name = round_name;
    }

    public Date getRoundStartDate() {
        return round_start_date;
    }

    public void setRoundStartDate(Date round_start_date) {
        this.round_start_date = round_start_date;
    }

    public Date getRoundEndDate() {
        return round_end_date;
    }

    public void setRoundEndDate(Date round_end_date) {
        this.round_end_date = round_end_date;
    }

    public String getRoundDescription() {
        return round_description;
    }

    public void setRoundDescription(String round_description) {
        this.round_description = round_description;
    }

    public Integer getAuditDistrictId() {
        return audit_district_id;
    }

    public void setAuditDistrictId(Integer audit_district_id) {
        this.audit_district_id = audit_district_id;
    }

    public String getDistrictName() {
        return district_name;
    }

    public void setDistrictName(String district_name) {
        this.district_name = district_name;
    }

    public String getFinancialYear() {
        return financial_year;
    }

    public void setFinancialYear(String financial_year) {
        this.financial_year = financial_year;
    }

    public String getFinancialDescription() {
        return financial_description;
    }

    public void setFinancialDescription(String financial_description) {
        this.financial_description = financial_description;
    }

    public Integer getBlockId() {
        return block_id;
    }

    public void setBlockId(Integer block_id) {
        this.block_id = block_id;
    }

    public String getBlockName() {
        return block_name;
    }

    public void setBlockName(String block_name) {
        this.block_name = block_name;
    }

    public Integer getVpId() {
        return vp_id;
    }

    public void setVpId(Integer vp_id) {
        this.vp_id = vp_id;
    }

    public String getVpName() {
        return vp_name;
    }

    public void setVpName(String vp_name) {
        this.vp_name = vp_name;
    }

    @Override
    public String toString() {
        return "DeviationRecordNotProduced{" +
                "id=" + id +
                ", works_takenup_without_gb_approval_count=" + works_takenup_without_gb_approval_count +
                ", works_takenup_without_gb_approval_amt=" + works_takenup_without_gb_approval_amt +
                ", estimates_not_produced_for_audit_count=" + estimates_not_produced_for_audit_count +
                ", estimates_not_produced_for_audit_amt=" + estimates_not_produced_for_audit_amt +
                ", AS_not_produced_for_audit_count=" + AS_not_produced_for_audit_count +
                ", AS_not_produced_for_audit_amt=" + AS_not_produced_for_audit_amt +
                ", TS_not_produced_for_audit_count=" + TS_not_produced_for_audit_count +
                ", TS_not_produced_for_audit_amt=" + TS_not_produced_for_audit_amt +
                ", others_count=" + others_count +
                ", others_amt=" + others_amt +
                ", created_date=" + created_date +
                ", modified_date=" + modified_date +
                ", created_by=" + created_by +
                ", modified_by=" + modified_by +
                ", is_active=" + is_active +
                ", created_by_Name='" + created_by_Name + '\'' +
                ", modified_by_Name='" + modified_by_Name + '\'' +
                ", round_id=" + round_id +
                ", round_name='" + round_name + '\'' +
                ", round_start_date=" + round_start_date +
                ", round_end_date=" + round_end_date +
                ", round_description='" + round_description + '\'' +
                ", audit_district_id=" + audit_district_id +
                ", district_name='" + district_name + '\'' +
                ", financial_year='" + financial_year + '\'' +
                ", financial_description='" + financial_description + '\'' +
                ", block_id=" + block_id +
                ", block_name='" + block_name + '\'' +
                ", vp_id=" + vp_id +
                ", vp_name='" + vp_name + '\'' +
                '}';
    }
}
