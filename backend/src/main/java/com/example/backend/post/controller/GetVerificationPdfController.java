package com.example.backend.post.controller;

import com.example.backend.post.service.GetVerificationPdfService;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/verifier")
public class GetVerificationPdfController {

	private final GetVerificationPdfService getVerificationPdfService;

	public GetVerificationPdfController(GetVerificationPdfService getVerificationPdfService) {
		this.getVerificationPdfService = getVerificationPdfService;
	}

	@GetMapping("/get/pdf/{pdfName:.+}")
	public ResponseEntity<Resource> getPdf(@PathVariable String pdfName) {
		return ResponseEntity.ok()
				.contentType(MediaType.parseMediaType("application/pdf"))
				.body(getVerificationPdfService.getPdf(pdfName));
	}

}
