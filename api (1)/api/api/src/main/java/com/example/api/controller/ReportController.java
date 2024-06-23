package com.example.api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.api.entity.Report;
import com.example.api.service.ReportService;

@RestController
@RequestMapping("/api/reports")
@CrossOrigin(origins = "*", exposedHeaders = "Content-Range")

public class ReportController {

    @Autowired
    private ReportService reportService;

    @PostMapping
    public ResponseEntity<Report> submitReport(@RequestBody Report report) {
        return ResponseEntity.ok(reportService.submitReport(report));
    }

    @GetMapping
    public ResponseEntity<List<Report>> getAllReports() {
        return ResponseEntity.ok(reportService.getAllReports());
    }

    @GetMapping("/order/{orderId}")
    public ResponseEntity<List<Report>> getReportsByOrderId(@PathVariable Long orderId) {
        return ResponseEntity.ok(reportService.getReportsByOrderId(orderId));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Report>> getReportsByUserId(@PathVariable Long userId) {
        return ResponseEntity.ok(reportService.getReportsByUserId(userId));
    }

    @PostMapping("/{reportId}/response")
    public ResponseEntity<Report> respondToReport(@PathVariable Long reportId, @RequestBody String response) {
        return ResponseEntity.ok(reportService.respondToReport(reportId, response));
    }
}
