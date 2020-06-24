import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { getPlayList } from '../apis/DataProcessor';

export default function Example() {
  const [ address, setAddress ] = useState('');

  const fetchYouTube = (e) => {
    e.preventDefault();

    // PLUKkXeVC39Xr97P94HsAvZeWmvcm2fcJI
    console.log(address);
    getPlayList(address)
    .then((res) => {
      console.log(res);
    })
  }

  return <div id="example">
    <h2>Example (not to remove) </h2>

    <form>
      <input type="text" value={address} onChange={e => setAddress(e.target.value)}/>
      <input type="submit" value="Fetch" onClick={fetchYouTube}/>
    </form>
    <Button variant="primary">Primary</Button>{' '}
    <Button variant="secondary">Secondary</Button>{' '}
    <Button variant="success">Success</Button>{' '}
    <Button variant="warning">Warning</Button>{' '}
    <Button variant="danger">Danger</Button> <Button variant="info">Info</Button>{' '}
    <Button variant="light">Light</Button> <Button variant="dark">Dark</Button>{' '}
    <Button variant="link">Link</Button>

    <Container>
      <Row className="justify-content-md-center">
        <Col xs lg="2">
          1 of 3
        </Col>
        <Col md="auto">Variable width content</Col>
        <Col xs lg="2">
          3 of 3
        </Col>
      </Row>
      <Row>
        <Col>1 of 3</Col>
        <Col md="auto">Variable width content</Col>
        <Col xs lg="2">
          3 of 3
        </Col>
      </Row>
    </Container>  

  </div>;
}
