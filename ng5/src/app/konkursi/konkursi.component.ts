import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Job } from '../job';
import { Router } from '@angular/router';


@Component({
  selector: 'app-konkursi',
  templateUrl: './konkursi.component.html',
  styleUrls: ['./konkursi.component.scss']
})
export class KonkursiComponent implements OnInit {

  jobs: Job [] = [];

  constructor(private router: Router, private dataservice: DataService) { }

  ngOnInit() {
    this.getJobs();
  }

  getJobs(){
    this.dataservice.getJobs()
    .subscribe(works =>{
    this.jobs = works;
    });
  }

  onDeleteJob(job){
    console.log(job._id);
    this.dataservice.deleteJob(job._id).subscribe(data =>{
    this.getJobs();
    });
  }
}