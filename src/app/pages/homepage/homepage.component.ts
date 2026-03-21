import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MasterService } from '../master.service';
import { Observable } from 'rxjs/internal/Observable';
import { doc, docData, Firestore, serverTimestamp } from '@angular/fire/firestore';
import { Route, Router, RouterLink } from '@angular/router';
import { ITokenModel } from '../cores/models/token.interface';

interface User {
  Email?: string;
  Name?: string; // Replace with your actual fields
}
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})


export class HomepageComponent implements OnInit {

  patientName:any;
  phone:any;
  doctorId:any='';
  showTokenResult:boolean = false;
  generatedToken:number = 100;
  lastTokenNo:number = 100;
  tokenValue:any ={};
  user$: Observable<User | undefined>;
  hospitalData:any;
  constructor(private masterService: MasterService,private firestore: Firestore,private router: Router) { }
  
  ngOnInit() {
    this.testSave();
    this.user$=this.masterService.getUser();
    this.allData();
  }
  testSave() {
  this.masterService.saveTokenNumber(10);
}

  tokenForm:FormGroup  = new FormGroup({
    patientName: new FormControl('',Validators.required),
    phone: new FormControl(''),
    doctorId: new FormControl(0),
    tokenNo:new FormControl(0),
    generatedAt: new FormControl(''),
    hospitalId: new FormControl(''),
    status: new FormControl(''),
    validUntil: new FormControl('')
  });

 generateTokenData():ITokenModel | any{
  if(this.tokenForm.valid){

     const tokenNo = ++this.lastTokenNo;
     this.generatedToken = tokenNo;
     const generatedAt = Date.now();
  const validUntil = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
    return{
      ...this.tokenForm.value,
      tokenNo,
      generatedAt,
      hospitalId: 'Hospital_1',
      status:'Generated',
      validUntil
    }
  }else{
    this.tokenForm.markAllAsTouched();
  }
 }

  onGenerateToken(){
    this.showTokenResult = true;
    console.log(this.tokenForm.value);
    const tokenData = this.generateTokenData();
    this.masterService.createPatient(tokenData);
  }

 async allData(){
   this.hospitalData = await this.masterService.getHospitalCompleteData();

  //  const took = Math.max(...this.hospitalData.map(p=> p.tokenNo || 0),0);
    this.lastTokenNo = this.hospitalData.patients.length 
  ? Math.max(...this.hospitalData.patients.map(p => p.tokenNo || 100))
  : 100;

   
  }
  onLogin(){
    this.router.navigate(['/layout']);
  }

}
