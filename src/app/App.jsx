import ReferenceSite from "../features/marketing/ReferenceSite.jsx";
import { getPageContent } from "../data/siteContent.js";

function App() {
  const currentPage = getPageContent(window.location.pathname);

  return <ReferenceSite currentPage={currentPage} />;
}

export default App;
