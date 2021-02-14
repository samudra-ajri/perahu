import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Row, Col, Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

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
import UserInfoScreen from './screens/UserInfoScreen'
import SubjectsInfoScreen from './screens/SubjectsInfoScreen'
import { showSidebar } from './actions/sidebarActions';

function App() {

  const dispatch = useDispatch()

  const sidebarShow = useSelector(state => state.sidebarShow)
  const { sidebar } = sidebarShow

  const onClickHandler = () => {
    (sidebar === true) && (window.innerWidth <= 480)
      && dispatch(showSidebar(!sidebar))
  }

  return (
		<Router>
			<Header />
      <main>
        <Container fluid>
          <Row>
            {sidebar && <Sidebar />}
            <Col className='py-3' onClick={onClickHandler}>
                <Route path='/login' component={LoginScreen} />
                <Route path='/register' component={RegisterScreen} />
                <Route path='/completion/main' component={SubjectsMainScreen} />
                <Route path='/completion/extra' component={SubjectsExtraScreen} />
                <Route path='/completion/memory' component={SubjectsMemoryScreen} />
                <Route path='/profile/edit' component={ProfileEditScreen} />
                <Route path='/admin/userlist' component={UserListScreen} exact/>
                <Route path='/admin/userlist/search/:keyword' component={UserListScreen} exact/>
                <Route path='/admin/user/:id/info' component={UserInfoScreen} />
                <Route path='/admin/subjects' component={SubjectsInfoScreen} />
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
