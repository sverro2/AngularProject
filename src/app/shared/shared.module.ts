import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CursorDirective } from './cursor.directive';
import { AlertModule} from 'ngx-bootstrap';
import { AlertComponent } from './alert/alert.component';

@NgModule({
  imports: [
    CommonModule,
    AlertModule.forRoot(),
  ],
  declarations: [
    CursorDirective,
    AlertComponent
  ],
  exports: [
    CursorDirective,
    AlertComponent
  ]
})
export class SharedModule { }
