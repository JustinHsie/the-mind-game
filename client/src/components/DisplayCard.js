import { CardLarge } from './CardLarge';
import { CardGameOver } from './CardGameOver';
import { CardPass } from './CardPass';

export function DisplayCard(props) {
  if (props.smallestPlayer !== null) {
    return (
      <div className="p-d-flex p-jc-center p-m-2">
        <CardGameOver
          pileTop={`---- Game Over ---- ${props.smallestPlayer.name} had a ${
            props.smallestPlayer.hand[props.smallestPlayer.hand.length - 1]
          }... You passed ${props.lvl - 1} levels!`}
        />
      </div>
    );
  } else if (props.pass === true) {
    return (
      <div className="p-d-flex p-jc-center p-m-2">
        <CardPass pileTop={`Level ${props.lvl - 1} passed!`} />
      </div>
    );
  } else {
    return (
      <div className="p-d-flex p-jc-center p-m-2">
        <CardLarge pileTop={props.pileTop} />
      </div>
    );
  }
}
