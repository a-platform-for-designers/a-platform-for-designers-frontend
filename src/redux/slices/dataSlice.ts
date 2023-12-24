import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { dataService } from "@/api";
import { IDataItem } from "@/types";

interface IDataState {
  specializations: { [key: string]: number };
  skills: { [key: string]: number };
  spheres: { [key: string]: number };
  instruments: { [key: string]: number };
  languages: { [key: string]: number };
}

const initialState: IDataState = {
  specializations: {},
  skills: {},
  spheres: {},
  instruments: {},
  languages: {},
};

const convertData = (data: IDataItem[]) => {
  const convertedObj: { [key: string]: number } = {};
  data.forEach((item) => {
    convertedObj[item.name] = item.id;
  });
  return convertedObj;
};

export const getData = createAsyncThunk("data/getData", async () => {
  const specializationsData = await dataService.getSpecializations();
  const skillsData = await dataService.getSkills();
  const spheresData = await dataService.getSpheres();
  const instrumentsData = await dataService.getInstruments();
  const languagesData = await dataService.getLanguages();
  return {
    specializations: specializationsData,
    skills: skillsData,
    spheres: spheresData,
    instruments: instrumentsData,
    languages: languagesData,
  };
});

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getData.fulfilled, (state, action) => {
      state.specializations = convertData(action.payload.specializations);
      state.skills = convertData(action.payload.skills);
      state.spheres = convertData(action.payload.spheres);
      state.instruments = convertData(action.payload.instruments);
      state.languages = convertData(action.payload.languages);
    });

    builder.addCase(getData.rejected, (state) => {
      state.specializations = {};
      state.skills = {};
      state.spheres = {};
      state.instruments = {};
      state.languages = {};
    });
  },
});

export default dataSlice.reducer;
