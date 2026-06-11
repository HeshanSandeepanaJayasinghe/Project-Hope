package com.example.backend.user.service;

import com.example.backend.user.dto.VerificationHistoryDTO;
import com.example.backend.user.model.VerificationHistory;
import com.example.backend.user.repository.VerificationHistoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class VerificationHistoryService {

	private final VerificationHistoryRepository verificationHistoryRepository;

	public VerificationHistoryService(VerificationHistoryRepository verificationHistoryRepository) {
		this.verificationHistoryRepository = verificationHistoryRepository;
	}

	public List<VerificationHistoryDTO> getAllVerificationHistory() {
		return verificationHistoryRepository.findAll().stream().map(history -> {
			VerificationHistoryDTO dto = new VerificationHistoryDTO();
			dto.setHistoryId(history.getHistoryId());
			dto.setVerificationId(history.getVerificationId());
			dto.setVerifierUserId(history.getVerifierUserId());
			dto.setPreviousState(history.getPreviousState());
			dto.setNewState(history.getNewState());
			dto.setVerificationTimeStamp(history.getVerificationTimeStamp());
			dto.setPdfViewed(history.isPdfViewed());
			return dto;
		}).collect(Collectors.toList());
	}
}
