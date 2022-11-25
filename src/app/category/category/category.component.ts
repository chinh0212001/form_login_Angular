import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../service/auth.service';
import {Cate} from '../../model/cate';
import {CategoryService} from '../../service/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  form: any={};

cate: Cate
  status = 'please fill in the form to Category !!!';
  constructor(private categoryService :CategoryService) { }

  ngOnInit(): void {
  }

  createCategory() {
  this.cate = new Cate(
    this.form.id,
    this.form.name,
    this.form.avatar
  );
    console.log("formAvatar",this.form.avatar);
    console.log("aaaa",this.cate);
    if (this.form.avatar == undefined){
      this.status = "Please upload avatar!"
    }
  this.categoryService.createCate(this.cate).subscribe(data=>{
    console.log("dataCate--->",data);
    if (data.message === 'category_invaild'){
      this.status = 'category is existed! Please try again!'
      return;
    }
    if (data.message === "create_success!!!"){
      this.status = 'create category success!!!'
    }
  })
  }
  createAvatar($event: string) {
    this.form.avatar = $event
  }
}
