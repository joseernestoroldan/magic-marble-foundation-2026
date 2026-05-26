"use client";
import { countDonators, searchDonators } from "@/actions/searchQueryDonators";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import Loader from "../Loader/Loader";
import PaginationUtil from "../paginationUtil/PaginationUtil";
import Search from "../search/Search";

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
    <div className="w-full max-w-5xl mx-auto">
      <h3 className="text-lg font-semibold text-gray-600 mb-4">Donators</h3>

      <Search />

      {error ? (
        <div className="bg-red-50 text-red-600 p-3 rounded-[5px] text-sm mt-4">
          {error}
        </div>
      ) : null}

      {donators.length === 0 && count !== 0 ? (
        <p className="text-gray-500 text-lg w-full text-center py-8">
          <Loader variant="inline" />
        </p>
      ) : donators.length === 0 && count === 0 ? (
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
                    First Name
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Second Name
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Country
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Address
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Telephone
                  </th>
                </tr>
              </thead>
              <tbody>
                {donators.map((donator) => (
                  <tr
                    key={donator.id}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-4 py-3 text-gray-600 capitalize">
                      {donator.firstName}
                    </td>
                    <td className="px-4 py-3 text-gray-600 capitalize">
                      {donator.secondName}
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      {donator.amount}
                    </td>
                    <td className="px-4 py-3 text-gray-600 lowercase">
                      {donator.email}
                    </td>
                    <td className="px-4 py-3 text-gray-600 capitalize">
                      {donator.country}
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      {donator.address}
                    </td>
                    <td className="px-4 py-3 text-gray-600">
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
