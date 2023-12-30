import React, { useEffect, useState } from "react";
import { axios } from "../Utils/axios";

const Dashboard = () => {
   const [users, setUsers] = useState([]);

   useEffect(() => {
      const fetchUsers = async () => {
         const response = await axios.get("/admin/users");

         if (response.status === 200) {
            setUsers(response.data.users);
         }
      };

      fetchUsers();
   }, []);

   const handleCheckbox = async (userId, permission) => {
      try {
         const response = await axios.put(`/admin/users/${userId}/permission`, { permission });
         if (response.status === 200) {
            
            const response = await axios.get("/admin/users");
            if (response.status === 200) {
               setUsers(response.data.users);
            }
            alert("Permission Updated");
         }
      } catch (error) {
         alert("TryCatch Error");
      }
   };

   return (
      <div className="d-flex justify-content-center align-items-center mt-5 pt-5 text-light">
         <table className="w-50">
            <thead>
               <tr className="text-center">
                  <th>User</th>
                  <th>Read</th>
                  <th>Create</th>
                  <th>Delete</th>
               </tr>
            </thead>
            <tbody>
               {users.map((user) => (
                  <tr className="text-center" key={user._id}>
                     <td>{user.email}</td>
                     <td>
                        <input
                           type="checkbox"
                           checked={user.role.permissionIds.some((permission) => permission.permission === 1)}
                           onChange={() => handleCheckbox(user._id, 1)}
                        />
                     </td>
                     <td>
                        <input
                           type="checkbox"
                           checked={user.role.permissionIds.some((permission) => permission.permission === 2)}
                           onChange={() => handleCheckbox(user._id, 2)}
                        />
                     </td>
                     <td>
                        <input
                           type="checkbox"
                           checked={user.role.permissionIds.some((permission) => permission.permission === 3)}
                           onChange={() => handleCheckbox(user._id, 3)}
                        />
                     </td>
                  </tr>
               ))}
            </tbody>
         </table>
      </div>
   );
};

export default Dashboard;
