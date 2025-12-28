import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/home-page/Home.jsx";
import Category from "./pages/category/Category.jsx";
import Blog from "./pages/Blog/Blog.jsx";
import Recipes from "./pages/my-recipe/Recipes.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
// import NotFound from './pages/NotFound/NotFound.jsx';
// import Home from ".pages/home-page/Home.jsx";
import LoginPage from "./pages/Auth/LoginPage.jsx";
import RegisterPage from "./pages/Auth/RegisterPage.jsx";

function App() {
  return (
    <>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/category" element={<Category />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/my-recipes" element={<Recipes />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
