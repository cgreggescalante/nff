import { ReactNode, useState } from 'react';
import { Card, Collapse } from 'react-bootstrap';

export interface CollapsibleContainerProps {
  title?: string;
  children: ReactNode;
}

export function CollapsibleContainer({
  title,
  children,
}: CollapsibleContainerProps) {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <Card style={{ marginTop: '2%' }}>
      <Card.Header
        style={{
          padding: '10px',
          cursor: 'pointer',
          backgroundColor: '#f0f0f0',
        }}
        onClick={() => setCollapsed(!collapsed)}
      >
        <h3>{title}</h3>
      </Card.Header>

      <Card.Body>
        <Collapse in={collapsed}>
          <div>{children}</div>
        </Collapse>
      </Card.Body>
    </Card>
  );
}

export default CollapsibleContainer;
