import { CreateMailingTaskRequestBody } from "@types";
import httpClient from "services/http.service";

export const createMailingTask = async (data: CreateMailingTaskRequestBody) => {
    return await httpClient.post('send_message_via_wa/', data);
}