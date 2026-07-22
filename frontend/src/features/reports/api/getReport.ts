import { api } from "../../../lib/axios";

export async function getReport() {
    console.log("Chamando API...");

    const response = await api.get("/Reports/totals");

    console.log(response);

    return response.data;
}