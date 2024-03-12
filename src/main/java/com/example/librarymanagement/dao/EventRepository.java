package com.example.librarymanagement.dao;



import com.example.librarymanagement.entities.Event;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class EventRepository {
    private JdbcTemplate mJdbcTemplate;

    public EventRepository(JdbcTemplate jdbcTemplate) {
        mJdbcTemplate = jdbcTemplate;
    }
    public boolean save(Event event) {
//        String sql = "INSERT INTO event_book_table (EVENT_ID,EVENT_DESCRIPTION ,EVENT_TIME) VALUES (seq_event.nextval,?,?)";
//        return mJdbcTemplate.update(sql, event.getDescription(), event.getTime()) > 0;
        return false;
    }
}
