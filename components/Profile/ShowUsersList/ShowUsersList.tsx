"use client";
import { countUsers, searchUser } from "@/actions/searchQuery";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import Loader from "@/components/Loader/Loader";
import FormUserAdmin from "@/components/Profile/FormUserAdmin/FormUserAdmin";
import PaginationUtil from "@/components/Profile/PaginationUtil/PaginationUtil";
import Search from "@/components/Profile/Search/Search";
import UserDetails from "@/components/Profile/UserDetails/UserDetails";
import styles from "./ShowUsersList.module.css";

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
    <div className={styles.wrapper}>
      <h3 className={styles.title}>
        Users Management
      </h3>

      <Search />

      {error ? (
        <div className={styles.error}>
          {error}
        </div>
      ) : null}

      {users.length === 0 && count !== 0 ? (
        <p className={styles.loader}>
          <Loader variant="inline" />
        </p>
      ) : users.length === 0 && count === 0 ? (
        <p className={styles.empty}>
          No register matches the query
        </p>
      ) : (
        <div className={styles.tableOuter}>
          <div className={styles.tableScroll}>
            <table className={styles.table}>
              <thead className={styles.thead}>
                <tr>
                  <th className={styles.th}>
                    Name
                  </th>
                  <th className={styles.th}>
                    Email
                  </th>
                  <th className={styles.th}>
                    Country
                  </th>
                  <th className={styles.th}>
                    Number
                  </th>
                  <th className={styles.th}>
                    Subscribed
                  </th>
                  <th className={styles.th}>
                    Role
                  </th>
                  <th className={styles.th}>
                    Details
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr
                    key={user.id}
                    className={styles.tr}
                  >
                    <td className={styles.tdCapitalize}>
                      {user.name
                        ? user.name
                        : user.firstName + " " + user.secondName}
                    </td>
                    <td className={styles.tdLowercase}>
                      {user.email}
                    </td>
                    <td className={styles.tdCapitalize}>
                      {user.country}
                    </td>
                    <td className={styles.td}>
                      ({user.codeNumber}) {user.number}
                    </td>
                    <td className={styles.td}>
                      {user.subscribed ? <FaCheck className={styles.checkIcon} /> : ""}
                    </td>
                    <td className={styles.td}>
                      <FormUserAdmin role={user.role} id={user.id} />
                    </td>
                    <td className={styles.td}>
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
