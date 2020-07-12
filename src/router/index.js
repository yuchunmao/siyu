import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const login = r => require.ensure([], () => r(require('@/page/login')), 'login');
const manage = r => require.ensure([], () => r(require('@/page/manage')), 'manage');
const home = r => require.ensure([], () => r(require('@/page/home')), 'home');
const userList = r => require.ensure([], () => r(require('@/page/userList')), 'userList');
const upper = r => require.ensure([], () => r(require('@/page/upper')), 'upper');
const onShelf = r => require.ensure([], () => r(require('@/page/onShelf')), 'onShelf');
const upShelf = r => require.ensure([], () => r(require('@/page/upShelf')), 'upShelf');
const goodsClass = r => require.ensure([], () => r(require('@/page/goodsClass')), 'goodsClass');
const orderDelivering = r => require.ensure([], () => r(require('@/page/orderDelivering')), 'orderDelivering');
const orderCompleted = r => require.ensure([], () => r(require('@/page/orderCompleted')), 'orderCompleted');
const staff = r => require.ensure([], () => r(require('@/page/staff')), 'staff');
const orderDetails = r => require.ensure([], () => r(require('@/page/orderDetails')), 'orderDetails');


const routes = [
	{
		path: '/',
		component: login
	},
	{
		path: '/manage',
		component: manage,
		name: '',
		children: [{
			path: '/home',
			component: home,
			meta: [],
		},{
            path: '/userList',
            component: userList,
            meta: ['用户列表'],
        },{
            path: '/upper',
            component: upper,
            meta: ['商品管理', '发布新品'],
        },{
            path: '/onShelf',
            component: onShelf,
            meta: ['商品管理', '已上架商品'],
        },{
            path: '/upShelf',
            component: upShelf,
            meta: ['商品管理', '已下架商品'],
        },{
            path: '/goodsClass',
            component: goodsClass,
            meta: ['商品管理', '商品分类'],
        },{
            path: '/orderDelivering',
            component: orderDelivering,
            meta: ['订单管理', '待送货订单'],
        },{
            path: '/orderCompleted',
            component: orderCompleted,
            meta: ['订单管理', '已完成订单'],
        },{
            path: '/staff',
            component: staff,
            meta: ['员工管理', '员工管理'],
        },{
            path: '/orderDetails',
            component: orderDetails,
            meta: ['订单管理', '订单详情'],
        }]
	}
]
base: '/VueTest';
export default new Router({
	routes,
	strict: process.env.NODE_ENV !== 'production',
})
