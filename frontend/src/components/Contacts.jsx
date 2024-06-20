import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const Contacts = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const { user, token } = useSelector((state) => state.auth);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users", error);
      }
    };

    fetchUsers();
  }, [token]);
  console.log(users);
  const filteredUsers = users
    .filter((users) => users._id !== user._id)
    .filter((users) =>
      users.username.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <div className="w-full md:w-1/4 bg-white p-4 border-r h-1/4 md:h-screen">
      <h2 className="text-xl font-semibold mb-4">Contacts</h2>
      <input
        type="text"
        placeholder="Search contacts..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-2 mb-4 border rounded bg-blue-100"
      />
      <ul>
        {filteredUsers.map((user) => (
          <li
            key={user._id}
            className="p-2 hover:bg-blue-300 bg-gray-200 cursor-pointer my-1 font-semibold"
          >
            {user.username}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Contacts;
