import { fromEvent, Observable, Subscriber } from "rxjs";

const onKeyDown$ = fromEvent( document, "keydown");

const observadorMouse = {
    next : (event) =>{

        const { key } = event
       console.log(key);        
    },
    complete : () => {},
    error : err => {
        console.error(err);
    },
};

onKeyDown$.subscribe(observadorMouse);