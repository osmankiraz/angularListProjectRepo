import { AddFormComponent } from './addForm.component';
import { OdevComponent } from './odev.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    component: OdevComponent,
    data: {
      title: 'Odev'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OdevRoutingModule {}
