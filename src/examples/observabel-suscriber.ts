import { Observable, Subscriber } from "rxjs";

const observableAlfa$ = new Observable( subscriber => {
    subscriber.next(1)
    subscriber.next(2)
    subscriber.next(20)
});

const observador = {
    next : value =>{
        console.log(value) 
    },
    complete : () => {},
    error : err => {
        console.error(err);
    },
}

observableAlfa$.subscribe(observador)