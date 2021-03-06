package com.example.cs564.entity;

import com.example.cs564.entity.key.FollowsKey;
import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.Table;

/**
 * follows table
 */

@Entity
@IdClass(FollowsKey.class)
@Table(name = "follows")
@Data
public class FollowsEntity {
    @Id
    private Long pid;
    @Id
    private Long uid;

    private int access;

    public FollowsEntity() {}

    public FollowsEntity(Long pid, Long uid, int access) {
        this.pid = pid;
        this.uid = uid;
        this.access = access;
    }
}
