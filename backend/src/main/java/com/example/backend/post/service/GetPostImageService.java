package com.example.backend.post.service;

import io.jsonwebtoken.io.IOException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;

import java.nio.file.Path;
import java.nio.file.Paths;

@Service
public class GetPostImageService {

	@Value("${image.upload.directory}")
	private String imageUploadDirectory;

	public Resource getPostImage(String filename) {

		try {
			Path imagePath = Paths.get(imageUploadDirectory).resolve(filename).normalize();
			Resource resource = new UrlResource(imagePath.toUri());

			if (!resource.exists() || !resource.isReadable()) {
				throw new RuntimeException();
			}

			return resource;
		} catch (Exception exception) {
			throw new IOException("The file does not exist.");
		}
	}


}
