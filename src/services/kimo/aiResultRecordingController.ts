// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /aiResultRecording/add */
export async function addAiResultRecording(
  body: API.AIResultRecordingAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseLong>('/aiResultRecording/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /aiResultRecording/delete */
export async function deleteAiResultRecording(
  body: API.DeleteRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean>('/aiResultRecording/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /aiResultRecording/list/aiRole */
export async function listAiResultRecordingByPage(
  body: API.AIRoleQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageAIResultRecording>('/aiResultRecording/list/aiRole', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
