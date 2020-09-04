package com.vingsoft.oa;

import redis.clients.jedis.Jedis;

public class redis {
    public static void main(String[] args) {
        Jedis jedis = new Jedis("101.132.106.182",6002);
        jedis.set("hcl1","hcl1");
        jedis.ping();
    }
}
