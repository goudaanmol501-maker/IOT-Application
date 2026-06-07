import { Component,AfterViewInit ,ChangeDetectorRef} from '@angular/core';
import {  NgClass } from '@angular/common';
import { Nav } from '../../component/nav/nav';

@Component({
  selector: 'app-home',
  standalone:true,
  imports: [Nav, NgClass, ],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class Home implements AfterViewInit {

  stats=[
    {target: 500, display: 0, suffix: '+', label:'Industries'},
    {target: 10000, display: 0, suffix: '+', label:'Devices Connected'},
    {target: 99, display: 0, suffix: '.9%', label:'Uptime'},
    {target: 24, display: 0, suffix: '/7', label:'Support'},
  ];

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit(){
    setTimeout(() => {
      this.startCountUp();
    },300);
    
  }

  startCountUp(){
    this.stats.forEach(stat => {
      const duration = 2500;
      const frameRate =16;
      const totalFrames = duration / frameRate;
      const increment = stat.target / totalFrames;
      let current = 0;
      const interval = setInterval(() =>{
        current += increment;
        if(current >= stat.target){
          stat.display =stat.target;
          clearInterval(interval);
        }else{
          stat.display = Math.floor(current);
        }
        this.cdr.detectChanges();
      }, frameRate);
    })
  }
}
