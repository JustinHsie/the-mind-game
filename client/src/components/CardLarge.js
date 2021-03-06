import { Card } from 'primereact/card';

export function CardLarge() {
  return (
    <Card
      style={{ width: '15rem', height: '20rem', marginBottom: '2em' }}
      className="p-col p-d-flex p-jc-center"
      title={<h1 style={{ 'fontSize': '3em' }}>3</h1>}
    ></Card>
  );
}
