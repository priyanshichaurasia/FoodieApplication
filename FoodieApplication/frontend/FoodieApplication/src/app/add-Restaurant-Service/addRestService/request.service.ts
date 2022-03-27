import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Dish } from '../addRestModel/dish';
import { Restaurant } from '../addRestModel/restaurant';
import { SendDishComponent } from '../send-dish/send-dish.component';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private http:HttpClient) { }

  restaurantId:string;
  dishId:string;

  addRestaurant(rest:Restaurant)
  {
    return this.http.post("http://localhost:9000/api/request/restaurant",rest);
  }

  addDish(restaurantId:string,addDish:any)
  {
    return this.http.put("http://localhost:9000/api/request/"+restaurantId+"/dish",addDish);
  }

  getResturant():Observable<Array<any>>{
    return this.http.get<Array<any>>("http://localhost:9000/api/request/restaurant/find");
  }

  // findByRestaurantNameAndRestaurantLocation(restaurantName:string,restaurantLocation:string):Observable<any>{
  //   // return this.http.get<any>("http://localhost:9000/api/request/restaurant/"+`${restaurantName}`+"/"+`${restaurantLocation}`);
  //   return this.http.get<any>("http://localhost:9000/api/request/restaurant/cafe/lanka,{responseType:text}");
  // }

  deleteRestaurant(restaurantId:any):Observable<any>
  {
    return this.http.delete<any>("http://localhost:9000/api/request/restaurant/"+ `${restaurantId}`);
  }

  findAllDishByRestaurantId(restaurantId:any):Observable<any>{
    return this.http.get<any>("http://localhost:9000/api/request/restaurant/"+`${restaurantId}`);
  }

}
