import { Card } from 'primereact/card';

export function CardSmall(props) {
  return (
    <Card
      style={{ maxWidth: '10rem', maxHeight: '15rem', marginBottom: '1em' }}
      className="p-col p-d-flex p-jc-center"
      title={<h1>{props.topCard}</h1>}
    ></Card>
  );
}
