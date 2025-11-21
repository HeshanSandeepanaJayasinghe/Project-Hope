package com.example.backend.Model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "donors")
public class Donor {

	@Id
	private String id;
	private String nic;
	private String name;
	private String organization;
	private String occupation;
	private String user_id;


	public Donor() {}

	public Donor(String id, String nic, String name, String organization, String occupation, String user_id) {
		this.id = id;
		this.nic = nic;
		this.name = name;
		this.organization = organization;
		this.occupation = occupation;
		this.user_id = user_id;
	}

	// Getters
	public String getId() { return id; }
	public String getNic() { return nic; }
	public String getName() { return name; }
	public String getOrganization() { return organization; }
	public String getOccupation() { return occupation; }
	public String getUser_id() { return user_id; }

	// Setters
	public void setId(String id) { this.id = id; }
	public void setNic(String nic) { this.nic = nic; }
	public void setName(String name) { this.name = name; }
	public void setOrganization(String organization) { this.organization = organization; }
	public void setOccupation(String occupation) { this.occupation = occupation; }
	public void setUser_id(String user_id) { this.user_id = user_id; }

}
