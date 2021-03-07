import { Card } from 'primereact/card';

export function CardGameOver(props) {
  return (
    <Card
      style={{
        background: '#ff3030',
        width: '15rem',
        height: '20rem',
        marginBottom: '2em',
      }}
      className="p-col p-d-flex p-jc-center"
      title={<h3 style={{ fontSize: '1em' }}>{props.pileTop}</h3>}
    ></Card>
  );
}
