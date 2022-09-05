import { Col, Row } from "antd";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/store/store";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";
import ActivityList from "./ActivityList";

const ActivityDashboard = () => {
	const { activityStore } = useStore();
	const { selectedActivity, editMode } = activityStore;
	return (
		<Row justify='space-around' style={{ marginTop: 40 }}>
			<Col span={16}>
				<ActivityList />
			</Col>
			<Col>
				{selectedActivity && !editMode && <ActivityDetails />}
				{editMode && <ActivityForm />}
			</Col>
		</Row>
	);
};

export default observer(ActivityDashboard);
