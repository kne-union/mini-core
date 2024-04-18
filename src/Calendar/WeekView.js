import React from 'react';
import { View } from '@tarojs/components';
import style from './style.module.scss';
import dayjs from 'dayjs';
import classnames from 'classnames';
import range from 'lodash/range';
import computedIsDisabled from './computedIsDisabled';

const WeekView = ({ current, disabledDate, value, onChange, minDate, maxDate, marks }) => {
  return (
    <View className={style['week-item']}>
      {range(0, 7).map(target => {
        const date = dayjs(current).weekday(target).startOf('day');
        const isDisabled = computedIsDisabled(date, { minDate, maxDate, disabledDate });
        const isMarked = marks.find(target => {
          return date.isSame(dayjs(target), 'day');
        });
        return (
          <View
            key={target}
            className={classnames(style['date-cell'], {
              [style['not-current-month']]: !date.isSame(dayjs(value), 'month')
            })}
            onClick={() => {
              if (isDisabled) {
                return;
              }
              onChange(date.toDate());
            }}
          >
            <View
              className={classnames(style['date-item'], {
                [style['is-disabled']]: isDisabled,
                [style['is-today']]: date.isToday(),
                [style['is-marked']]: isMarked,
                [style['is-current']]: date.isSame(dayjs(value), 'day')
              })}
            >
              {date.date()}
            </View>
          </View>
        );
      })}
    </View>
  );
};

export default WeekView;
