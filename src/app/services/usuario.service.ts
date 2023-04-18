import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { environment } from 'src/environments/environment.development';

import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';
import { Usuario } from '../models/usuario.model';

const base_url = environment.base_url;

declare const google: any;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public usuario!: Usuario;

  constructor( private http: HttpClient,
                private router: Router,
                private ngZone: NgZone) { }

  
  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get uid(): string {
    return this.usuario.uid || '';
  }

  logout(){
    localStorage.removeItem('token');
    
    google.accounts.id.revoke('jaime.tapia.miquel@gmail.com', () =>{
      
      this.ngZone.run(() =>{ // ngZone se utiliza cuando una librería externa dispara características de angular
        this.router.navigateByUrl('/login');
      })
    })
  }


  validarToken():Observable<boolean>{

    google.accounts.id.initialize({
      client_id: '893111458107-7ag0lsb8uar91tbasslktbmfpl622q7b.apps.googleusercontent.com'
    });

    return this.http.get(`${base_url}/login/renew`, {
      headers: {
        'x-token': this.token
      }
    }).pipe(
      map( (res: any ) => {
        const{email, google, nombre, role, img = '', uid} = res.usuario;
        this.usuario = new Usuario(nombre, email, '', img, google, role, uid);
        localStorage.setItem('token', res.token);
        return true;
      }),
      catchError( error => of(false)) // of crea un observable en base al valor que se le entrega
    );
  }


  crearUsuario( formData: RegisterForm ){
    
    return this.http.post(`${base_url}/usuarios`, formData)
    .pipe(
      tap( (resp: any) => {
        localStorage.setItem('token', resp.token)
      })
    )
  }

  actualizarPerfil( data: {email:string, nombre:string, role: string}){

    data = {
      ...data,
      role: this.usuario.role!
    };

    return this.http.put(`${base_url}/usuarios/${this.uid}`, data, {
      headers: {
        'x-token': this.token
      }
    });
  }


  login( formData: LoginForm ){
    
    return this.http.post(`${base_url}/login`, formData)
      .pipe(
        tap( (resp: any) => {
          localStorage.setItem('token', resp.token)
        })
      )
  }


  loginGoogle( token: string ){
    return this.http.post(`${base_url}/login/google`, {token})
    .pipe(
      tap( (resp: any) => {
        localStorage.setItem('token', resp.token)
      })
    )
  }
}
