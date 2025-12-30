package com.example.backend.Service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;

import java.io.FileNotFoundException;
import java.net.MalformedURLException;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
public class SendImageService {


	@Value("${file.upload-dir}")
	private String uploadDir;

	public Resource getImage(String fileName) throws MalformedURLException, FileNotFoundException {

		Path path= Paths.get(uploadDir).toAbsolutePath().normalize().resolve(fileName).normalize();
		Resource resource=new UrlResource(path.toUri());

		if(resource.exists() && resource.isReadable()){
			return resource;
		}
		else{
			throw new FileNotFoundException("The image is not available.");
		}


	}



}
