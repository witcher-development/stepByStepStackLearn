const wait = async (delay) => {
	return new Promise((res) => {
		setTimeout(res, delay);
	});
};

const users = [
	{
		id: 1,
		name: 'John',
		color: '#8bc34a',
	},
	{
		id: 2,
		name: 'Mark',
		color: '#42a5f5',
	},
	{
		id: 3,
		name: 'Lilia',
		color: '#ffee58',
	},
];

export const fetchUsers = async () => {
	await wait(200);

	return users;
};
