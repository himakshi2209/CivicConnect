// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

// src/App.js
import React from "react";
import {
	BrowserRouter as Router,
	Route, Routes
} from "react-router-dom";
import RequestList
	from "./components/RequestList";
import RequestForm
	from "./components/RequestForm";
import About from "./components/About";
import Navbar from "./components/Navbar";
const App = () => {
	return (
		<Router>
			<Navbar />
			<Routes>
				<Route path="/"
					element={<RequestList />} />
				<Route path="/about"
					element={<About />} />
			</Routes>
		</Router>
	);
};

export default App;

