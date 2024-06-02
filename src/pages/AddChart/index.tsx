import {
  genChartByAiUsingPost,
  listChartUserByPageUsingPost,
} from '@/services/kimo/chartController';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Card, Col, Divider, Form, Row, Select, Space, Spin, Upload, message } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import React, { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';

const AddChart: React.FC = () => {
  const [chart,setChart] =  useState<API.BiResponse>()
  const [option,setOption] =  useState<any>()
  const [submiting,setSubmiting] =  useState<boolean>(false)
  const onFinish = async (values: any) => {
    if(submiting){
      return;
    }
    setSubmiting(true)
    setOption(undefined)
    setChart(undefined)
    const params = {
      ...values,
      file: undefined,
    };

    try {
      console.log(params,values.file)
      const result = await genChartByAiUsingPost(params, {}, values.file.file.originFileObj);
      if(!result?.data){
        message.error('分析失败')
        
      }else{
        message.success('分析成功')
        const chartOption = JSON.parse(result.data.genChart ?? '')
        if(!chartOption){
          throw new Error("图表代码错误")
        }else{
          setChart(result.data)
          setOption(chartOption)
          console.log(result.data)
          console.log(chartOption)
        }
        
      }
    } catch (error) {
      message.error('分析失败,' + error.message);
    }
    setSubmiting(false)
    console.log('Received values of form: ', values);
  }; 
  return (
    <div className="add-chart">
      <Row gutter={24}>
        <Col span={12}>
          <Card title="智能分析">
              <Form name="validate_other" labelAlign='left' labelCol={{ span: 4 }} wrapperCol={{ span: 16 }} onFinish={onFinish} initialValues={{}}>
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
                      { value: '树状图', label: '树状图' },
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

        </Col>
        <Col span={12}>
          <Card title="分析结论">
            <div>
                {chart?.genResult ?? <div>请先在左侧进行提交</div>}
                <Spin spinning={submiting}></Spin>
            </div>
          </Card>
          <Divider />
          <Card title="可视化图表">
              <div>
              {
                option ? (
                  <ReactECharts option={option} />
                ) :  <div>请先在左侧进行提交</div>
              }
              <Spin spinning={submiting}></Spin>
              </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};
export default AddChart;

















