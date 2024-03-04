import type { FormInstance } from 'antd';
import type { Moment } from 'moment';
interface IOptions {
    form: FormInstance;
    fields: [string, string];
    format: string;
    valueType: 'string' | 'secondTimestamp' | 'timestamp' | 'moment';
    useStartAndEndOfDay?: boolean;
    showTime?: boolean;
}
declare function useRangePicker(initialValue: [Moment, Moment] | [string, string] | [number, number], options: IOptions): [[Moment, Moment], (momentValue: [Moment, Moment]) => void];
export default useRangePicker;
