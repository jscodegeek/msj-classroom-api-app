import development from './development';
import production from './production';

const ENVIRONMENT = process.env.NODE_ENV || 'development';

export default {
	development,
	production,
	ENVIRONMENT,
};
