package com.example.cs564.entity;

import com.example.cs564.entity.key.CreatesKey;
import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.Table;

/**
 * creates table
 */

@Entity
@IdClass(CreatesKey.class)
@Table(name = "creates")
@Data
public class CreatesEntity {
    @Id
    private Long uid;
    @Id
    private Long mid;

    public CreatesEntity() {}

    public CreatesEntity(Long uid, Long mid) {
        this.uid = uid;
        this.mid = mid;
    }
}
