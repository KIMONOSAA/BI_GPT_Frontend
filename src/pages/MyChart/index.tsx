
import { Avatar, Button, Card, List, message, Result } from 'antd';
import React, { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import { getInitialState } from '@/app';
import { useModel } from '@@/exports';
import { Input } from 'antd';
import { listMyChartByPage } from '@/services/kimo/chartController';

const { Search } = Input;
const MyChartPage: React.FC = () => {

  const initSearchParams = {
    current : 1,
    pageSize: 4,
    sortField: 'createTime',
    sortOrder: 'desc'
  }
  const { initialState, setInitialState } = useModel('@@initialState');
  const { currentUser } = initialState ?? {}
  const [searchParams,setSearchParams] = useState<API.ChartQueryRequest>({...initSearchParams})
  const [chartList,setChartList] = useState<API.Chart[]>();
  const [total,setTotal] = useState<number>(0);
  const [loading,setLoading] = useState<boolean>(true);

  const loadData = async() => {
    setLoading(true)
    try {
      const res = await listMyChartByPage(searchParams)
      if(res.data){
        if(res.data.records){
          res.data.records.forEach((data) => {
            if(data.status === 'succeed'){
              const chartOption = JSON.parse(data.genChat ?? '{}')
              chartOption.title = undefined;
              data.genChat = JSON.stringify(chartOption);
            }
              
          })
        }
        setChartList(res.data.records ?? [])
        setTotal(res.data.total ?? 0)
        setLoading(false)
        
      }else{
        message.error("获取图表失败")
      }
    } catch (error) {
      message.error("获取图表失败" + error.message)
    }
    
  }

  useEffect(() => {
    loadData()
  },[searchParams])
  
  return (
    <div className="my-chart-page">
      <div>
        <Search placeholder="请输入图表名称" enterButton loading={loading} onSearch={(value) => {
            setSearchParams({
              ...initSearchParams,
              name: value
            })
        }}/>
      </div>
      <div className='margin-16'></div>
      <List 
          
          grid={{ gutter: 16, 
            xs: 1,
            sm: 1,
            md: 1,
            lg: 2,
            xl: 2,
            xxl: 2, }}
          pagination={{
            onChange: (page,pageSize) => {
              setSearchParams({
                ...searchParams,
                current : page,
                pageSize: pageSize
              })
            },
            current: searchParams.current,
            pageSize: searchParams.pageSize,
            total:total
          }}
          loading={loading}
          dataSource={chartList}
          renderItem={(item) => (
            
              <List.Item
                key={item.id}
              
              >
                <Card style={{marginBottom : '30px'}}>
                  <List.Item.Meta
                    avatar={<Avatar src={currentUser && currentUser.userAvatar} />}
                    title={item.name}
                    description={item.chartType ? ('图表类型' + item.chartType) : ''}
                  />
                  <>
                    {
                      item.status === 'succeed' && (
                        <>
                          <div style={{marginBottom: 16}}></div>
                          <p>{'分析目标' + item.goal}</p>
                          <div style={{marginBottom: 16}}></div>
                          <ReactECharts option={JSON.parse(item.genChat ?? '{}')} />
                        </>
                      )
                    }
                    {
                      item.status === 'wait' && (
                        <>
                          <Result
                            status="warning"
                            title="图表生成待执行"
                            subTitle={item.execMessage ?? "当前图表执行队列繁忙，请耐心等待"}
                            
                          ></Result>
                        </>
                      )
                    }
                    {
                      item.status === 'running' && (
                        <>
                          <Result
                            status="info"
                            title="图表生成执行中"
                            subTitle={item.execMessage}
                            
                          ></Result>
                        </>
                      )
                    }
                    {
                      item.status === 'failed' && (
                        <>
                          <Result
                            status="error"
                            title="图表生成失败"
                            subTitle={item.execMessage}
                            
                          ></Result>
                        </>
                      )
                    }
                  </>
                  
                </Card>
              </List.Item>
              
          )}
        />
        总数：{total}
    </div>
  );
};
export default MyChartPage;

















