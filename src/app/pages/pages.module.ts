import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'


// Módulos
import { ComponentsModule } from '../components/components.module';
import { SharedModule } from '../shared/shared.module';

import { PipesModule } from '../pipes/pipes.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PagesComponent } from './pages.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PromesasComponent } from './promesas/promesas.component';
import { PerfilComponent } from './perfil/perfil.component';
import { UsuariosComponent } from './mantencion/usuarios/usuarios.component';
import { HospitalesComponent } from './mantencion/hospitales/hospitales.component';
import { MedicosComponent } from './mantencion/medicos/medicos.component';
import { MedicoComponent } from './mantencion/medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';


@NgModule({
  declarations: [ 
    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    PagesComponent,
    AccountSettingsComponent,
    PromesasComponent,
    RxjsComponent,
    PerfilComponent,
    UsuariosComponent,
    HospitalesComponent,
    MedicosComponent,
    MedicoComponent,
    BusquedaComponent,

  ],
    exports:[
      DashboardComponent,
      ProgressComponent,
      Grafica1Component,
      PagesComponent,
      ProgressComponent,
      AccountSettingsComponent
    ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    PipesModule
  ]
})
export class PagesModule { }
