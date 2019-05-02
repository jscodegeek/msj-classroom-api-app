import * as _ from 'lodash';
import { PROP_NAMES } from '../shared/variables';
import { ICourse, IUser } from '../models';

const { ID, NAME, TITLE, DESCRIPTION, START_DATE, IMAGE_URL } = PROP_NAMES;

const defafultProps = [ID, NAME, TITLE, DESCRIPTION, START_DATE, IMAGE_URL];

class CourseFactory {
	private input: ICourse | ICourse[];
	private output: ICourse[];
	private safeOutput: object[];
	private whiteList: string[];

	init(data: ICourse | ICourse[]) {
		this.input = data;
		this.output = Array.isArray(data) ? data : [data];
		this.safeOutput = [];
		this.whiteList = [];

		return this;
	}

	addPropsToWhiteList(props: string | string[]) {
		this.whiteList = Array.isArray(props) ? props : [props];

		return this;
	}

	removeUnsafeProps() {
		const props = [...defafultProps, ...this.whiteList];

		this.safeOutput = this.output.map(course => _.pick(course, props));

		return this;
	}

	addIsSubscribedProp(userId?: number) {
		const id = typeof userId === 'number' ? userId : -1;

		this.output = this.output.map(course => {
			const isSubscribed = course.users.find((user: IUser) => user.id === id);
			course.isSubscribed = !!isSubscribed;
			return course;
		});

		return this;
	}

	build() {
		const result = this.safeOutput.length > 0 ? this.output : this.safeOutput;

		this.input = [];
		this.output = [];
		this.safeOutput = [];
		this.whiteList = [];

		return Array.isArray(this.input) ? result : result[0];
	}
}

export default new CourseFactory();
