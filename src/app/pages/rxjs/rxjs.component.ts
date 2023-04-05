import { Component, OnDestroy } from '@angular/core';
import { Observable, Subscription, interval } from 'rxjs';
import { retry, take, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnDestroy {

  public intervalSubs: Subscription;

  constructor(){

    // this.retornaObservable().pipe(
    //   retry(2)
    // ).subscribe({
    //   next: valor => console.log('Subs:', valor),
    //   error: err => console.warn('Error:', err  ),
    //   complete: () => console.info('Obs terminado')
    // });

    this.intervalSubs =  this.retornaIntervalo().subscribe(console.log);

  }

  // Al cambiar de pag. se finaliza la subscripción y al volver a ella se reinicia. 
  // Se implementa para evitar la sobrecarga del PC.
  ngOnDestroy(): void {
    this.intervalSubs.unsubscribe();
  }

retornaIntervalo(): Observable<number>{

  return interval(100)
                      .pipe(
                        // take(10),
                        map( valor => valor + 1 ), // 0 => 1
                        filter( valor => ( valor % 2 === 0 ) ? true : false ),
                      );

}


retornaObservable(): Observable<number>{
  let i = -1;
    
  return new Observable<number>( observer => {

  const intervalo =  setInterval( () => {

      i++;
      observer.next(i);

      if ( i === 4) {
        clearInterval( intervalo );
        observer.complete();
      }

      if ( i === 2 ) {
        i = 0;
        observer.error('i llegó al valor de 2')
      }

    }, 1000)

  });

}

}
