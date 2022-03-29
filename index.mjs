import { loadStdlib } from '@reach-sh/stdlib';
import * as backend from './build/index.main.mjs'

const stdlib = loadStdlib(process.env);

(async ()  => {
    const startingBalance = stdlib.parseCurrency(100)

   const accGiacomo = await stdlib.newTestAccount(startingBalance)
   const accVera = await stdlib.newTestAccount(startingBalance)

   const ctcGiacomo = accGiacomo.contract(backend)
   const ctcVera = accVera.contract(backend, ctcGiacomo.getInfo())

   const HAND = ['Rock', 'Paper', 'Scissors']
   const OUTCOME = ['Vera wins', 'Draw', 'Giacomo wins']

   const Player = (who) => ({
        getHand: () => {
            const hand = Math.floor(Math.random() * 3)
            console.log(`${who} played ${HAND[hand]}`)
            return hand
        },
        seeOutcome: (outcome) => {
            console.log(`${who} saw outcome ${OUTCOME[outcome]}`)
        }
   })

   await Promise.all ([
    backend.Giacomo(ctcGiacomo, {
        ...Player('Giacomo')
    }),

    backend.Vera(ctcVera, {
        ...Player('Vera')
    })
])
})();