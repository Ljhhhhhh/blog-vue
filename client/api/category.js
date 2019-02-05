import request from '@@/utils/request'

export function getCategorys() {
  return request({
    url: '/categorys/',
    method: 'get',
  });
}

export function getArticleByCategorys() {
  return request({
    url: '/articlesByCategory/',
    method: 'get',
  });
}
