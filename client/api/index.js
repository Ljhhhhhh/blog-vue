import request from '@@/utils/request'

export function getArticles(page, size = 10) {
  return request({
    url: '/articles/',
    method: 'post',
    data: {
      page,
      size
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
