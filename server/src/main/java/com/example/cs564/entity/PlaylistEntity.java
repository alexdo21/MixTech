package com.example.cs564.entity;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "playlist")
@Data // lombok plug-in; generate getter and setter
public class PlaylistEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long pid;

    // need to use @Column annotation if name here differs from that in DB
    private String pname;
    private int privacy;
    private String description;

    public PlaylistEntity() {}

    public PlaylistEntity(String pname, int privacy, String description) {
        this.pname = pname;
        this.privacy = privacy;
        this.description = description;
    }
}
