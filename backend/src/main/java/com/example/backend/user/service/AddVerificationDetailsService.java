package com.example.backend.user.service;

import com.example.backend.authentication.CustomUserDetails;
import com.example.backend.user.dto.VerificationDTO;
import com.example.backend.user.model.Verification;
import com.example.backend.user.repository.RecipientRepository;
import com.example.backend.user.repository.VerificationRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Map;
import java.util.UUID;

@Service
public class AddVerificationDetailsService {

	private final VerificationRepository verificationRepository;
	private final RecipientRepository recipientRepository;

	private  String uploadDirectory;

	public  AddVerificationDetailsService(
			VerificationRepository verificationRepository,
			@Value("${upload.directory}") String uploadDirectory,
			RecipientRepository recipientRepository
	) {
		this.verificationRepository = verificationRepository;
		this.uploadDirectory = uploadDirectory;
		this.recipientRepository = recipientRepository;
	}
	public Map<String, String> addVerificationDetails(VerificationDTO verificationDTO) {

		CustomUserDetails userDetails =
				(CustomUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		String userId = userDetails.getUserId();
		String recipientId = recipientRepository.findByUserId(userId).getRecipientId();

		Path uploadPath = Paths.get(uploadDirectory);

		try{
			if (!Files.exists(uploadPath)) {
				Files.createDirectories(uploadPath);
			}

			String fileName = UUID.randomUUID().toString();
			Path filePath = uploadPath.resolve(fileName);
			Files.copy(
					verificationDTO.getVerificationDocument().getInputStream(),
					filePath,
					StandardCopyOption.REPLACE_EXISTING
			);

			Verification verification = new Verification();
			verification.setProvince(verificationDTO.getProvince());
			verification.setDistrict(verificationDTO.getDistrict());
			verification.setDivisionalSecretarial(verificationDTO.getDivisionalSecretarial());
			verification.setGramaNiladhariDivision(verificationDTO.getGramaNiladhariDivision());
			verification.setEmploymentCategory(verificationDTO.getEmploymentCategory());
			verification.setOccupation(verificationDTO.getOccupation());
			verification.setAnnualSalary(verificationDTO.getAnnualSalary());
			verification.setAssetStatus(verificationDTO.getAssetStatus());
			verification.setNumberOfFamilyMembers(verificationDTO.getNumberOfFamilyMembers());
			verification.setLongTermHealthIssues(verificationDTO.getLongTermHealthIssues());
			verification.setRecipientId(recipientId);
			verification.setDocumentUrl("http://localhost:8080/verifier/get/pdf/"+fileName);
			verificationRepository.save(verification);

			return Map.of("Message", "Successfully submitted the verification form.");
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}
}
