import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/home-page/home.jsx";
import Category from "./pages/Category/Category.jsx";
import Blog from "./pages/Blog/Blog.jsx";
import Recipes from "./pages/my-recipe/Recipes.jsx";
// import NotFound from './pages/NotFound/NotFound.jsx';
// import Home from ".pages/home-page/Home.jsx";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category" element={<Category />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/my-recipes" element={<Recipes />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
