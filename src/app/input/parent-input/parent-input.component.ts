import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-parent-input',
  templateUrl: './parent-input.component.html',
  styleUrls: ['./parent-input.component.scss']
})
export class ParentInputComponent implements OnInit {
listStudents = [
  {id:1 , name:'Chinh'},
  {id:2,name:'Ba Zo'},
  {id:3,name:'Di muon'}
]
  constructor() { }

  ngOnInit(): void {
  }

}
