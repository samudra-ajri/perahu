import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Row, Col, Container } from 'react-bootstrap'
import { useSelector } from 'react-redux'

import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Footer from './components/Footer'

import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import ProfileEditScreen from './screens/ProfileEditScreen'
import SubjectsMainScreen from './screens/SubjectsMainScreen'
import SubjectsExtraScreen from './screens/SubjectsExtraScreen'
import SubjectsMemoryScreen from './screens/SubjectsMemoryScreen'
import UserListScreen from './screens/UserListScreen'

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
                <Route path='/completion/main' component={SubjectsMainScreen} />
                <Route path='/completion/extra' component={SubjectsExtraScreen} />
                <Route path='/completion/memory' component={SubjectsMemoryScreen} />
                <Route path='/profile/edit' component={ProfileEditScreen} />
                <Route path='/admin/userlist' component={UserListScreen} />
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
