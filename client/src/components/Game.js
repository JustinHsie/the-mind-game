import React from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { CardLarge } from './CardLarge';
import { CardSmall } from './CardSmall';
import { CardGameOver } from './CardGameOver';

export function Game(props) {
  return (
    <div className="p-m-2">
      <div className="p-grid p-align-start">
        <div className="p-col-3 p-d-flex p-jc-center">
          <div className="p-grid p-dir-col">
            <h1></h1>
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
            {props.id === '' ? (
              <div>
                <div className="p-col p-d-flex p-jc-center">
                  <InputText
                    value={props.name}
                    onChange={props.onNameChange}
                    className="p-inputtext-sm p-mb-2"
                    placeholder="Username"
                  />
                </div>
                <div className="p-col p-d-flex p-jc-center">
                  <Button
                    onClick={props.onJoinClick}
                    className="p-button-raised p-button-rounded p-button-info"
                    label="Join"
                  />
                </div>
              </div>
            ) : null}
          </div>
        </div>
        <div className="p-col-5 p-d-flex p-jc-center">
          <div className="p-grid p-dir-col">
            <div>
              <h1 className="p-col p-d-flex p-jc-center">Level: {props.lvl}</h1>
            </div>
            {props.smallestPlayer !== null ? (
              <div className="p-d-flex p-jc-center p-m-2">
                <CardGameOver
                  pileTop={`Game over! ${props.smallestPlayer.name} had a ${
                    props.smallestPlayer.hand[
                      props.smallestPlayer.hand.length - 1
                    ]
                  }`}
                />
              </div>
            ) : (
              <div className="p-d-flex p-jc-center p-m-2">
                <CardLarge pileTop={props.pileTop} />
              </div>
            )}
            <Button
              onClick={props.onDealClick}
              className="p-button-raised p-button-rounded p-button-warning"
              label="Deal Cards"
            />
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
                    <h3
                      style={{ display: 'inline', marginRight: '15px' }}
                      key={card}
                    >
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
