import dayjs from "dayjs";

const minuteToHumanize = (target) => {
    const duration = dayjs.duration({minute: target}).asHours();
    const hours = Math.trunc(duration), minutes = duration % 1 * 60;
    return `${hours > 0 ? `${hours}小时` : ''}${minutes > 0 ? `${minutes}分钟` : ''}`;
};

export default minuteToHumanize;

export const minuteRangeToDuration = (value) => {
    if (value && Array.isArray(value) && value.length === 2) {
        return minuteToHumanize(dayjs(value[1]).diff(value[0], 'minute'));
    }
    return '-';
};

export const minuteRangeToHumanize = (value) => {
    if (value && Array.isArray(value) && value.length === 2) {
        return `${dayjs(value[0]).format('YYYY-MM-DD')} ${dayjs(value[0]).format('HH:mm')}-${dayjs(value[1]).format('HH:mm')}`;
    }
    return '-';
};
