import React, { useCallback, useMemo } from 'react'

import styles from './styles.module.scss'
import { DatePicker, Form, Select } from 'antd';
import { WeatherStatus } from '../../../../untils/constant';


const { Option } = Select;
interface Props {
  onChange: (value: any) => void;
}

const Filter = (props: Props) => {
  const { onChange } = props;
  const [form] = Form.useForm();

  const weatherStatus = useMemo(() => Object.keys(WeatherStatus)
  // render options member status
  .map((item: any, index) => (
    { key: index, name: item }
))
, []);

  const handleValuesChange = useCallback((_: any, formValues: any) => {
    const { date, status, time } = formValues;
    let weekDay = undefined;
    let timeStamp = undefined;
    if(formValues) {
      if(date) {
        weekDay = new Date(date.$d).getDay()
      }
      if (time) {
        timeStamp = time.$H *3600 + time.$m * 60;
      }
      onChange({weekDay, timeStamp, status})
    }
  }, [onChange]);


  return (
    <div className={styles.contentWrapper}>
      <div className={styles.titleHead} >Weather today</div>
        <Form
          form={form}
          onValuesChange={handleValuesChange}
          initialValues={
            {
              status: 'All status'
            }
          }
        >
        <div className={styles.optionsWrapper}>
          <Form.Item name='date'>
            <DatePicker
              className={styles.datePicker}
            />
          </Form.Item>
          <Form.Item name='time'>
            <DatePicker
              className={styles.timePicker}
              picker={'time'}
              format= 'HH:mm'
            />
          </Form.Item>
          <Form.Item name='status'>
            <Select
              className={styles.selectStatus}
              placeholder={'Weather status'}
            >
              <Option key='all' value={'All status'}> All Status</Option>
              {weatherStatus?.map((status: any) => (
                <Option key={status.key} value={status.name}>{status.name}</Option>
              ))}
            </Select>
          </Form.Item>
        </div>
        </Form>
    </div>
  );
}

export default Filter