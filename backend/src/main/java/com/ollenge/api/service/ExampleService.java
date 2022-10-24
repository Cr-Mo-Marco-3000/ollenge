package com.ollenge.api.service;

import com.ollenge.db.repository.ExampleRepository;
import com.ollenge.db.repository.ExampleRepositorySupport;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;


@Service
@AllArgsConstructor
public class ExampleService {

    private final ExampleRepository exampleRepository;
    private final ExampleRepositorySupport exampleRepositorySupport;

}
