/**
 * title: 用法示例
 */
import React from 'react';
import { getTimeZone } from 'scc-oms-components';

export default () => (
  <p>
    当前时区是：<span style={{ fontWeight: 'bold' }}>{getTimeZone()}</span>
  </p>
);
