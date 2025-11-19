package com.yegecali.diffchecker.resource;

import com.fasterxml.jackson.annotation.JsonProperty;

public class DiffRequest {
    @JsonProperty("antes")
    public String antes;

    @JsonProperty("despues")
    public String despues;

    public DiffRequest() {}

    public DiffRequest(String antes, String despues) {
        this.antes = antes;
        this.despues = despues;
    }

    public String getAntes() {
        return antes;
    }

    public void setAntes(String antes) {
        this.antes = antes;
    }

    public String getDespues() {
        return despues;
    }

    public void setDespues(String despues) {
        this.despues = despues;
    }
}
