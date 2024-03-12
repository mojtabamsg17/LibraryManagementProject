package com.example.librarymanagement.controllers.jasperReportController;


import com.example.librarymanagement.exceptions.jasperReportExceptions.JREInvalidType;
import com.example.librarymanagement.services.reportsService.JasperReportService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Objects;

@RestController
@RequestMapping("/reports")
//public class AppReportController {
//    private final JasperReportService jasperReportService;
//    public AppReportController(JasperReportService jasperReportService) {
//        this.jasperReportService = jasperReportService;
//    }
//    @GetMapping("jasperReports/{formatType}/{reportType}")
//    public String generateFoodReport(@PathVariable("formatType") String format ,
//                                     @PathVariable("reportType") String type) {
//        if (Objects.equals(format,"pdf")|| Objects.equals(format,"html")) {
//            if (Objects.equals(type, "book") ||
//                    Objects.equals(type, "user")) {
//                return jasperReportService.exportReport(format, type);
//            } else {
//                throw new JREInvalidType("Invalid Type For Jasper Report");
//            }
//        }else
//            throw new JREInvalidType("Please Only Select PDF Or HTML");
//    }
//}

public class AppReportController {
    private final JasperReportService jasperReportService;
    public AppReportController(JasperReportService jasperReportService) {
        this.jasperReportService = jasperReportService;
    }
    @GetMapping("jasperReports/{formatType}/{reportType}")
    public String generateFoodReport(@PathVariable("formatType") String format ,
                                     @PathVariable("reportType") String type) {
        if (Objects.equals(format,"pdf")|| Objects.equals(format,"html")) {
            if (Objects.equals(type, "book") ||
                    Objects.equals(type, "user") ||
                    Objects.equals(type, "requestLog")) {
                return jasperReportService.exportReport(format, type);
            } else {
                throw new JREInvalidType("Invalid Type For Jasper Report");
            }
        }else
            throw new JREInvalidType("Please Only Select PDF Or HTML");
    }
}