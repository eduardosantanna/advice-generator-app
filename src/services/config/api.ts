import { environment } from "@/environment";
import axios from "axios";

export const Api = axios.create({
  baseURL: environment.BASE_URL,
});
