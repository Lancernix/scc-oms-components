/**
 * title: 用法示例
 */
import React from 'react';
import { getTimeZone, getUtcOffsetDayjs } from 'scc-oms-components';

export default () => (
  <>
    <p>
      当前时区是：<span style={{ fontWeight: 'bold' }}>{getTimeZone()}</span>
    </p>
    <p>
      对应的UTC偏移量是：<span style={{ fontWeight: 'bold' }}>{getUtcOffsetDayjs()}</span>
    </p>
  </>
);
