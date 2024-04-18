import dayjs from 'dayjs';

const computedIsDisabled = (target, options) => {
  options = Object.assign({}, options);
  return (
    (options.minDate && dayjs(target).isBefore(dayjs(options.minDate).startOf('day'))) ||
    (options.maxDate && dayjs(target).isAfter(dayjs(options.maxDate).startOf('day'))) ||
    (typeof options.disabledDate === 'function' && options.disabledDate(dayjs(target)))
  );
};

export default computedIsDisabled;
