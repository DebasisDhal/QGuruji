import { Component, OnInit } from '@angular/core';
import { MasterService } from '../master.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit{
  hospitals: any;

  constructor(private master: MasterService){
    
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
      console.log('All Hospitals:', this.hospitals);
    } catch (error) {
      console.error('Error fetching hospital data:', error);
    }
  }

  onCall(data){}
  

}
