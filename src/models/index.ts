import * as Sequelize from 'sequelize';
import config from '../config';

import BroadcastClass from './broadcast';
import CourseClass from './course';
import LectureClass from './lecture';
import MessageClass from './message';
import UserClass from './user';
import SubscriptionClass from './subscription';

const sequelize = new Sequelize.Sequelize(config[config.ENVIRONMENT].db);

export const Broadcast = BroadcastClass.init(sequelize, Sequelize);
export const Course = CourseClass.init(sequelize, Sequelize);
export const Lecture = LectureClass.init(sequelize, Sequelize);
export const Message = MessageClass.init(sequelize, Sequelize);
export const User = UserClass.init(sequelize, Sequelize);
export const Subscription = SubscriptionClass.init(sequelize, Sequelize);

const models = { Broadcast, Course, Lecture, Message, User, Subscription };

Object.keys(models).forEach(key => {
	if ('associate' in models[key]) {
		models[key].associate(models);
	}
});
