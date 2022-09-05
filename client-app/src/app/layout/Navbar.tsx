import { AppstoreAddOutlined, DeploymentUnitOutlined } from "@ant-design/icons";
import { Button, Menu, Tag } from "antd";
import { useStore } from "../store/store";

const Navbar = () => {
	const { activityStore } = useStore();
	return (
		<>
			<Menu mode='horizontal' defaultSelectedKeys={["1"]}>
				<Menu.Item key={1}>
					<DeploymentUnitOutlined
						style={{
							fontSize: "22px",
						}}
					/>
					<span
						style={{
							fontSize: "20px",
							fontWeight: "700",
							letterSpacing: "1px",
						}}
					>
						Reactivities
					</span>
				</Menu.Item>
				<Menu.Item key={2}>
					<Tag
						color='green'
						style={{
							fontSize: "16px",
							fontWeight: "700",
							letterSpacing: "1px",
						}}
					>
						<Button
							onClick={() => activityStore.openForm()}
							style={{ border: "none", background: "transparent" }}
						>
							<AppstoreAddOutlined />
							Create Activity
						</Button>
					</Tag>
				</Menu.Item>
			</Menu>
		</>
	);
};

export default Navbar;
