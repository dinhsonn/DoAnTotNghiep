package com.example.api.service;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.api.entity.Report;
import com.example.api.repository.ReportRepository;

@Service
public class ReportService {

    @Autowired
    private ReportRepository reportRepository;

    public Report submitReport(Report report) {
        return reportRepository.save(report);
    }

    public List<Report> getAllReports() {
        return reportRepository.findAll();
    }

    public List<Report> getReportsByOrderId(Long orderId) {
        return reportRepository.findByOrderId(orderId);
    }

    public List<Report> getReportsByUserId(Long userId) {
        return reportRepository.findByUserId(userId);
    }

    public Report respondToReport(Long reportId, String response) {
        Report report = reportRepository.findById(reportId).orElseThrow(() -> new RuntimeException("Report not found"));
        report.setResponse(response);
        report.setUpdatedAt(new Date());
        return reportRepository.save(report);
    }
}
