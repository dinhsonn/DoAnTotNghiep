package com.example.api.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.example.api.entity.Post;

public interface PostService {
    Post createPost(Post post);

    Post getPostById(Long postId);

    Page<Post> getAllPosts(Pageable pageable);

    Post updatePost(Post post);

    void deletePost(Long postId);

    Page<Post> getPostsByTopicId(Long topicId, Pageable pageable);
    
}
