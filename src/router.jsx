// import HomePage from "./page/user/homePage";
import MasterLayout from "./page/user/theme/masterLayout";
import { Routes, Route } from "react-router-dom";
import { ROUTERS } from "./utils/router";
import LoginPage from "./page/user/loginPage";
import loadable from "@loadable/component";
import ProductPage from "./page/user/productPage";
import DetailProduct from "./page/user/detailProduct";
import AboutPage from "./page/user/aboutPage";
import ContactPage from "./page/user/contactPage";
import NewPage from "./page/user/newPage";
import CartPage from "./page/user/cartPage";
import ProfilePage from "./page/user/profilePage";

const HomePage = loadable(() => import("./page/user/homePage"), {
  fallback: <div>Đang tải trang...</div>,
});

const renderUserRouter = () => {
  const userRouter = [
    {
      path: ROUTERS.USER.HOME,
      component: <HomePage />,
    },
    {
      path: ROUTERS.USER.LOGINPAGE,
      component: <LoginPage />,
    },
    {
      path: ROUTERS.USER.PRODUCTPAGE,
      component: <ProductPage />,
    },
    {
      path: `${ROUTERS.USER.DETAILPRODUCT}/:id`,
      component: <DetailProduct />,
    },
    {
      path: `${ROUTERS.USER.ABOUTPAGE}`,
      component: <AboutPage />,
    },
    {
      path: `${ROUTERS.USER.CONTACTPAGE}`,
      component: <ContactPage />,
    },
    {
      path: `${ROUTERS.USER.NEWS}`,
      component: <NewPage />,
    },
    {
      path: `${ROUTERS.USER.CART}`,
      component: <CartPage />,
    },
    {
      path: `${ROUTERS.USER.PROFILE}`,
      component: <ProfilePage />,
    },
  ];
  return (
    <MasterLayout>
      <Routes>
        {userRouter.map((item, key) => {
          return (
            <Route key={key} path={item.path} element={item.component}></Route>
          );
        })}
      </Routes>
    </MasterLayout>
  );
};

const RouterCustom = () => {
  return renderUserRouter();
};

export default RouterCustom;
