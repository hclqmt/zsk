package com.vingsoft.utils;

import java.util.List;

/**
 * 封装树实体
 */
public class TreeModel {

    private String id;
    private String title;
    private List<TreeModel> children;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public List<TreeModel> getChildren() {
        return children;
    }

    public void setChildren(List<TreeModel> children) {
        this.children = children;
    }
}
