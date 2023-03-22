import { Component, OnInit } from '@angular/core';
import { TfrService } from '../../tfr.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, FormControlName, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-goal-details',
  templateUrl: './goal-details.component.html',
  styleUrls: ['./goal-details.component.scss']
})
export class GoalDetailsComponent implements OnInit {

  constructor(private tfrService: TfrService, private router: Router, private route: ActivatedRoute) { }

  mileId !: number;
  goals: any;
  goalsForm: any;
  displayGoalColumns = this.tfrService.displayGoalColumns;
  options: any;
  ngOnInit(): void {
    this.mileId = this.route.snapshot.params['id'];
    if (!this.tfrService.isloggedin()) {
      this.tfrService.sessionexpired();
      this.router.navigate(['']);
    }
    this.tfrService.getGoalsbyMile(this.mileId).subscribe((data: any) => {
      this.goals = data;
      console.log(this.goals);
      
    });
    this.options = [
      { value: "", viewValue: "Select Status" },
      { value: "In Progress", viewValue: "In Progress" },
      { value: "Pending", viewValue: "Pending" },
      { value: "Completed", viewValue: "Completed" }
    ];
    this.goalForm();
  }

  goalForm(){
    this.goalsForm = new FormGroup({
      goal_status: new FormControl("")
    });
  }

  public get showaddgoal():boolean{
    const itemStr = localStorage.getItem('token')
    if (!itemStr) {
      return false;
    }
    const item = JSON.parse(itemStr)
    return item.featurelist[9];
  }
  public get showupdategoal():boolean{
    const itemStr = localStorage.getItem('token')
    if (!itemStr) {
      return false;
    }
    const item = JSON.parse(itemStr)
    return item.featurelist[10];
  }

  goalId !: number;
  getGoalID(id: number) {
    this.goalId = id;
  }

  onGoalSubmit() {
    console.log(this.goalsForm.value);
    this.tfrService.updateGoalStatus(this.goalId, this.goalsForm.value).subscribe();
    location.reload();
  }

  addgoal(){
    this.router.navigate(['tfr/forms/addgoals',this.mileId])
  }
}
