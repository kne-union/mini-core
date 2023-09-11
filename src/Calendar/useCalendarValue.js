import useControlValue from "@kne/use-control-value";
import useRefCallback from "@kne/use-ref-callback";
import dayjs from "dayjs";

const useCalendarValue = (props) => {
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
    return [value, onChange];
};

export default useCalendarValue;
