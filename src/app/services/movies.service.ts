import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators'
import {Movie} from "../movie";

@Injectable({
  providedIn: 'root'
})

export class MoviesService {

  private _jsonURL:string = 'assets/movies.json';
  private movies:Movie[] = [];
  
  constructor(private http: HttpClient) {
  }

  public getJSON(): Observable<any> {
    return this.http.get(this._jsonURL);
  }
  
  public getMovies(){
    return this.getJSON().pipe(tap(movies => this.movies = movies));
  }

  public getRandMovie(){
    return this.movies[Math.floor(Math.random() * this.movies.length)].title;
  }
}
