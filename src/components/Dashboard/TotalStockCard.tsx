import { getTotalStock } from "@/apis/products";
import { useEffect, useState } from "react";
import { Marker, MarkerContent, MarkerIcon } from "@/components/ui/marker";
import { Spinner } from "@/components/ui/spinner";

function ShimmerCard() {
  return (
    <div className="grid h-full w-full place-items-center">
      <Marker role="status">
        <MarkerIcon>
          <Spinner />
        </MarkerIcon>
        <MarkerContent className="shimmer">Loading...</MarkerContent>
      </Marker>
    </div>
  );
}

export default function TotalStockCard() {
  const [totalStock, setTotalStock] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;

    async function loadTotalStock() {
      setLoading(true);
      setError(null);
      setTotalStock(null);

      try {
        const res = await getTotalStock();
        if (res.code !== 200) {
          throw new Error(`fetch total stock failed: ${res.message}`);
        }
        if (!ignore) {
          setTotalStock(res.data);
        }
      } catch (error) {
        if (!ignore) {
          setError(error instanceof Error ? error.message : String(error));
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }
    loadTotalStock();

    return () => {
      ignore = true;
    };
  }, []);

  if (loading) {
    return (
      <div className="bg-white/25 h-full backdrop-blur-sm border border-white/30 shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-bold text-primary">Total Stock</h2>
        <ShimmerCard />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white/25 backdrop-blur-sm border border-white/30 shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-bold text-primary">Total Stock</h2>
        <p className="text-6xl pt-4">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="bg-white/25 backdrop-blur-sm border border-white/30 shadow-lg rounded-lg p-8">
      <h2 className="text-2xl font-bold text-primary">Total Stock</h2>
      <p className="text-6xl pt-4">{totalStock ?? "-"}</p>
      <p className="text-sm text-zinc-600 pt-2">The total quantity of items.</p>
      <hr className="mt-8 w-1/3 border-black/10 " />
    </div>
  );
}
