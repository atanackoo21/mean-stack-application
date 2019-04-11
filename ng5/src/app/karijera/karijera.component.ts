import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import {NgbModal, NgbActiveModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormModalComponent } from '../form-modal/form-modal.component';
import { FormaModalDriverComponent } from '../forma-modal-driver/forma-modal-driver.component';

import { Job } from '../job';

@Component({
  selector: 'app-karijera',
  templateUrl: './karijera.component.html',
  encapsulation: ViewEncapsulation.None,

  styleUrls: ['./karijera.component.scss']
})
export class KarijeraComponent implements OnInit {

  closeResult: string;

  constructor(public activeModal: NgbActiveModal, private modalService: NgbModal, private router: Router, private dataservice: DataService, private authService: AuthService) { }

  onApliciraj(){
    alert('Mesto prodavca je trenutno popunjeno. Probajte drugi put!');
  }

  openFormModal() {

    if(this.authService.isLoggedIn()){
    const modalRef = this.modalService.open(FormModalComponent);

    modalRef.result.then((result) => {
    
    this.dataservice.addJob(result)
    .subscribe(item =>{
      console.log('Job sent' + item);
    });    
    }).catch((error) => {
      console.log(error);
    });
  }
  else 
    this.router.navigateByUrl('/login');
}

  openFormaModalDriver(){
    if(this.authService.isLoggedIn()){
      const modalRefs = this.modalService.open(FormaModalDriverComponent);

      modalRefs.result.then((result) => {
      
      this.dataservice.addJob(result)
      .subscribe(item =>{
        console.log('Job sent' + item);
      });    
      }).catch((error) => {
        console.log(error);
      });
    }
    else 
      this.router.navigateByUrl('/login');
    }

  
  ngOnInit() {
  }

}
