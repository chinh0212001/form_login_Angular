import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment.prod';
import {Cate} from '../model/cate';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private API_CATEGORY = environment.API_LOCAL+ 'create-category';
  private API_LIST_CATEGORY = environment.API_LOCAL+'list';
  constructor(private http:HttpClient) { }
  createCate(cate:Cate):Observable<any>{
    return this.http.post(this.API_CATEGORY,cate);
  }
  showListCategory():Observable<any>{
    return this.http.get(this.API_LIST_CATEGORY);
  }
}
