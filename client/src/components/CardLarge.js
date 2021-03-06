import { Card } from 'primereact/card';

export function CardLarge(props) {
  return (
    <Card
      style={{ width: '15rem', height: '20rem', marginBottom: '2em' }}
      className="p-col p-d-flex p-jc-center"
      title={<h1 style={{ fontSize: '3em' }}>{props.pileTop}</h1>}
    ></Card>
  );
}
