import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CreateService } from './create.service';
import { AlertService } from '../../shared/alert/alert.service';
import { AlertModel } from '../../shared/alert/alert.model';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
  providers: [CreateService]
})
export class CreateComponent implements OnInit {
  @ViewChild('form') formOutput: NgForm;
  templateList = ['male', 'female'];

  constructor(private createService: CreateService, private alertService: AlertService) { }

  ngOnInit() {
    this.createService.getTemplates().subscribe((templates: any[]) => {
      this.templateList = templates;
    });
  }

  onSubmit() {
    console.log('Submitted');
    console.log(this.formOutput);
    console.log(this.formOutput.value.templateChoice)
    this.createService.saveGame(this.formOutput.value).subscribe((success: boolean) => {
      if(success) {
        this.alertService.getAlertSubject().next(new AlertModel('success', 'Jouw spel is aangemaakt', 5000));
      }else{
        this.alertService.getAlertSubject().next(new AlertModel('danger', 'Er is iets verkeerd gegaan bij het toevoegen van jouw spel aan de database :O', 5000));
      }
    });
  }

  checkMinMaxIsValid(): boolean {
    return this.formOutput.value.minPlayers > this.formOutput.value.maxPlayers
  }

}
