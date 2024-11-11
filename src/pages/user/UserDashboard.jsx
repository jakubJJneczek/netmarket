import { useContext } from "react";
import Layout from "../../components/layout/Layout";
import myContext from "../../context/myContext";
import Loader from "../../components/loader/Loader";

const UserDashboard = () => {
  // user
  const user = JSON.parse(localStorage.getItem("users"));

  const context = useContext(myContext);
  const { loading, getAllOrder } = context;
  // console.log(getAllOrder)

  // console.log(user)
  return (
    <Layout>
      <div className=" container mx-auto px-4 py-5 lg:py-8">
        {/* Top  */}
        <div className="top ">
          {/* main  */}
          <div className=" bg-gray-50 py-5 rounded-xl border border-gray-100">
            <div className="">
              {/* Name  */}
              <h1 className=" text-center text-lg">
                <span className=" font-bold">Imię: </span>
                {user?.name}
              </h1>

              {/* Email  */}
              <h1 className=" text-center text-lg">
                <span className=" font-bold">Email: </span>
                {user?.email}
              </h1>

              {/* Date  */}
              <h1 className=" text-center text-lg">
                <span className=" font-bold">Data: </span>
                {user?.date}
              </h1>

              {/* Role  */}
              <h1 className=" text-center text-lg">
                <span className=" font-bold">Rola: </span>
                {user?.role}
              </h1>
            </div>
          </div>
        </div>

        {/* bottom  */}
        <div className="bottom">
          {/* main 1 */}
          <div className="mx-auto my-4 max-w-6xl px-2 md:my-6 md:px-0">
            {/* text  */}
            <h2 className=" text-2xl lg:text-3xl font-bold">
              Szczegóły zamówienia
            </h2>

            <div className="flex justify-center relative top-10">
              {loading && <Loader />}
            </div>

            {/* main 2 */}
            {getAllOrder
              .filter((obj) => obj.userid === user?.uid)
              .map((order, index) => {
                // console.log(order);
                return (
                  <div key={index}>
                    {order.cartItems.map((item, index) => {
                      // console.log('item', item);
                      const {
                        id,
                        date,
                        quantity,
                        price,
                        title,
                        productImageurl,
                        category,
                      } = item;
                      // console.log('order', order)
                      const { status } = order;
                      return (
                        <div
                          key={index}
                          className="mt-5 flex flex-col overflow-hidden rounded-xl border border-gray-100 md:flex-row"
                        >
                          {/* main 3  */}
                          <div className="w-full border-r border-gray-100 bg-gray-50 md:max-w-xs">
                            {/* left  */}
                            <div className="p-8">
                              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-1">
                                <div className="mb-4">
                                  <div className="text-sm font-semibold text-black">
                                    ID zamówienia
                                  </div>
                                  <div className="text-sm font-medium text-gray-900">
                                    #{id}
                                  </div>
                                </div>

                                <div className="mb-4">
                                  <div className="text-sm font-semibold">
                                    Data
                                  </div>
                                  <div className="text-sm font-medium text-gray-900">
                                    {date}
                                  </div>
                                </div>

                                <div className="mb-4">
                                  <div className="text-sm font-semibold">
                                    Kwota
                                  </div>
                                  <div className="text-sm font-medium text-gray-900">
                                    {price * quantity} zł
                                  </div>
                                </div>

                                <div className="mb-4">
                                  <div className="text-sm font-semibold">
                                    Status zamówienia
                                  </div>
                                  <div className="text-sm font-medium text-green-800 first-letter:uppercase">
                                    {status}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* right  */}
                          <div className="flex-1">
                            <div className="p-8">
                              <ul className="-my-7 divide-y divide-gray-200">
                                <li className="flex flex-col justify-between space-x-5 py-7 md:flex-row">
                                  <div className="flex flex-1 items-stretch">
                                    <div className="flex-shrink-0">
                                      <img
                                        className="h-40 w-40 rounded-lg border border-gray-200 object-contain"
                                        src={productImageurl}
                                        alt="img"
                                      />
                                    </div>

                                    <div className="ml-5 flex flex-col justify-between">
                                      <div className="flex-1">
                                        <p className="text-sm font-bold text-gray-900">
                                          {title}
                                        </p>
                                        <p className="mt-1.5 text-sm font-medium text-gray-500">
                                          {category}
                                        </p>
                                      </div>

                                      <p className="mt-4 text-sm font-medium text-gray-500">
                                        x {quantity}
                                      </p>
                                    </div>
                                  </div>

                                  <div className="ml-auto flex flex-col items-end justify-between">
                                    <p className="text-right text-sm font-bold text-gray-900">
                                      {price} zł
                                    </p>
                                  </div>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserDashboard;
