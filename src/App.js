import './App.css';
import {
  BrowserRouter as Router, Route, Routes
} from 'react-router-dom';
import BusinessPage from './pages/BusinessPage';
import ErrorPage from './pages/ErrorPage';
import AuthenticatedApp from './components/AuthenticatedApp';
import HomePage from './pages/HomePage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path='/card/:route' element={<BusinessPage />}/>
        <Route path="/admin/*" element={<AuthenticatedApp />} />
        <Route path="/*" element={<ErrorPage />}/>
      </Routes>
    </Router>
  )
}

export default App;
