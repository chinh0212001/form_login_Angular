import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment.prod';
import {Cate} from '../model/cate';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private API_CATEGORY = environment.API_LOCAL+ 'categories';
  constructor(private http:HttpClient) { }
  createCate(cate:Cate):Observable<any>{
    return this.http.post(this.API_CATEGORY,cate);
  }
  showListCategory(){
    return this.http.get(this.API_CATEGORY);
  }
  deleteCategory(id: number):Observable<any>{
    return this.http.delete(this.API_CATEGORY+'/'+id);
  }
  updateCategory(id:number, category: Cate):Observable<Cate>{
    return this.http.put<Cate>(this.API_CATEGORY+'/'+id, category)
  }
  detailCategory(id: number): Observable<any>{
    return this.http.get(this.API_CATEGORY+'/'+id);
  }
}
