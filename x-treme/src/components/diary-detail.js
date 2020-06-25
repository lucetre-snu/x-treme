import React from 'react';
import { Jumbotron, Container, Card } from 'react-bootstrap';
import "./diary-detail.css";

export default function DiaryDetail(props) {
  return <div id="diary-detail">
    <Jumbotron id={props.diary.weather ? props.diary.weather : 'clear'} fluid>
      <Container>
        { props.diary ?
          <Card>
            <Card.Body>
              <Card.Title><h3>{props.diary.title}</h3></Card.Title>
              <Card.Text>{props.diary.dateTime.toLocaleString()}</Card.Text>
            </Card.Body>
            { props.diary.diaryType === 'video'?
              <iframe title={props.diary.title} height="500" src={'https://www.youtube.com/embed/' + props.diary.src} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            :
              <Card.Img variant="top" src={props.diary.src} style={{ maxWidth:'100%', height:'auto' }} />
            }
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