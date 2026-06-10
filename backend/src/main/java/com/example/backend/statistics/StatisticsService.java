package com.example.backend.statistics;

import com.example.backend.payment.PaymentRepository;
import com.example.backend.payment.PaymentType;
import com.example.backend.payment.model.Payment;
import com.example.backend.post.repository.PostRepository;
import com.example.backend.user.model.Recipient;
import com.example.backend.user.model.User;
import com.example.backend.user.repository.DonorRepository;
import com.example.backend.user.repository.RecipientRepository;
import com.example.backend.user.repository.UserRepository;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class StatisticsService {

    private final UserRepository userRepository;
    private final RecipientRepository recipientRepository;
    private final DonorRepository donorRepository;
    private final PostRepository postRepository;
    private final PaymentRepository paymentRepository;
    private final MongoTemplate mongoTemplate;

    public StatisticsService(
            UserRepository userRepository,
            RecipientRepository recipientRepository,
            DonorRepository donorRepository,
            PostRepository postRepository,
            PaymentRepository paymentRepository,
            MongoTemplate mongoTemplate
    ) {
        this.userRepository = userRepository;
        this.recipientRepository = recipientRepository;
        this.donorRepository = donorRepository;
        this.postRepository = postRepository;
        this.paymentRepository = paymentRepository;
        this.mongoTemplate = mongoTemplate;
    }

    public Map<String, Object> getStatistics() {
        long totalUsers = userRepository.count();
        long totalAdmins = mongoTemplate.count(Query.query(Criteria.where("roles").is(User.Role.ADMIN.name())), User.class);
        long totalSuperAdmins = mongoTemplate.count(Query.query(Criteria.where("roles").is(User.Role.SUPERADMIN.name())), User.class);
        long totalVerifiers = mongoTemplate.count(Query.query(Criteria.where("roles").is(User.Role.VERIFIER.name())), User.class);
        long totalFinanciers = mongoTemplate.count(Query.query(Criteria.where("roles").is(User.Role.FINANCE_MANAGER.name())), User.class);
        long totalDonors = donorRepository.count();
        long totalRecipients = recipientRepository.count();

        long totalVerifiedRecipients = mongoTemplate.count(Query.query(Criteria.where("verificationStatus").is(Recipient.VerificationStatus.VERIFIED.name())), Recipient.class);
        long totalUnverifiedRecipients = mongoTemplate.count(Query.query(Criteria.where("verificationStatus").is(Recipient.VerificationStatus.UNVERIFIED.name())), Recipient.class);
        long totalFraudRecipients = mongoTemplate.count(Query.query(Criteria.where("verificationStatus").is(Recipient.VerificationStatus.FRAUD.name())), Recipient.class);

        long totalPosts = postRepository.count();
        List<Payment> paidPostPayments = paymentRepository.findByTypeAndStatus(PaymentType.POST, "PAID");
        double totalDonationAmountMade = paidPostPayments.stream().mapToDouble(Payment::getAmount).sum();
        long totalDonationsMade = paidPostPayments.size();
        long totalDonationsReceived = totalDonationsMade;
        double totalDonationAmountReceived = totalDonationAmountMade;

        double totalPoolCredits = paymentRepository.findByTypeAndStatus(PaymentType.POOL, "PAID")
                .stream()
                .mapToDouble(Payment::getAmount)
                .sum();
        double totalPoolDebits = paymentRepository.findByTypeAndStatus(PaymentType.POOL_TRANSFER, "PAID")
                .stream()
                .mapToDouble(Payment::getAmount)
                .sum();
        double totalPoolAmount = Math.max(0, totalPoolCredits - totalPoolDebits);

        Map<String, Object> stats = new HashMap<>();
        stats.put("totalUsers", totalUsers);
        stats.put("totalAdmins", totalAdmins);
        stats.put("totalSuperAdmins", totalSuperAdmins);
        stats.put("totalRecipients", totalRecipients);
        stats.put("totalDonors", totalDonors);
        stats.put("totalVerifiers", totalVerifiers);
        stats.put("totalFinanciers", totalFinanciers);
        stats.put("totalVerifiedRecipients", totalVerifiedRecipients);
        stats.put("totalUnverifiedRecipients", totalUnverifiedRecipients);
        stats.put("totalFraudRecipients", totalFraudRecipients);
        stats.put("totalPoolAmount", totalPoolAmount);
        stats.put("totalDonationsReceived", totalDonationsReceived);
        stats.put("totalDonationAmountReceived", totalDonationAmountReceived);
        stats.put("totalDonationsMade", totalDonationsMade);
        stats.put("totalDonationAmountMade", totalDonationAmountMade);
        stats.put("totalPosts", totalPosts);

        return stats;
    }
}
