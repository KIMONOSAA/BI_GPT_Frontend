declare namespace API {
  type addParams = {
    name: string;
  };

  type AIMasterData = {
    id?: number;
    aiTitle?: string;
    aiBody?: string;
    aiResult?: string;
    aiMessageSessionId?: number;
    userTitle?: string;
    userBody?: string;
    userId?: number;
    createTime?: string;
    updateTime?: string;
    isDelete?: number;
  };

  type AIMasterDataAddRequest = {
    aiMessageSessionId?: number;
    aiTitle?: string;
    aiBody?: string;
    aiResult?: string;
    userTitle?: string;
    userBody?: string;
  };

  type AIMasterDataQueryRequest = {
    current?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
    createTime?: string;
    updateTime?: string;
    aiMessageId?: number;
  };

  type AIMessageSession = {
    id?: number;
    title?: string;
    createTime?: string;
    updateTime?: string;
    isDelete?: number;
    userId?: number;
  };

  type AIMessageSessionAddRequest = {
    title?: string;
  };

  type AIMessageSessionQueryRequest = {
    current?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
    title?: string;
    createTime?: string;
    updateTime?: string;
  };

  type AIMessageSessionUpdateRequest = {
    id?: number;
    title?: string;
    userId?: number;
  };

  type AIResultRecording = {
    id?: number;
    aiRoleId?: number;
    aiTitle?: string;
    aiBody?: string;
    aiResult?: string;
    userTitle?: string;
    userBody?: string;
    userId?: number;
    createTime?: string;
    updateTime?: string;
    isDelete?: number;
  };

  type AIResultRecordingAddRequest = {
    createTime?: string;
    updateTime?: string;
    status?: boolean;
    airole?: string;
    aidescription?: string;
    aimax_Tokens?: number;
  };

  type AIRole = {
    id?: number;
    userId?: number;
    createTime?: string;
    updateTime?: string;
    isDelete?: number;
    status?: number;
    airoleReview?: number;
    airole?: string;
    aidescription?: string;
    aimax_Tokens?: number;
  };

  type AIRoleAddRequest = {
    status?: number;
    airole?: string;
    aidescription?: string;
    aimax_Tokens?: number;
  };

  type AIRoleQueryRequest = {
    current?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
    id?: number;
    createTime?: string;
    updateTime?: string;
    isDelete?: number;
    userId?: number;
    status?: number;
    searchText?: string;
    airole?: string;
    aidescription?: string;
    aimax_Tokens?: string;
  };

  type AIRoleUpdateRequest = {
    id?: number;
    status?: number;
    airole?: string;
    aidescription?: string;
    aimax_Tokens?: number;
  };

  type AuthentianResponse = {
    accessToken?: string;
    refershToken?: string;
  };

  type BaseResponse = {
    code?: number;
    data?: Record<string, any>;
    message?: string;
  };

  type BaseResponseAuthentianResponse = {
    code?: number;
    data?: AuthentianResponse;
    message?: string;
  };

  type BaseResponseBiResponse = {
    code?: number;
    data?: BiResponse;
    message?: string;
  };

  type BaseResponseBoolean = {
    code?: number;
    data?: boolean;
    message?: string;
  };

  type BaseResponseChart = {
    code?: number;
    data?: Chart;
    message?: string;
  };

  type BaseResponseLoginUserVO = {
    code?: number;
    data?: LoginUserVO;
    message?: string;
  };

  type BaseResponseLong = {
    code?: number;
    data?: API.AIMasterData;
    message?: string;
  };

  type BaseResponsePageAIMasterData = {
    code?: number;
    data?: PageAIMasterData;
    message?: string;
  };

  type BaseResponsePageAIMessageSession = {
    code?: number;
    data?: PageAIMessageSession;
    message?: string;
  };

  type BaseResponsePageAIResultRecording = {
    code?: number;
    data?: PageAIResultRecording;
    message?: string;
  };

  type BaseResponsePageAIRole = {
    code?: number;
    data?: PageAIRole;
    message?: string;
  };

  type BaseResponsePageChart = {
    code?: number;
    data?: PageChart;
    message?: string;
  };

  type BaseResponsePageUser = {
    code?: number;
    data?: PageUser;
    message?: string;
  };

  type BaseResponsePageUserVO = {
    code?: number;
    data?: PageUserVO;
    message?: string;
  };

  type BaseResponseString = {
    code?: number;
    data?: string;
    message?: string;
  };

  type BaseResponseUser = {
    code?: number;
    data?: User;
    message?: string;
  };

  type BaseResponseUserVO = {
    code?: number;
    data?: UserVO;
    message?: string;
  };

  type BiResponse = {
    genChart?: string;
    genResult?: string;
    chartId?: number;
  };

  type Chart = {
    id?: number;
    name?: string;
    goal?: string;
    chartData?: string;
    chartType?: string;
    genChat?: string;
    genResult?: string;
    status?: string;
    execMessage?: string;
    userId?: number;
    createTime?: string;
    updateTime?: string;
    isDelete?: number;
  };

  type ChartAddRequest = {
    name?: string;
    goal?: string;
    chartData?: string;
    chartType?: string;
  };

  type ChartEditRequest = {
    id?: number;
    name?: string;
    goal?: string;
    chartData?: string;
    chartType?: string;
  };

  type ChartQueryRequest = {
    current?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
    id?: number;
    name?: string;
    goal?: string;
    chartType?: string;
    userId?: number;
  };

  type ChartUpdateRequest = {
    id?: number;
    name?: string;
    goal?: string;
    chartData?: string;
    chartType?: string;
    genChat?: string;
    genResult?: string;
    createTime?: string;
    updateTime?: string;
    isDelete?: number;
  };

  type checkAIRoleParams = {
    checkRequest: CheckRequest;
  };

  type CheckRequest = {
    id?: number;
  };

  type DeleteRequest = {
    id?: number;
  };

  type genChartByAIRabbitMQParams = {
    genChartByAI: GenChartyByAIRequest;
  };

  type GenChartyByAIRequest = {
    name?: string;
    goal?: string;
    chartType?: string;
  };

  type getChartByIdParams = {
    id: number;
  };

  type getUserByIdParams = {
    id: number;
  };

  type getUserVOByIdParams = {
    id: number;
  };

  type GrantedAuthority = {
    authority?: string;
  };

  type listAiRoleByPageParams = {
    aiRoleQueryRequest: AIRoleQueryRequest;
  };

  type LoginUserVO = {
    id?: number;
    userAvatar?: string;
    userAccount?: string;
    createTime?: string;
    updateTime?: string;
  };

  type OrderItem = {
    column?: string;
    asc?: boolean;
  };

  type PageAIMasterData = {
    records?: AIMasterData[];
    total?: number;
    size?: number;
    current?: number;
    orders?: OrderItem[];
    optimizeCountSql?: PageAIMasterData;
    searchCount?: PageAIMasterData;
    optimizeJoinOfCountSql?: boolean;
    maxLimit?: number;
    countId?: string;
    pages?: number;
  };

  type PageAIMessageSession = {
    records?: AIMessageSession[];
    total?: number;
    size?: number;
    current?: number;
    orders?: OrderItem[];
    optimizeCountSql?: PageAIMessageSession;
    searchCount?: PageAIMessageSession;
    optimizeJoinOfCountSql?: boolean;
    maxLimit?: number;
    countId?: string;
    pages?: number;
  };

  type PageAIResultRecording = {
    records?: AIResultRecording[];
    total?: number;
    size?: number;
    current?: number;
    orders?: OrderItem[];
    optimizeCountSql?: PageAIResultRecording;
    searchCount?: PageAIResultRecording;
    optimizeJoinOfCountSql?: boolean;
    maxLimit?: number;
    countId?: string;
    pages?: number;
  };

  type PageAIRole = {
    records?: AIRole[];
    total?: number;
    size?: number;
    current?: number;
    orders?: OrderItem[];
    optimizeCountSql?: PageAIRole;
    searchCount?: PageAIRole;
    optimizeJoinOfCountSql?: boolean;
    maxLimit?: number;
    countId?: string;
    pages?: number;
  };

  type PageChart = {
    records?: Chart[];
    total?: number;
    size?: number;
    current?: number;
    orders?: OrderItem[];
    optimizeCountSql?: PageChart;
    searchCount?: PageChart;
    optimizeJoinOfCountSql?: boolean;
    maxLimit?: number;
    countId?: string;
    pages?: number;
  };

  type PageUser = {
    records?: User[];
    total?: number;
    size?: number;
    current?: number;
    orders?: OrderItem[];
    optimizeCountSql?: PageUser;
    searchCount?: PageUser;
    optimizeJoinOfCountSql?: boolean;
    maxLimit?: number;
    countId?: string;
    pages?: number;
  };

  type PageUserVO = {
    records?: UserVO[];
    total?: number;
    size?: number;
    current?: number;
    orders?: OrderItem[];
    optimizeCountSql?: PageUserVO;
    searchCount?: PageUserVO;
    optimizeJoinOfCountSql?: boolean;
    maxLimit?: number;
    countId?: string;
    pages?: number;
  };

  type rejectAIRoleParams = {
    checkRequest: CheckRequest;
  };

  type testParams = {
    uid: string;
    text: string;
  };

  type User = {
    id?: number;
    userAccount?: string;
    email?: string;
    userPassword?: string;
    userName?: string;
    userAvatar?: string;
    userRole?: 'USER' | 'ADMIN' | 'MANAGER' | 'USERVIP';
    createTime?: string;
    updateTime?: string;
    isDelete?: number;
    isEnable?: number;
    accountNonLocked?: boolean;
    accountNonExpired?: boolean;
    credentialsNonExpired?: boolean;
    enabled?: boolean;
    password?: string;
    username?: string;
    authorities?: GrantedAuthority[];
  };

  type UserAddRequest = {
    userName?: string;
    userAccount?: string;
    userAvatar?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    userRole?: string;
  };

  type UserAuthenticationRequest = {
    email?: string;
    password?: string;
  };

  type UserEmailVerificationRequest = {
    userId?: string;
    code?: string;
  };

  type UserPublishEventRequest = {
    id?: number;
  };

  type UserQueryRequest = {
    current?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
    id?: number;
    unionId?: string;
    mpOpenId?: string;
    userName?: string;
    userProfile?: string;
    userRole?: string;
  };

  type UserUpdateMyRequest = {
    userName?: string;
    userAvatar?: string;
    userProfile?: string;
  };

  type UserUpdateRequest = {
    id?: number;
    userName?: string;
    userAvatar?: string;
    userProfile?: string;
    userRole?: string;
  };

  type UserVO = {
    id?: number;
    userAccount?: string;
    userAvatar?: string;
    userRole?: string;
    createTime?: string;
  };
}
