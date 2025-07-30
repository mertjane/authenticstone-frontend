import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";

import HomePage from "./pages/HomePage";
import Layout from "./components/Layout";
import CategoryPage from "./pages/CategoryPage";
import { ROUTES } from "./routes/routePaths";

import Faq from "./pages/Faq";
import ContactPageWrapper from "./components/ContactPageWrapper";
import AdhesivePageWrapper from "./components/AdhesivePageWrapper";
import PrivacyPageWrapper from "./components/PrivacyPageWrapper";
import ReturnPolicyWrapper from "./components/ReturnPolicyWrapper";
import TermsPageWrapper from "./components/TermsPageWrapper";
import DeliveryInfoWrapper from "./components/DeliveryInfoWrapper";
import SealingMainWrapper from "./components/SealingMainWrapper";
import InstallationWrapper from "./components/InstallationWrapper";
import AboutUsWrapper from "./components/AboutUsWrapper";
import ReviewsWrapper from "./components/ReviewsWrapper";
import BlogPage from "./pages/BlogPage";

import Dashboard from "./pages/Dashboard";
import Orders from "./pages/Orders";
import Addresses from "./pages/Addresses";
import AccountDetails from "./pages/AccountDetails";
import AuthOrAccount from "./components/ProtectedRoute";
import SingleProduct from "./pages/SingleProduct";
import LostPasswordPage from "./pages/LostPasswordPage";
import Checkout from "./pages/Checkout";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route
          path={ROUTES.HOME}
          element={
            <Layout showHeader={true} showFooter={true}>
              <HomePage />
            </Layout>
          }
        />
        <Route
          path={ROUTES.COLOUR_CATEGORY} // More specific route first
          element={
            <Layout showHeader={true} showFooter={true}>
              <CategoryPage />
            </Layout>
          }
        />
        <Route
          path={ROUTES.ROOM_TYPE_USAGE_CATEGORY} // Add room-type-usage route
          element={
            <Layout showHeader={true} showFooter={true}>
              <CategoryPage />
            </Layout>
          }
        />
        <Route
          path={ROUTES.SLABS_CATEGORY} // Add room-type-usage route
          element={
            <Layout showHeader={true} showFooter={true}>
              <CategoryPage />
            </Layout>
          }
        />
        <Route
          path={ROUTES.CATEGORY} // General route second (least specific)
          element={
            <Layout showHeader={true} showFooter={true}>
              <CategoryPage />
            </Layout>
          }
        />
        <Route
          path={ROUTES.FINISH_CATEGORY}
          element={
            <Layout showHeader={true} showFooter={true}>
              <CategoryPage />
            </Layout>
          }
        />
        <Route
          path={ROUTES.CUSTOM_STONEWORK}
          element={
            <Layout showHeader={true} showFooter={true}>
              <CategoryPage />
            </Layout>
          }
        />
        <Route
          path={ROUTES.DESIGN_PATTERN_COLLECTION}
          element={
            <Layout showHeader={true} showFooter={true}>
              <CategoryPage />
            </Layout>
          }
        />
        <Route
          path={ROUTES.ALL_PRODUCTS}
          element={
            <Layout showHeader={true} showFooter={true}>
              <CategoryPage />
            </Layout>
          }
        />
        <Route
          path={ROUTES.CLEARENCE}
          element={
            <Layout showHeader={true} showFooter={true}>
              <CategoryPage />
            </Layout>
          }
        />
        <Route
          path={ROUTES.NEW_ARRIVALS}
          element={
            <Layout showHeader={true} showFooter={true}>
              <CategoryPage />
            </Layout>
          }
        />

        {/* About Us */}
        <Route
          path={ROUTES.ABOUT_US}
          element={
            <Layout showHeader={true} showFooter={true}>
              <AboutUsWrapper />
            </Layout>
          }
        />

        {/* AUTH */}
        <Route
          path={ROUTES.AUTH}
          element={
            <Layout showHeader={true} showFooter={true}>
              <AuthOrAccount />
            </Layout>
          }
        >
          {/* These nested routes will only be accessible when authenticated */}
          <Route index element={<Dashboard />} />
          <Route path="orders" element={<Orders />} />
          <Route path="addresses" element={<Addresses />} />
          <Route path="account-details" element={<AccountDetails />} />
        </Route>

        {/* LOST PASSWORD FLOW ROUTES */}
        <Route
          path={ROUTES.LOST_PWD}
          element={
            <Layout showHeader={true} showFooter={true}>
              <LostPasswordPage />
            </Layout>
          }
        />
        {/* ADHESIVE */}
        <Route
          path={ROUTES.ADHESIVE}
          element={
            <Layout showHeader={true} showFooter={true}>
              <AdhesivePageWrapper />
            </Layout>
          }
        />

        {/* FAQ */}
        <Route
          path={ROUTES.FAQ}
          element={
            <Layout showHeader={true} showFooter={true}>
              <Faq />
            </Layout>
          }
        />

        {/* DELIVERY */}
        <Route
          path={ROUTES.DELIVERY}
          element={
            <Layout showHeader={true} showFooter={true}>
              <DeliveryInfoWrapper />
            </Layout>
          }
        />
        {/* RETURN POLICY */}
        <Route
          path={ROUTES.RETURN_POLICY}
          element={
            <Layout showHeader={true} showFooter={true}>
              <ReturnPolicyWrapper />
            </Layout>
          }
        />

        {/* PRIVACY POLICY */}
        <Route
          path={ROUTES.PRIVACY_POLICY}
          element={
            <Layout showHeader={true} showFooter={true}>
              <PrivacyPageWrapper />
            </Layout>
          }
        />

        {/* TERMS & CONDITIONS */}
        <Route
          path={ROUTES.TERMS_CONDITIONS}
          element={
            <Layout showHeader={true} showFooter={true}>
              <TermsPageWrapper />
            </Layout>
          }
        />

        {/* SEALING & MAINTENANCE */}
        <Route
          path={ROUTES.SEALING_MAINTENANCE}
          element={
            <Layout showHeader={true} showFooter={true}>
              <SealingMainWrapper />
            </Layout>
          }
        />

        {/* INSTALLATION */}
        <Route
          path={ROUTES.INSTALLATION}
          element={
            <Layout showHeader={true} showFooter={true}>
              <InstallationWrapper />
            </Layout>
          }
        />

        {/* CONTACT US */}
        <Route
          path={ROUTES.CONTACT_US}
          element={
            <Layout showHeader={true} showFooter={true}>
              <ContactPageWrapper />
            </Layout>
          }
        />

        {/* REVIEWS */}
        <Route
          path={ROUTES.REVIEWS}
          element={
            <Layout showHeader={true} showFooter={true}>
              <ReviewsWrapper />
            </Layout>
          }
        />

        {/* BLOG PAGE */}
        <Route
          path={ROUTES.BLOGS_PAGE}
          element={
            <Layout showHeader={true} showFooter={true}>
              <BlogPage />
            </Layout>
          }
        />

        {/* SINGLE PRODUCT PAGE */}
        <Route
          path={ROUTES.SPP}
          element={
            <Layout showHeader={true} showFooter={true}>
              <SingleProduct />
            </Layout>
          }
        />

        {/* CHECKOUT PAGE */}
        <Route
          path={ROUTES.CHECKOUT}
          element={
            <Layout showHeader={true} showFooter={true}>
              <Checkout />
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
