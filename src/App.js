import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Footer from './Components/Layout/Footer';
import Navbar from './Components/Layout/Navbar';
import { GithubProvider } from './Context/Github/GithubContext';
import About from './Pages/About';
import Home from './Pages/Home';
import NotFound from './Pages/NotFound';

function App() {
  return (
    <GithubProvider>
      <Router>
        <div className='flex flex-col justify-between h-screen'>
          <Navbar />
          <main className='container mx-auto px-3 pb-12'>
            <Routes>
              <Route exact path='/' element={<Home />} />
              <Route path='/about' element={<About />} />
              <Route path='/*' element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </GithubProvider>
  );
}

export default App;
