import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-parent-output',
  templateUrl: './parent-output.component.html',
  styleUrls: ['./parent-output.component.scss']
})
export class ParentOutputComponent implements OnInit {
  listStudents = [];

  constructor() { }

  ngOnInit(): void {
  }

  showListStudents($event:any) {
    console.log("$event--->",$event);
    this.listStudents = $event;
  }
}
