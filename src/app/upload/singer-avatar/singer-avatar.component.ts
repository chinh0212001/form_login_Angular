import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AngularFireStorage, AngularFireStorageReference} from '@angular/fire/storage';
import {Environment} from '@angular/compiler-cli/src/ngtsc/typecheck/src/environment';
import * as url from 'url';

@Component({
  selector: 'app-singer-avatar',
  templateUrl: './singer-avatar.component.html',
  styleUrls: ['./singer-avatar.component.scss']
})
export class SingerAvatarComponent implements OnInit {
selectFile:File;
fileInFirebase: AngularFireStorageReference;
urlFile:string;
checkUpload = false;
@Output()
urlFormFirebase = new EventEmitter<string>()
  constructor(private afService: AngularFireStorage) { }

  ngOnInit(): void {
  }

  OnchangeFile($event) {
   this.selectFile = $event.target.files[0];
  }
  upload(){
  this.checkUpload = true;
    this.fileInFirebase = this.afService.ref(this.selectFile.name);
    this.fileInFirebase.put(this.selectFile).then(data =>{
      return data.ref.getDownloadURL();//tra ve 1 dg dan cua firebase
    }).then(url=>{
      this.checkUpload =false;
      this.urlFile = url;
      this.urlFormFirebase.emit(this.urlFile);
      return this.urlFile;
    }).catch(error=>{
      `Upload File Failed! ${error}`
    })
  }
}
