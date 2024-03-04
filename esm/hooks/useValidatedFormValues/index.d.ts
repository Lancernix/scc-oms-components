import type { FormInstance } from 'antd';
/**
 * 返回了一个方法，这个方法会获取form校验成功之后的表单数据，同时支持配置过滤不需要的字段，还增加了校验失败自动滚动到失败表单项的处理
 * @param form form实例
 * @description 主要有两个应用场景：需要过滤某些不需要提交的数据；在有滚动条的表单校验失败之后给用户一个友好的提示
 */
export default function useValidatedFormValues<VT = Record<string, unknown>>(form: FormInstance<VT>): (filterFields?: Array<{
    name: string;
    deep?: boolean;
}>) => Promise<VT>;
