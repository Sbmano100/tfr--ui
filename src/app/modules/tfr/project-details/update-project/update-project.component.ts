import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TfrService } from '../../tfr.service';
import { FormGroup, FormControl, FormControlName, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-project',
  templateUrl: './update-project.component.html',
  styleUrls: ['./update-project.component.scss']
})
export class UpdateProjectComponent implements OnInit {

  constructor(private tfrService: TfrService, private router: Router, private route: ActivatedRoute) { }
  ProjectDetail: any;
  routeId !: number;
  ragForm : any;
  invoiceForm: any;
  options!: any
  ngOnInit(): void {
    this.routeId = this.route.snapshot.params['id'];
    if(!this.tfrService.isloggedin()){
      this.tfrService.sessionexpired();
      this.router.navigate(['']);
    }
    this.tfrService.getProjectDetail(this.routeId).subscribe((data: any) => {
      this.ProjectDetail = data;
      let rag2 = document.getElementById("rag2");
      
      
      if(this.ProjectDetail.rag_status.toLowerCase() == "r"){
        rag2?.setAttribute('src', '../../../../../assets/red.png');
        rag2?.setAttribute('alt', 'RED');
      }else if(this.ProjectDetail.rag_status.toLowerCase() == "a"){
        rag2?.setAttribute('src', '../../../../../assets/amber.png');
        rag2?.setAttribute('alt', 'AMBER');
      }else if(this.ProjectDetail.rag_status.toLowerCase() == "g"){
        rag2?.setAttribute('src', '../../../../../assets/green.png');
        rag2?.setAttribute('alt', 'GREEN');
      }
    });
    this.options = [
      { value: "", viewValue: "Select Rag Status" },
      { value: "r", viewValue: "Red" },
      { value: "a", viewValue: "Amber" },
      { value: "g", viewValue: "Green" }
    ];
    this.invForm();
    this.ragsForm();
  }

  invForm(){
    this.invoiceForm = new FormGroup({
      invoicing_status:new FormControl("")
    });
  }
  ragsForm(){
    this.ragForm = new FormGroup({
      rag_status:new FormControl("")
    });
  }

  onInvSubmit(){
    console.log(this.invoiceForm.value);
    this.tfrService.updateProject(this.routeId, this.invoiceForm.value).subscribe();
    location.reload();
  }
  onRagSubmit(){
    console.log(this.ragForm.value);
    this.tfrService.updateProject(this.routeId, this.ragForm.value).subscribe();
    location.reload();
  }
}
