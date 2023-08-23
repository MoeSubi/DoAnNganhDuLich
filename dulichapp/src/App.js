import logo from './logo.svg';
import './App.css';
import Body from './layouts/Body';
import React  from 'react';
import Container from '../node_modules/react-bootstrap/esm/Container';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    return (<>
    
        <Container>
          
          <Body></Body>
        </Container>
    </>
    );
}

export default App;