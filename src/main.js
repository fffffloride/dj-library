// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import Index from './components/index/index'
import Library from './components/library/library'
import BorrowMemory from './components/library/borrow-memory/borrow-memory'
import HotBooks from './components/library/hot-books/hot-books'
import NewBooks from './components/library/new-books/new-books'
import AllBooks from './components/library/all-books/all-books'
import UserInforModif from './components/library/user-infor-modif/user-infor-modif'
import BookInforModif from './components/library/book-infor-modif/book-infor-modif'
import BookReturn from './components/library/book-return/book-return'
import BookGrounding from './components/library/book-grounding/book-grounding'
import UserManage from './components/library/user-manage/user-manage'
import BookTable from './components/library/book-table/book-table'


Vue.config.productionTip = false




Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(Vuex)

// Vue.http.options.emulateJSON = true;

Vue.directive("focus",{
  inserted:function(el,binging){
    el.focus();
  }
})

const routes = [
  {path:'/',redirect:'/login'},
  {path:'/login',component:Index},
  {path:'/library',component:Library,children:[
    {path:'/',redirect:'/library/all'},
    {path:'memory',component:BorrowMemory},
    {path:'hot',component:HotBooks},
    {path:'new',component:NewBooks},
    {path:'all',component:AllBooks},
    {path:'userinfor',component:UserInforModif},
    {path:'bookinfor',component:BookInforModif},
    {path:'bookreturn',component:BookReturn},
    {path:'bookgrounding',component:BookGrounding},
    {path:'usermanage',component:UserManage},
  ]},
]

const router = new VueRouter({
  routes,
  linkActiveClass:'active',
})
/* eslint-disable no-new */
new Vue({
  router,
  el: '#app',
  components: { App },
  template: '<App/>'
})


