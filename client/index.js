import React from 'react'
import ReactDOM from 'react-dom'
import { DatePicker } from 'antd';

import 'antd/lib/date-picker/style/css';
import './common/styles/reset.scss'
import './index.scss'

ReactDOM.render(
  <div>
    <DatePicker />
  </div>,
  document.getElementById('app')
)
