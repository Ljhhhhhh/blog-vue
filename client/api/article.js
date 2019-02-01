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

export function getArticleDetail(id) {
  return request({
    url: `/articles/${id}`,
    method: 'post'
  })
}
