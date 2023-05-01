import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { AuthGuard } from '../guards/auth.guard';
import { PerfilComponent } from './perfil/perfil.component';
import { UsuariosComponent } from './mantencion/usuarios/usuarios.component';
import { HospitalesComponent } from './mantencion/hospitales/hospitales.component';
import { MedicosComponent } from './mantencion/medicos/medicos.component';
import { MedicoComponent } from './mantencion/medicos/medico.component';

const routes: Routes = [
    { 
    path: 'dashboard', 
    component: PagesComponent,
    canActivate: [AuthGuard],
    children: [
        { path: '', component: DashboardComponent, data: {titulo: 'Dashboard'} },
        { path: 'account-settings', component: AccountSettingsComponent, data: {titulo: 'Configuración de cuenta'}},
        { path: 'grafica1', component: Grafica1Component, data: {titulo: 'Gráfica #1'} },
        { path: 'progress', component: ProgressComponent, data: {titulo: 'ProgressBar'} },
        { path: 'promesas', component: PromesasComponent, data: {titulo: 'Promesas'}},
        { path: 'rxjs', component: RxjsComponent, data: {titulo: 'Rxjs'}},
        { path: 'perfil', component: PerfilComponent, data: {titulo: 'Perfil de usuario'}},

        //Mantención
        { path: 'usuarios', component: UsuariosComponent, data: {titulo: 'Mantención de usuarios'}},
        { path: 'hospitales', component: HospitalesComponent, data: {titulo: 'Mantención de hospitales'}},
        { path: 'medicos', component: MedicosComponent, data: {titulo: 'Mantención de médicos'}},
        { path: 'medico/:id', component: MedicoComponent, data: {titulo: 'Mantención de médicos'}},
        ]
    },    
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
