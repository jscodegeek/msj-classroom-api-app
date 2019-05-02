import * as _ from 'lodash';
import { PROP_NAMES } from '../shared/variables';
import { ILecture, IUser } from '../models';

const { ID, COURSE_ID, TITLE, DESCRIPTION, SHEDULED_TIME } = PROP_NAMES;

const defafultProps = [ID, COURSE_ID, TITLE, DESCRIPTION, SHEDULED_TIME];

class LectureFactory {
	private input: ILecture | ILecture[];
	private output: ILecture[];
	private safeOutput: object[];
	private whiteList: string[];

	init(data: ILecture | ILecture[]) {
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

		this.safeOutput = this.output.map(lecture => _.pick(lecture, props));

		return this;
	}

	addIsSubscribedProp(userId?: number) {
		const id = typeof userId === 'number' ? userId : -1;

		this.output = this.output.map(lecture => {
			let isSubscribed = false;

			if (
				lecture.course.users.find((user: IUser) => user.id === id) ||
				lecture.users.find((user: IUser) => user.id === id)
			) {
				isSubscribed = true;
			}

			lecture.isSubscribed = isSubscribed;

			return lecture;
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

export default new LectureFactory();
