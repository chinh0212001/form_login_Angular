import {Component, OnInit, ViewChild} from '@angular/core';
import {CategoryService} from '../../service/category.service';
import {Cate} from '../../model/cate';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {TokenService} from '../../service/token.service';
import {identity} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {DialogCategoryComponent} from '../../dialog/dialog-category/dialog-category.component';

@Component({
  selector: 'app-list-categories',
  templateUrl: './list-categories.component.html',
  styleUrls: ['./list-categories.component.scss']
})
export class ListCategoriesComponent implements OnInit {
cate:Cate[]=[]
  check = false
  displayedColumns: string[] = ['id','name','avatar','delete','edit']
  dataSource: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private categoryService:CategoryService,
              private tokenService:TokenService,
              private atvRouter:ActivatedRoute,
              private dialog: MatDialog
              ) { }

  ngOnInit(): void {
  this.listCategories();
  if (this.tokenService.getToken()){
    this.check = true
  }
  this.atvRouter.paramMap.subscribe(ctgID=>{
    console.log('ctgid ---->',ctgID);
    const id = +ctgID.get('id')
    console.log('id===>',id);
  })
  }
listCategories(){
    this.categoryService.showListCategory().subscribe(data=>{
      // @ts-ignore
      this.cate = data;
      console.log(data);
      this.dataSource = new MatTableDataSource<Cate>(this.cate);
      this.dataSource.paginator = this.paginator;
    })
}
deleteCate(id : number){
    this.categoryService.deleteCategory(id).subscribe(()=>{
      this.listCategories();
    })
}
openDialog(id: number){
    const dialogRef = this.dialog.open(DialogCategoryComponent);
    dialogRef.afterClosed().subscribe(resutl =>{
      if (resutl){
        this.deleteCate(id);
      }
    })
}
}
