import { interval, timer } from "rxjs";

const sequenceNumber$ = interval(1000);

sequenceNumber$.subscribe(console.log)

const deleyTimer$ = timer(5000);

deleyTimer$.subscribe(console.log)