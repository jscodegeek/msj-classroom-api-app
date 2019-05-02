import * as _ from 'lodash';
import { PROP_NAMES } from '../shared/variables';
import { IUser } from '../models';

const { FIRSTNAME, LASTNAME } = PROP_NAMES;

const defafultProps = [FIRSTNAME, LASTNAME];

class UserFactory {
	private input: IUser | IUser[];
	private output: IUser[];
	private safeOutput: object[];
	private whiteList: string[];

	init(data: IUser | IUser[]) {
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

		this.safeOutput = this.output.map(user => _.pick(user, props));

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

export default new UserFactory();
