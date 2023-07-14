package com.allproduct.modals;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RequestDataModel {
    private int restaurant_id;

    private String restaurant_name;
    private String restaurant_address;
    private String restaurant_phoneno;
    private String restaurant_review;
    private String restaurant_owner;
    private String restaurant_type;
    private String restaurant_rating;
    private String restaurant_images;
    private String restaurant_tags;
    private String first_offer;
    private String second_offer;
    private String restaurant_delievery_time;
    private String created_at;
    private String updated_at;
    private boolean active;


    private Set<ProductModal> products;
}
