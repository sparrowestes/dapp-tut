import { loadStdlib } from '@reach-sh/stdlib';
import * as backend from './build/index.main.mjs'

const stdlib = loadStdlib(process.env);

(async ()  => {
    const startingBalance = stdlib.parseCurrency(10)

   const accGiacomo = await stdlib.newTestAccount(startingBalance)
   const accVera = await stdlib.newTestAccount(startingBalance)

   const ctcGiacomo = accGiacomo.contract(backend)
   const ctcVera = accVera.contract(backend, ctcGiacomo.getInfo())

   await Promise.all ([
    backend.Giacomo(ctcGiacomo, {
        //implement Giacomo's interact object here
    }),

    backend.Vera(ctcVera, {
        //implement Vera's interact object here
    })
])
})();