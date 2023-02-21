import { from , of, asyncScheduler} from 'rxjs'

const fruits$ = from(["manzana", "mango", "pera"], asyncScheduler)

fruits$.subscribe(console.log);