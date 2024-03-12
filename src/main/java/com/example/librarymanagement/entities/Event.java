package com.example.librarymanagement.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "event_finallibrary")
public class Event {
    @Id
    @SequenceGenerator(name = "finalLibraryEvent_sequence", sequenceName = "EventSequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "finalLibraryEvent_sequence")
    private Long id;

    private String description;

    private String time;

    public Event() {
    }

    public Event(String description, String time) {
        this.description = description;
        this.time = time;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }
}
