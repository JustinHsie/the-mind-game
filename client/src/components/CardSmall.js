import { Card } from 'primereact/card';

export function CardSmall() {
  return (
    <Card
      style={{ width: '10rem', height: '15rem', marginBottom: '2em' }}
      className="p-col p-d-flex p-jc-center"
      title={<h1>3</h1>}
    ></Card>
  );
}
