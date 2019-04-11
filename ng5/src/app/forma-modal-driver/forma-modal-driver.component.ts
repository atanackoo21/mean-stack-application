import { Component, OnInit, Input, EventEmitter  } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Job } from '../job';
import { DataService } from '../data.service';

@Component({
  selector: 'app-forma-modal-driver',
  templateUrl: './forma-modal-driver.component.html',
  styleUrls: ['./forma-modal-driver.component.scss']
})
export class FormaModalDriverComponent implements OnInit {

  job: Job;

  logger: boolean;

  strucnaSprema: String []=['Izaberite..', "SSS", "VKV", "VŠS", "VSS", "Specijalista/kinja" ,"Magistar/ka", "Doktor/ka"];
  gender: String []= ['Musko', 'Žensko', 'Neopredeljen/a/o'];
  godine: String [] =[];
  vrednostGodista: any;
  fakultet: any;
  pol: any;

  myForm: FormGroup;

  constructor(public activeModal: NgbActiveModal, private dataService: DataService) { }

  getClickedButton(){
    // return this.dataService.getButtonClicked();
  }

  closeModal() {
    this.activeModal.close('Modal Closed');
  }
  eventHandler(event: any){
    this.vrednostGodista = event.target.value;
  }
  genderHandler(event: any){
    this.pol = event.target.value;
  }
  fakultetChoice(event: any){
    this.fakultet = event.target.value;
  }
  submitForm(form) {
    let newJob: Job = {
    firstName: form.value.nameStud,
    lastName: form.value.surnameStud,
    email: form.value.email,
    gender: this.pol,
    faculty: this.fakultet,
    birth: this.vrednostGodista ,
    message: form.value.message
    }
    this.activeModal.close(newJob);
  }

  getElements(){
    this.godine.push('Izaberite..');
    for (var i = 1955 ; i < 2005; i++){
      
      this.godine.push(i.toString());
    }
  }

  ngOnInit() {
    this.getElements();
  }

}
