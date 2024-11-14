import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import ProductDetail from "../../components/admin/ProductDetail";
import OrderDetail from "../../components/admin/OrderDetail";
import UserDetail from "../../components/admin/UserDetail";
import { useContext } from "react";
import myContext from "../../context/myContext";
import Layout from "../../components/layout/Layout";
import "../styles/adminDashboardStyles.scss"; // Import SCSS styles

const AdminDashboard = () => {
  const user = JSON.parse(localStorage.getItem("users"));
  const context = useContext(myContext);
  const { getAllProduct, getAllOrder, getAllUser } = context;

  return (
    <Layout>
      <div className="admin-dashboard">
        {/* Top Section */}
        <div className="admin-dashboard__top">
          <div className="admin-dashboard__header bg-light rounded-lg">
            <h1 className="text-center font-bold text-2xl">Panel Admina</h1>
          </div>
        </div>

        {/* User Info Section */}
        <div className="admin-dashboard__user-info mb-5 bg-light rounded-xl border border-gray-200 p-5">
          <h1 className="text-center text-lg">
            <span className="font-bold">Imię: </span>
            {user?.name}
          </h1>
          <h1 className="text-center text-lg">
            <span className="font-bold">Email: </span>
            {user?.email}
          </h1>
          <h1 className="text-center text-lg">
            <span className="font-bold">Data: </span>
            {user?.date}
          </h1>
          <h1 className="text-center text-lg">
            <span className="font-bold">Rola: </span>
            {user?.role}
          </h1>
        </div>

        {/* Tabs Section */}
        <div className="admin-dashboard__tabs">
          <Tabs>
            <TabList className="admin-dashboard__tab-list">
              <Tab className="admin-dashboard__tab">
                <div className="tab-card">
                  <div className="tab-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={50}
                      height={50}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-shopping-basket"
                    >
                      <path d="m5 11 4-7" />
                      <path d="m19 11-4-7" />
                      <path d="M2 11h20" />
                      <path d="m3.5 11 1.6 7.4a2 2 0 0 0 2 1.6h9.8c.9 0 1.8-.7 2-1.6l1.7-7.4" />
                      <path d="m9 11 1 9" />
                      <path d="M4.5 15.5h15" />
                      <path d="m15 11-1 9" />
                    </svg>
                  </div>
                  <h2 className="tab-count">{getAllProduct.length}</h2>
                  <p className="tab-label font-bold">Wszystkie produkty</p>
                </div>
              </Tab>

              <Tab className="admin-dashboard__tab">
                <div className="tab-card">
                  <div className="tab-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={50}
                      height={50}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-list-ordered"
                    >
                      <line x1={10} x2={21} y1={6} y2={6} />
                      <line x1={10} x2={21} y1={12} y2={12} />
                      <line x1={10} x2={21} y1={18} y2={18} />
                      <path d="M4 6h1v4" />
                      <path d="M4 10h2" />
                      <path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1" />
                    </svg>
                  </div>
                  <h2 className="tab-count">{getAllOrder.length}</h2>
                  <p className="tab-label font-bold">Wszystkie zamówienia</p>
                </div>
              </Tab>

              <Tab className="admin-dashboard__tab">
                <div className="tab-card">
                  <div className="tab-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={50}
                      height={50}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-users"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx={9} cy={7} r={4} />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  </div>
                  <h2 className="tab-count">{getAllUser.length}</h2>
                  <p className="tab-label font-bold">Wszyscy użytkownicy</p>
                </div>
              </Tab>
            </TabList>

            <TabPanel>
              <ProductDetail />
            </TabPanel>
            <TabPanel>
              <OrderDetail />
            </TabPanel>
            <TabPanel>
              <UserDetail />
            </TabPanel>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
