package com.example.shopping.resource;

import com.example.shopping.model.Item;
import com.example.shopping.repository.ItemRepository;
import org.json.JSONException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins="http://localhost:4200")
@RestController
public class ItemResource {

    @Autowired
    private ItemRepository itemRepository;

    @GetMapping("/items")
    public List<Item> getItems(){
//        System.out.println("get all");
        return itemRepository.findAll();

    }

    @GetMapping("/item/{id}")
    public Optional<Item> getItemByID(@PathVariable Integer id){
//        System.out.println("get a");
        return itemRepository.findById(id);
    }

//    @CrossOrigin(origins="http://localhost:4200")
    @PutMapping("/item/{id}/{num}")
    public Item update(@PathVariable Integer id, @PathVariable Integer num) throws JSONException {
//        System.out.println(id + "_"+num);
        Item item = itemRepository.findById(id).orElse(null);
        item.setStock(item.getStock() - num);
        return itemRepository.save(item);
    }


    @Autowired
    private JavaMailSender javaMailSender;

    @PutMapping("shopping-cart/receipt/{email}")
    public void sendEmail(@PathVariable String email) {
        System.out.println("get email send request");
        SimpleMailMessage msg = new SimpleMailMessage();
        msg.setTo(email);

        msg.setSubject("Thank you! ACME Shopping Info");
        msg.setText("Your package is on the way!");

        javaMailSender.send(msg);
    }

}
