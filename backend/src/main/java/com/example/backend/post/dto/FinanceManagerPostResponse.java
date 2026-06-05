package com.example.backend.post.dto;

import lombok.Data;

@Data
public class FinanceManagerPostResponse {
    private String postId;
    private String title;
    private String description;
    private String imageUrl;
    private String recipientId;
    private String recipientName;
    private String recipientAccountNo;
    private String postCategory;
    private String postUrgency;
    private double currentAmount;
    private double totalAmount;
    private double remainingAmount;
    private double remainingPercent;
    private boolean disbursed;
    private boolean fullyFunded;
}
