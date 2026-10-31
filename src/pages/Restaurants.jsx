// import { useEffect, useState } from "react";
// import toast from "react-hot-toast";
// import { fetchRestaurants } from "../api/restaurants";
// import { getErrorMessage } from "../utils/getErrorMessage";
// import Header from "../components/Header";
// import RestaurantCard from "../components/RestaurantCard";
// import Spinner from "../components/Spinner";
// export default function Restaurants() {
//   const [restaurants, setRestaurants] = useState([]);
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [totalCount, setTotalCount] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     let ignore = false;

//     const load = async () => {
//       try {
//         setLoading(true);
//         setError("");
//         const { data } = await fetchRestaurants(page);
//         if (ignore) return;
//         const { results, meta } = data.data;
//         setRestaurants((prev) => (page === 1 ? results : [...prev, ...results]));
//         setTotalPages(meta.total_pages);
//         setTotalCount(meta.total_count);
//       } catch (err) {
//         if (ignore) return;
//         const message = getErrorMessage(err);
//         setError(message);
//         toast.error(message);
//       } finally {
//         if (!ignore) setLoading(false);
//       }
//     };

//     load();
//     return () => {
//       ignore = true;
//     };
//   }, [page]);

//   return (
//     <>
//     <Header />
//       <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
//         <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
//           <h2 className="text-xl font-bold sm:text-2xl">Restaurants</h2>
//           {totalCount > 0 && (
//             <p className="text-sm text-gray-500">{totalCount} places found</p>
//           )}
//         </div>

//         <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4">
//           {restaurants.map((item) => (
//             <RestaurantCard key={item.restaurant_id} restaurant={item} />
//           ))}
//         </div>

//         {loading && (
//           <div className="flex justify-center py-8">
//             <Spinner className="h-8 w-8" />
//           </div>
//         )}

//         {!loading && error && (
//           <div className="py-8 text-center">
//             <p className="text-red-500">{error}</p>
//             <button
//               onClick={() => setRetryKey((k) => k + 1)}
//               className="mt-3 cursor-pointer text-sm font-medium text-orange-500 hover:underline"
//             >
//               Try again
//             </button>
//           </div>
//         )}

//         {!loading && !error && restaurants.length === 0 && (
//           <p className="py-8 text-center text-gray-500">No restaurants found</p>
//         )}

//         {!loading && !error && page < totalPages && (
//           <div className="mt-6 flex justify-center">
//             <button
//               onClick={() => setPage((p) => p + 1)}
//               className="w-full cursor-pointer rounded-xl border border-orange-500 py-3 font-semibold text-orange-500 hover:bg-orange-50 sm:w-60"
//             >
//               Load more
//             </button>
//           </div>
//         )}
//       </main>
//     </>
//   );
// }


import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { fetchRestaurants } from "../api/restaurants";
import { getErrorMessage } from "../utils/getErrorMessage";
import Header from "../components/Header";
import RestaurantCard from "../components/RestaurantCard";
import Spinner from "../components/Spinner";

export default function Restaurants() {
  const [restaurants, setRestaurants] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [retryKey, setRetryKey] = useState(0);

  useEffect(() => {
    let ignore = false;

    const load = async () => {
      try {
        setLoading(true);
        setError("");
        const { data } = await fetchRestaurants(page);
        if (ignore) return;
        const { results, meta } = data.data;
        setRestaurants((prev) => (page === 1 ? results : [...prev, ...results]));
        setTotalPages(meta.total_pages);
        setTotalCount(meta.total_count);
      } catch (err) {
        if (ignore) return;
        const message = getErrorMessage(err);
        setError(message);
        toast.error(message);
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    load();
    return () => {
      ignore = true;
    };
  }, [page, retryKey]);

  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
          <h2 className="text-xl font-bold sm:text-2xl">Restaurants</h2>
          {totalCount > 0 && (
            <p className="text-sm text-gray-500">
              Showing {restaurants.length} of {totalCount}
            </p>
          )}
        </div>

        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4">
          {restaurants.map((item) => (
            <RestaurantCard key={item.restaurant_id} restaurant={item} />
          ))}
        </div>

        {loading && (
          <div className="flex justify-center py-8">
            <Spinner className="h-8 w-8" />
          </div>
        )}

        {!loading && error && (
          <div className="py-8 text-center">
            <p className="text-red-500">{error}</p>
            <button
              onClick={() => setRetryKey((k) => k + 1)}
              className="mt-3 cursor-pointer text-sm font-medium text-orange-500 hover:underline"
            >
              Try again
            </button>
          </div>
        )}

        {!loading && !error && restaurants.length === 0 && (
          <p className="py-8 text-center text-gray-500">No restaurants found</p>
        )}

        {!loading && !error && page < totalPages && (
          <div className="mt-6 flex justify-center">
            <button
              onClick={() => setPage((p) => p + 1)}
              className="w-full cursor-pointer rounded-xl border border-orange-500 py-3 font-semibold text-orange-500 hover:bg-orange-50 sm:w-60"
            >
              Load more
            </button>
          </div>
        )}
      </main>
    </>
  );
}