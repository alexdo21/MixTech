package com.example.cs564.dao.Impl;

import com.example.cs564.dao.IncludesDao;
import com.example.cs564.entity.SongEntity;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Repository
public class IncludesDaoImpl implements IncludesDao {
    @PersistenceContext
    private EntityManager em;

    @Override
    public List<SongEntity> findAllByPid(Long pid) {
        return em.createNativeQuery("select s.* from song s, include i " +
                "where i.pid = ?1 and i.spotifyUri = s.spotifyUri", SongEntity.class)
                .setParameter(1, pid).getResultList();
    }
}