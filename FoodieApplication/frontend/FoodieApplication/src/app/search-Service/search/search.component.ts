import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Dish } from 'src/app/add-Restaurant-Service/addRestModel/dish';
import { Image } from 'src/app/add-Restaurant-Service/addRestModel/image';
import { Restaurant } from 'src/app/add-Restaurant-Service/addRestModel/restaurant';
import { RestApiService } from 'src/app/rest_management/service/rest-api.service';
import { FindService } from '../service/find.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  search:FormGroup;

  rest = new Restaurant();
  rest1 = new Restaurant();


  dish = new Dish();

  dish2 = new Dish();

  filename:string;

  restaurant:Restaurant[]=[];

  dishes:Dish[]=[];

  image:Image[]=[];

  img = new Image();

  data:Dish[];

  constructor(private fs:FindService,private restapi:RestApiService) { }

  ngOnInit(): void {
    this.search = new FormGroup({  
      find:new FormControl()
    }); 
  }

  get find()
  {
    return this.search.get('find');
  }

getRestaurant()
{
  this.rest.restaurantName=this.search.value.find;
  this.fs.getByRestaurantName(this.rest.restaurantName).subscribe(obj=>{
    this.restaurant=obj;
    console.log(this.restaurant);
    this.restaurant.forEach(p=>{
      this.rest.restaurantId=p.restaurantId;
      this.fs.getImage(this.rest.restaurantId).subscribe(restimg=>{
        this.image=restimg;
        p.image=restimg;
        this.rest=p;
      })
      this.dishes=this.rest.dishList;
      this.rest=p;
      this.dishes.forEach(d=>{
        this.dish.dishId=d.dishId;
        console.log(this.dish.dishId)
        this.fs.getImage(this.dish.dishId).subscribe(obj=>{
          this.image=obj;
          d.image=obj;
          this.data=this.dishes;
          console.log(this.dishes);
          console.log(this.restaurant);
      })
    })
  })
    
  })
}

getDish()
{
  this.dish.dishName=this.search.value.find;
  this.fs.getByDishName(this.dish.dishName).subscribe(obj=>{
    console.log(obj);
    this.restaurant=obj
    console.log(this.restaurant);
    this.restaurant.forEach(p=>{
      this.rest1=p;
      this.dishes=this.rest1.dishList;
      console.log("dishes"+this.dishes);
      console.log("rest dishlist"+this.rest1.dishList);
      this.dishes.forEach(d=>{
        console.log(d);
        if(d.dishName==this.search.value.find)
        {
        this.dish.dishId=d.dishId;
        console.log(this.dish.dishId);
        this.fs.getImage(this.dish.dishId).subscribe(obj=>{
          this.image=obj;
          d.image=obj;
          this.data=this.dishes;
          console.log("data "+this.data);
          console.log(this.dishes);
          console.log(this.restaurant);
        })
      }       
      })
    })
   
  })
  
  
}


getImage(id:string)
{
  // this.img.fileName=this.dish.dishId;
  this.fs.getImage(id).subscribe(obj=>{
    this.image=obj;
    console.log(obj);
    console.log("image"+this.image)
  })
}

  searching(event:any)
  {
    
    this.getDish();
    this.getRestaurant();
  }

}
