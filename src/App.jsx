import ReferenceSite from "./components/ReferenceSite";
import { getPageContent } from "./content/siteContent";

function App() {
  const currentPage = getPageContent(window.location.pathname);

  return <ReferenceSite currentPage={currentPage} />;
}

export default App;
