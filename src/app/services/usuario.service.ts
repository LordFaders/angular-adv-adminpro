import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { environment } from 'src/environments/environment.development';

import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';

declare const google: any;


const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor( private http: HttpClient,
                private router: Router,
                private ngZone: NgZone) { }

  logout(){
    localStorage.removeItem('token');
    
    google.accounts.id.revoke('jaime.tapia.miquel@gmail.com', () =>{
      
      this.ngZone.run(() =>{ // ngZone se utiliza cuando una librería externa dispara características de angular
        this.router.navigateByUrl('/login');
      })
    })
  }


  validarToken():Observable<boolean>{
    const token =  localStorage.getItem('token') || '';

    return this.http.get(`${base_url}/login/renew`, {
      headers: {
        'x-token': token
      }
    }).pipe(
      tap( (res: any ) => {
        localStorage.setItem('token', res.token);
      }),
      map( resp => true ),
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
