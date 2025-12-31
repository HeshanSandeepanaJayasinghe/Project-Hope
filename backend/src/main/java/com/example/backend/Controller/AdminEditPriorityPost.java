package com.example.backend.Controller;

import com.example.backend.Service.AdminEditPriorityPostService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/admin")
public class AdminEditPriorityPost {


	@Autowired
	private AdminEditPriorityPostService adminEditPriorityPostService;

	@PatchMapping("/edit/priority/{id}")
	public ResponseEntity<?> editPostPriority(
			@PathVariable String id,
			@RequestBody Map<String,String> map
	){

		Map<String,String> message=adminEditPriorityPostService.editPriorityStatus(id,map);

		return ResponseEntity.ok().body(message);

	}


}
