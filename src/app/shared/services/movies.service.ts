import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(
   private http: HttpClient
  ) { }

  getMovies(): Observable<any> {
    return this.http.get('https://static.rviewer.io/challenges/datasets/dreadful-tomatoes/data.json')
  }
 }
