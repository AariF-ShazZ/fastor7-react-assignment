const FALLBACK_LOGO = "https://placehold.co/80x80?text=Logo";

export default function RestaurantCard({ restaurant }) {
  const { logo, restaurant_name, address_complete } = restaurant;
  const hasAddress = address_complete && address_complete !== "null";
  return (
    <article className="flex h-full items-center gap-4 rounded-2xl bg-white p-4 shadow-sm transition hover:shadow-md">
      <img
        src={logo || FALLBACK_LOGO}
        alt={restaurant_name}
        onError={(e) => (e.currentTarget.src = FALLBACK_LOGO)}
        className="h-16 w-16 shrink-0 rounded-xl bg-gray-100 object-contain"
        loading="lazy"
      />
      <div className="min-w-0">
        <h3 className="truncate text-base font-semibold">{restaurant_name}</h3>
        <p className="mt-1 line-clamp-2 text-sm text-gray-500">
          {hasAddress ? address_complete : "Address not available"}
        </p>
      </div>
    </article>
  );
}