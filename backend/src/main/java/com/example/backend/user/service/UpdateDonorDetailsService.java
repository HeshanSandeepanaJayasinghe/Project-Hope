package com.example.backend.user.service;

import com.example.backend.authentication.CustomUserDetails;
import com.example.backend.user.dto.UpdateDonorDTO;
import com.example.backend.user.model.Donor;
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
public class UpdateDonorDetailsService {

    private final MongoTemplate mongoTemplate;
    private final PasswordEncoder passwordEncoder;

    public UpdateDonorDetailsService(
            MongoTemplate mongoTemplate,
            PasswordEncoder passwordEncoder
    ) {
        this.mongoTemplate = mongoTemplate;
        this.passwordEncoder = passwordEncoder;
    }

    public Map<String, String> updateDonorDetails(
            String donorId,
            UpdateDonorDTO updateDonorDTO
    ) {

        if (donorId == null) {
            CustomUserDetails userDetails = (CustomUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            donorId = userDetails.getUserId();
        }

        Query userQuery = new Query(Criteria.where("_id").is(donorId));
        Update userUpdate = new Update();

        if (updateDonorDTO.getPassword() != null) {
            userUpdate.set("password", passwordEncoder.encode(updateDonorDTO.getPassword()));
        }

        if (!userUpdate.getUpdateObject().isEmpty()) {
            mongoTemplate.updateFirst(userQuery, userUpdate, User.class);
        }

        // Update Donor collection
        Query donorQuery = new Query(Criteria.where("userId").is(donorId));
        Update donorUpdate = new Update();

        if (updateDonorDTO.getName() != null) {
            donorUpdate.set("name", updateDonorDTO.getName());
        }

        if (updateDonorDTO.getNic() != null) {
            donorUpdate.set("nic", updateDonorDTO.getNic());
        }

        if (updateDonorDTO.getOccupation() != null) {
            donorUpdate.set("occupation", updateDonorDTO.getOccupation());
        }

        if (updateDonorDTO.getOrganization() != null) {
            donorUpdate.set("organization", updateDonorDTO.getOrganization());
        }

        if (!donorUpdate.getUpdateObject().isEmpty()) {
            mongoTemplate.updateFirst(donorQuery, donorUpdate, Donor.class);
        }

        return Map.of("Message", "Successfully updated the donor.");
    }
}