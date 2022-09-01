import React, { useEffect, useState } from "react";
import { Layout } from "antd";
import { IActivity } from "../models/activity";
import Navbar from "./Navbar";
import ActivityDashboard from "../../feature/activities/dashboard/ActivityDashboard";
import { v4 as uuid } from "uuid";
import agent from "../api/agent";
import LoadingComponent from "./LoadingComponent";

const { Content, Footer } = Layout;

const App: React.FC = () => {
	const [activities, setActivities] = useState<IActivity[]>([]);
	const [selectedActivity, setSelectedActivity] = useState<
		IActivity | undefined
	>(undefined);

	const [editMode, setEditMode] = useState(false);
	const [loading, setLoading] = useState(true);
	const [submitting, setSubmitting] = useState(false);

	useEffect(() => {
		agent.Activities.list().then((response) => {
			let activities: IActivity[] = [];
			response.forEach((activity) => {
				activity.date = activity.date.split("T")[0];
				activities.push(activity);
			});
			setActivities(response);
			setLoading(false);
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
		setSubmitting(true);

		if (activity.id) {
			agent.Activities.update(activity).then(() => {
				setActivities([
					...activities.filter((item) => item.id !== activity.id),
				]);
				setSelectedActivity(activity);
				setEditMode(false);
				setSubmitting(false);
			});
		} else {
			activity.id = uuid();
			agent.Activities.create(activity).then(() => {
				setActivities([...activities, activity]);
				setSelectedActivity(activity);
				setEditMode(false);
				setSubmitting(false);
			});
		}
	};

	const handleDeleteActivity = (id: string) => {
		setSubmitting(true);
		agent.Activities.delete(id).then(() => {
			setActivities([...activities.filter((item) => item.id !== id)]);
			setSubmitting(false);
		});
	};

	return (
		<Layout className='layout'>
			<Navbar handleFormOpen={handleFormOpen} />
			<Content style={{ padding: "0 50px", background: "#fff" }}>
				{loading ? (
					<LoadingComponent
						content='Activities are getting loaded'
						isModalVisible={loading}
					/>
				) : (
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
						submitting={submitting}
					/>
				)}
			</Content>
			<Footer style={{ textAlign: "center" }}>
				Dotnet and React App &copy Calcuquote
			</Footer>
		</Layout>
	);
};

export default App;
