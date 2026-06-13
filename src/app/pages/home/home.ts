import { Component,AfterViewInit ,ElementRef,ViewChild,ChangeDetectorRef} from '@angular/core';
import {  NgClass } from '@angular/common';
import { Nav } from '../../component/nav/nav';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  standalone:true,
  imports: [Nav, NgClass],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class Home implements AfterViewInit {

   @ViewChild('bgVideo') bgVideo!: ElementRef<HTMLVideoElement>;

  
  stats=[
    {target: 500, display: 0, suffix: '+', label:'Industries'},
    {target: 10000, display: 0, suffix: '+', label:'Devices Connected'},
    {target: 99, display: 0, suffix: '.9%', label:'Uptime'},
    {target: 24, display: 0, suffix: '/7', label:'Support'},
  ];

  constructor(private cdr: ChangeDetectorRef,private router: Router) {}

  ngAfterViewInit(){
    setTimeout(() => {
      this.startCountUp();
    },300);
    const video = this.bgVideo.nativeElement;

    // try to play immediately
    video.play().catch(err => {
      console.log('Autoplay blocked:', err);
    });

    // if video pauses for any reason, resume it
    video.addEventListener('pause', () => {
      video.play();
    });

    // if video ends (in case loop fails), restart it
    video.addEventListener('ended', () => {
      video.currentTime = 0;
      video.play();
    });
  }
goToSignup() {
  this.router.navigate(['/signup']);
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
