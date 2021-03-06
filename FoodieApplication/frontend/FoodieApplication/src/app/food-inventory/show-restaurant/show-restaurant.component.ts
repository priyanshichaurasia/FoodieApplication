import { Component, HostListener } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { InventoryRequestService } from '../service/inventory-request.service';
import { Restaurant } from '../modal/restaurant';
import { FavService } from 'src/app/favService/service/fav.service';
import { Favourite } from 'src/app/favService/domain/favourite';
import { UserRequestService } from 'src/app/user-request.service';
import { Dish } from '../modal/dish';
import { Image } from '../modal/image';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-show-restaurant',
  templateUrl: './show-restaurant.component.html',
  styleUrls: ['./show-restaurant.component.css']
})

export class ShowRestaurantComponent {

  restuarents: any;
  data:Restaurant[];
  dishes:Dish[];
  image:Image[];
  favourite = new Favourite();
  isadmin:boolean=true;
  favs:Favourite[];
  alert=0;
  dishalert=0;

  constructor(private breakpointObserver: BreakpointObserver,private request:InventoryRequestService,private favService:FavService,private userRqst:UserRequestService,private router:Router,private toastr: ToastrService) {}

  ngOnInit(){
    let tempFavRestId:any[]=[];

    this.favService.getAllFav(this.userRqst.mailId).subscribe(data=>{
      //console.log("favobj", data);
      data.forEach(favourite=>{
        favourite.restaurantList.forEach((restaurant:any)=>{
          tempFavRestId.push(restaurant.restaurantId);
        })
      })
      //console.log("tempFavRestId",tempFavRestId);
      this.getInventoryRestaurants(tempFavRestId);
    })


  }

  getInventoryRestaurants(tempFavRestId:any[]){

    this.request.getdata().subscribe(result=>{
      let tempArray:any[]=[];

      result.forEach((element) => {
        this.request.getImages(element.restaurantId).subscribe(result1=>{
          element.image=result1;

          let rest = {
            "restaurantId": element.restaurantId,
            "restaurantName": element.restaurantName,
            "restaurantLocation": element.restaurantLocation,
            "restaurantImage": element.image[0].image,
            "isFavourite": "white",
            "dishList": element.dishList
          };

          if(tempFavRestId.includes(element.restaurantId)){
            rest.isFavourite = 'red';
          }
		      tempArray.push(rest);
        })
      });
      this.restuarents = tempArray;
      console.log('Restaurants updated ', this.restuarents);
    })
    if(this.userRqst.loginType!="admin")
    {
      this.isadmin=true;
    }
    else
    {
      this.isadmin=false;
    }
  }

  add(restuarent:any){

    this.restuarents.forEach((ele:any)=>{
      if(ele.restaurantId == restuarent.restaurantId){
        ele.isFavourite = 'red';
      }
    restuarent.isSelected = true;
  })

    if(this.userRqst.mailId!=null)
    {
    this.favService.getAllFav(this.userRqst.mailId).subscribe(d=>{
      this.favs=d;
      if(this.favs.length!=0)
      {
        this.favs.forEach(r=>{
          this.favourite.favouriteId=r.favouriteId;
          r.restaurantList.forEach(restau=>{
            if(restau.restaurantId==restuarent.restaurantId)
            {
              this.alert=1;
              console.log("if");
            }
          })
         
          if(this.alert==0)
          {
            console.log("iff else");
            this.favService.update(this.favourite.favouriteId,restuarent).subscribe(e=>{
              this.toastr.success("Added to Favourite");
            })
          }
        })
      }
    else
    {
      console.log("else");
    this.favourite.favouriteId = Math.random().toString(36).substring(2,15);
    this.favService.favId=this.favourite.favouriteId
    console.log(this.favourite.favouriteId);
    this.favourite.userMailId = this.userRqst.mailId;
    console.log("mail"+this.favourite.userMailId)
    this.favourite.restaurantList = [restuarent];
    this.favourite.restaurantList.forEach(d=>{
        this.dishes=d.dishList;
        console.log("dish",this.dishes);
          this.dishes.forEach(i=>{
            this.request.getImages(i.dishId).subscribe(val=>{
              this.image=val;
              console.log("img",this.image);
            })
          })
        })
        console.log(this.favourite)
    this.favService.addToFav(this.favourite).subscribe(res=>{
      console.log(res);
      this.toastr.success("Added to Favourite");
    },error =>{
        console.log(error);
    })
  }
})
}
else
{
this.router.navigate(['/login']);
}

}
}
