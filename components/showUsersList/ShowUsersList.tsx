"use client";
import { countUsers, searchUser } from "@/actions/searchQuery";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import Loader from "../Loader/Loader";
import FormUserAdmin from "../formUserAdmin/FormUserAdmin";
import PaginationUtil from "../paginationUtil/PaginationUtil";
import Search from "../search/Search";
import UserDetails from "../userDetails/UserDetails";

interface User {
  id: string;
  name: string | null;
  firstName: string | null;
  secondName: string | null;
  email: string | null;
  country: string | null;
  codeNumber: string | null;
  number: string | null;
  subscribed: boolean | null;
  address: string | null;
  emailVerified: Date | null;
  role: "ADMIN" | "USER";
}

const ShowUsersList = () => {
  const searchParams = useSearchParams();
  const q = searchParams.get("query") || "";
  const page = searchParams.get("page") || "1";
  const pageNumber = parseInt(page);
  const [users, setUsers] = useState<User[]>([]);
  const [count, setCount] = useState<number>(1);
  const [error, setError] = useState<string | null>(null);

  const onSearch = useCallback(async () => {
    setError(null);
    try {
      const [data, total] = await Promise.all([
        searchUser(q, pageNumber),
        countUsers(q),
      ]);
      setUsers(data ?? []);
      setCount(total);
    } catch {
      setError("Failed to load users");
    }
  }, [q, pageNumber]);

  useEffect(() => {
    onSearch();
  }, [onSearch]);

  return (
    <div className="w-full max-w-5xl mx-auto">
      <h3 className="text-lg font-semibold text-gray-600 mb-4">
        Users Management
      </h3>

      <Search />

      {error ? (
        <div className="bg-red-50 text-red-600 p-3 rounded-[5px] text-sm mt-4">
          {error}
        </div>
      ) : null}

      {users.length === 0 && count !== 0 ? (
        <p className="text-gray-500 text-lg w-full text-center py-8">
          <Loader variant="inline" />
        </p>
      ) : users.length === 0 && count === 0 ? (
        <p className="text-center text-gray-500 text-lg py-8">
          No register matches the query
        </p>
      ) : (
        <div className="rounded-[5px] border border-gray-200 overflow-hidden mt-4">
          <div className="w-full overflow-x-auto">
            <table className="w-full text-sm" style={{ borderCollapse: "collapse" }}>
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Country
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Number
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Subscribed
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Details
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-4 py-3 text-gray-600 capitalize">
                      {user.name
                        ? user.name
                        : user.firstName + " " + user.secondName}
                    </td>
                    <td className="px-4 py-3 text-gray-600 lowercase">
                      {user.email}
                    </td>
                    <td className="px-4 py-3 text-gray-600 capitalize">
                      {user.country}
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      ({user.codeNumber}) {user.number}
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      {user.subscribed ? <FaCheck className="text-cyan-600" /> : ""}
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      <FormUserAdmin role={user.role} id={user.id} />
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      <UserDetails
                        name={user.name}
                        firstName={user.firstName}
                        secondName={user.secondName}
                        email={user.email}
                        country={user.country}
                        codeNumber={user.codeNumber}
                        number={user.number}
                        subscribed={user.subscribed}
                        address={user.address}
                        emailVerified={user.emailVerified}
                        role={user.role}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <PaginationUtil count={count} />
    </div>
  );
};

export default ShowUsersList;
