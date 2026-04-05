package com.example.backend.post.service;

import io.jsonwebtoken.io.IOException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;

import java.nio.file.Path;
import java.nio.file.Paths;

@Service
public class GetVerificationPdfService {

	@Value("${upload.directory}")
	private String pdfUploadDirectory;

	public Resource getPdf(String pdfName) {

		try {
			Path pdfPath = Paths.get(pdfUploadDirectory).resolve(pdfName).normalize();
			Resource resource = new UrlResource(pdfPath.toUri());

			if (!resource.exists() || !resource.isReadable()) {
				throw new RuntimeException();
			}

			return resource;
		} catch (Exception exception) {
			throw new IOException("The file does not exist.");
		}
	}
}
