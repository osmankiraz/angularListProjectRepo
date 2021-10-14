import { AddFormComponent } from './addForm.component';
import { OdevComponent } from './odev.component';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { Pipe } from '@angular/core';

 import { BsModalRef } from 'ngx-bootstrap/modal';
//import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { OdevRoutingModule } from './odev.routing.module';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    OdevRoutingModule,
    ModalModule.forRoot(),
    BsDropdownModule.forRoot()
  ],
  declarations: [OdevComponent,AddFormComponent ],
  providers:[Pipe,BsModalRef]
})
export class OdevModule { }
