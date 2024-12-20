import { useLocalStorage } from "@/hooks/useLocalStorage";
import axiosInstance from "@/lib/axiosInstance";
import { Logger } from "@/logger";
import { CreateReport, UpdateReport } from "@/models/report";
import { useRef, useState } from "react";

export function useReport() {
  const [userId] = useLocalStorage("shadcn-themes-user-id", "");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadingRef = useRef(false);

  const submitReport = async (data: CreateReport) => {
    if (loadingRef.current) return;
    loadingRef.current = true;
    setIsLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.post<string>("/api/report", {
        themeId: data.themeId,
        userId,
      });
      const reportId = response.data;
      return reportId;
    } catch (err: any) {
      setError(err instanceof Error ? err.message : "An error occurred");
      Logger.error("Failed to submit report", err);
    } finally {
      setIsLoading(false);
      loadingRef.current = false;
    }
  };

  const updateReport = async (data: UpdateReport) => {
    if (isLoading) return;
    loadingRef.current = true;
    setIsLoadingUpdate(true);
    setError(null);

    try {
      await axiosInstance.patch("/api/report", data);
    } catch (err: any) {
      setError(err instanceof Error ? err.message : "An error occurred");
      Logger.error("Failed to update report", err);
    } finally {
      setIsLoadingUpdate(false);
      loadingRef.current = false;
    }
  };

  return { submitReport, updateReport, isLoading, isLoadingUpdate, error };
}
