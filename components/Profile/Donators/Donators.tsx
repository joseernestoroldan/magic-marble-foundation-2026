"use client";
import { countDonators, searchDonators } from "@/actions/searchQueryDonators";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import Loader from "@/components/Loader/Loader";
import PaginationUtil from "@/components/Profile/PaginationUtil/PaginationUtil";
import Search from "@/components/Profile/Search/Search";
import styles from "./Donators.module.css";

interface Donator {
  id: string;
  firstName: string | null;
  secondName: string | null;
  amount: string | null;
  email: string | null;
  country: string | null;
  address: string | null;
  telephone: string | null;
  name?: string | null;
}

const Donators = () => {
  const searchParams = useSearchParams();
  const q = searchParams.get("query") || "";
  const page = searchParams.get("page") || "1";
  const pageNumber = parseInt(page);
  const [donators, setDonators] = useState<Donator[]>([]);
  const [count, setCount] = useState<number>(1);
  const [error, setError] = useState<string | null>(null);

  const onSearch = useCallback(async () => {
    setError(null);
    try {
      const [data, total] = await Promise.all([
        searchDonators(q, pageNumber),
        countDonators(q),
      ]);
      setDonators(data ?? []);
      setCount(total);
    } catch {
      setError("Failed to load donators");
    }
  }, [q, pageNumber]);

  useEffect(() => {
    onSearch();
  }, [onSearch]);

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.heading}>Donators</h3>

      <Search />

      {error ? (
        <div className={styles.error}>
          {error}
        </div>
      ) : null}

      {donators.length === 0 && count !== 0 ? (
        <p className={styles.loading}>
          <Loader variant="inline" />
        </p>
      ) : donators.length === 0 && count === 0 ? (
        <p className={styles.empty}>
          No register matches the query
        </p>
      ) : (
        <div className={styles.tableContainer}>
          <div className={styles.tableScroll}>
            <table className={styles.table} style={{ borderCollapse: "collapse" }}>
              <thead className={styles.thead}>
                <tr>
                  <th className={styles.th}>
                    First Name
                  </th>
                  <th className={styles.th}>
                    Second Name
                  </th>
                  <th className={styles.th}>
                    Amount
                  </th>
                  <th className={styles.th}>
                    Email
                  </th>
                  <th className={styles.th}>
                    Country
                  </th>
                  <th className={styles.th}>
                    Address
                  </th>
                  <th className={styles.th}>
                    Telephone
                  </th>
                </tr>
              </thead>
              <tbody>
                {donators.map((donator) => (
                  <tr
                    key={donator.id}
                    className={styles.tr}
                  >
                    <td className={styles.tdCapitalize}>
                      {donator.firstName}
                    </td>
                    <td className={styles.tdCapitalize}>
                      {donator.secondName}
                    </td>
                    <td className={styles.td}>
                      {donator.amount}
                    </td>
                    <td className={styles.tdLowercase}>
                      {donator.email}
                    </td>
                    <td className={styles.tdCapitalize}>
                      {donator.country}
                    </td>
                    <td className={styles.td}>
                      {donator.address}
                    </td>
                    <td className={styles.td}>
                      {donator.telephone}
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

export default Donators;
