package com.example.searchService.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@Document
@AllArgsConstructor
@NoArgsConstructor
public class Restaurant {

    @Id
    private String restaurantId;
    private String restaurantName;
    private String restaurantLocation;
    private List<Dish> dishList;
}
