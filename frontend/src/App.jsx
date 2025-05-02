import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Listing from './pages/Listing';
import SearchResults from './pages/SearchResults';
import Home from './pages/Home';
import Browse from './pages/Browse';
import "@fontsource/barlow-condensed"; // Defaults to weight 400
import "@fontsource/barlow-condensed/400.css"; // Specify weight
import "@fontsource/barlow-condensed/400-italic.css"; 

function App() {
  
  return (
    <>
      <Router>
        <Header />

        {/* Routes defined here */}
        <Routes>
          <Route path='/' element={<Home />} /> {/* Home page */}
          <Route path='/404' element={<h1>404 Page Not Found</h1>} /> {/* 404 page */}
          <Route
            path="/marketplace/:category/:subcategory/listing/:listingId"
            element={<Listing />}
          />
          <Route path="/marketplace" element={<Browse />} />
          <Route path="/marketplace/:categoryName" element={<Browse />} />
          <Route path="/marketplace/:categoryName/:subcategoryName" element={<Browse />} /> 
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
