import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Row, Col, Container } from 'react-bootstrap'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Footer from './components/Footer'
import ProfileScreen from './screens/ProfileScreen'

function App() {
  return (
		<Router>
			<Header />
      <main>
        <Container fluid>
          <Row>
            <Sidebar />
            <Col>
                <Route path='/' component={ProfileScreen} exact />
            </Col>
          </Row>
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App;
