import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';

import { ToListComponent } from './to-list/to-list.component';
import { FormComponent } from './form/form.component';

import { ComponentRoutingModule } from './component.routing.module';

@NgModule({
  imports: [
    BrowserModule,
    ComponentRoutingModule,
    CommonModule
  ],
  declarations: [ToListComponent,
    FormComponent
  ],
  bootstrap: [],
})
export class ComponentModule { }
