import { Component, OnInit } from '@angular/core';
import { MasterService } from '../master.service';
import { Patient } from '../cores/models/token.interface';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  hospitals: any;
  onCallData?: Patient;
  total:number;
  pending:number;
  done:number;
  patientData: any;
  modifyData: any;

  constructor(private master: MasterService) {

  }

  ngOnInit(): void {
    this.loadHospitalData();
  }

  //  all(){
  //   this.master.getAllData().subscribe((res:any)=>{
  //     console.log(res);
  //   })
  // }

  async loadHospitalData() {
    try {
      this.hospitals = await this.master.getHospitalCompleteData();
      this.patientData = this.hospitals?.patients;
      this.onCallData = this.hospitals.patients[0];
      this.total = this.hospitals.patients.length;
      this.pending = this.hospitals.patients.filter(
      (x: Patient) => x.status === 'Pending').length;
      this.done = this.hospitals.patients.filter(
      (x: Patient) => x.status === 'Done').length;
      console.log('All Hospit:', this.done);
      console.log('All Hospit:', this.pending);
      console.log('All Hospitals:', [this.onCallData]);
    } catch (error) {
      console.error('Error fetching hospital data:', error);
    }
  }

  onCall(patientsId) {

    const currentLive = this.hospitals.patients.find(
      (x: Patient) => x.status === 'Live'
    );
    if (currentLive) {
      currentLive.status = 'Pending';
      this.master.updateStatus(currentLive.id, 'Pending');
    }

    const selectedPatient = this.hospitals.patients.find(
      (x: Patient) => x.id === patientsId
    );

    if (selectedPatient) {
      selectedPatient.status = 'Live';
      this.master.updateStatus(selectedPatient.id, 'Live');
      this.onCallData = selectedPatient;
    }
  }

  onLogout() {
    localStorage.removeItem("isFullScreen");
  }

  markDone() {
    if (this.onCallData) {

      this.onCallData.status = 'Done';
      this.master.updateStatus(this.onCallData.id, this.onCallData.status);
this.loadHospitalData();
    }
  }
  markPending() {
    if (this.onCallData) {
      this.onCallData.status = 'Pending';
      this.master.updateStatus(this.onCallData.id, this.onCallData.status);
      this.loadHospitalData();
    }
  }
  totalData(){
        this.modifyData = this.hospitals.patients;
      
    }
    waitingData(){
      this.modifyData = this.hospitals.patients.filter(
        (x: Patient) => x.status === 'Pending');
      console.log(this.modifyData,"modifyData");
  }
  doneData(){
         this.modifyData = this.hospitals.patients.filter(
      (x: Patient) => x.status === 'Done');
  }

  get patientList() {
  return  this.modifyData ||this.hospitals?.patients || [];
}
}
