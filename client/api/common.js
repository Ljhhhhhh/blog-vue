import request from '@@/utils/request'

export function getCount() {
  return request({
    url: '/getCount/',
    method: 'get',
  });
}
