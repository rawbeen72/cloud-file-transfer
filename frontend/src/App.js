import Landing from "./components/Landing";
import UploadContainer from "./components/UploadContainer";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import DownloadPage from "./components/DownloadPage";
import { ToastContainer } from "react-bootstrap";

const App = () => {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Landing />} />
				<Route path="/transfer" element={<UploadContainer />} />
				<Route path="/files/download/:id" element={<DownloadPage />} />
			</Routes>
		
		</Router>
	);
};

export default App;
