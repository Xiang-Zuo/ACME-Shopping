package com.example.shopping.model;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@ToString

@Document
public class Item {
    @Id
    private int id;
    private String name;
    private String summary;
    private String image;
    private double price;
    private int stock;

    public Item(){

    }
}
