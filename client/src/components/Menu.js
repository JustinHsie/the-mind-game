import React from 'react';
import { Button } from 'primereact/button';

export function Menu(props) {
  return (
    <div className="p-d-flex">
      <h3 className="p-mr-4">The Mind</h3>
      <Button
        onClick={props.onNewGameClick}
        className="p-m-2 p-button-sm"
        label="New Game"
      />
    </div>
  );
}
