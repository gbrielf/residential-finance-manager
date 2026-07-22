import { useQuery } from "@tanstack/react-query";
import { getReport } from "../api/getReport";

export function useReport() {
    return useQuery({
        queryKey: ["report"],
        queryFn: getReport,
    });
}