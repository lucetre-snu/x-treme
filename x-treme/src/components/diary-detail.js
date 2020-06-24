import React from 'react';
import { Jumbotron, Container, Card } from 'react-bootstrap';

export default function DiaryDetail(props) {
  return <div id="diary-detail">
    <Jumbotron fluid>
      <Container>
        { props.diary ?
          <Card>
            <Card.Body>
              <Card.Title>{props.diary.title}</Card.Title>
              <Card.Text>{props.diary.dateTime.toLocaleString()}</Card.Text>
            </Card.Body>
            <Card.Img variant="top" src={props.diary.src} style={{ maxWidth:'100%', height:'auto' }} />
            <Card.Body>
              <Card.Text>{props.diary.description}</Card.Text>
            </Card.Body>
          </Card>:
          <div />
        }
      </Container>
    </Jumbotron>
  </div>;
}