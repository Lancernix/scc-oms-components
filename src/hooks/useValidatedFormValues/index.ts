import type { FormInstance } from 'antd';
import { cloneDeep } from 'lodash-es';
import { useCallback } from 'react';
import removeSomeProperty from 'utils/removeSomeProperty';

/**
 * 返回了一个方法，这个方法会获取form校验成功之后的表单数据，同时支持配置过滤不需要的字段，还增加了校验失败自动滚动到失败表单项的处理
 * @param form form实例
 * @description 主要有两个应用场景：需要过滤某些不需要提交的数据；在有滚动条的表单校验失败之后给用户一个友好的提示
 */
export default function useValidatedFormValues<VT = Record<string, unknown>>(form: FormInstance<VT>) {
  /**
   * 获取form校验成功之后的表单数据，支持配置过滤不需要的字段，同时增加了校验失败自动滚动到失败表单项的处理
   * @param form formInstance
   * @param filterFields 需要跳过的字段数组，如[{name: 'xxx', deep: true}]，如果deep为true则会递归过滤
   */
  const getValidatedValues = useCallback(
    async (filterFields?: Array<{ name: string; deep?: boolean }>) =>
      form
        .validateFields()
        .then(values => {
          if (filterFields?.length) {
            const newValues = cloneDeep(values);
            filterFields.forEach(field => {
              if (field.deep) {
                // 深度过滤
                removeSomeProperty(newValues as Record<string, unknown>, field.name);
              } else {
                // 只过滤第一层
                if ((newValues as Record<string, unknown>)[field.name]) {
                  delete (newValues as Record<string, unknown>)[field.name];
                }
              }
            });
            return Promise.resolve(newValues);
          }
          return Promise.resolve(values);
        })
        .catch(info => {
          form.scrollToField(info.errorFields[0].name, { behavior: 'smooth', block: 'center' });
          return Promise.reject(info);
        }),
    [form],
  );

  return getValidatedValues;
}
