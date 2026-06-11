package com.example.backend.user.controller;

import com.example.backend.user.dto.DonorAdminViewDTO;
import com.example.backend.user.service.DonorService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/admin/get/all/donors")
public class DonorController {

    private final DonorService donorService;

    public DonorController(DonorService donorService) {
        this.donorService = donorService;
    }

    @GetMapping
    public List<DonorAdminViewDTO> getAllDonors() {
        return donorService.getAllDonorsForAdmin();
    }
}