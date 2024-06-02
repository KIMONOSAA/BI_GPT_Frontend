
import { Avatar, Breadcrumb, Button, Card, Flex, Layout, List, Menu, MenuProps, message, Result, theme } from 'antd';
import React, { useEffect, useState } from 'react';
import {  useModel } from '@@/exports';
import { Input } from 'antd';
import { Skeleton } from 'antd';
import Sider from 'antd/es/layout/Sider';
import VirtualList from 'rc-virtual-list';
import { listAiMessageSessionByPage } from '@/services/kimo/aiMessageSessionController';
import { addAiMasterData, listAiMasterDataByPage } from '@/services/kimo/aiMasterDataController';
import TextArea from 'antd/es/input/TextArea';
import { CaretRightOutlined, PoweroffOutlined } from '@ant-design/icons';
import ReactMarkdown from 'react-markdown';
interface UserItem {
  email: string;
  gender: string;
  name: {
    first: string;
    last: string;
    title: string;
  };
  nat: string;
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
}
const ContainerHeight = 1000;
const Home: React.FC = () => {
  const initSearchParams = {
    current : 1,
    pageSize: 4,
    sortField: 'createTime',
    sortOrder: 'desc'
  }
  const [pageNumber,setPageNumber] = useState<number>(1)
  const [localeDataId,setLocaleDataId] = useState<number>()
  const [firstSessionId,setFirstSessionId] = useState<number>()
  const [inputData,setInputData] = useState<string>()
  const [testData,setTestData] = useState<string>()
  const { initialState, setInitialState } = useModel('@@initialState');
  const { currentUser } = initialState ?? {}
  const [initPage,setInitPage] = useState<API.AIMessageSessionQueryRequest | API.AIMasterDataQueryRequest>({
    current: 1,
    pageSize: 16,
    sortField: "createTime",
    aiMessageId : 0,
  })
  const [sessionList,setSessionList] = useState<API.AIMessageSession[]>()
  const [sessionMessageList,setSessionMessageList] = useState<API.AIMasterData[]>([])
  const [loadingSession,setLoadingSession] = useState<boolean>(true);
  const [loadingMasterData,setLoadingMasterData] = useState<boolean>(false);
  const [loadingSessionMessage,setLoadingSessionMessage] = useState<boolean>(true);
  const [collapsed, setCollapsed] = useState(false);
  const [inputText,setInputText] = useState<string>()

  const loadItem = async() => {
    setLoadingSession(true)
    try {
      const result = await listAiMessageSessionByPage(initPage)

      if(result.code === 0 && result.data?.records){
        setSessionList([...result.data.records])
        setFirstSessionId(result.data.records[0].id)
        console.log(result.data.records[0].id)
        message.success("获取成功")
      }else{
        message.error("暂无数据")
      }
      setLoadingSession(false)
    } catch (error) {
      setLoadingSession(false)
      message.error("请求地址不存在")
    }  
    
      
  }
  const handleContext = async(id:number | undefined,current? : number) => {
      

      setLocaleDataId(id)
      setFirstSessionId(id)
      // 首先，设置initPage的aiMessageId，如果需要的话，也设置current  
        let updatedInitPage = { ...initPage, aiMessageId: id };  
        if (current) {  
          updatedInitPage = { ...updatedInitPage, current: current };  
        }  
        setInitPage(updatedInitPage);  
        
        console.log(current);  
      setLoadingSessionMessage(true)
      try {
        const result = await listAiMasterDataByPage(updatedInitPage);
        if(result.code === 0 && result.data?.records){
          console.log(result.data.records)
          setSessionMessageList([...sessionMessageList,...result.data.records])
          
          message.success("获取成功")
        }else{
          message.error("暂无数据")
        }
        setLoadingSessionMessage(false)
      } catch (error) {
        setLoadingSessionMessage(false)
        message.error("请求地址不存在")
      }
      
  }

  // aiMessageSessionId?: number;
  //   aiTitle?: string;
  //   aiBody?: string;
  //   aiResult?: string;
  //   userTitle?: string;
  //   userBody?: string;
  const handleSendMessage = async() => {
      const params : API.AIMasterDataAddRequest = {
        aiMessageSessionId : firstSessionId,
        aiTitle : '',
        aiBody: '',
        aiResult : '',
        userTitle: inputData,
        userBody : '',

      } 
      setLoadingMasterData(true)
      try {
        const result  = await addAiMasterData(params);
        if(result.code === 0){
          console.log(result.data)
          setSessionMessageList([...sessionMessageList,result.data])
          setTestData(result.data)
          message.success("获取成功")
        }else{
          message.success("获取失败")
        }
        console.log(result)
        setLoadingMasterData(false)
      } catch (error) {
        message.error("请求地址不存在")
        setLoadingMasterData(false)
      }
      
  }
  
  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInputData(e.target.value)
    console.log('Change:', e.target.value);
  };
  const onScroll = (e: React.UIEvent<HTMLElement, UIEvent>) => {
    // Refer to: https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollHeight#problems_and_solutions
    if (Math.abs(e.currentTarget.scrollHeight - e.currentTarget.scrollTop - ContainerHeight) <= 1) {
      setPageNumber((prevPageNumber) => prevPageNumber + 1); // 先更新 pageNumber  
      // console.log("无限滚动" + firstSessionId + (pageNumber + 1)); // 使用更新后的值  

      // handleContext(firstSessionId,pageNumber)
    }
  };
  useEffect(() => {
    loadItem()
  },[])
  useEffect(() => {
      handleContext(firstSessionId,pageNumber)
  },[pageNumber])

  useEffect(() => {
      console.log(sessionMessageList)
  },[sessionMessageList])

  return (

        <Layout >
          <Sider width={250} style={{height : 'auto'}} trigger={null} collapsible collapsed={collapsed} >

            <Menu
              style={{paddingTop: '28px'}} 
              theme="dark"
              mode="inline"
              defaultSelectedKeys={['0']}
              
            > 
            
              {sessionList?.map((item, index) => ( // 注意这里使用了圆括号来包裹返回的 JSX  
                
                <Menu.Item style={{height: '65px'}} key={index} onClick={() => {console.log(item.id); handleContext(item.id); setPageNumber((prev) => prev = 1 ) ;setInitPage({...initPage,['current'] : 1})}}> {/* 这里可以根据 item 动态设置图标 */}  
                  <div style={{height: '25px'}}>{item.title}</div>
                  <p style={{height: '35px'}}>{item.createTime}</p>  
                </Menu.Item>  
                
              ))}  
            
            </Menu>
          </Sider>
          <Layout>
            <List grid={{
            gutter: 16,
            xs: 1,
            sm: 2,
            md: 4,
            lg: 4,
            xl: 6,
            xxl: 3, 
          }} style={{height: 'auto',overflowY: 'hidden',position: 'relative'}}>
              {sessionMessageList &&
                <VirtualList
                data={sessionMessageList}
                height={ContainerHeight}
                itemHeight={50}
                itemKey="email"
                onScroll={onScroll}
              >
                
                {(item: API.AIMasterData) => (

                    <List.Item key={item.id} style={{display:'flex', justifyContent: 'center',alignItems: 'center'}}>
                        <Card style={{backgroundColor : 'transparent',border: 'none' }}>
                          <List.Item.Meta 
                            avatar={<Avatar src={currentUser.userAvatar} />}
                            title={item.userTitle}
                            style={{marginBottom : '50px',marginTop: '30px'}}
                          />
                          <List.Item.Meta 
                            avatar={<Avatar src={currentUser.userAvatar} />}
                            title={item.aiTitle}
                          />

                            <Card  style={{marginTop: 30,height: 'auto',width : 1000,marginBottom : 50}} >
                              <ReactMarkdown>{item.aiBody}</ReactMarkdown>
                            </Card>

                        </Card>
                        
                      </List.Item>

                )}
                
              </VirtualList>
              }
              <Flex gap="small" align="center" wrap>
                <TextArea
                  showCount
                  maxLength={2000}
                  onChange={onChange}
                  placeholder="disable resize"
                  style={{ height: 120, resize: 'none' ,position: 'fixed',bottom: 0}}
                />
                <Button type="primary" onClick={handleSendMessage}  style={{width : 45,resize: 'none' ,position: 'fixed',bottom: 40,right: 40,zIndex: 100}} icon={<CaretRightOutlined />}  />
              </Flex>
            </List>
          </Layout>
        </Layout>
  );
};
export default Home;

















