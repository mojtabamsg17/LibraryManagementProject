package com.example.librarymanagement.services.reportsService;


import com.example.librarymanagement.entities.Book;
import com.example.librarymanagement.entities.User;
import com.example.librarymanagement.exceptions.jasperReportExceptions.JREInvalidType;
import com.example.librarymanagement.services.BookService;
import com.example.librarymanagement.services.UserService;
import net.sf.jasperreports.engine.*;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import org.springframework.stereotype.Service;
import org.springframework.util.ResourceUtils;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class JasperReportService {
    private final BookService menuItemRepository;
    private final UserService mUserService;

    public JasperReportService(BookService menuItemRepository, UserService userService) {
        this.menuItemRepository = menuItemRepository;
        mUserService = userService;
    }

    public String exportReport(String reportFormat , String type) {
        String reportPath = "C:\\Reports";
        JasperReport report;
        Map<String, Object> parameters = new HashMap<>();
        parameters.put("Created By ", "Mj");
        JRBeanCollectionDataSource dataSource;
        try {
            if (type.equalsIgnoreCase("book")) {
                List<Book> books = menuItemRepository.findAll();
                File file = ResourceUtils.getFile("classpath:books.jrxml");
                report = JasperCompileManager.compileReport(file.getAbsolutePath());
                dataSource = new JRBeanCollectionDataSource(books);
            } else if (type.equalsIgnoreCase("user")) {
                List<User> users = mUserService.findAll();
                File file = ResourceUtils.getFile("classpath:User.jrxml");
                report = JasperCompileManager.compileReport(file.getAbsolutePath());
                dataSource = new JRBeanCollectionDataSource(users);
            }  else {
                throw new JREInvalidType("No valid type found: " + type);
            }
            JasperPrint print = JasperFillManager.fillReport(report, parameters, dataSource);
            if (reportFormat.equalsIgnoreCase("pdf")) {
                JasperExportManager.exportReportToPdfFile(print, reportPath + "\\"+ type +".pdf");
            } else if (reportFormat.equalsIgnoreCase("html")) {
                JasperExportManager.exportReportToHtmlFile(print, reportPath + "\\user.html");
            } else {
                throw new JREInvalidType("Invalid report format: " + reportFormat);
            }
        } catch (FileNotFoundException | JRException e) {
            return "File or path not found. Please check the path.";
        }
        return reportPath;
    }
}