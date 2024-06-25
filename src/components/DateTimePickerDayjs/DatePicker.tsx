import generatePicker from 'antd/es/date-picker/generatePicker';
import type { Dayjs } from 'dayjs';
import dayjsGenerateConfig from 'rc-picker/es/generate/dayjs';

/** 官方提供的使用了dayjs替换moment之后的TimePicker */
const DatePicker = generatePicker<Dayjs>(dayjsGenerateConfig);

export default DatePicker;
