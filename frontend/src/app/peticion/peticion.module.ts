import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PeticionRoutingModule } from './peticion-routing.module';
import { CreateComponent } from './create/create.component';
import { ViewComponent } from './view/view.component';
import { EditComponent } from './edit/edit.component';
import { IndexComponent } from './index/index.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CreateComponent,
    ViewComponent,
    EditComponent,
    IndexComponent
  ],
  imports: [
    CommonModule,
    PeticionRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PeticionModule { }
