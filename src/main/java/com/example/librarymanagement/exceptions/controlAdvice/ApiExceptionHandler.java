package com.example.librarymanagement.exceptions.controlAdvice;//package com.example.libraryfinalproject.exceptions.ControlAdvice;
//
//import com.ctc.wstx.shaded.msv_core.verifier.ErrorInfo;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.ControllerAdvice;
//import org.springframework.web.bind.annotation.ExceptionHandler;
//import org.springframework.web.client.HttpClientErrorException;
//import org.springframework.web.client.HttpServerErrorException;
//
//@ControllerAdvice
//public class ApiExceptionHandler {
//    @ExceptionHandler(ApiRequestException.class)
//    public ResponseEntity<Object> handleMultiStateApiRequestException(ApiRequestException e){
//        ErrorInfo errorInfo = new ErrorInfo(e.getMessage(),-1);
//        return new ResponseEntity<>(errorInfo,HttpStatus.MULTI_STATUS);
//    }
//
//    @ExceptionHandler(HttpClientErrorException.BadRequest.class)
//    public ResponseEntity<Object> handleBadRequestApiRequestException(ApiRequestException e){
//        ErrorInfo errorInfo = new ErrorInfo(e.getMessage(),-1);
//        return new ResponseEntity<>(errorInfo,HttpStatus.BAD_REQUEST);
//
//    }
//
//    @ExceptionHandler(HttpClientErrorException.NotFound.class)
//    public ResponseEntity<Object> handleNotFoundApiRequestException(ApiRequestException e){
//        ErrorInfo errorInfo = new ErrorInfo(e.getMessage(),-1);
//        return new ResponseEntity<>(errorInfo,HttpStatus.NOT_FOUND);
//
//    }
//
//    @ExceptionHandler(HttpServerErrorException.InternalServerError.class)
//    public ResponseEntity<Object> handleInternalErrorApiRequestException(ApiRequestException e){
//        ErrorInfo errorInfo = new ErrorInfo(e.getMessage(),-1);
//        return new ResponseEntity<>(errorInfo,HttpStatus.INTERNAL_SERVER_ERROR);
//
//    }
//
////    @ExceptionHandler(ItemDoesNotExistException.class)
////    public @ResponseBody Integer
////    handleSQLException(Exception ex) {
////        return -1;
////    }
////
////    @ExceptionHandler({NotLogin.class, InvalidUsername.class, AccessError.class})
////    public @ResponseBody Integer
////    handleLoginException(Exception ex) {
////        return -1;
////    }
////
////
////    @ExceptionHandler({JREInvalidType.class, NoResultException.class})
////    public ErrorInfo handleJasperReportException(Exception e) {
////        return new ErrorInfo(e.getMessage(),-1);
////    }
////
////
////
////    @ExceptionHandler({UserException.class})
////    public @ResponseBody Integer
////    handleUserException(Exception ex) {
////        return -1;
////    }
////
////    @ExceptionHandler(MenuException.class)
////    public ResponseEntity<Object> handleMenuItemException(MenuException e) {
////        ErrorInfo menuException = new ErrorInfo(e.getMessage(),-1);
////        return new ResponseEntity<>(menuException, HttpStatus.MULTI_STATUS);
////    }
//}
//
//
//
