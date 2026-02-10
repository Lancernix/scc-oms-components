import React from 'react';
import { isValidTimeZone } from 'scc-oms-components';

export default () => {
  const testCases = [
    'Asia/Shanghai',
    'America/New_York',
    'Europe/London',
    'UTC',
    'Invalid/TimeZone',
    'Asia/InvalidCity',
    '',
    'GMT+8',
  ];

  return (
    <div>
      <h4>时区验证示例</h4>
      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>时区字符串</th>
            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>验证结果</th>
          </tr>
        </thead>
        <tbody>
          {testCases.map(tz => (
            <tr key={tz || 'empty'}>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{tz || '(空字符串)'}</td>
              <td
                style={{
                  border: '1px solid #ddd',
                  padding: '8px',
                  color: isValidTimeZone(tz) ? 'green' : 'red',
                  fontWeight: 'bold',
                }}
              >
                {isValidTimeZone(tz) ? '✓ 有效' : '✗ 无效'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
