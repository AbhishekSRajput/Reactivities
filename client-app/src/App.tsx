import { useState, useEffect } from "react";
import axios from "axios";
import logo from "./logo.svg";
import { List } from "antd";
import "./App.css";

function App() {
	const [activities, setActivities] = useState([]);

	useEffect(() => {
		axios.get("http://localhost:5000/api/activities").then((response) => {
			console.log("response", response);
			setActivities(response.data);
		});
	}, []);

	return (
		<div className='App'>
			<header className='App-header'>
				<img src={logo} className='App-logo' alt='logo' />
				<List style={{ background: "#fff" }}>
					{activities.length ? (
						activities.map((el: any) => (
							<List.Item key={el.id}>{el.title}</List.Item>
						))
					) : (
						<h3>No data available</h3>
					)}
				</List>
			</header>
		</div>
	);
}

export default App;
