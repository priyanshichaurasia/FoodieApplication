import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RestApiService } from 'src/app/rest_management/service/rest-api.service';
import { Dish } from '../addRestModel/dish';
import { Restaurant } from '../addRestModel/restaurant';
import { RequestService } from '../addRestService/request.service';
@Component({
  selector: 'app-send-dish',
  templateUrl: './send-dish.component.html',
  styleUrls: ['./send-dish.component.css']
})
export class SendDishComponent implements OnInit{
  selected='';
  sel='';
  dishes = ['Veg','Non-Veg','Dessert'];
  resData:any;
  selectedFile:any=null;
  constructor(private api: RestApiService,private send:RequestService,private http:HttpClient) {
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======

  // constructor(private api: RestApiService,private send:RequestService) {

>>>>>>> 2bae6d81d8ef16b1b7dc4f8834e1d5cb2917bf1b
>>>>>>> 6db9e26f3effcfb998c101096dc0324145f6893b
    this.selected="";
    this.restaurant=[];
    this.rest=[];
    this.sel="";
   }
   dish = new Dish();
  addDish!:FormGroup;
  restaurant:Restaurant[]=[];
  rest:Restaurant[]=[];
  update(e:any){
    this.selected = e.target.value;
  }
  ngOnInit(): void {
    this.send.findAllRestaurantByStatus("reject").subscribe((r)=>{
      console.log(r);
      this.rest=r;
      console.log(this.rest);
      this.rest.forEach(r=>{
        this.sel=r.restaurantId;
        this.send.restaurantId=this.sel;
        console.log(r.restaurantId);
      })
    })
<<<<<<< HEAD
=======

<<<<<<< HEAD
=======
    // this.api.findAllRestaurant().subscribe((response)=>{
    //   this.restaurant=response;
    //   console.log(response);
    //   this.send.restaurantId=response[0].restaurantId;
    //   console.log(response[0].restaurantId);
    //   this.restaurant.forEach(response=>{
    //     this.selected=response.restaurantId;
    //     this.api.restId=this.selected;
    //     console.log(this.selected);
    //     console.log(response);
    //     // console.log(response.restaurantId);
    //     console.log(this.api.restId);
    //   })

    //   console.log(response[0].restaurantId);
    //   this.restaurant.forEach(response=>{
    //     this.selected=response.restaurantId;
    //     this.send.restaurantId=this.selected;
    //     console.log(response);
    //     console.log(response.restaurantId);
    //     console.log(this.send.restaurantId);

    // })
    //   })
>>>>>>> 2bae6d81d8ef16b1b7dc4f8834e1d5cb2917bf1b
>>>>>>> 6db9e26f3effcfb998c101096dc0324145f6893b
    this.api.findAllRestaurant().subscribe((response)=>{
      this.restaurant=response;
      console.log(response);
      this.restaurant.forEach(response=>{
        this.selected=response.restaurantId;
        this.api.restId=this.selected;
        console.log(response);
        console.log(this.api.restId);
      })
      })
      this.addDish = new FormGroup({
        dishName:new FormControl('',Validators.required),
        dishType:new FormControl('',Validators.required),
      image:new FormGroup({
        image:new FormControl(''),
      })
      })
    }
  get dishName()
  {
    return this.addDish.get('dishName');
  }
  get dishType()
  {
    return this.addDish.get('dishType');
  }
<<<<<<< HEAD
=======

>>>>>>> 6db9e26f3effcfb998c101096dc0324145f6893b
  onFileSelected(event:any)
  {
    this.selectedFile=event.target.files[0];
    console.log(this.selectedFile);
  }
  uploadImage()
  {
<<<<<<< HEAD
    const payload = new FormData();
    payload.append('file',this.selectedFile,this.dish.dishId+".jpg");
=======
<<<<<<< HEAD
    this.send.payload = new FormData();

    this.send.payload.append('file',this.selectedFile,this.dish.dishId+".jpg");

    this.http.post("http://localhost:9000/api/request/restaurant/files"
    ,this.send.payload,
=======
    const payload = new FormData();

    payload.append('file',this.selectedFile,this.dish.dishId);
    console.log(payload);

>>>>>>> 6db9e26f3effcfb998c101096dc0324145f6893b
    this.http.post("http://localhost:9000/api/request/restaurant/files"
    ,payload,
>>>>>>> 2bae6d81d8ef16b1b7dc4f8834e1d5cb2917bf1b
    // {headers:{'Content-Type':'multipart/formdata'}}
    )
    .subscribe((data:any)=>{
      this.resData = data;
      console.log(this.resData);
    })
  }
  sendDish()
  {
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
    // this.dish.restaurantId=this.send.restaurantId;
>>>>>>> 2bae6d81d8ef16b1b7dc4f8834e1d5cb2917bf1b
>>>>>>> 6db9e26f3effcfb998c101096dc0324145f6893b
    this.dish.dishId=Math.random().toString(36).substring(2,15);
    this.dish.dishName=this.addDish.value.dishName;
    this.dish.dishType=this.addDish.value.dishType;
    this.uploadImage();
<<<<<<< HEAD
    this.send.addDish(this.api.restId,this.dish).subscribe(observer=>{
=======

<<<<<<< HEAD
    this.send.addDish(this.api.restId,this.dish).subscribe(observer=>{
=======

    // this.dish.restaurantId=this.send.restaurantId;
    // this.dish.dishName=this.addDish.value.dishName;
    // this.dish.dishType=this.addDish.value.dishType;
    this.dish.dishName=this.addDish.value.dishName;
    this.dish.dishType=this.addDish.value.dishType;

    this.send.addDish(this.send.restaurantId,this.dish).subscribe(observer=>{
>>>>>>> 2bae6d81d8ef16b1b7dc4f8834e1d5cb2917bf1b
>>>>>>> 6db9e26f3effcfb998c101096dc0324145f6893b
      console.log(observer);
      this.send.dishId=this.dish.dishId;
      if(this.addDish.valid)
      {
        alert("Send Dish Request Successfull..");
      }
    })
  }
<<<<<<< HEAD
}
=======
<<<<<<< HEAD
}
=======
}
>>>>>>> 2bae6d81d8ef16b1b7dc4f8834e1d5cb2917bf1b
>>>>>>> 6db9e26f3effcfb998c101096dc0324145f6893b
