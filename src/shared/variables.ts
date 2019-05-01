import { IENTITY_TYPES, IUSER_SCOPES } from './types';

export const PROP_NAMES: { [key: string]: string } = {
	ID: 'id',
	COURSE_ID: 'courseId',
	LECTURE_ID: 'lectureId',
	USER_ID: 'userId',
	BROADCAST_ID: 'broadcastId',
	NAME: 'name',
	FIRSTNAME: 'firstname',
	LASTNAME: 'lastname',
	TITLE: 'title',
	DESCRIPTION: 'description',
	START_DATE: 'startDate',
	SHEDULED_TIME: 'scheduledTime',
	IMAGE_URL: 'imageUrl',
	IS_SUBSCRIBED: 'isSubscribed',
};

export const ENTITY_TYPES: { [key: string]: IENTITY_TYPES } = {
	COURSE: 'course',
	LECTURE: 'lecture',
	USER: 'user',
};

export const USER_SCOPES: { [key: string]: IUSER_SCOPES } = {
	ADMIN: 'ADMIN',
	STUDENT: 'STUDENT',
};
