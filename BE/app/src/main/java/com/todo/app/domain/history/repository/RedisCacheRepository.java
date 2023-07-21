package com.todo.app.domain.history.repository;

import com.todo.app.domain.history.entity.History;
import java.util.Collections;
import java.util.List;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class RedisCacheRepository {
    private static final String HISTORY_KEY = "history";
    private final RedisTemplate<String, History> redisTemplate;

    public RedisCacheRepository(RedisTemplate<String, History> redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    public void saveHistory(History history) {
        redisTemplate.opsForList().rightPush(HISTORY_KEY, history);
    }

    public List<History> findAllHistory() {
        final Long size = redisTemplate.opsForList().size(HISTORY_KEY);
        if (size == 0L) {
            return Collections.emptyList();
        }

        return redisTemplate.opsForList().leftPop(HISTORY_KEY, size);
    }
}