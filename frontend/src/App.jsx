import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Listing from './pages/Listing';
import SearchResults from './pages/SearchResults';

function App() {
  
  return (
    <>
      <Router>
        <Header />

        {/* Routes defined here */}
        <Routes>
          <Route path='/' element={<h1>Home Page</h1>} /> {/* Home page */}
          <Route path='/404' element={<h1>404 Page Not Found</h1>} /> {/* 404 page */}
          <Route
            path="/marketplace/:category/:subcategory/listing/:listingId"
            element={<Listing />}
          />
          <Route
            path="/search/:kw"
            element={<SearchResults />}
          />
        </Routes>
        <Footer />
      </Router>
    </>
  )
}

export default App
