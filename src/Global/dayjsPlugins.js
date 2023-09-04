import dayjs from 'dayjs';
import weekday from 'dayjs/plugin/weekday';
import isToday from 'dayjs/plugin/isToday';
import isLeapYear from 'dayjs/plugin/isLeapYear';
import isoWeek from 'dayjs/plugin/isoWeek';

import 'dayjs/locale/zh-cn'
import localeData from 'dayjs/plugin/localeData';

dayjs.extend(localeData)
dayjs.locale('zh-cn');

dayjs.extend(weekday);
dayjs.extend(isToday);
dayjs.extend(isLeapYear);
dayjs.extend(isoWeek);
