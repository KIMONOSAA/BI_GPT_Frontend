// @ts-ignore
/* eslint-disable */
import { getHeaders } from '@/global';
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /aiMasterData/add */
export async function addAiMasterData(
  body: API.AIMasterDataAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseLong>('/aiMasterData/add', {
    method: 'POST',
    headers: getHeaders(),
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /aiMasterData/delete */
export async function deleteAiMasterData(
  body: API.DeleteRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean>('/aiMasterData/delete', {
    method: 'POST',
    headers: getHeaders(),
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /aiMasterData/list/aiRole */
export async function listAiMasterDataByPage(
  body: API.AIMasterDataQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageAIMasterData>('/aiMasterData/list/aiRole', {
    method: 'POST',
    headers: getHeaders(),
    data: body,
    ...(options || {}),
  });
}
