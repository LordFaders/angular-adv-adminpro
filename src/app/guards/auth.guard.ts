import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

constructor(private usuarioService: UsuarioService,
            private router: Router){}

  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.usuarioService.validarToken()
      .pipe(
        tap( estaAutenticado =>  {
          if ( !estaAutenticado ) {
            this.router.navigateByUrl('/login');
          }
        })
      );
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
      
    return this.usuarioService.validarToken()
      .pipe(
        tap( estaAutenticado =>  {
          if ( !estaAutenticado ) {
            this.router.navigateByUrl('/login');
          }
        })
      );
  }
  
}
