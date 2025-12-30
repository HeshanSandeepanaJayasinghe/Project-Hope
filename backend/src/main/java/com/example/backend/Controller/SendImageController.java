package com.example.backend.Controller;


import com.example.backend.Service.SendImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.nio.file.Files;

@RestController
@RequestMapping("/get")
public class SendImageController {


	@Autowired
	private SendImageService sendImageService;

	@GetMapping("/image/{fileName:.+}")
	public ResponseEntity<?> getImage(@PathVariable String fileName) throws IOException {

		Resource resource= sendImageService.getImage(fileName);
		String contentType= Files.probeContentType(resource.getFile().toPath());
		if (contentType == null) {
			contentType = "application/octet-stream";
		}

		return ResponseEntity.ok()
				.contentType(MediaType.parseMediaType(contentType))
				.body(resource);


	}






}
