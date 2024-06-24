    package com.example.api.service.impl;

    import lombok.AllArgsConstructor;

    import org.springframework.data.domain.Page;
    import org.springframework.data.domain.Pageable;
    import org.springframework.stereotype.Service;
    import com.example.api.entity.About;
    import com.example.api.service.AboutService;
    import com.example.api.repository.AboutRepository;

    import java.util.Date;
    import java.util.Optional;

    @Service
    @AllArgsConstructor
    public class AboutServiceImpl implements AboutService {

        private final AboutRepository aboutRepository;

        @Override
        public About createAbout(About about) {
            about.setCreatedAt(new Date());
            return aboutRepository.save(about);
        }

        @Override
        public About getAboutById(Long aboutId) {
            Optional<About> optionalAbout = aboutRepository.findById(aboutId);
            return optionalAbout.orElse(null);
        }

        @Override
        public Page<About> getAllAbouts(Pageable pageable) {
            return aboutRepository.findAll(pageable);
        }

        @Override
        public About updateAbout(About about) {
            About existingAbout = aboutRepository.findById(about.getId()).orElse(null);
            if (existingAbout != null) {
                existingAbout.setTitle(about.getTitle());
                existingAbout.setContent(about.getContent());
                existingAbout.setLayout(about.getLayout());
                existingAbout.setUpdatedAt(new Date());
                existingAbout.setDeletedAt(new Date());
                return aboutRepository.save(existingAbout);
            }
            return null;
        }

        @Override
        public void deleteAbout(Long aboutId) {
            aboutRepository.deleteById(aboutId);
        }
    }
