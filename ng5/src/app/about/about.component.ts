import { Component, OnInit, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
// import { AgmCoreModule } from '@agm/core';


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  latitude: number = 43.8563352;
  longitude: number = 21.41227409999999;

  constructor(private router: Router) { }

  ngOnInit() {
  }

}
