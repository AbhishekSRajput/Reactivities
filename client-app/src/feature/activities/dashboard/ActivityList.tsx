import { DeleteOutlined, FolderViewOutlined } from "@ant-design/icons";
import { Avatar, Button, List, Space, Tag } from "antd";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { useStore } from "../../../app/store/store";

const ActivityList = () => {
	const { activityStore } = useStore();
	const { deleteActivity, activitiesByDate, loading } = activityStore;
	const [target, setTarget] = useState("");

	const handleActivityDelete = (e: any, id: string) => {
		setTarget(e.target.name);
		deleteActivity(id);
	};
	console.log(activitiesByDate);
	console.log("target", target);
	return (
		<div>
			<List
				itemLayout='horizontal'
				dataSource={activitiesByDate}
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
								onClick={() => activityStore.selectActivity(item.id)}
							>
								View
								<FolderViewOutlined />
							</Button>
							<Button
								danger
								loading={loading && target === item.id}
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

export default observer(ActivityList);
