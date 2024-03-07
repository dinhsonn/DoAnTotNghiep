package com.example.api.service.impl;

import lombok.AllArgsConstructor;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.example.api.entity.Post;
import com.example.api.service.PostService;
import com.example.api.repository.PostRepository;

import java.util.Date;
import java.util.Optional;

@Service
@AllArgsConstructor
public class PostServiceImpl implements PostService {

    private PostRepository postRepository;

    @Override
    public Post createPost(Post post) {
        post.setCreatedAt(new Date());
        return postRepository.save(post);
    }

    @Override
    public Post getPostById(Long postId) {
        Optional<Post> optionalPost = postRepository.findById(postId);
        return optionalPost.orElse(null);
    }

    @Override
    public Page<Post> getAllPosts(Pageable pageable) {
        return postRepository.findAll(pageable);
    }

    @Override
    public Post updatePost(Post post) {
        Post existingPost = postRepository.findById(post.getId()).orElse(null);
        if (existingPost != null) {
            existingPost.setTopicId(post.getTopicId());
            existingPost.setTitle(post.getTitle());
            existingPost.setSlug(post.getSlug());
            existingPost.setDetail(post.getDetail());
            existingPost.setImage(post.getImage());
            existingPost.setType(post.getType());
            existingPost.setStatus(post.getStatus());
            existingPost.setCreatedAt(post.getCreatedAt());
            existingPost.setUpdatedAt(post.getUpdatedAt());

            Post updatedPost = postRepository.save(existingPost);
            return updatedPost;
        }
        return null;
    }

    @Override
    public void deletePost(Long postId) {
        postRepository.deleteById(postId);
    }

    @Override
    public Page<Post> getPostsByTopicId(Long topicId, Pageable pageable) {
        return postRepository.findByTopicId(topicId, pageable);
    }
}
