import { EditOutlined } from "@ant-design/icons";
import { Avatar, Button, Card } from "antd";
import Meta from "antd/lib/card/Meta";
import { IActivity } from "../../../app/models/activity";

interface IProps {
	activity: IActivity;
	handleCancelActivity: () => void;
	handleFormOpen: (id: string) => void;
}

const ActivityDetails = (props: IProps) => {
	const { activity, handleCancelActivity, handleFormOpen } = props;
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
					<Button onClick={() => handleFormOpen(activity.id)}>
						<EditOutlined key='edit' />
						Edit
					</Button>,
					<Button danger onClick={handleCancelActivity}>
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

export default ActivityDetails;
