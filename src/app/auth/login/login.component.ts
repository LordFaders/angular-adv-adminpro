import { AfterViewInit, Component, ElementRef, NgZone, OnInit, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

declare const google: any;


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.scss'
  ]
})
export class LoginComponent implements OnInit, AfterViewInit {

  @ViewChild('googleBtn') googleBtn!: ElementRef;

  public formSubmitted = false;
  

  public loginForm: FormGroup = this.fb.group({
    email: [ localStorage.getItem('email') || '', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    remember: [false]
  });

  constructor( private router: Router,
              private fb: FormBuilder,
              private usuarioService: UsuarioService,
              private ngZone: NgZone){}


  ngAfterViewInit(): void {
  this.googleInit();
  }

  googleInit(){
    google.accounts.id.initialize({
      client_id: '893111458107-7ag0lsb8uar91tbasslktbmfpl622q7b.apps.googleusercontent.com',
      callback: (response: any) =>  this.handleCredentialResponse(response)
  });
  google.accounts.id.renderButton(
      this.googleBtn.nativeElement, {
          theme: "outline",
          size: "large"
      } // customization attributes
  );
  }

  handleCredentialResponse( response: any){
    // console.log("Encoded JWT ID token: " + response.credential);
    this.usuarioService.loginGoogle( response.credential )
    .subscribe({
      next: resp => {
        // Navegar al Dashboard
        this.ngZone.run(() => { // ngZone se utiliza cuando una librería externa dispara características de angular
          this.router.navigateByUrl('/');
        })
      }
    })

  }


  ngOnInit(): void {}


login() {

  this.usuarioService.login(this.loginForm.value)
  .subscribe({
    next: resp => {
      if(this.loginForm.get('remember')!.value){
        localStorage.setItem('email', this.loginForm.get('email')!.value);
      }else{
        localStorage.removeItem('email');
      }

      // Navegar al Dashboard
      this.router.navigateByUrl('/');
    },
    error: (err) =>{
      // Si sucede un error
      Swal.fire('Error', err.error.msg, 'error'); 
    }
  })

// console.log( this.loginForm.value);
  // this.router.navigateByUrl('/');
}

}
