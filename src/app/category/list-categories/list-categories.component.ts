import {Component, OnInit, ViewChild} from '@angular/core';
import {CategoryService} from '../../service/category.service';
import {Cate} from '../../model/cate';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {TokenService} from '../../service/token.service';

@Component({
  selector: 'app-list-categories',
  templateUrl: './list-categories.component.html',
  styleUrls: ['./list-categories.component.scss']
})
export class ListCategoriesComponent implements OnInit {
cate:Cate[]=[]
  check = false
  displayedColumns: string[] = ['id','name','avatar']
  dataSource: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private categoryService:CategoryService,
              private tokenService:TokenService
              ) { }

  ngOnInit(): void {
  this.listCategories();
  if (this.tokenService.getToken()){
    this.check = true
  }
  }
listCategories(){
    this.categoryService.showListCategory().subscribe(data=>{
      console.log("listCate",data);
      this.cate =data;
      this.dataSource = new MatTableDataSource<Cate>(this.cate);
      this.dataSource.paginator = this.paginator;
    })
}
}
