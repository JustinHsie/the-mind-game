import { Card } from 'primereact/card';

export function CardPass(props) {
  return (
    <Card
      style={{
        background: '#63ff83',
        width: '15rem',
        height: '20rem',
        marginBottom: '2em',
      }}
      className="p-col p-d-flex p-jc-center"
      title={<h3 style={{ fontSize: '1em' }}>{props.pileTop}</h3>}
    ></Card>
  );
}
