const {
  Calendar,
  CalendarMonthView,
  CalendarMonthSelector,
  CalendarMonthSwiper,
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
const { Space, Button } = antd;
const { useState } = React;
const { View } = tarojsComponents;
const BaseExample = () => {
  const [value, onChange] = useState(new Date());
  const [time, onTimeChange] = useState("09:15");
  const [timeLength, setTimeLength] = useState(60);
  const [timeRange, setTimeRange] = useState([new Date(), new Date(Date.now() + 60 * 60 * 1000)]);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [open4, setOpen4] = useState(false);
  return <Space direction="vertical" size={30}>
    <Space direction="vertical">
      <View>CalendarMonthView:展示一个月日期</View>
      <CalendarMonthView current={value} onChange={onChange} minDate="2020-10-01" maxDate="2030-01-01"
                         marks={["2023-10-01", "2023-09-30"]} />
    </Space>
    <Space direction="vertical">
      <View>CalendarTimeStepView:展示一个时间段选择</View>
      <View>已选：{time}</View>
      <View style={{ "--picker-height": "400px" }}>
        <CalendarTimeStepView value={time} onChange={onTimeChange} />
      </View>
    </Space>
    <Space direction="vertical">
      <View>CalendarTimeLengthView:展示一个时长选择 </View>
      <View>已选：{timeLength}分钟</View>
      <View style={{ "--picker-height": "400px" }}>
        <CalendarTimeLengthView value={timeLength} onChange={setTimeLength} />
      </View>
    </Space>
    <Space direction="vertical">
      <View>CalendarMonthSelector:展示月份选择</View>
      <View style={{ "--month-selector-height": "200px" }}>
        <CalendarMonthSelector value={value} minDate="2020-10-01" maxDate="2030-01-01" onChange={onChange} />
      </View>
    </Space>
    <Space direction="vertical">
      <View>CalendarMonthSwiper:展示一个月日期并且可以左右滑动切换月份</View>
      <CalendarMonthSwiper current={value} onChange={onChange} minDate="2020" maxDate="2030-01-01"
                           marks={["2023-10-01", "2023-09-30"]} />
    </Space>
    <Space direction="vertical">
      <View>CalendarView:完整日历视图</View>
      <View style={{ "--month-selector-height": "600px" }}>
        <CalendarView value={value} onChange={onChange} disabledDate={(date) => {
          return dayjs(date).format("YYYY-MM-DD") === "2023-09-15";
        }} />
      </View>
    </Space>
    <Space direction="vertical">
      <View>Calendar:完整日历功能</View>
      <Calendar
        value={value}
        onChange={onChange}
        extraOptions={<Button size="small">添加</Button>}
      />
    </Space>
    <Space direction="vertical">
      <View>CalendarTimeRangeView:时间段选择器</View>
      <View>已选：{dayjs(timeRange[0]).format("YYYY-MM-DD HH:mm")}~{dayjs(timeRange[1]).format("YYYY-MM-DD HH:mm")}</View>
      <CalendarTimeRangeView value={timeRange} startTime="15:00" endTime="21:00" onChange={setTimeRange} />
    </Space>
    <Space direction="vertical">
      <View>CalendarRangeView:</View>
      <CalendarRangeView />
    </Space>
    <Space direction="vertical">
      <View>CalendarTimeStepPopup:展示一个时间段选择弹窗</View>
      <Button onClick={() => {
        setOpen(true);
      }}>点击弹出</Button>
      <CalendarTimeStepPopup open={open} onOpenChange={setOpen} />
    </Space>
    <Space direction="vertical">
      <View>CalendarPopup:展示一个日期选择弹窗</View>
      <Button onClick={() => {
        setOpen2(true);
      }}>点击弹出</Button>
      <CalendarPopup open={open2} onOpenChange={setOpen2} />
    </Space>
    <Space direction="vertical">
      <View>CalendarRangePopup:展示一个日期范围选择弹窗</View>
      <Button onClick={() => {
        setOpen3(true);
      }}>点击弹出</Button>
      <CalendarRangePopup open={open3} onOpenChange={setOpen3} />
    </Space>
    <Space direction="vertical">
      <View>CalendarTimeRangePopup:展示一个日期时间段范围选择弹窗</View>
      <Button onClick={() => {
        setOpen4(true);
      }}>点击弹出</Button>
      <CalendarTimeRangePopup open={open4} onOpenChange={setOpen4} value={timeRange} onChange={setTimeRange} />
    </Space>
  </Space>;
};

render(<BaseExample />);
