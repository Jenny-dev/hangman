import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import {Movie} from "../movie";

@Injectable({
  providedIn: 'root'
})

export class MoviesService {

  private _jsonURL:string = 'assets/movies.json';

  constructor(private http: HttpClient) {
  }

  public getJSON(): Observable<any> {
    return this.http.get(this._jsonURL);
  }
  
}
