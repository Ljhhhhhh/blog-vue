import router from '@/router.js';
import store from '@/store';
import cookie from 'js-cookie';

router.beforeEach((to, from, next) => {
  // TODO:: 如果token已经超过3天，就删除cookie.token
  const token = store.state.token || cookie.get('token');
  if (to.name === 'login') {
    if (token) {
      next({name: 'home'})
    }
    next();
  } else if (!token && to.name !== 'login') {
    next({ name: 'login' });
  } else {
    next()
  }
});
