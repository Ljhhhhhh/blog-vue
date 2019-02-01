import request from '@@/utils/request'

export function getCategorys() {
  return request({
    url: '/categorys/',
    method: 'get',
  });
}
