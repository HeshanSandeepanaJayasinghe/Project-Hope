package com.example.backend.Repositories;

import com.example.backend.Model.Fundraiser;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import javax.swing.text.html.Option;
import java.util.Optional;

public interface FundraiserRepository extends MongoRepository<Fundraiser,String> {

Optional<Fundraiser> findByUserId(ObjectId id);

}
