import { Col, Container, Row } from "react-bootstrap"

function Home() {
  return (
    <>
    <h1>Home</h1>
      <Container>
        <Row>
          <Col>
          <p className="lead">
            Krótki opis strony:
          </p>
          <ul>
            <li>O mnie - zadanie 2 - stworzenie elementu Card o sobie.</li>
            <li>Sklep - zadanie 3 - projekt koszyka sklepu internetowego.</li>
          </ul>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Home