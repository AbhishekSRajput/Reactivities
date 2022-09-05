import React, { useEffect } from "react";
import { Layout } from "antd";
import Navbar from "./Navbar";
import ActivityDashboard from "../../feature/activities/dashboard/ActivityDashboard";
import LoadingComponent from "./LoadingComponent";
import { useStore } from "../store/store";
import { observer } from "mobx-react-lite";

const { Content, Footer } = Layout;

const App: React.FC = () => {
	const { activityStore } = useStore();

	useEffect(() => {
		activityStore.loadActivities();
	}, [activityStore]);

	if (activityStore.loadingInitial)
		return (
			<LoadingComponent
				content='Activities are getting loaded'
				isModalVisible={activityStore.loading}
			/>
		);

	return (
		<Layout className='layout'>
			<Navbar />
			<Content style={{ padding: "0 50px", background: "#fff" }}>
				<ActivityDashboard />
			</Content>
			<Footer style={{ textAlign: "center" }}>
				Dotnet and React App &copy Calcuquote.
			</Footer>
		</Layout>
	);
};

export default observer(App);
