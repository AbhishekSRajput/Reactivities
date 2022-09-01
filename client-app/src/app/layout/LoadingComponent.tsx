import { Modal, Spin } from "antd";

interface IProps {
	isModalVisible: boolean;
	content: string;
}

const LoadingComponent = ({ isModalVisible, content }: IProps) => {
	return (
		<Modal
			style={{ opacity: 0.9 }}
			footer={null}
			visible={isModalVisible}
			closable={false}
			centered
		>
			<div
				style={{
					display: "flex",
					justifyContent: "space-around",
					alignItems: "center",
				}}
			>
				<h2>{content}</h2>
				<Spin size='large' />
			</div>
		</Modal>
	);
};

export default LoadingComponent;
