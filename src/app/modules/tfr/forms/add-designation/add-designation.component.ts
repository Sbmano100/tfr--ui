import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,Validators } from '@angular/forms';
import { TfrService } from '../../tfr.service';

@Component({
  selector: 'app-add-designation',
  templateUrl: './add-designation.component.html',
  styleUrls: ['./add-designation.component.scss']
})
export class AddDesignationComponent implements OnInit {

  constructor(private tfrService:TfrService) { }
  details:any
  adddesignationForm!:any;
  ngOnInit(): void {
    this.form();
  }

  form(){
    this.adddesignationForm=new FormGroup({
      designation_name:new FormControl("",[Validators.required]),
      designation_code:new FormControl("",[Validators.required]),
    });
}

onSubmit(){
  this.tfrService.adddesignation(this.adddesignationForm.value).subscribe(result=>{
  })
  location.reload()
}

}
