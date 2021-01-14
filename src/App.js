import { Container, Row, Badge } from 'reactstrap';
import "./styles.css"
import LoginForm from './components/Login';

function App() {
  return (
    <div className='main'>
      <Container>
        <LoginForm />
      </Container>
    </div>
  );
}

export default App;
