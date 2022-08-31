import { AppstoreAddOutlined, DeploymentUnitOutlined } from "@ant-design/icons";
import { Button, Menu, Tag } from "antd";

interface IProps {
	handleFormOpen: () => void;
}
const Navbar = (props: IProps) => {
	const { handleFormOpen } = props;
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
							onClick={handleFormOpen}
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
