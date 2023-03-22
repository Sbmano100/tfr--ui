import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProjectData } from './dashboard/project-data';
import { Observable, Subject } from 'rxjs';
import { formatDate } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class TfrService {

  constructor(private httpclient: HttpClient) { }
  displayedColumns: string[] = ['id', 'name', 'start_date', 'end_date', 'client.name', 'division.name', 'superDepartment.name', 'department.name', 'rag_status', 'invoicing_status'];
  userid!: number;
  username!: String;
  featurelist!:any
  displayedResColumns: string[] = ['id', 'name', 'emp_id', 'email', 'join_date', 'skill', 'gender', 'location', 'remark', 'edit', 'remove'];
  displayedRiskColumns: string[] = ['id', 'risk', 'start_date', 'createdBy.name', 'risk_mitigation', 'end_date', 'modifiedBy.name', 'edit'];
  displayResHisColumns: string[] = ['id', 'resourceHistoryProject.name', 'resourceHistoryList.designation_name', 'start_date', 'end_date', 'remarks'];
  displayCliDetColumns: string[] = ['id', 'name', 'start_date', 'end_date'];
  displayInvColumns: string[] = ['id', 'invoice_status', 'date_of_add', 'invoiceHistoryCreatedBy.name'];
  displayProHisColumns: string[] = ['id', 'remark', 'date_of_modified', 'modified_by'];
  displayOrgColumns: string[] = ['id', 'name', 'start_date', 'end_date'];
  displayMilColumns: string[] = ['id', 'name', 'start_date', 'end_date', 'weightage', 'status', 'edit'];
  displayGoalColumns: string[] = ['id', 'name', 'goal_description', 'start_date', 'end_date', 'goal_status', 'edit'];

  getProjectUrl = "http://localhost:8902/tfr/getAllProjects";
  getAllProjects(): Observable<any> {
    return this.httpclient.get<any>(this.getProjectUrl);
    // {observe: 'response', resposeType: 'json'};
  }

  getProjectDetail(id: number): Observable<any> {
    return this.httpclient.get<any>("http://localhost:8902/tfr/getProject/" + id);
  }

  getRisks(id: number): Observable<any> {
    return this.httpclient.get<any>("http://localhost:8902/tfr/getRisk/" + id);
  }

  getMilestones(id: number): Observable<any> {
    return this.httpclient.get<any>("http://localhost:8902/tfr/getMilestone/" + id)
  }

  getGoals(id: number): Observable<any> {
    return this.httpclient.get<any>("http://localhost:8902/tfr/GoalsByPid/" + id)
  }

  getGoalsbyMile(id: number): Observable<any> {
    return this.httpclient.get<any>("http://localhost:8902/tfr/Goals/" + id)
  }

  getProjectStatus(id: number): Observable<any> {
    return this.httpclient.get<any>("http://localhost:8902/tfr/getProjectStatus/" + id)
  }

  getResourcesByProjectId(id: number): Observable<any> {
    return this.httpclient.get<any>("http://localhost:8902/tfr/get/resource/" + id + "/project/");
  }

  getResourceById(id: number): Observable<any> {
    return this.httpclient.get<any>("http://localhost:8902/tfr/Resource/" + id);
  }

  getClientInfo(id: number): Observable<any> {
    return this.httpclient.get<any>("http://localhost:8902/tfr/getClient/" + id);
  }

  getOrgProjects(id: number): Observable<any> {
    return this.httpclient.get<any>("http://localhost:8902/tfr/getProjectByOrgId/" + id);
  }

  getResourceHistory(id: number): Observable<any> {
    return this.httpclient.get<any>("http://localhost:8902/tfr/getResourceHistoryByRID/" + id);
  }

  updateResRemark(id: number, data: any): Observable<any> {
    return this.httpclient.patch<any>(`http://localhost:8902/tfr/updateResource/${id}`, data);
  }

  updateMileStatus(id: number, data: any): Observable<any> {
    return this.httpclient.patch<any>(`http://localhost:8902/tfr/updateMilestone/${id}`, data);
  }

  updateGoalStatus(id: number, data: any): Observable<any> {
    return this.httpclient.patch<any>(`http://localhost:8902/tfr/updateGoals/${id}`, data);
  }

  updateRiskMit(id: number, data: any): Observable<any> {
    return this.httpclient.patch<any>(`http://localhost:8902/tfr/updateRisk/${id}`, data);
  }

  updateProject(id: number, data: any): Observable<any> {
    return this.httpclient.patch<any>(`http://localhost:8902/tfr/updateProj/${id}`, data);
  }


  ifvalid():void{
    this.settoken('token',this.userid,1296000000,this.featurelist)
    //console.log(this.featurelist)
   }

  removeResource(resId: number, projectId: number): Observable<any> {
    return this.httpclient.get<any>(`http://localhost:8902/tfr/deleteResource/${resId}/project/${projectId}`);
  }

  getInvoice(id: number): Observable<any> {
    return this.httpclient.get<any>(`http://localhost:8902/tfr/getInvoiceHistoryByPID/${id}`);
  }



  settoken(key: any, value: any, time: any,feature:any) {
//console.log(feature[0])
    const now = new Date()
    const item = {
      value: value,
      expiry: now.getTime() + time,
      featurelist:feature
    }
    localStorage.setItem(key, JSON.stringify(item))
    
  }

  gettoken(): string | null {
    return localStorage.getItem('token');
  }

  isloggedin() {
    this.expirycheck('token');
    return this.gettoken() !== null;
  }
  expirycheck(token: any) {
    const itemStr = localStorage.getItem(token)
    if (!itemStr) {
      return null
    }

    const item = JSON.parse(itemStr)
    const now = new Date()
    if (now.getTime() > item.expiry) {
      localStorage.removeItem(token)
      return null
    }
    return item.value
  }

  removetoken(token: any) {
    localStorage.removeItem(token);
    return null;
  }


  gettokenid(): any {
    const itemStr = localStorage.getItem('token')
    if (!itemStr) {
      return null;
    }
    const item = JSON.parse(itemStr)
    return item.value;
  }


  sessionexpired() {
    alert("Your Session Got Expired. Login Again!")
  }
  // isauthenticated(){
  //   return this.isloggedin();
  // }



  date=formatDate(new Date,'dd-MM-yyyy','en-US');
  divisionvalue = new Array();
  divmap = new Map();
  supdeptvalue = new Array();
  supdeptmap = new Map();
  deptvalue = new Array();
  deptmap = new Map();
  clientvalue = new Array();
  clientmap = new Map();
  projectid!: any
  division() {
    this.getdivision("Division").subscribe(result => {
      this.divlist(result);
    })
  }
  divlist(value: any) {
    for (let i = 0; i < value.length; i++) {
      this.divisionvalue[i + 1] = value[i].name
      this.divmap.set(value[i].name, value[i].id)
    }
    //console.log(this.divisionvalue)
    //console.log(this.map1)
  }

  superdept() {
    this.getsupdept("Super Department").subscribe(result => {
      this.supdeptlist(result);
    });
  }
  supdeptlist(value: any) {
    for (let i = 0; i < value.length; i++) {
      this.supdeptvalue[i + 1] = value[i].name
      this.supdeptmap.set(value[i].name, value[i].id)
    }
    //console.log(this.divisionvalue)
    //console.log(this.map2)
  }

  department() {
    this.getdept("Department").subscribe(result => {
      this.deptlist(result);
    });;
  }
  deptlist(value: any) {
    for (let i = 0; i < value.length; i++) {
      this.deptvalue[i + 1] = value[i].name
      this.deptmap.set(value[i].name, value[i].id)
    }
  }

  client() {
    this.getclient().subscribe(result => {
      this.clientlist(result);
    })
  }
  clientlist(value: any) {
    for (let i = 0; i < value.length; i++) {
      this.clientvalue[i + 1] = value[i].emp_name
      this.clientmap.set(value[i].emp_name, value[i].id)
    }
  }


  login(data:any):Observable<any>{
    return this.httpclient.post("http://localhost:8902/tfr/validate",data);
  }

  sendusername(data: any): Observable<any> {
    return this.httpclient.post("http://localhost:8902/tfr/username", data);
  }
  adddesignation(data: any): Observable<any> {
    return this.httpclient.post("http://localhost:8902/tfr/addDesignation", data);
  }

  addresource(data: any): Observable<any> {
    return this.httpclient.post("http://localhost:8902/tfr/addResource", data);
  }

  adddivision(data: any): Observable<any> {
    return this.httpclient.post("http://localhost:8902/tfr/addDivision", data);
  }

  addclient(data: any): Observable<any> {
    return this.httpclient.post("http://localhost:8902/tfr/addClient", data);
  }

  addproject(data: any): Observable<any> {
    return this.httpclient.post("http://localhost:8902/tfr/addProject", data);
  }

  addmilestone(data: any): Observable<any> {
    return this.httpclient.post("http://localhost:8902/tfr/addMilestone", data);
  }

  addgoals(data: any): Observable<any> {
    return this.httpclient.post("http://localhost:8902/tfr/addGoals", data);
  }

  addrisk(data: any): Observable<any> {
    return this.httpclient.post("http://localhost:8902/tfr/addRisk", data);
  }

  addprojectresource(data: any): Observable<any> {
    return this.httpclient.post("http://localhost:8902/tfr/add/resource/" + data.resource_id + "/project/" + data.project_id, data);
  }

  addprojectstatus(data: any): Observable<any> {
    return this.httpclient.post("http://localhost:8902/tfr/addProjectStatus", data);
  }

  getdivision(data: any): Observable<any> {
    return this.httpclient.post("http://localhost:8902/tfr/getdivision", data);
  }

  getsupdept(data: any): Observable<any> {
    return this.httpclient.post("http://localhost:8902/tfr/getsupdept", data);
  }

  getdept(data: any): Observable<any> {
    return this.httpclient.post("http://localhost:8902/tfr/getdept", data);
  }

  getclient(): Observable<any> {
    return this.httpclient.get<any>("http://localhost:8902/tfr/getclient");
  }

  getdesignation(): Observable<any> {
    return this.httpclient.get<any>("http://localhost:8902/tfr/getdesignation");
  }
  getresource(): Observable<any> {
    return this.httpclient.get<any>("http://localhost:8902/tfr/getallresource");
  }
  
  getresourcefeature(id: number): Observable<any> {
    return this.httpclient.get<any>("http://localhost:8902/tfr/FeatureListByResourceId/" + id);
  }

  getprojectbyresid(id:any): Observable<any>{
    return this.httpclient.get<any>("http://localhost:8902/tfr/getProjectByRid/" + id); 
  }
}
