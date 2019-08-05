package com.example.cs564.service.impl;

import com.example.cs564.dao.MatchRepo;
import com.example.cs564.entity.MatchEntity;
import com.example.cs564.service.MatchService;
import org.hibernate.validator.constraints.URL;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("MatchService")
public class MatchServiceImpl implements MatchService{
    @Autowired
    private MatchRepo matchRepo;

    @Override
    public Page<MatchEntity> getAllByPage(int page, int size) {
        Sort sort = new Sort(Sort.Direction.DESC, "mid");
        Pageable pageable = PageRequest.of(page, size, sort);
        return matchRepo.findAll(pageable);
    }

    @Override
    public List<MatchEntity> getAll() {
        return matchRepo.findAll();
    }

    @Override
    public void create(MatchEntity matchEntity) {
        matchRepo.save(matchEntity);
    }

    @Override
    public void remove(Long mid) {
        matchRepo.deleteById(mid);
    }
}