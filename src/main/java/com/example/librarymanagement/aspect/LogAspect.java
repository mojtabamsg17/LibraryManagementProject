package com.example.librarymanagement.aspect;



import com.example.librarymanagement.dao.EventRepository;
import com.example.librarymanagement.entities.Event;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.AfterThrowing;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Aspect
@Component
public class LogAspect {
    private final EventRepository mRepository;

    public LogAspect(EventRepository repository) {
        mRepository = repository;
    }

    @Pointcut("execution(* com(..))")
    public void allMethods() {}
    @AfterReturning(pointcut = "allMethods()")
    public void logAfterReturning(JoinPoint joinPoint) {

        Event event = new Event(joinPoint.getSignature().getName()+" method executed successfully at "+joinPoint.getTarget().getClass().getSimpleName()+" class",LocalDateTime.now().toString());
        mRepository.save(event);
    }
    @AfterThrowing(pointcut = "allMethods()", throwing = "exception")
    public void logAfterThrowing(JoinPoint joinPoint, Exception exception) {
        Event event = new Event(joinPoint.getSignature().getName()+" method can't executed at "+joinPoint.getTarget().getClass().getSimpleName()+" class because of "+exception.getCause().toString(),LocalDateTime.now().toString());
        mRepository.save(event);
    }
}