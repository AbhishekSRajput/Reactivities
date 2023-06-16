"use client";

import { useEffect, useState } from "react";
import axios from "axios";

const HomePage = () => {
	const [activities, setActivities] = useState();

	useEffect(() => {
		axios.get("http://localhost:5000/api/activities").then((response) => {
			console.log("response", response);
			setActivities(response.data);
		});
	}, []);
	return <div>HomePage</div>;
};

export default HomePage;
