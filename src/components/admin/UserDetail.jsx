import React, { useContext } from "react";
import myContext from "../../context/myContext";
import "../styles/userDetailStyles.scss"; // Importujemy styl SCSS

const UserDetail = () => {
  const context = useContext(myContext);
  const { getAllUser } = context;

  return (
    <div className="user-detail">
      <div className="user-detail__header">
        <h1 className="text-xl font-bold">Wszyscy użytkownicy</h1>
      </div>

      <div className="user-detail__table">
        <table>
          <thead>
            <tr>
              <th>Nr.</th>
              <th>Imię</th>
              <th>Email</th>
              <th>ID</th>
              <th>Rola</th>
              <th>Data</th>
            </tr>
          </thead>
          <tbody>
            {getAllUser.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.uid}</td>
                  <td className="role">{item.role}</td>
                  <td className="date">{item.date}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserDetail;
