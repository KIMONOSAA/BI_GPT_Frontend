// @ts-ignore
/* eslint-disable */
import { getHeaders } from '@/global';
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /aiRole/add */
export async function addAiRole(body: API.AIRoleAddRequest, options?: { [key: string]: any }) {
  return request<API.BaseResponseLong>('/aiRole/add', {
    method: 'POST',
    headers: getHeaders(),
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /aiRole/check */
export async function checkAiRole(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.checkAIRoleParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean>('/aiRole/check', {
    method: 'GET',
    headers: getHeaders(),
    params: {
      ...params,
      checkRequest: undefined,
      ...params['checkRequest'],
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 DELETE /aiRole/delete */
export async function deleteAiRole(body: API.DeleteRequest, options?: { [key: string]: any }) {
  return request<API.BaseResponseBoolean>('/aiRole/delete', {
    method: 'DELETE',
    headers: getHeaders(),
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /aiRole/list/aiRole */
export async function listAiRoleByPage(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listAiRoleByPageParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageAIRole>('/aiRole/list/aiRole', {
    method: 'GET',
    headers: getHeaders(),
    params: {
      ...params,
      aiRoleQueryRequest: undefined,
      ...params['aiRoleQueryRequest'],
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /aiRole/reject */
export async function rejectAiRole(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.rejectAIRoleParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean>('/aiRole/reject', {
    method: 'GET',
    headers: getHeaders(),
    params: {
      ...params,
      checkRequest: undefined,
      ...params['checkRequest'],
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 PUT /aiRole/update */
export async function updateAiRole(
  body: API.AIRoleUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean>('/aiRole/update', {
    method: 'PUT',
    headers: getHeaders(),
    data: body,
    ...(options || {}),
  });
}
