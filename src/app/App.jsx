import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReferenceSite from "../features/marketing/ReferenceSite.jsx";
import Blog from "../features/marketing/Blog.jsx";
import ContentCalendar from "../features/marketing/ContentCalendar.jsx";
import CryptoCockpit from "../features/marketing/CryptoCockpit.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ReferenceSite />} />
        <Route path="/crypto" element={<CryptoCockpit />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/strategy" element={<ContentCalendar />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
