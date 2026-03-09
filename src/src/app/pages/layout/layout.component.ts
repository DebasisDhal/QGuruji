import { Component } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {
 isFullscreen = true;
 constructor(){
   const data= localStorage.getItem("isFullScreen");
if(!data){

  this.isFullscreen  =false;
}
 }

   checkFullscreen() {
    this.isFullscreen = document.fullscreenElement !== null || 
                         document.fullscreenElement !== null || 
                         document.fullscreenElement !== null || 
                         document.fullscreenElement !== null;
  }

  ngDoCheck(): void {
    const data= localStorage.getItem("isFullScreen");
if(!data){
  this.isFullscreen  =true;
}else{
  this.isFullscreen  =false;

}
  }
}
