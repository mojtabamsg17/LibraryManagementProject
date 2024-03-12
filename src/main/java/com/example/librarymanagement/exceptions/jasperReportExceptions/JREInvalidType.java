package com.example.librarymanagement.exceptions.jasperReportExceptions;
public class JREInvalidType extends RuntimeException {
    public JREInvalidType(String reportName) {
        super("Cannot Build "+reportName+ " With This Type");
    }
}