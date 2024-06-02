import {
  genChartByAiRabbitMq
} from '@/services/kimo/chartController';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Card, Form, Select, Space, Upload, message } from 'antd';
import { useForm } from 'antd/es/form/Form';
import TextArea from 'antd/lib/input/TextArea';
import React, {  useState } from 'react';

const AddChartAsync: React.FC = () => {
  const [form] = useForm();
  const [submiting,setSubmiting] =  useState<boolean>(false)
  const onFinish = async (values: any) => {
    if(submiting){
      return;
    }
    setSubmiting(true)

    const params = {
      ...values,
      file: undefined,
    };

    try {
      console.log(params,values.file)
      console.log(values.file.file.originFileObj)
      // 假设values.file.file.originFileObj是一个有效的File对象  
      const formData = new FormData();  
      formData.append('file', values.file.file.originFileObj); // 文件部分名为"file"
      const result = await genChartByAiRabbitMq(params, formData);
      if(!result?.data){
        message.error('分析失败')
        
      }else{
        message.success('分析任务提交成功，稍后请在我的图表页面查看')
        form.resetFields();
        
      }
    } catch (error) {
      message.error('分析失败,' + error.message);
    }
    setSubmiting(false)
    console.log('Received values of form: ', values);
  }; 
  return (
    <div className="add-chart-async">
      <Card title="智能分析">
              <Form form={form} name="validate_other" labelAlign='left' labelCol={{ span: 4 }} wrapperCol={{ span: 16 }} onFinish={onFinish} initialValues={{}}>
                <Form.Item
                  name="goal"
                  label="分析目标"
                  rules={[{ required: true, message: '请输入分析目标' }]}
                >
                  <TextArea placeholder="请输入你的分析需求,比如：分析网络用户的增长情况" />
                </Form.Item>
                <Form.Item name="name" label="图表名称">
                  <TextArea placeholder="请输入图表名称" />
                </Form.Item>

                <Form.Item name="chartType" label="图表类型">
                  <Select
                    options={[
                      { value: '折线图', label: '折线图' },
                      { value: '柱状图', label: '柱状图' },
                      { value: '堆叠图', label: '堆叠图' },
                      { value: '雷达图', label: '雷达图' },
                      { value: '饼图', label: '饼图' },
                    ]}
                  />
                </Form.Item>

                <Form.Item name="file" label="原始数据">
                  <Upload name="file" maxCount={1}>
                    <Button icon={<UploadOutlined />}>上传 CSV 文件</Button>
                  </Upload>
                </Form.Item>

                <Form.Item wrapperCol={{ span: 12, offset: 4 }}>
                  <Space>
                    <Button type="primary" htmlType="submit" loading={submiting} disabled={submiting}>
                      提交
                    </Button>
                    <Button htmlType="reset">重置</Button>
                  </Space>
                </Form.Item>
              </Form>
          </Card>
    </div>
  );
};
export default AddChartAsync;

















