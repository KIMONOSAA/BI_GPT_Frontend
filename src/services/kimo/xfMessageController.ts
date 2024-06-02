// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 GET /xfModel/test */
export async function test(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.testParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponse>('/xfModel/test', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
