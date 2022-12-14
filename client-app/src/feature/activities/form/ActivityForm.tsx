import { useState } from "react";
import { Button, Form, Input, Space } from "antd";
import { IActivity } from "../../../app/models/activity";
import { useStore } from "../../../app/store/store";
import { observer } from "mobx-react-lite";

const ActivityForm = () => {
	const { activityStore } = useStore();
	const {
		selectedActivity,
		closeForm,
		createActivity,
		updateActivity,
		loading,
	} = activityStore;

	const initialState = selectedActivity ?? {
		id: "",
		title: "",
		category: "",
		description: "",
		date: "",
		city: "",
		venue: "",
	};

	const [activity, setActivity] = useState(initialState);

	// Form
	const onFinish = (values: IActivity) => {
		setActivity({ ...activity, ...values });
		activity?.id ? updateActivity(activity) : createActivity(activity);
		console.log("on finish", activity);
		console.log("values", values);
	};
	console.log("activity", activity);

	const onFinishFailed = (errorInfo: any) => {
		console.log("Failed:", errorInfo);
	};
	return (
		<>
			<Form
				name='basic'
				labelCol={{ span: 8 }}
				wrapperCol={{ span: 16 }}
				initialValues={{ remember: true }}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
				autoComplete='off'
				style={{ marginTop: 60 }}
			>
				<Form.Item
					label='Title'
					name='title'
					initialValue={activity.title}
					rules={[{ required: true, message: "Please input your Title!" }]}
				>
					<Input placeholder='Title' />
				</Form.Item>
				<Form.Item
					label='Description'
					name='description'
					initialValue={activity.description}
					rules={[
						{ required: true, message: "Please input your Description!" },
					]}
				>
					<Input placeholder='Description' />
				</Form.Item>
				<Form.Item
					label='Category'
					name='category'
					initialValue={activity.category}
					rules={[{ required: true, message: "Please input your Category!" }]}
				>
					<Input placeholder='Category' />
				</Form.Item>
				<Form.Item
					label='Date'
					name='date'
					initialValue={activity.date}
					rules={[{ required: true, message: "Please input your Date!" }]}
				>
					<Input type='date' placeholder='Date' />
				</Form.Item>
				<Form.Item
					label='City'
					name='city'
					initialValue={activity.city}
					rules={[{ required: true, message: "Please input your City!" }]}
				>
					<Input placeholder='City' />
				</Form.Item>
				<Form.Item
					label='Venue'
					name='venue'
					initialValue={activity.venue}
					rules={[{ required: true, message: "Please input your Venue!" }]}
				>
					<Input placeholder='Venue' />
				</Form.Item>

				<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
					<Space>
						<Button loading={loading} type='primary' htmlType='submit'>
							Submit
						</Button>
						<Button onClick={closeForm} danger>
							Cancel
						</Button>
					</Space>
				</Form.Item>
			</Form>
		</>
	);
};

export default observer(ActivityForm);
