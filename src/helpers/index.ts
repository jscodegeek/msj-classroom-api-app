function tryCatch<IData>(promise: Promise<IData>): Promise<[null, IData] | [any]> {
	return promise.then((data: IData): [null, IData] => [null, data]).catch(err => [err]);
}

export default {
	tryCatch,
};
