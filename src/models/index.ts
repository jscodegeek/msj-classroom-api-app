import * as Sequelize from 'sequelize';
import config from '../config';

import { Broadcast, IBroadcast } from './broadcast';
import { Course, ICourse } from './course';
import { Lecture, ILecture } from './lecture';
import { Message, IMessage } from './message';
import { Subscription, ISubscription } from './subscription';
import { User, IUser } from './user';

const sequelize = new Sequelize.Sequelize(config[config.ENVIRONMENT].db);

const models = {
	Broadcast: Broadcast.init(sequelize, Sequelize),
	Course: Course.init(sequelize, Sequelize),
	Lecture: Lecture.init(sequelize, Sequelize),
	Message: Message.init(sequelize, Sequelize),
	Subscription: Subscription.init(sequelize, Sequelize),
	User: User.init(sequelize, Sequelize),
};

Object.keys(models).forEach(key => {
	if ('associate' in models[key]) {
		models[key].associate(models);
	}
});

export { Broadcast, Course, Lecture, Message, Subscription, User };
export { IBroadcast, ICourse, ILecture, IMessage, ISubscription, IUser };
