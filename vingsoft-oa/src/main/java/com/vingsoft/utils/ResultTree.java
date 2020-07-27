package com.vingsoft.utils;



import java.util.List;


public class ResultTree {

    private ResultData status;

    private List<TreeModel> data;

    public ResultData getStatus() {
        return status;
    }

    public void setStatus(ResultData status) {
        this.status = status;
    }

    public List<TreeModel> getData() {
        return data;
    }

    public void setData(List<TreeModel> data) {
        this.data = data;
    }
}
