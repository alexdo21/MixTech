package com.example.cs564.service;

import com.example.cs564.entity.SongEntity;
import com.example.cs564.entity.MatchEntity;
import com.example.cs564.request.CreateMatchRequest;
import com.example.cs564.response.DisplayMatchResponse;
import org.springframework.data.domain.Page;

import java.util.List;

/**
 * services related to matches
 */

public interface MatchService {
    Page<MatchEntity> getAllByPage(int page, int size);
    List<MatchEntity> getAll();
    void create(MatchEntity matchEntity);
    void create(String spotifyUri2, Long uid);
    void remove(Long mid);
    int addSong(String spotifyUri2, Long mid, Long uid);
    MatchEntity getByMid(Long mid);
    List<DisplayMatchResponse> displayMatchByUid(Long uid);
    List<DisplayMatchResponse> displayCompleteMatchByUid(Long uid);
    List<DisplayMatchResponse> displayIncompleteMatchByUid(Long uid);
    List<DisplayMatchResponse> displayMatchBySnmae(String sname);
}
