import { Routes } from '@angular/router';
import { SistemaHomeComponent } from './sistema/home/sistema-home.component';
import { VendedoresComponent } from './sistema/vendedores/vendedores.component';
import { FormVendedoresComponent } from './sistema/vendedores/form-vendedores/form-vendedores.component';
import { DepartamentoComponent } from './sistema/departamento/departamento.component';
import { DepartamentoFormComponent } from './sistema/departamento/departamento-form/departamento-form/departamento-form.component'; 
import { ClienteListComponent } from './sistema/cliente/cliente-list/cliente-list.component';
import { ClienteFormComponent } from './sistema/cliente/cliente-form/cliente-form.component';
import { EventoListComponent } from './sistema/evento/evento-list/evento-list.component';
import { EventoFormComponent } from './sistema/evento/evento-form/evento-form.component';
import { LoginComponent } from './login/pages/login/login.component';
import { SignUpComponent } from './login/pages/signup/signup.component';
import { AuthGuard } from './services/auth-guard.service';
import { SistemaMenuComponent } from './sistema/template/menu/sistema-menu.component';
import { SistemaComponent } from './sistema/sistema/sistema.component';
import { HomeComponent } from './home/home/home.component';
import { Component } from '@angular/core';
import { HomeMenuComponent } from './home/template/home-menu/home-menu.component';

export const routes: Routes = [
    { path: '', component: HomeMenuComponent, children: [
        {
            path: '', component: HomeComponent
        }
    ] },
    { path: 'login', component: LoginComponent },
    {
        path: 'sistema',
        component: SistemaComponent,
        canActivate: [AuthGuard],
        children: [
            { path: 'home', component: SistemaHomeComponent },
            { path: 'vendedores', component: VendedoresComponent },
            { path: 'vendedores/form', component: FormVendedoresComponent },
            { path: 'vendedores/form/:id', component: FormVendedoresComponent },
            { path: 'departamento', component: DepartamentoComponent },
            { path: 'departamento/form', component: DepartamentoFormComponent },
            { path: 'departamento/form/:id', component: DepartamentoFormComponent },
            { path: 'cliente', component: ClienteListComponent },
            { path: 'cliente/form', component: ClienteFormComponent },
            { path: 'cliente/form/:id', component: ClienteFormComponent },
            { path: 'evento', component: EventoListComponent },
            { path: 'evento/form', component: EventoFormComponent },
            { path: 'evento/form/:id', component: EventoFormComponent },
        ]
    },
];
