import { DownOutlined, ReloadOutlined, SearchOutlined, UpOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, InputNumber, Row, Select } from 'antd';
import type { ButtonProps, FormItemProps, FormProps, InputNumberProps, InputProps, RowProps, SelectProps } from 'antd';
import { LocaleContext } from 'components/LocaleProvider';
import useWindowWidth from 'hooks/useWindowWidth';
import React, { type CSSProperties, useContext, useMemo, useState } from 'react';
import styled from 'styled-components';
import { DatePicker, type DatePickerProps, TimePicker, type TimePickerProps } from '../DateTimePickerDayjs';
import {
  FormDateRangePicker,
  type FormDateRangePickerProps,
  FormTimeRangePicker,
  type FormTimeRangePickerProps,
} from '../FormRangePickerDayjs';

interface InputItem extends FormItemProps {
  type: 'input';
  /**
   * 表单项占用几个基础col
   * @default 1
   */
  multiCol?: number;
  props?: InputProps;
}

interface SelectItem extends FormItemProps {
  type: 'select';
  /**
   * 表单项占用几个基础col
   * @default 1
   */
  multiCol?: number;
  props: SelectProps;
}

interface InputNumberItem extends FormItemProps {
  type: 'inputNumber';
  /**
   * 表单项占用几个基础col
   * @default 1
   */
  multiCol?: number;
  props?: InputNumberProps;
}
interface DateItem extends FormItemProps {
  type: 'date';
  /**
   * 表单项占用几个基础col
   * @default 1
   */
  multiCol?: number;
  props?: DatePickerProps;
}
interface TimeItem extends FormItemProps {
  type: 'time';
  /**
   * 表单项占用几个基础col
   * @default 1
   */
  multiCol?: number;
  props?: TimePickerProps;
}

interface DateRangeItem extends FormItemProps {
  type: 'dateRange';
  /**
   * 表单项占用几个基础col
   * @default 2
   */
  multiCol?: number;
  props: FormDateRangePickerProps;
}
interface TimeRangeItem extends FormItemProps {
  type: 'timeRange';
  /**
   * 表单项占用几个基础col
   * @default 2
   */
  multiCol?: number;
  props: FormTimeRangePickerProps;
}

interface CustomItem extends FormItemProps {
  type: 'custom';
  /**
   * 表单项占用几个基础col
   * @default 1
   */
  multiCol?: number;
  /** 自定义表单项组件 */
  node: React.ReactNode;
}

type FieldItem =
  | InputItem
  | SelectItem
  | InputNumberItem
  | DateItem
  | TimeItem
  | DateRangeItem
  | TimeRangeItem
  | CustomItem;

interface Props<VT> extends Omit<FormProps<VT>, 'onReset'> {
  /** 表单项数组 */
  items: FieldItem[];
  /** 查询按钮的点击事件 */
  onSearch?: (event?: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  /**
   * 查询按钮的属性
   * @description 没有onClick属性，由onSearch属性代替
   * @description 本身设置了一些基础的默认属性（比如type、icon等），不需要可以替换
   */
  searchBtnProps?: Omit<ButtonProps, 'onClick'>;
  /**
   * 是否显示查询按钮
   * @default true
   */
  showSearchBtn?: boolean;
  /** 重置按钮的点击事件 */
  onReset?: (event?: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  /**
   * 重置按钮的属性
   * @description 没有onClick属性，由onReset属性代替
   * @description 本身设置了一些基础的默认属性（比如type、icon等），不需要可以替换
   */
  resetBtnProps?: Omit<ButtonProps, 'onClick'>;
  /**
   * 是否显示重置按钮
   * @default true
   */
  showResetBtn?: boolean;
  /**
   * 整个组件最外层的样式
   * @default true
   * @description true表示使用默认样式，false表示不使用样式，也可以直接传入自定义样式对象
   */
  wrapperStyle?: boolean | CSSProperties;
  /**
   * 栅格间隔
   * @default [4, 4]
   * @description 用法和Row的gutter属性一样
   */
  gutter?: RowProps['gutter'];
  /**
   * 是否支持响应式（col的span随着屏幕宽度变化）
   * @default true
   * @description true表示使用默认的span设置，false则基础col的span固定为6，如果默认的span设置不合适，可以直接传入你想要的span对象
   * @description span对象中，key为屏幕宽度，value为col的span，比如 960:8，表示宽度大于960px的时候，col span为8
   */
  responsive?: boolean | Record<string, number>;
  /**
   * 是否支持折叠筛选项
   * @default false
   * @description true表示折叠，false表示不折叠，默认折叠展示一行，可以直接传入数字设置折叠状态下展示几行
   */
  collapsed?: boolean | number;
  /**
   * 折叠按钮的属性
   * @description 本身设置了一些基础的默认属性（比如style），不需要可以替换
   */
  collapseBtnProps?: ButtonProps;
  /**
   * 表单项的marginBottom
   * @default '8px'
   */
  formItemMarginBottom?: string | number;
  /** 操作col中额外的元素 */
  extraOperateNode?: React.ReactNode;
}

const FormItem = Form.Item;

/** 默认组件外层样式 */
const defaultWrapperStyle = {
  padding: '16px 20px 10px',
  marginBottom: '10px',
  background: '#fff',
  borderRadius: '2px',
  boxShadow: '0px 3px 7px 1px rgba(111, 118, 129, 0.1)',
};

/** 默认折叠按钮样式 */
const CollapseBtn = styled(Button)`
  padding: 0 2px;
  margin-left: 4px;
  & > .anticon + span, & > span + .anticon {
    margin-left: 2px;
  }
`;

/** 不需要响应式的时候，默认一个col span为6 */
const defaultBasicColSpan = 6;

/**
 * 默认的响应式Col span设置，key为屏幕宽度
 * @description key表示最小的window宽度，比如 960:8，表示宽度大于960px的时候，Col span为8
 */
const defaultColSpanMap = {
  960: 8,
  1600: 6,
  2400: 4,
};

const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const doubleSpanFormItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

// 确定筛选项对应col占用的span
const getColSpan = (type: FieldItem['type'], basicColSpan: number, multiCol?: FieldItem['multiCol']) => {
  if (['dateRange', 'timeRange'].includes(type)) {
    // 日期范围选择、时间范围选择默认占2个基础col宽度
    return basicColSpan * (multiCol ?? 2);
  }
  // 其他默认占1个基础col宽度
  return basicColSpan * (multiCol ?? 1);
};

/**
 * 渲染表单项
 * @param item 表单项
 * @param colSpan 占用的span
 * @param formItemMarginBottom 对应formItem的marginBottom
 * @returns
 */
const renderItem = (item: FieldItem, colSpan: number, formItemMarginBottom: string | number) => {
  const { type, multiCol, ...rest } = item;
  switch (type) {
    case 'input': {
      const { props, ...formItemProps } = rest as Omit<InputItem, 'type' | 'multiCol'>;
      return (
        <Col span={colSpan} key={formItemProps.name.toString()}>
          <FormItem {...formItemLayout} style={{ marginBottom: formItemMarginBottom }} {...formItemProps}>
            <Input {...props} />
          </FormItem>
        </Col>
      );
    }
    case 'select': {
      const { props, ...formItemProps } = rest as Omit<SelectItem, 'type' | 'multiCol'>;
      return (
        <Col span={colSpan} key={formItemProps.name.toString()}>
          <FormItem {...formItemLayout} style={{ marginBottom: formItemMarginBottom }} {...formItemProps}>
            <Select {...props} />
          </FormItem>
        </Col>
      );
    }
    case 'inputNumber': {
      const { props, ...formItemProps } = rest as Omit<InputNumberItem, 'type' | 'multiCol'>;
      return (
        <Col span={colSpan} key={formItemProps.name.toString()}>
          <FormItem {...formItemLayout} style={{ marginBottom: formItemMarginBottom }} {...formItemProps}>
            <InputNumber {...props} />
          </FormItem>
        </Col>
      );
    }
    case 'date': {
      const { props, ...formItemProps } = rest as Omit<DateItem, 'type' | 'multiCol'>;
      return (
        <Col span={colSpan} key={formItemProps.name.toString()}>
          <FormItem {...formItemLayout} style={{ marginBottom: formItemMarginBottom }} {...formItemProps}>
            <DatePicker {...props} />
          </FormItem>
        </Col>
      );
    }
    case 'time': {
      const { props, ...formItemProps } = rest as Omit<TimeItem, 'type' | 'multiCol'>;
      return (
        <Col span={colSpan} key={formItemProps.name.toString()}>
          <FormItem {...formItemLayout} style={{ marginBottom: formItemMarginBottom }} {...formItemProps}>
            <TimePicker {...props} />
          </FormItem>
        </Col>
      );
    }
    case 'dateRange': {
      const { props, ...formItemProps } = rest as Omit<DateRangeItem, 'type' | 'multiCol'>;
      return (
        <Col span={colSpan} key={formItemProps.name.toString()}>
          <FormItem {...doubleSpanFormItemLayout} style={{ marginBottom: formItemMarginBottom }} {...formItemProps}>
            <FormDateRangePicker {...props} />
          </FormItem>
        </Col>
      );
    }
    case 'timeRange': {
      const { props, ...formItemProps } = rest as Omit<TimeRangeItem, 'type' | 'multiCol'>;
      return (
        <Col span={colSpan} key={formItemProps.name.toString()}>
          <FormItem {...doubleSpanFormItemLayout} style={{ marginBottom: formItemMarginBottom }} {...formItemProps}>
            <FormTimeRangePicker {...props} />
          </FormItem>
        </Col>
      );
    }
    case 'custom': {
      const { node, ...formItemProps } = rest as Omit<CustomItem, 'type' | 'multiCol'>;
      return (
        <Col span={colSpan} key={formItemProps.name.toString()}>
          <FormItem {...formItemLayout} style={{ marginBottom: formItemMarginBottom }} {...formItemProps}>
            {node}
          </FormItem>
        </Col>
      );
    }
    default:
      return null;
  }
};

function SearchForm<FormValue = Record<string, unknown>>(props: Props<FormValue>) {
  const locale = useContext(LocaleContext);
  const {
    items,
    form,
    onSearch,
    onReset,
    searchBtnProps,
    resetBtnProps,
    collapseBtnProps,
    extraOperateNode,
    showSearchBtn = true,
    showResetBtn = true,
    collapsed = false,
    responsive = true,
    wrapperStyle = true,
    gutter = [4, 4],
    formItemMarginBottom = '8px',
    ...rest
  } = props;

  // 当前window宽度
  const windowWidth = useWindowWidth();
  // 展开、收起按钮状态，默认收起
  const [curCollapsed, setCurCollapsed] = useState(true);

  // 最外层div的样式
  const wrapperCss = useMemo(() => {
    if (typeof wrapperStyle === 'boolean') {
      return wrapperStyle ? defaultWrapperStyle : {};
    }
    return { ...defaultWrapperStyle, ...wrapperStyle };
  }, [wrapperStyle]);

  /** 根据当前window宽度和responsive属性，计算出当前屏幕下，每个基础col span的大小 */
  const basicColSpan = useMemo(() => {
    let useResponsive = false;
    let colSpanMap: Record<string, number> = defaultColSpanMap;
    if (typeof responsive === 'object') {
      colSpanMap = responsive;
      useResponsive = true;
    } else {
      useResponsive = responsive;
    }
    if (useResponsive) {
      const sortedKey = Object.keys(colSpanMap)
        // @ts-ignore 这里ts限制了isFinite的入参必须是number类型，和js不一致，关闭校验
        .filter(width => isFinite(width))
        .sort((a, b) => Number(b) - Number(a));
      // 遍历colSpanMap，找到第一个小于等于当前windowWidth的key，返回对应的value
      for (const key of sortedKey) {
        if (windowWidth >= Number(key)) {
          return colSpanMap[key];
        }
      }
      // windowWidth小于所有key中最小的值，返回最后一个key对应的value
      return colSpanMap[sortedKey.at(-1)];
    }
    return defaultBasicColSpan;
  }, [responsive, windowWidth]);

  // 从属性collapsed获取『是否展示折叠按钮』和『折叠时展示的行数』
  const [showCollapse, rowNum] = useMemo(() => {
    if (typeof collapsed === 'number') {
      return [true, collapsed];
    }
    return [collapsed, 1];
  }, [collapsed]);

  // 计算出操作col需要的offset和真正渲染的筛选项
  const [operateAreaOffset, colItems] = useMemo(() => {
    // 操作col需要的偏移量
    let offset = 0;
    // 折叠状态下能使用的最多span数量
    const collapsedAllSpan = rowNum * 24;
    // 所有筛选项占用的span数量
    let allSpan = 0;
    const itemNodes: JSX.Element[] = [];
    // 遍历items生成筛选项
    for (const item of items) {
      // 获取每个筛选项实际占用的span
      const itemColSpan = getColSpan(item.type, basicColSpan, item.multiCol);
      // 当前行空余的span是否满足当前筛选项所需要的，不满足则hasSpareSpan为true，即有空余的空间无法使用
      const hasSpareSpan = 24 - (allSpan % 24) < itemColSpan;
      // 暂存一下当前增加的span，如果不满足展示条件，需要回退
      const tempColSpan = hasSpareSpan ? 24 - (allSpan % 24) + itemColSpan : itemColSpan;
      if (hasSpareSpan) {
        allSpan = allSpan + tempColSpan;
      } else {
        allSpan = allSpan + tempColSpan;
      }
      // 折叠状态下，如果当前col已超出折叠状态下给出的span范围，则从此筛选项开始都不展示，直接退出循环
      if (showCollapse && curCollapsed && allSpan + basicColSpan > collapsedAllSpan) {
        // 回退allSpan
        if (hasSpareSpan) {
          allSpan = allSpan - tempColSpan;
        } else {
          allSpan = allSpan - tempColSpan;
        }
        break;
      }
      itemNodes.push(renderItem(item, itemColSpan, formItemMarginBottom));
    }
    // 包含操作col的所有span
    const actualAllSpan = allSpan + basicColSpan;
    // 筛选项需要的最小行数
    let rows = 0;
    // 如果需要折叠且当前是折叠状态
    if (showCollapse && curCollapsed) {
      // 折叠的行数
      rows = rowNum;
      // 如果折叠状态给的行数比实际的多，则以实际为准
      if (Math.ceil(actualAllSpan / 24) < rowNum) {
        rows = Math.ceil(actualAllSpan / 24);
      }
    } else {
      // 不需要折叠or当前是展开状态
      // 需要的行数
      rows = Math.ceil(actualAllSpan / 24);
    }
    // 需要的偏移量
    offset = rows * 24 - actualAllSpan;
    return [offset, itemNodes];
  }, [rowNum, items, basicColSpan, showCollapse, curCollapsed, formItemMarginBottom]);

  return (
    <div style={wrapperCss}>
      <Form form={form} colon={false} {...rest}>
        <Row gutter={gutter}>
          {/* 筛选项 */}
          {colItems}
          <Col span={basicColSpan} offset={operateAreaOffset}>
            <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
              {/* 重置按钮 */}
              {showResetBtn ? (
                <Button onClick={onReset} style={{ margin: '0 3px' }} icon={<ReloadOutlined />} {...resetBtnProps}>
                  {locale.reset}
                </Button>
              ) : null}
              {/* 查询按钮 */}
              {showSearchBtn ? (
                <Button
                  type="primary"
                  onClick={onSearch}
                  style={{ margin: '0 3px' }}
                  icon={<SearchOutlined />}
                  {...searchBtnProps}
                >
                  {locale.search}
                </Button>
              ) : null}
              {/* 折叠、展开按钮 */}
              {showCollapse ? (
                <CollapseBtn
                  size="small"
                  type="text"
                  icon={curCollapsed ? <DownOutlined /> : <UpOutlined />}
                  // 这里注意一下，collapseBtnProps中是有的onClick的，但是onClick中要有一个修改折叠状态的操作，所以这里的onClick必须在collapseBtnProps之后才行
                  {...collapseBtnProps}
                  onClick={e => {
                    setCurCollapsed(pre => !pre);
                    collapseBtnProps?.onClick?.(e);
                  }}
                >
                  {curCollapsed ? locale.expand : locale.collapse}
                </CollapseBtn>
              ) : null}
              {/* 额外操作节点 */}
              {extraOperateNode ?? null}
            </div>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default SearchForm;

export type SearchFormProps<VT = Record<string, unknown>> = Props<VT>;
