import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { User } from '../../models/user.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'src/app/auth/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  errors = [];
  editUserForm: FormGroup
  userDetails: User


  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<EditProfileComponent>,
    @Inject(MAT_DIALOG_DATA) public user: User,
    private userService: UserService,
    private route:Router
  ) { }

  ngOnInit(): void {
    this.setForm();
  }

  setForm(){
    this.editUserForm = this.formBuilder.group({
      id: [this.user.id],
      username: [this.user.username],
      first_name: [this.user.first_name],
      last_name: [this.user.last_name]
    })
  }

  //as of 4/2/23, you cannot edit username as this is the identifier for the path
  // look into pulling by user ID instead?
  onSubmit(){
    const editedProfile = this.editUserForm.value;
    console.log(this.editUserForm.value)
    this.userService.onUpdatedUser(editedProfile, this.user.id).subscribe({
      next: (res:any)=>{
        console.log('user res is:', res)
        this.dialogRef.close()
        this.reloadPage();
      }
    })

  }

  reloadPage(){
    window.location.reload()
  }

}
