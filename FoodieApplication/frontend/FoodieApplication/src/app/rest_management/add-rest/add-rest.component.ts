import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
<<<<<<< HEAD
=======
import { Restaurant } from 'src/app/add-Restaurant-Service/addRestModel/restaurant';
>>>>>>> 6db9e26f3effcfb998c101096dc0324145f6893b
import { RequestService } from 'src/app/add-Restaurant-Service/addRestService/request.service';
// import { Restaurant } from 'src/app/rest_management/domain/restaurant';
import { RestApiService } from '../service/rest-api.service';

@Component({
  selector: 'app-add-rest',
  templateUrl: './add-rest.component.html',
  styleUrls: ['./add-rest.component.css']
})
export class AddRestComponent implements OnInit {

  constructor(private fb: FormBuilder,private restApi: RestApiService,private request: RequestService) { }

  addRestForm !: FormGroup;
  Rest = new Restaurant();

  ngOnInit(): void {
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
    // this.request.getResturant().subscribe(res=>{
    //   //console.log(res);
    //   this.restApi.restId=res[3].restaurantId;
    //   console.log(this.restApi.restId)
    //   this.restApi.restName=res[3].restaurantName;
    //   console.log(this.restApi.restName);
    //   this.restApi.restLocation=res[3].restaurantLocation;
    // });

    // // this.request.findByRestaurantNameAndRestaurantLocation(this.restApi.restName,this.restApi.restLocation).subscribe(r=>{
    // //   console.log(this.restApi.restName);
    // //   console.log(this.restApi.restLocation)
    // //   console.log(r);
    // // })

    // //this.request.findByRestaurantNameAndRestaurantLocation();

>>>>>>> 2bae6d81d8ef16b1b7dc4f8834e1d5cb2917bf1b
>>>>>>> 6db9e26f3effcfb998c101096dc0324145f6893b
    this.addRestForm = this.fb.group({
      restaurantId:[null,Validators.required],
      restaurantName: [null,Validators.required],
      restaurantLocation: [null,Validators.required]
    });
  }

  
  addRest(){
    // this.Rest.restaurantId=this.restApi.restId;
    // console.log(this.Rest.restaurantId);
    this.Rest.restaurantId=this.addRestForm.value.restaurantId;
    this.Rest.restaurantName=this.addRestForm.value.restaurantName;
    this.Rest.restaurantLocation=this.addRestForm.value.restaurantLocation;
    this.Rest.dishList=this.addRestForm.value.dishList;
    this.restApi.registerRestaurant(this.Rest)
    .subscribe(
        response=>{
          console.log(response)
          if(this.addRestForm.valid){
          alert("Restaurant Added Successfully\n Your RestaurantId is\n" + this.Rest.restaurantId);
        }
      },
      error =>{
          console.log(error);
        }
    )
    this.request.updateRestaurantWhenApprove(this.Rest,"approve").subscribe(res=>{
      console.log(res);
    })
    
  }
  
}
