import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Medico } from 'src/app/models/medico.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { MedicoService } from 'src/app/services/medico.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit, OnDestroy {

  public medicos: Medico[] = [];
  public loading: boolean = true;
  private imgSubs!: Subscription;

  constructor(private medicoService: MedicoService,
              private modalImagenService: ModalImagenService,
              private busquedasService: BusquedasService){}


  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }
  
  ngOnInit(): void {
    this.cargarMedicos();

    this.imgSubs = this.modalImagenService.nuevaImagen
    .pipe(delay(300))
    .subscribe( img =>  this.cargarMedicos() );
  }
  
  

cargarMedicos(){
  this.loading = true;
  this.medicoService.cargarMedicos()
   .subscribe( medicos => {
    this.loading = false;
    this.medicos = medicos;
   })
}

buscar(termino: string){

  if( termino.length === 0 ){
    return this.cargarMedicos();
  }
  this.busquedasService.buscar('medicos', termino)
    .subscribe( resultados => {
    this.medicos = resultados; 
    });
    return true;
}

abrirModal( medico: Medico ){

  this.modalImagenService.abrirModal( 'medicos', medico._id!, medico.img)
}

borrarMedico(medico: Medico){
  Swal.fire({
    title: '¿Borrar médico?',
    text: `Está a punto de eliminar a ${medico.nombre}`,
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Si, eliminar.'
  }).then((result) => {
    if (result.isConfirmed) {

      this.medicoService.borrarMedico(medico._id!)
        .subscribe( resp => {
          this.cargarMedicos();
        Swal.fire(
        '¡Médico eliminado!',
        `${medico.nombre} ha sido eliminado correctamente.`,
        'success'
      );
      })
    }
  });
}
}


