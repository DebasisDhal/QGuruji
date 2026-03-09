import { BlockGroup } from '@angular/compiler';
import { Component } from '@angular/core';

@Component({
  selector: 'app-token',
  templateUrl: './token.component.html',
  styleUrls: ['./token.component.css']
})
export class TokenComponent {
  currentToken =1;
  currentTime= new Date;
  isLive= true;
 


   elem = document.documentElement;
  private clickTimeout: any;
isOpen: boolean = false;

     onClick() {
      if(this.isOpen){
          this.openFullscreen();
      }else{
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
