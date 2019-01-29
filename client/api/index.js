import request from '@@/utils/request'

export function getArticles(page, size = 5) {
  return request({
    url: '/articles/',
    method: 'post',
    data: {
      page,
      size
    }
  });
}

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

export function getCategorys() {
  return request({
    url: '/categorys/',
    method: 'get',
  });
}

export function getCount() {
  return request({
    url: '/getCount/',
    method: 'get',
  });
}

export function getArticleDetail(id) {
  return request({
    url: `/articles/${id}`,
    method: 'post'
  })
}
