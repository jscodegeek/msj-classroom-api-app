import ObjectFactory from './object-factory';

export { ObjectFactory };

function tryCatch<IData>(promise: Promise<IData>): Promise<[null, IData] | [any]> {
	return promise.then((data: IData): [null, IData] => [null, data]).catch(err => [err]);
}

// adds isSubscribed prop to lectures or courses if user is subscribed to lecture or course
const addIsSubscribedProp = (data, userId) => {
	if (!Array.isArray(data)) {
		const isSubscribed = data.users.find(user => user.id === userId);
		data.isSubscribed = !!isSubscribed;
		return data;
	}

	const result = data.map(item => {
		const isSubscribed = item.users.find(user => user.id === userId);
		item.isSubscribed = !!isSubscribed;
		return item;
	});

	return result;
};

export default {
	tryCatch,
	addIsSubscribedProp,
};
