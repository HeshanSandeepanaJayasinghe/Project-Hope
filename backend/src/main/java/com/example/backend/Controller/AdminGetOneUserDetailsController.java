package com.example.backend.Controller;

import com.example.backend.DTO.SpecificUserDTO;
import com.example.backend.DTO.Transfers.AdminViewOneUserDetails;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/admin")
public class AdminGetOneUserDetailsController {

@Autowired
private AdminViewOneUserDetails adminViewOneUserDetails;

@GetMapping("/view/{id}")
public SpecificUserDTO viewOneUser(@PathVariable String id){
	System.out.println(id);
	ObjectId obj=new ObjectId(id);
	return adminViewOneUserDetails.getSpecificUser(obj);

}


}
