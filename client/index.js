import React from 'react'
import ReactDOM from 'react-dom'
import { DatePicker, Input } from 'antd'

import 'antd/lib/date-picker/style/css'
import 'antd/lib/input/style/css'
import './common/styles/reset.scss'
import './index.scss'

ReactDOM.render(
  <div>
    <DatePicker />
    <Input />
  </div>,
  document.getElementById('app')
)
