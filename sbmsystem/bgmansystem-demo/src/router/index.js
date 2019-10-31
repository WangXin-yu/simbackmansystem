import Vue from "vue";
import VueRouter from "vue-router";
import BgFrame from "../views/BgFrame"
Vue.use(VueRouter);

const routes = [
  {
    path: "/bg-frame",
    name: "bg-frame",
    component: () =>
      import("../views/BgFrame.vue")
  },
  {
    path: "/home-page",
    component: BgFrame,
    children:[
      {
        path:"",
        name:"home-page",
        component: ()=>import("../components/HomePage/HomePage.vue")
      }
    ]
  },
  {
    path: "/paging-form",
    component: BgFrame,
    children:[
      {
        path:"",
        name:"paging-form",
        component: ()=>import("../components/PagingForm/PagingForm.vue")
      }
    ]
  },
  {
    path: "/tab-page",
    component: BgFrame,
    children:[
      {
        path:"",
        name:"tab-page",
        component: ()=>import("../components/TabPage/TabPage.vue")
      }
    ]
  },
  {
    path: "/picture-upload",
    component: BgFrame,
    children:[
      {
        path:"",
        name:"picture-upload",
        component: ()=>import("../components/PictureUpload/PictureUpload.vue")
      }
    ]
  },
  {
    path: "/picture-upload",
    component: BgFrame,
    children:[
      {
        path:"",
        name:"picture-upload",
        component: ()=>import("../components/PictureUpload/PictureUpload.vue")
      }
    ]
  },
  {
    path: "/published",
    component: BgFrame,
    children:[
      {
        path:"",
        name:"published",
        component: ()=>import("../components/Published/Published.vue")
      }
    ]
  },
  {
    path: "/publish-article",
    component: BgFrame,
    children:[
      {
        path:"",
        name:"publish-article",
        component: ()=>import("../components/PublishArticle/PublishArticle.vue")
      }
    ]
  },
  {
    path: "/statistics",
    component: BgFrame,
    children:[
      {
        path:"",
        name:"statistics",
        component: ()=>import("../components/Statistics/Statistics.vue")
      }
    ]
  },
  {
    path: "/export-excel",
    component: BgFrame,
    children:[
      {
        path:"",
        name:"export-excel",
        component: ()=>import("../components/ExportExcel/ExportExcel.vue")
      }
    ]
  },
  {
    path: "/test-paging",
    component: BgFrame,
    children:[
      {
        path:"",
        name:"test-paging",
        component: ()=>import("../components/PagingForm/testPaging.vue")
      }
    ]
  },
  {
    path:"/published-edit",
    component: BgFrame,
    children:[
      {
        path:"",
        name:"published-edit",
        component: ()=>import("../components/PublishedEdit/PublishedEdit.vue")
      }
    ]
  },
  {
    path:"/check",
    component: BgFrame,
    children:[
      {
        path:"",
        name:"check",
        component: ()=>import("../components/Check/Check.vue")
      }
    ]
  },
  {
    path:"/exit",
    component: BgFrame,
    children:[
      {
        path:"",
        name:"exit",
        component: ()=>import("../components/Exit/Exit.vue")
      }
    ]
  },
  {
    path: "/",
    name: "login",
    component: ()=>import("../components/Login/Login.vue")
  },
  {
    path: "/register",
    name: "register",
    component: ()=>import("../components/Register/Register.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});
// let user = this.$store.state.userInfo.username;
router.beforeEach((to, from, next) => {
  let user = localStorage.getItem('username')
  // let user = this.$store.state.userInfo.username;
  if (to.path === '/' || to.path === '/register') {
    next()
  } else {
    user? next() : next('/')
  }
})
export default router;
