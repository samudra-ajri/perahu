import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Row, Col, Container } from 'react-bootstrap'
import { useSelector } from 'react-redux'

import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Footer from './components/Footer'

import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'

function App() {
  const sidebarShow = useSelector(state => state.sidebarShow)
  const { sidebar } = sidebarShow

  return (
		<Router>
			<Header />
      <main>
        <Container fluid>
          <Row>
            {sidebar && <Sidebar />}
            <Col className='py-3'>
                <Route path='/login' component={LoginScreen} />
                <Route path='/register' component={RegisterScreen} />
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
