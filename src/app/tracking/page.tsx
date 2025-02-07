"use client";

import { useState, useEffect, Suspense, useCallback } from "react";
import axios from "axios";
import { useSearchParams, useRouter } from "next/navigation";
import { TrackingData } from "@/app/types/types";
import Loader from "@/components/Loader"; 

function TrackShipment() {
  const [labelId, setLabelId] = useState("");
  const [trackingData, setTrackingData] = useState<TrackingData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const router = useRouter();
  const queryLabelId = searchParams?.get("labelId") || "";

  const handleSubmit = useCallback(
    async (labelId: string) => {
      if (!labelId) {
        setError("Label ID is required.");
        return;
      }

      setLoading(true);
      setError(null);

      try {
        router.replace(`/tracking?labelId=${labelId}`);
        const response = await axios.get(`/api/tracking/${labelId}`);
        setTrackingData(response.data);
      } catch (err) {
        console.error("Error tracking shipment:", err);
        setError(
          "Failed to track shipment. Please check the label ID and try again."
        );
      } finally {
        setLoading(false);
      }
    },
    [router]
  );

  useEffect(() => {
    if (queryLabelId) {
      setLabelId(queryLabelId);
      handleSubmit(queryLabelId);
    }
  }, [queryLabelId, handleSubmit]);

  return (
    <div>
      <div className="bg-gray-100 py-8 max-w-[1440px] mx-auto">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-center text-[#2A254B] mb-8">
            Track Your Shipment
          </h1>

          {/* Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(labelId);
            }}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <div className="flex flex-col space-y-4">
              <label htmlFor="labelId" className="text-lg font-medium text-[#2A254B]">
                Enter Label ID or Tracking Number:
              </label>
              <input
                type="text"
                id="labelId"
                value={labelId}
                onChange={(e) => setLabelId(e.target.value)}
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter label ID"
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-[#36305c] text-white py-2 px-4 rounded-md hover:bg-[#4a3e74] transition-colors disabled:bg-gray-400"
              >
                {loading ? "Tracking..." : "Track Shipment"}
              </button>
            </div>
          </form>

          {/* Error Message */}
          {error && (
            <div className="mt-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
              {error}
            </div>
          )}

          {/* Tracking Details */}
          {trackingData && (
            <div className="mt-8 bg-white p-6 rounded-lg shadow-md text-[#505977]">
              <h2 className="text-2xl font-bold mb-4 text-[#2A254B]">Tracking Details</h2>
              <div className="space-y-4">
                <p>
                  <span className="font-semibold text-[#2A254B] ">Tracking Number:</span>{" "}
                  {trackingData.trackingNumber}
                </p>
                <p>
                  <span className="font-semibold text-[#2A254B]">Status:</span>{" "}
                  {trackingData.statusDescription}
                </p>
                <p>
                  <span className="font-semibold text-[#2A254B]">Carrier Status:</span>{" "}
                  {trackingData.carrierStatusDescription || "N/A"}
                </p>
                <p>
                  <span className="font-semibold text-[#2A254B]">Estimated Delivery:</span>{" "}
                  {trackingData.estimatedDeliveryDate || "N/A"}
                </p>
                <p>
                  <span className="font-semibold text-[#2A254B]">Actual Delivery:</span>{" "}
                  {trackingData.actualDeliveryDate || "N/A"}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function TrackingPage() {
  return (
    <Suspense fallback={<Loader />}>
      <TrackShipment />
    </Suspense>
  );
}