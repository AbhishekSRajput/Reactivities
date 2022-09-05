import { EditOutlined } from "@ant-design/icons";
import { Avatar, Button, Card } from "antd";
import Meta from "antd/lib/card/Meta";
import { observer } from "mobx-react-lite";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/store/store";

const ActivityDetails = () => {
	const { activityStore } = useStore();
	const {
		selectedActivity: activity,
		openForm,
		cancelSelectedActivity,
	} = activityStore;

	if (!activity)
		return (
			<LoadingComponent
				content='just for solving the component without jsx'
				isModalVisible={false}
			/>
		);

	return (
		<>
			<Card
				style={{ width: 300 }}
				cover={
					<img
						alt='example'
						src='https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png'
					/>
				}
				actions={[
					<Button onClick={() => openForm(activity.id)}>
						<EditOutlined key='edit' />
						Edit
					</Button>,
					<Button danger onClick={cancelSelectedActivity}>
						Cancel
					</Button>,
				]}
			>
				<Meta
					avatar={<Avatar src='https://joeschmoe.io/api/v1/random' />}
					title={activity.title}
					description={activity.description}
				/>
				<div style={{ marginTop: 12 }}>{activity.date}</div>
			</Card>
		</>
	);
};

export default observer(ActivityDetails);
