import style from './style.module.scss';
import React, {useState, useId, useEffect, useRef} from 'react';
import range from 'lodash/range';
import {Space, Button, Divider, Icon, Popup, Selector, SafeArea} from '@kne/antd-taro';
import {View, ScrollView, Swiper, SwiperItem} from '@tarojs/components';
import useControlValue from '@kne/use-control-value';
import useRefCallback from '@kne/use-ref-callback';
import classnames from 'classnames';
import dayjs from 'dayjs';
import HeaderContainer from "../HeaderContainer";

const MonthSelector = ({value, minDate, maxDate, onChange}) => {
  const containerId = useId().replace(/:/g, '_');
  const [scrollIntoView, setScrollIntoView] = useState(null);
  const currentYear = dayjs(value).year(), currenMonth = dayjs(value).month();
  useEffect(() => {
    setScrollIntoView(`${containerId}-${currentYear}`);
  }, [currentYear, containerId]);
  return <>
    <HeaderContainer/>
    <View className={style['title']}>
      <View className={style['title-current']}>
        {dayjs(value).format('YYYY年MM月')}
      </View>
      <View>
        <Button size="small" onClick={() => {
          onChange(new Date());
        }}>本月</Button>
      </View>
    </View>
    <ScrollView scrollY scrollIntoView={scrollIntoView} className={style['month-selector-scroller']}>
      {range(dayjs(minDate).year(), dayjs(maxDate).year() + 1).map((year) => {
        return <Space direction="vertical">
          <View id={`${containerId}-${year}`} className={style['year-title']}>{year}年</View>
          <Selector className={style['selector']} value={currentYear === year ? [currenMonth] : []}
                    onChange={([month]) => {
                      if (month === void (0)) {
                        onChange(value);
                        return;
                      }
                      const target = new Date(year, month, 1);
                      onChange(dayjs(target).isSame(new Date(), 'month') ? new Date() : target);
                    }} options={range(0, 12).map((index) => {
            const current = dayjs(new Date(year, index, 1));
            const disabled = current.isBefore(dayjs(minDate).startOf('month')) || current.isAfter(dayjs(maxDate).startOf('month'));
            return {
              value: index, label: `${index + 1}月`, disabled
            };
          })}/>
        </Space>
      })}
    </ScrollView>
  </>;
};

const WeekView = ({current, value, onChange, minDate, maxDate, marks}) => {
  return <View className={style['week-item']}>
    {range(0, 7).map((target) => {
      const date = dayjs(current).weekday(target).startOf('day');
      const isDisabled = date.isBefore(dayjs(minDate).startOf('day')) || date.isAfter(dayjs(maxDate).startOf('day'));
      const isMarked = marks.find((target) => {
        return date.isSame(dayjs(target), 'day');
      });
      return <View key={target} className={classnames(style['date-cell'], {
        [style['not-current-month']]: !date.isSame(dayjs(value), 'month')
      })} onClick={() => {
        if (isDisabled) {
          return;
        }
        onChange(date.toDate());
      }}>
        <View className={classnames(style['date-item'], {
          [style['is-disabled']]: isDisabled,
          [style['is-today']]: date.isToday(),
          [style['is-marked']]: isMarked,
          [style['is-current']]: date.isSame(dayjs(value), 'day')
        })}>{date.date()}</View>
      </View>
    })}
  </View>;
};

const MonthView = ({current, onChange, minDate, maxDate, marks}) => {
  const currentDate = dayjs(current);
  const startDate = currentDate.startOf('month'), endDate = currentDate.endOf('month');
  const firstDate = startDate.weekday(0), lastDate = endDate.weekday(6);
  const startWeek = startDate.isoWeek();
  const weeks = lastDate.diff(firstDate, 'week');
  return range(startWeek, startWeek + Math.max(weeks, 6) + 1).map((week) => {
    const target = dayjs(startDate).isoWeek(week);
    return <WeekView key={week} current={target} value={current} onChange={onChange} minDate={minDate} marks={marks}
                     maxDate={maxDate}/>;
  })
};

const getGroups = (target, mainIndex) => {
  const mainDate = dayjs(target), prevDate = mainDate.subtract(1, 'month').date(1),
    nextDate = mainDate.add(1, 'month').date(1);
  if (mainIndex === 0) {
    return [mainDate, nextDate, prevDate];
  }
  if (mainIndex === 1) {
    return [prevDate, mainDate, nextDate];
  }
  if (mainIndex === 2) {
    return [nextDate, prevDate, mainDate]
  }
  return null;
};

const MonthSwiper = ({current, onChange, minDate, maxDate, marks}) => {
  const [animating, setAnimating] = useState(false);
  const indexRef = useRef(1);
  const touchLocation = useRef(null);
  const [listGroup, setListGroup] = useState(getGroups(current, indexRef.current));

  useEffect(() => {
    setListGroup(getGroups(current, indexRef.current));
  }, [current]);

  return <Swiper current={1} circular duration={300} skipHiddenItemLayout onAnimationFinish={(e) => {
    (() => {
      if (e.target.current === indexRef.current) {
        return;
      }
      indexRef.current = e.target.current;
      const targetDate = dayjs(current)[touchLocation.current.isRight ? 'add' : 'subtract'](1, 'month').date(1);
      const target = targetDate.isSame(dayjs(), 'month') ? dayjs() : targetDate;
      onChange(target.toDate());
    })();
    setAnimating(false);
  }} className={classnames(style['month-swiper'], {
    [style['animating']]: animating
  })} onChange={() => {
    setAnimating(true);
  }} onTouchEnd={(e) => {
    const {clientX} = e.changedTouches[0];
    touchLocation.current = {
      isRight: touchLocation.current.clientX > clientX
    };
  }} onTouchStart={(e) => {
    const {clientX} = e.changedTouches[0];
    touchLocation.current = {
      clientX: clientX
    };
  }}>
    {listGroup.map((item, key) => {
      return <SwiperItem key={key} itemId={key.toString()}>
        <MonthView current={item} onChange={onChange} minDate={minDate} maxDate={maxDate} marks={marks}/>
      </SwiperItem>
    })}
  </Swiper>
};

const Calendar = ({className, ...props}) => {
  const [isWeekView, setIsWeekView] = useState(true);
  const [monthSelectOpen, setMonthSelectOpen] = useState(false);
  const [value, setValue] = useControlValue(props);
  const onChange = useRefCallback((value) => {
    if (props.minDate && dayjs(value).isBefore(dayjs(props.minDate).startOf('day'))) {
      setValue(dayjs(props.minDate).startOf('day').toDate());
      return;
    }
    if (props.maxDate && dayjs(value).isAfter(dayjs(props.maxDate).startOf('day'))) {
      setValue(dayjs(props.maxDate).startOf('day').toDate());
      return;
    }
    setValue(value);
  });

  return <Space direction="vertical" className={classnames(className)}>
    <View className={style['title']}>
      <View className={style['title-current']} onClick={() => {
        setMonthSelectOpen(true);
      }}>
        {dayjs(value).format('YYYY年MM月')}
        <Icon className={classnames('iconfont', style['title-icon'])} type="jiantou-tianchong"/>
      </View>
      <View className={style['title-options']}>
        <Button size="small" onClick={() => {
          onChange(new Date());
        }}>今天</Button>
      </View>
    </View>
    <View>
      <Popup open={monthSelectOpen} bodyClassName={style['month-selector-body']} hasSafeArea={false} position="top"
             onMaskClick={() => setMonthSelectOpen(false)}>
        {monthSelectOpen && <MonthSelector value={value} onChange={(value) => {
          onChange(value);
          setMonthSelectOpen(false);
        }} maxDate={props.maxDate} minDate={props.minDate}/>}
      </Popup>
      <View className={style['week-item']}>
        {['一', '二', '三', '四', '五', '六', '日'].map((target) => {
          return <View key={target} className={classnames(style['date-cell'], style['cell-title'])}><View
            className={style['date-item']}>{target}</View></View>
        })}
      </View>
      {isWeekView ?
        <WeekView current={value} value={value} onChange={onChange} minDate={props.minDate} maxDate={props.maxDate}
                  marks={props.marks}/> :
        <MonthSwiper current={value} onChange={onChange} minDate={props.minDate} maxDate={props.maxDate}
                     marks={props.marks}/>}
    </View>
    <Divider className={style['divider']} onClick={() => {
      setIsWeekView((value) => !value);
    }}><Icon type={"rilijiantou"} className={classnames("iconfont", style['divider-icon'], {
      [style['is-month']]: !isWeekView
    })}/></Divider>
  </Space>;
};

Calendar.defaultProps = {
  defaultValue: new Date(), marks: [], minDate: (() => {
    const date = new Date();
    date.setFullYear(date.getFullYear() - 10);
    return date;
  })(), maxDate: (() => {
    const date = new Date();
    date.setFullYear(date.getFullYear() + 10);
    return date;
  })()
};

export default Calendar;
