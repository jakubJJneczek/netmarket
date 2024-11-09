import { useContext } from "react";
import myContext from "../../context/myContext";

const UserDetail = () => {
  const context = useContext(myContext);
  const { getAllUser } = context;

  return (
    <div>
      <div>
        <div className="py-5 flex justify-between items-center">
          {/* text  */}
          <h1 className=" text-xl  font-bold">Wszyscy użytkownicy</h1>
        </div>

        {/* table  */}
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left border border-collapse sm:border-separate border-gray-100 text-gray-900">
            <tbody>
              <tr>
                <th
                  scope="col"
                  className="h-12 px-6 text-md border-l first:border-l-0 border-gray-100 text-slate-700 bg-slate-100 font-bold fontPara"
                >
                  Nr.
                </th>
                <th
                  scope="col"
                  className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-gray-100 text-slate-700 bg-slate-100"
                >
                  Imię
                </th>
                <th
                  scope="col"
                  className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-gray-100 text-slate-700 bg-slate-100"
                >
                  Email
                </th>
                <th
                  scope="col"
                  className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-gray-100 text-slate-700 bg-slate-100"
                >
                  ID
                </th>
                <th
                  scope="col"
                  className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-gray-100 text-slate-700 bg-slate-100"
                >
                  Rola
                </th>
                <th
                  scope="col"
                  className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-gray-100 text-slate-700 bg-slate-100"
                >
                  Data
                </th>
              </tr>

              {getAllUser.map((item, index) => {
                return (
                  <tr key={index} className="text-gray-800">
                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-gray-100 stroke-slate-500 text-slate-500 ">
                      {index + 1}
                    </td>
                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-gray-100 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                      {item.name}
                    </td>
                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-gray-100 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                      {item.email}
                    </td>
                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-gray-100 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                      {item.uid}
                    </td>
                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-gray-100 stroke-slate-500 text-slate-500 text-green-500 cursor-pointer ">
                      {item.role}
                    </td>
                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-gray-100 stroke-slate-500 text-slate-500 text-red-500 cursor-pointer ">
                      {item.date}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
