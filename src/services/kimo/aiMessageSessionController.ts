// @ts-ignore
/* eslint-disable */
import { getHeaders } from '@/global';
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /session/add */
export async function addAiMessageSession(
  body: API.AIMessageSessionAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseLong>('/session/add', {
    method: 'POST',
    headers: getHeaders(),
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /session/delete */
export async function deleteAiMessageSession(
  body: API.DeleteRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean>('/session/delete', {
    method: 'POST',
    headers: getHeaders(),
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /session/list/aiRole */
export async function listAiMessageSessionByPage(
  body: API.AIMessageSessionQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageAIMessageSession>('/session/list/aiRole', {
    method: 'POST',
    headers: getHeaders(),
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /session/update */
export async function updateAiMessageSession(
  body: API.AIMessageSessionUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean>('/session/update', {
    method: 'POST',
    headers: getHeaders(),
    data: body,
    ...(options || {}),
  });
}
