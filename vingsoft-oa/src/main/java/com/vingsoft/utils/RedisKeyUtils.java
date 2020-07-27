package com.vingsoft.utils;

public class RedisKeyUtils {

    //保存用户阅读量数据的key
    public static final String PERSON_READ_COUNT = "PERSON_READ_COUNT";

    //保存用户好评量数据的key
    public static final String PERSON_GOOD_PRAISE_COUNT = "PERSON_GOOD_PRAISE_COUNT";

    //保存用户差评评量数据的key
    public static final String PERSON_BAD_PRAISE_COUNT = "PERSON_BAD_PRAISE_COUNT";

    /**
     * 拼接用户id和知识的id作为key。格式 222222::333333
     * @param userId 用户ID
     * @param knowledgeUuid 知识ID
     * @return
     */
    public static String getRuleKey(String userId, String knowledgeUuid,String value){
        StringBuilder builder = new StringBuilder();
        builder.append(userId);
        builder.append("::");
        builder.append(knowledgeUuid);
        builder.append("::");
        builder.append(value);
        return builder.toString();
    }
}
