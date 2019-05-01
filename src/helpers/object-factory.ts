import * as _ from 'lodash';
import { PROP_NAMES } from '../shared/variables';

const {
	ID,
	COURSE_ID,
	LECTURE_ID,
	USER_ID,
	BROADCAST_ID,
	NAME,
	FIRSTNAME,
	LASTNAME,
	TITLE,
	DESCRIPTION,
	START_DATE,
	SHEDULED_TIME,
	IMAGE_URL,
} = PROP_NAMES;

const PROPS_MAP_TO_SCOPE = {
	STUDENT: {
		course: [ID, NAME, TITLE, DESCRIPTION, START_DATE, IMAGE_URL],
		lecture: [ID, COURSE_ID, TITLE, DESCRIPTION, SHEDULED_TIME],
		user: [FIRSTNAME, LASTNAME],
	},
};

class ObjectFactory {
	private input: object | object[];
	private scope: string;
	private entity: string;
	private output: object | object[];
	private whiteList: string | string[];

	init({ data, scope, entity }: { data: object | object[]; scope: string; entity: string }) {
		this.input = data;
		this.scope = scope;
		this.entity = entity;
		this.whiteList = [];

		return this;
	}

	addPropsToWhiteList(props: string | string[]) {
		this.whiteList = Array.isArray(props) ? props : [props];

		return this;
	}

	removeUnsafeProps() {
		const props = [...PROPS_MAP_TO_SCOPE[this.scope][this.entity], ...this.whiteList];

		this.output = Array.isArray(this.input) ? this.input.map(item => _.pick(item, props)) : _.pick(this.input, props);

		return this;
	}

	build() {
		const result = this.output;

		this.input = null;
		this.scope = null;
		this.output = null;
		this.whiteList = null;

		return result;
	}
}

export default new ObjectFactory();
