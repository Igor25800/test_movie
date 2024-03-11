import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment.development";
import {movies} from "../interfaces/movies.interface";

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  url = environment.api

  constructor(
   private http: HttpClient
  ) { }

  getMovies(): Observable<movies> {
    return this.http.get<movies>(this.url);
  }
 }
