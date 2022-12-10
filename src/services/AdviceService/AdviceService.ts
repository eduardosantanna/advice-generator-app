import { Api } from "../config/api";
import type { IAdviceServiceData } from "./types";

class AdviceService {
  public async getAdvice(): Promise<IAdviceServiceData | Error> {
    try {
      const { data } = await Api("/advice");

      if (data) {
        return data;
      }

      return new Error("Error fetching advice.");
    } catch (error) {
      return new Error("Error fetching advice.");
    }
  }
}

export default new AdviceService();
