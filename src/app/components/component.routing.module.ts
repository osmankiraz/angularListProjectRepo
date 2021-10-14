import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ToListComponent } from './to-list/to-list.component';
import { FormComponent } from './form/form.component';
const routes: Routes = [
  {
    path:"form",
    component:FormComponent,
  },
  {
    path:"to-list",
    component:ToListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentRoutingModule { }
