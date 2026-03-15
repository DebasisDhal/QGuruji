import { BlockGroup } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Patient } from '../cores/models/token.interface';
import { MasterService } from '../master.service';

@Component({
  selector: 'app-token',
  templateUrl: './token.component.html',
  styleUrls: ['./token.component.css']
})
export class TokenComponent implements OnInit {
  currentToken = 1;
  currentTime = new Date;
  isLive = true;
  elem = document.documentElement;
  private clickTimeout: any;
  isOpen: boolean = false;
  hospitals: any;
  onCallData?: Patient;
  constructor(private master: MasterService) {

  }
  ngOnInit() {
    this.loadHospitalData();
  }

  async loadHospitalData() {
    try {
      this.hospitals = await this.master.getHospitalCompleteData();
      this.onCallData = this.hospitals?.patients[0];
      console.log('All Hospit:', this.hospitals);
      console.log('All Hospitals:', [this.onCallData]);
      this.onData();

    } catch (error) {
      console.error('Error fetching hospital data:', error);
    }
  }
  onData() {
    this.onCallData = this.hospitals.patients.find(
      (x: Patient) => x.status === 'Live'
    );
    console.log(this.onCallData, "data");

  }

  onClick() {
    if (this.isOpen) {
      this.openFullscreen();
    } else {
      this.closeFullscreen();
    }
    this.isOpen = !this.isOpen;
  }
  openFullscreen() {
    localStorage.setItem("isFullScreen", "true");
    if (this.elem.requestFullscreen) {
      this.elem.requestFullscreen();
    } else if (this.elem.requestFullscreen) {
      this.elem.requestFullscreen();
    } else if (this.elem.requestFullscreen) {
      this.elem.requestFullscreen();
    }
  }

  closeFullscreen() {
    localStorage.removeItem("isFullScreen");
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }

}
