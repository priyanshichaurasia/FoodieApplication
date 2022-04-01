import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavService {

  favId:string;
  userMailId:string;

  constructor(private http: HttpClient) { }

  addToFavUrl="http://localhost:8087/api/user/users/favourite/addFavourite";
  getAllFavUrl="http://localhost:8087/api/user/users/favourite/getFavourite";
  removeUrl="http://localhost:8087/api/user/users/remove";

  addToFav(fav:any):Observable<any>{
    return this.http.post<any>(this.addToFavUrl,fav);
  }

  getAllFav(userMailId:string):Observable<Array<any>>{
    return this.http.get<Array<any>>(`${this.getAllFavUrl}/${userMailId}`);
  }

  removeFromFav(favouriteId:string){
    return this.http.delete(`${this.removeUrl}/${favouriteId}`);
  }
}