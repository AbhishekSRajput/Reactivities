import { Col, Row } from "antd";
import { IActivity } from "../../../app/models/activity";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";
import ActivityList from "./ActivityList";

interface IProps {
	activities: IActivity[];
	selectedActivity: IActivity | undefined;
	handleSelectedActivity: (id: string) => void;
	handleCancelActivity: () => void;
	editMode: boolean;
	handleFormOpen: (id: string) => void;
	handleFormClose: () => void;
	handleCreateOrEditActivity: (activity: IActivity) => void;
	handleDeleteActivity: (id: string) => void;
	submitting: boolean;
}

const ActivityDashboard = (props: IProps) => {
	const {
		activities,
		handleSelectedActivity,
		handleCancelActivity,
		selectedActivity,
		editMode,
		handleFormOpen,
		handleFormClose,
		handleCreateOrEditActivity,
		handleDeleteActivity,
		submitting,
	} = props;

	return (
		<Row justify='space-around' style={{ marginTop: 40 }}>
			<Col span={16}>
				<ActivityList
					activities={activities}
					handleSelectedActivity={handleSelectedActivity}
					handleDeleteActivity={handleDeleteActivity}
					submitting={submitting}
				/>
			</Col>
			<Col>
				{selectedActivity && (
					<ActivityDetails
						activity={selectedActivity}
						handleCancelActivity={handleCancelActivity}
						handleFormOpen={handleFormOpen}
					/>
				)}
				{editMode && (
					<ActivityForm
						handleFormClose={handleFormClose}
						selectedActivity={selectedActivity}
						handleCreateOrEditActivity={handleCreateOrEditActivity}
						submitting={submitting}
					/>
				)}
			</Col>
		</Row>
	);
};

export default ActivityDashboard;
