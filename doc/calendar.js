const {
    Calendar,
    CalendarMonthView,
    CalendarMonthSelector,
    CalendarMonthSwiper,
    CalendarWeekTitle,
    CalendarWeekView,
    CalendarTimeStepView,
    CalendarTimeLengthView,
    CalendarView,
    CalendarTimeRangeView,
    CalendarTimeRangePopup,
    CalendarRangeView,
    CalendarPopup,
    CalendarRangePopup,
    CalendarTimeStepPopup
} = miniCore;
const {Space, Button} = antd;
const {useState} = React;
const {View} = tarojsComponents;
const BaseExample = () => {
    const [value, onChange] = useState(new Date());
    const [time, onTimeChange] = useState('09:15');
    const [timeLength, setTimeLength] = useState(60);
    const [timeRange, setTimeRange] = useState([new Date(), new Date(Date.now() + 60 * 60 * 1000)]);
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [open3, setOpen3] = useState(false);
    const [open4, setOpen4] = useState(false);
    return <Space direction="vertical">
        <View>CalendarWeekTitle:展示星期文案</View>
        <CalendarWeekTitle/>
        <View>CalendarWeekView:展示一个周日期</View>
        <CalendarWeekView current={value} onChange={onChange} minDate="2020-10-01" maxDate="2030-01-01"
                          marks={['2023-10-01', '2023-09-30']}/>
        <View>CalendarMonthView:展示一个月日期</View>
        <CalendarMonthView current={value} onChange={onChange} minDate="2020-10-01" maxDate="2030-01-01"
                           marks={['2023-10-01', '2023-09-30']}/>
        <View>CalendarTimeStepView:展示一个时间段选择 {time}</View>
        <View style={{'--picker-height': '400px'}}>
            <CalendarTimeStepView value={time} onChange={onTimeChange}/>
        </View>
        <View>CalendarTimeLengthView:展示一个时长选择 {timeLength}分钟</View>
        <View style={{'--picker-height': '400px'}}>
            <CalendarTimeLengthView value={timeLength} onChange={setTimeLength}/>
        </View>
        <View>CalendarMonthSelector:展示月份选择</View>
        <View style={{'--month-selector-height': '200px'}}>
            <CalendarMonthSelector value={value} minDate="2020-10-01" maxDate="2030-01-01" onChange={onChange}/>
        </View>
        <View>CalendarMonthSwiper:展示一个月日期并且可以左右滑动切换月份</View>
        <CalendarMonthSwiper current={value} onChange={onChange} minDate="2020" maxDate="2030-01-01"
                             marks={['2023-10-01', '2023-09-30']}/>
        <View>CalendarView:完整日历视图</View>
        <View style={{'--month-selector-height': '600px'}}>
            <CalendarView value={value} onChange={onChange}/>
        </View>
        <View>Calendar:完整日历功能</View>
        <Calendar value={value} onChange={onChange}/>
        <View>CalendarTimeRangeView:时间段选择器 {dayjs(timeRange[0]).format('YYYY-MM-DD HH:mm')}~{dayjs(timeRange[1]).format('YYYY-MM-DD HH:mm')}</View>
        <CalendarTimeRangeView value={timeRange} onChange={setTimeRange}/>
        <View>CalendarRangeView:</View>
        <CalendarRangeView/>
        <View>CalendarTimeRangePopup:</View>
        <Button onClick={() => {
            setOpen(true);
        }}>点击弹出</Button>
        <CalendarTimeRangePopup open={open} onOpenChange={setOpen} value={timeRange} onChange={setTimeRange}/>
        <View>CalendarPopup:</View>
        <Button onClick={() => {
            setOpen2(true);
        }}>点击弹出</Button>
        <CalendarPopup open={open2} onOpenChange={setOpen2}/>
        <View>CalendarRangePopup:</View>
        <Button onClick={() => {
            setOpen3(true);
        }}>点击弹出</Button>
        <View>CalendarTimeStepPopup:展示一个时间段选择弹窗</View>
        <Button onClick={() => {
            setOpen4(true);
        }}>点击弹出</Button>
        <CalendarTimeStepPopup open={open4} onOpenChange={setOpen4}/>
        <CalendarRangePopup open={open3} onOpenChange={setOpen3}/>
    </Space>;
};

render(<BaseExample/>);
