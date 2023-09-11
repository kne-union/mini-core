import transform from 'lodash/transform';
import isDate from 'lodash/isDate';
import dayjs from 'dayjs';

const timeParse = (time) => {
    if (isDate(time) || (time.toDate && isDate(time.toDate()))) {
        const current = dayjs(time);
        return {hour: current.get('hour'), minute: current.get('minute')};
    }
    if (typeof time === 'string') {
        return transform(time.split(':'), (result, value, index) => {
            if (index === 0) {
                result['hour'] = value;
            }
            if (index === 1) {
                result['minute'] = value;
            }
        }, {});
    }
    return {hour: 0, minute: 0};
};

export default timeParse;
