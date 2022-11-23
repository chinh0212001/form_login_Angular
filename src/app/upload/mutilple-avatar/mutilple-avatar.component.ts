import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AngularFireStorage, AngularFireStorageReference} from '@angular/fire/storage';
import * as url from 'url';

@Component({
  selector: 'app-mutilple-avatar',
  templateUrl: './mutilple-avatar.component.html',
  styleUrls: ['./mutilple-avatar.component.scss']
})
export class MutilpleAvatarComponent implements OnInit {
selectFile:File[];
arrayFireBase:AngularFireStorageReference;
arrUrlFormFireBase = [];
check =false;

@Output()
arrUrl = new EventEmitter<string[]>();
  constructor(private afService:AngularFireStorage) { }

  ngOnInit(): void {
  }

  uploadMultipleFile($event) {
    console.log('@Event--->',$event);
    this.selectFile =$event.target.files;
  }
  upload(){
    this.check = true;
    for (let i = 0; i < this.selectFile.length; i++) {
      this.arrayFireBase = this.afService.ref(this.selectFile[i].name);
      this.arrayFireBase.put(this.selectFile[i]).then(data=>{
        return data.ref.getDownloadURL();
      }).then(url=>{
        this.check = false;
        this.arrUrlFormFireBase.push(url);
        this.arrUrl.emit(this.arrUrlFormFireBase);
      }).catch(error=>{
        console.log('Upload Failed!',error);
      })
    }
  }
}
