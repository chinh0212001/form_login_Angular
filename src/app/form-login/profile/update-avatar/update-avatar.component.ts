import { Component, OnInit } from '@angular/core';
import {ChangeAvatar} from '../../../model/change-avatar';
import {AuthService} from '../../../service/auth.service';
import {TokenService} from '../../../service/token.service';
import {$e} from 'codelyzer/angular/styles/chars';
import {MatDialog} from '@angular/material/dialog';
import {DialogComponent} from '../../../dialog/dialog/dialog.component';

@Component({
  selector: 'app-update-avatar',
  templateUrl: './update-avatar.component.html',
  styleUrls: ['./update-avatar.component.scss']
})
export class UpdateAvatarComponent implements OnInit {
singerAvatar:ChangeAvatar;
check =false;
  constructor(private authService:AuthService,
              private tokenService:TokenService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  changeAvatar($event: string) {
    this.singerAvatar = new ChangeAvatar($event);
    this.authService.updateAvatar(this.singerAvatar).subscribe(data=>{
      console.log("data---->",data);
      if (data.message === 'yes'){
        this.check = true;
        this.tokenService.setAvatar($event);
        this.dialog.open(DialogComponent)
        // location.reload();
      }
    })
  }
}
