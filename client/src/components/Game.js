import React from 'react';
import { Button } from 'primereact/button';
import { CardLarge } from './CardLarge';
import { CardSmall } from './CardSmall';

export function Game(props) {
  return (
    <div className="p-m-2">
      <div className="p-grid p-align-start">
        <div className="p-col-3 p-d-flex p-jc-center">
          <div className="p-grid p-dir-col">
            <h2 className="p-col p-d-flex p-jc-center">Players: </h2>
            <div>
              {props.players.length > 0
                ? props.players.map(player => {
                    return (
                      <div
                        className="p-col p-d-flex p-jc-center"
                        key={player.id}
                      >{`${player.name}: ${player.hand.length}`}</div>
                    );
                  })
                : null}
            </div>
          </div>
        </div>
        <div className="p-col-5 p-d-flex p-jc-center">
          <div className="p-grid p-dir-col">
            <div>
              <h1 className="p-col p-d-flex p-jc-center">The Mind</h1>
            </div>
            <div className="p-d-flex p-jc-center p-m-3">
              <CardLarge pileTop={props.pileTop} />
            </div>
            <h1 className="p-d-flex p-jc-center">Level: {props.lvl}</h1>
          </div>
        </div>
        <div className="p-col-4 p-d-flex p-jc-center">
          <div className="p-grid p-dir-col">
            <div>
              <h2 className="p-col p-d-flex p-jc-center">Your Hand</h2>
            </div>
            {props.topCard ? (
              <div>
                <div className="p-d-flex p-jc-center p-mt-6">
                  <CardSmall topCard={props.topCard} />
                </div>
                <h2 className="p-col p-d-flex p-jc-center">All Cards</h2>
                {props.hand.reverse().map(card => {
                  return (
                    <h3 style={{ display: 'inline', marginRight: '15px' }} key={card}>
                      {card}
                    </h3>
                  );
                })}
                <div className="p-d-flex p-jc-center p-mt-6">
                  <Button
                    onClick={props.onPlayCardClick}
                    className="p-button-raised p-button-rounded p-button-secondary"
                    label="Play Card"
                  />
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
