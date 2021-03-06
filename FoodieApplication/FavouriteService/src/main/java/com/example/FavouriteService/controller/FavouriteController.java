package com.example.FavouriteService.controller;

import com.example.FavouriteService.exception.FavouriteAlreadyExist;
import com.example.FavouriteService.model.Dish;
import com.example.FavouriteService.model.Favourite;
import com.example.FavouriteService.model.Restaurant;
import com.example.FavouriteService.service.FavouriteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user/users")
public class FavouriteController {

    private FavouriteService favouriteService;

    @Autowired
    public FavouriteController(FavouriteService favouriteService) {
        this.favouriteService = favouriteService;
    }

    @PostMapping("/favourite/addFavourite")
    public ResponseEntity<?> addFavourite(@RequestBody Favourite favourite) throws FavouriteAlreadyExist
    {
        try
        {
            return new ResponseEntity<>(favouriteService.addFavourite(favourite), HttpStatus.CREATED);
        }
        catch (FavouriteAlreadyExist e){
            throw new FavouriteAlreadyExist();
        }
        catch(Exception e)
        {
            e.printStackTrace();
            return new ResponseEntity<>("try after some time",HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/favourite/getFavourite/{userMailId}")
    public ResponseEntity<?> getAllFavourite(@PathVariable String userMailId)
    {
        try
        {
            return new ResponseEntity<>(favouriteService.getALlFavourite(userMailId), HttpStatus.OK);
        }
        catch(Exception e)
        {
            e.printStackTrace();
            return new ResponseEntity<>("try after some time",HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/remove/{favouriteId}/{restaurantId}")
    public ResponseEntity<?> removeFromFav(@PathVariable String favouriteId,@PathVariable String restaurantId){
        try {
            return new ResponseEntity<>(favouriteService.removeFromFav(favouriteId,restaurantId),HttpStatus.OK);
        }
        catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>("Try After Some Time",HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("{favouriteId}/{restaurantId}/dish")
    public ResponseEntity<?> addDishToFav(@PathVariable String favouriteId, @PathVariable String restaurantId, @RequestBody Dish dish){
        try {
            return new ResponseEntity<>(favouriteService.addDishToFav(favouriteId,restaurantId,dish),HttpStatus.CREATED);
        }
        catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>("Try After Some Time",HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/dish/remove/{favouriteId}/{restaurantId}/{dishId}")
    public ResponseEntity<?> removeDishFromFav(@PathVariable String favouriteId,@PathVariable String restaurantId,@PathVariable String dishId){
        try {
            return new ResponseEntity<>(favouriteService.removeDishFromFav(favouriteId,restaurantId,dishId),HttpStatus.OK);
        }
        catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>("Try After Some Time",HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @PutMapping("/update/{favouriteId}/restaurant/dish")
    public ResponseEntity<?> updateRestAndDishToFav(@PathVariable String favouriteId, @RequestBody Restaurant restaurant)
    //public ResponseEntity<?> updateRestAndDishToFav(@PathVariable String favouriteId, @RequestBody Restaurant restaurant,@RequestBody Dish dish)
    {
        try
        {
            System.out.println(restaurant);
            return new ResponseEntity<>(favouriteService.updateRestAndDishToFav(favouriteId,restaurant), HttpStatus.OK);
        }
        catch(Exception e)
        {
            e.printStackTrace();
            return new ResponseEntity<>("try after some time",HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


}
