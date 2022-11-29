import { Component, OnInit } from '@angular/core';
import {Cate} from '../../model/cate';
import {ActivatedRoute} from '@angular/router';
import {CategoryService} from '../../service/category.service';
import {J} from '@angular/cdk/keycodes';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.scss']
})
export class UpdateCategoryComponent implements OnInit {
category: Cate;
status = 'Form edit category';
error1:any={
  message:'no_name_category'
};
error2:any={
  message:'no_avatar_avatar'
};
error3:any={
  message:'update_success'
};
  form: any={};
  constructor(private atRouter:ActivatedRoute,
              private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.atRouter.paramMap.subscribe(ctgId=>{
      const id = +ctgId.get('id');
      console.log('idddddddddddddddddddd==>',id);
      this.categoryService.detailCategory(id).subscribe(ctg=>{
        this.category = ctg;
      })
    })
  }
ngSubmit(){

    this.categoryService.updateCategory(this.category.id,this.category).subscribe(data=>{
      console.log('data ==========> ', data);
      if (JSON.stringify(data)==JSON.stringify(this.error1)){
        this.status = 'Please upload is existed! Please try again!'
      }
      if (JSON.stringify(data)==JSON.stringify(this.error2)){
        this.status = 'Please upload avatar or change name Category';
      }
      if (JSON.stringify(data)== JSON.stringify(this.error3)){
        this.status = 'Update Success!';
      }
    })
}

  changeAvatar($event: any) {
    console.log("co vao day khong nhi");
    this.category.avatar = $event;
}
}
