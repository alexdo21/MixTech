package com.example.cs564.request;

import lombok.Data;

@Data
public class CreateMatchRequest {
    String mname;
    String spotifyUri1;

    public CreateMatchRequest() {

    }

    public CreateMatchRequest(String mname, String spotifyUri1) {
        this.mname = mname;
        this.spotifyUri1 = spotifyUri1;
    }
}