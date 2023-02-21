import { Observable , Subject } from "rxjs";

const numberRandom$ = new Subject();

const observador1 = {
    next : num => console.log(num)
}

const observador2 = {
    next : num => console.log(num)
}

numberRandom$.subscribe(observador1)
numberRandom$.subscribe(observador2)

numberRandom$.next(Math.round(Math.random()*100))