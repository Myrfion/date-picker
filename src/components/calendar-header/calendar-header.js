import React from 'react';
import moment from 'moment';

import './calendar-header.scss';

export default function CalendarHeader({ classNames, date }) {
  return (
    <div className={classNames.caption + ' calendar-header'}>
      <div>{moment(date).format('MMMM YYYY')}</div>
    </div>
  );
}
