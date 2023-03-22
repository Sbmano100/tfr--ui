import { Component, OnInit } from '@angular/core';
import { TfrService } from '../../tfr.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, FormControlName, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-milestone-details',
  templateUrl: './milestone-details.component.html',
  styleUrls: ['./milestone-details.component.scss']
})
export class MilestoneDetailsComponent implements OnInit {
  constructor(private tfrService: TfrService, private router: Router, private route: ActivatedRoute) {
  }
  projectId!: number;
  milestones: any;
  milestoneForm: any;
  check = true;
  options: any;
  displayMileColumns = this.tfrService.displayMilColumns;
  ngOnInit(): void {
    this.projectId = this.route.snapshot.params['id'];
    if (!this.tfrService.isloggedin()) {
      this.tfrService.sessionexpired();
      this.router.navigate(['']);
    }
    this.tfrService.getMilestones(this.projectId).subscribe((data: any) => {
      this.milestones = data;
    });
    this.options = [
      { value: "", viewValue: "Select Status" },
      { value: "In Progress", viewValue: "In Progress" },
      { value: "Pending", viewValue: "Pending" },
      { value: "Completed", viewValue: "Completed" }
    ];
    this.mileForm();
  }

  mileForm() {
    this.milestoneForm = new FormGroup({
      status: new FormControl("")
    });
  }

  public get showaddmilestone():boolean{
    const itemStr = localStorage.getItem('token')
    if (!itemStr) {
      return false;
    }
    const item = JSON.parse(itemStr)
    return item.featurelist[6];
  }

  mileId !: number;
  getMileID(id: number) {
    this.mileId = id;
    this.check = false;
  }
 
  addmilestone(){
    this.router.navigate(['tfr/forms/addmilestone', this.projectId])
  }
  onMileSubmit() {
    console.log(this.milestoneForm.value);
    this.tfrService.updateMileStatus(this.mileId, this.milestoneForm.value).subscribe();
    location.reload();
  }

  toGoalDetails(id: number) {
    if (this.check) {
      this.router.navigate(['tfr/details/goal-details', id]);
    }
    this.check = true;
  }
}
