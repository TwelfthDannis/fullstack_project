package com.example.back.service;

import com.example.back.model.Product;
import com.example.back.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.awt.*;

@Service
@RequiredArgsConstructor
public class ProductService {
    private final ProductRepository productRepository;

    public void save(Product product, MultipartFile file1) {
        productRepository.save(product);
    }

}
