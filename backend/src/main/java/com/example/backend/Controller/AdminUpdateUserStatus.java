package com.example.backend.Controller;

import com.example.backend.Service.UpdateUserStatusService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/admin")
public class AdminUpdateUserStatus {

@Autowired
private UpdateUserStatusService updateUserStatusService;

@PatchMapping("/update/{id}")
public ResponseEntity<?> updateUserStatus(@PathVariable String id,@RequestBody Map<String,String> map){

	ObjectId obj=new ObjectId(id);
	updateUserStatusService.updateUserStatus(obj,map.get("Status"));

	return  ResponseEntity.ok(Map.of("Message","Successfully updated the status of the user."));

}


}
