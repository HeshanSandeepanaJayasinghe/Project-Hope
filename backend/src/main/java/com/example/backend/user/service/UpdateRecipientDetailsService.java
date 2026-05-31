package com.example.backend.user.service;

import com.example.backend.authentication.CustomUserDetails;
import com.example.backend.user.dto.UpdateRecipientDTO;
import com.example.backend.user.model.Recipient;
import com.example.backend.user.model.User;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class UpdateRecipientDetailsService {

    private final MongoTemplate mongoTemplate;
    private final PasswordEncoder passwordEncoder;

    public UpdateRecipientDetailsService(
            MongoTemplate mongoTemplate,
            PasswordEncoder passwordEncoder
    ) {
        this.mongoTemplate = mongoTemplate;
        this.passwordEncoder = passwordEncoder;
    }

    public Map<String, String> updateRecipientDetails(
            String recipientId,
            UpdateRecipientDTO updateRecipientDTO
    ) {

        if (recipientId == null) {
            CustomUserDetails userDetails = (CustomUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            recipientId = userDetails.getUserId();
        }

        // Update User collection (password only)
        Query userQuery = new Query(Criteria.where("_id").is(recipientId));
        Update userUpdate = new Update();

        if (updateRecipientDTO.getPassword() != null) {
            userUpdate.set("password", passwordEncoder.encode(updateRecipientDTO.getPassword()));
        }

        if (!userUpdate.getUpdateObject().isEmpty()) {
            mongoTemplate.updateFirst(userQuery, userUpdate, User.class);
        }

        // Update Recipient collection (only editable fields)
        Query recipientQuery = new Query(Criteria.where("userId").is(recipientId));
        Update recipientUpdate = new Update();

        if (updateRecipientDTO.getName() != null) {
            recipientUpdate.set("name", updateRecipientDTO.getName());
        }

        if (updateRecipientDTO.getNic() != null) {
            recipientUpdate.set("nic", updateRecipientDTO.getNic());
        }

        if (updateRecipientDTO.getBirthday() != null) {
            recipientUpdate.set("birthday", updateRecipientDTO.getBirthday());
        }

        if (updateRecipientDTO.getAddress() != null) {
            recipientUpdate.set("address", updateRecipientDTO.getAddress());
        }

        if (updateRecipientDTO.getPostalCode() != null) {
            recipientUpdate.set("postalCode", updateRecipientDTO.getPostalCode());
        }

        if (updateRecipientDTO.getAccountNo() != null) {
            recipientUpdate.set("accountNo", updateRecipientDTO.getAccountNo());
        }

        if (updateRecipientDTO.getPhoneNumber() != null) {
            recipientUpdate.set("phoneNumber", updateRecipientDTO.getPhoneNumber());
        }

        if (!recipientUpdate.getUpdateObject().isEmpty()) {
            mongoTemplate.updateFirst(recipientQuery, recipientUpdate, Recipient.class);
        }

        return Map.of("Message", "Successfully updated the recipient.");
    }
}