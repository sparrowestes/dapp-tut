'reach 0.1'

const Player = {
  getHand: Fun([], UInt),
  seeOutcome: Fun([UInt], Null)
}

export const main = Reach.App(() => {

  const Giacomo = Participant('Giacomo', {
    ...Player,
  })
  
  const Vera = Participant('Vera', {
    ...Player,
  });

  deploy();

  Giacomo.only(() => {
    const handGiacomo = declassify(interact.getHand())
  })
  Giacomo.publish(handGiacomo)
  commit()

  Vera.only(() => {
    const handVera = declassify(interact.getHand())
  })
  Vera.publish(handVera)

  const outcome = (handGiacomo + (4 - handVera)) % 3
  commit()

  each([Giacomo, Vera], () => {
    interact.seeOutcome(outcome)
  })

});
