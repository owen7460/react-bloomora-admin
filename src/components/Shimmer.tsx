import { Marker, MarkerContent, MarkerIcon } from "@/components/ui/marker";
import { Spinner } from "@/components/ui/spinner";

export function ShimmerMarker() {
  return (
    <div className="flex min-h-screen mx-auto max-w-sm flex-col justify-center items-center gap-4">
      <Marker role="status">
        <MarkerIcon>
          <Spinner />
        </MarkerIcon>
        <MarkerContent className="shimmer">Loading...</MarkerContent>
      </Marker>
    </div>
  );
}
