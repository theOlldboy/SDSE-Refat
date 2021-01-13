import { Container, Row, Badge } from 'reactstrap';
import "./styles.css"
import LoginForm from './components/Login';

function App() {
  return (
    <div className='main'>
      <Container>
        <Row >
          <h1 classname="title mb-3">Sistema de Doação de Solo de Escavações - <Badge>SDES</Badge></h1>
        </Row>
        <LoginForm />
      </Container>
    </div>
  );
}

export default App;
