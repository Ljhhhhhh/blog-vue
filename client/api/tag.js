import request from '@@/utils/request'

export function getArticlesByTag(tag) {
  return request({
    url: '/articlesByTag/',
    method: 'post',
    data: {
      tag,
    }
  });
}

export function getTags() {
  return request({
    url: '/tags/',
    method: 'get',
  });
}
