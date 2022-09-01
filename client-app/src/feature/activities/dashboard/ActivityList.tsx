import { DeleteOutlined, FolderViewOutlined } from "@ant-design/icons";
import { Avatar, Button, List, Space, Tag } from "antd";
import { useState } from "react";
import { IActivity } from "../../../app/models/activity";

interface IProps {
	activities: IActivity[];
	handleSelectedActivity: (id: string) => void;
	handleDeleteActivity: (id: string) => void;
	submitting: boolean;
}
const ActivityList = (props: IProps) => {
	const {
		activities,
		handleSelectedActivity,
		handleDeleteActivity,
		submitting,
	} = props;

	const [target, setTarget] = useState("");

	const handleActivityDelete = (e: any, id: string) => {
		setTarget(e.target.name);
		handleDeleteActivity(id);
	};
	console.log("target", target);

	return (
		<div>
			<List
				itemLayout='horizontal'
				dataSource={activities}
				renderItem={(item) => (
					<List.Item>
						<List.Item.Meta
							avatar={<Avatar src='https://joeschmoe.io/api/v1/random' />}
							title={<a href='https://ant.design'>{item.title}</a>}
							description={item.description}
						/>
						<Space>
							<Tag color='gold'>{item.city}</Tag>
							<div style={{ marginRight: 35 }}>{item.date}</div>
							<Button
								type='primary'
								onClick={() => handleSelectedActivity(item.id)}
							>
								View
								<FolderViewOutlined />
							</Button>
							<Button
								danger
								loading={submitting && target === item.id}
								name={item.id}
								onClick={(e) => handleActivityDelete(e, item.id)}
							>
								Delete
								<DeleteOutlined />
							</Button>
						</Space>
					</List.Item>
				)}
			/>
		</div>
	);
};

export default ActivityList;
