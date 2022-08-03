import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Alert from './Components/Layout/Alert/Alert';
import Footer from './Components/Layout/Footer';
import Navbar from './Components/Layout/Navbar';
import { AlertProvider } from './Context/Alert/AlertContext';
import { GithubProvider } from './Context/Github/GithubContext';
import About from './Pages/About';
import Home from './Pages/Home';
import NotFound from './Pages/NotFound';
import UserPage from './Pages/UserPage';

function App() {
  return (
    <GithubProvider>
      <AlertProvider>
        <Router>
          <div className='flex flex-col justify-between h-screen'>
            <Navbar />
            <main className='container mx-auto px-3 pb-12'>
              <Alert />
              <Routes>
                <Route exact path='/' element={<Home />} />
                <Route path='/about' element={<About />} />
                <Route path='/user/:login' element={<UserPage />} />
                <Route path='/*' element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </AlertProvider>
    </GithubProvider>
  );
}

export default App;
