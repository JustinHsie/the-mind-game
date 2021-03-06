import React from 'react';
import { Button } from 'primereact/button';
import { CardLarge } from './CardLarge';
import { CardSmall } from './CardSmall';

export function Game(props) {
  return (
    <div className="p-m-2">
      <div className="p-grid p-align-start">
        <div className="p-col-3 p-d-flex p-jc-center">
          <h2>Players:</h2>
        </div>
        <div className="p-col-5 p-d-flex p-jc-center">
          <div className="p-grid p-dir-col">
            <div>
              <h1 className="p-col p-d-flex p-jc-center">The Mind</h1>
            </div>
            <div className="p-d-flex p-jc-center p-m-6">
              <CardLarge />
            </div>
            <h1 className="p-d-flex p-jc-center">Level:</h1>
          </div>
        </div>
        <div className="p-col-4 p-d-flex p-jc-center">
          <div className="p-grid p-dir-col">
            <div>
              <h2 className="p-col p-d-flex p-jc-center">Your Hand</h2>
              <h2 className="p-col p-d-flex p-jc-center">Cards Left:</h2>
            </div>
            <div className="p-d-flex p-jc-center p-m-6">
              <CardSmall />
            </div>
            <div className="p-d-flex p-jc-center p-m-3">
              <Button
                className="p-button-raised p-button-rounded p-button-secondary"
                label="Play Card"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
