package com.example.back.repository;

import com.example.back.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository  extends JpaRepository<Product, Long> {
    List<Product> findById(Integer Id);
}
