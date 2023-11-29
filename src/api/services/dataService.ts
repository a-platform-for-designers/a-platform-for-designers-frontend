import { IDataItem } from "../../types";
import api from "../api";

const dataService = {
  // Получение списка специализаций
  getSpecializations: async (): Promise<IDataItem[]> => {
    const response = await api.get<IDataItem[]>("/specializations");
    return response.data;
  },

  // Получение списка скиллов
  getSkills: async (): Promise<IDataItem[]> => {
    const response = await api.get<IDataItem[]>("/skills");
    return response.data;
  },

  // Получение списка сфер
  getSpheres: async (): Promise<IDataItem[]> => {
    const response = await api.get<IDataItem[]>("/spheres");
    return response.data;
  },

  // Получение списка инструментов
  getInstruments: async (): Promise<IDataItem[]> => {
    const response = await api.get<IDataItem[]>("/instruments");
    return response.data;
  },
};

export default dataService;
