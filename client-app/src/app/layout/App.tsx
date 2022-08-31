import React, { useEffect, useState } from "react";
import { Layout } from "antd";
import axios from "axios";
import { IActivity } from "../models/activity";
import Navbar from "./Navbar";
import ActivityDashboard from "../../feature/activities/dashboard/ActivityDashboard";
import { v4 as uuid } from "uuid";

const { Content, Footer } = Layout;

const App: React.FC = () => {
	const [activities, setActivities] = useState<IActivity[]>([]);
	const [selectedActivity, setSelectedActivity] = useState<
		IActivity | undefined
	>(undefined);

	const [editMode, setEditMode] = useState(false);

	useEffect(() => {
		axios
			.get<IActivity[]>("http://localhost:5000/api/activities")
			.then((response) => {
				console.log("response", response);
				setActivities(response.data);
			});
	}, []);

	const handleSelectedActivity = (id: string) => {
		setSelectedActivity(activities.find((item) => item.id === id));
	};

	const handleCancelActivity = () => {
		setSelectedActivity(undefined);
	};
	const handleFormOpen = (id?: string) => {
		id ? handleSelectedActivity(id) : handleCancelActivity();
		setEditMode(true);
	};
	const handleFormClose = () => {
		setEditMode(false);
	};
	const handleCreateOrEditActivity = (activity: IActivity) => {
		activity.id
			? setActivities([
					...activities.filter((item) => item.id !== activity.id),
					activity,
			  ])
			: setActivities([...activities, { ...activity, id: uuid() }]);
		setEditMode(false);
		setSelectedActivity(activity);
	};

	const handleDeleteActivity = (id: string) => {
		setActivities([...activities.filter((item) => item.id !== id)]);
	};

	return (
		<Layout className='layout'>
			<Navbar handleFormOpen={handleFormOpen} />
			<Content style={{ padding: "0 50px", background: "#fff" }}>
				<ActivityDashboard
					selectedActivity={selectedActivity}
					handleSelectedActivity={handleSelectedActivity}
					handleCancelActivity={handleCancelActivity}
					activities={activities}
					editMode={editMode}
					handleFormOpen={handleFormOpen}
					handleFormClose={handleFormClose}
					handleCreateOrEditActivity={handleCreateOrEditActivity}
					handleDeleteActivity={handleDeleteActivity}
				/>
			</Content>
			<Footer style={{ textAlign: "center" }}>
				Dotnet and React App &copy Calcuquote
			</Footer>
		</Layout>
	);
};

export default App;
