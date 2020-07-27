package com.vingsoft.ikanalyzer.utils;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix = "lucene")
@Data
public class LuceneProperties {
    private String url;//索引路径
}
