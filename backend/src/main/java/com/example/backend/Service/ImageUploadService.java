package com.example.backend.Service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

@Service
public class ImageUploadService {


private final Path fileStorageLocation;


	public ImageUploadService(@Value("${file.upload-dir}") String uploadDir) throws IOException {
		this.fileStorageLocation = Paths.get(uploadDir).toAbsolutePath().normalize();
		Files.createDirectories(this.fileStorageLocation);

	}


	public String storeImage(MultipartFile file ) throws IOException {

		String originalFileName= StringUtils.cleanPath(file.getOriginalFilename());

		String fileName= UUID.randomUUID().toString()+"_"+originalFileName;

		Path targetLocation=fileStorageLocation.resolve(fileName);
		Files.copy(file.getInputStream(),targetLocation, StandardCopyOption.REPLACE_EXISTING);
		return "http://localhost:8080/view/image"+fileName;


	}

}
