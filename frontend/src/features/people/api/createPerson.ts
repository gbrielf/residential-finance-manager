import { api } from "../../../lib/axios";
import { type PersonResponse } from "../types/people";

export async function createPerson(name: string, age: number): Promise<PersonResponse> {
    const { data } = await api.post("/People", {
        name,
        age,
    });

    return data;
}