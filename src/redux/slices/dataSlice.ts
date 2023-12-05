import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { dataService } from "@/api";
import { IDataItem } from "@/types";

interface IDataState {
  specializations: IDataItem[];
  skills: IDataItem[];
  spheres: IDataItem[];
  instruments: IDataItem[];
  languages: IDataItem[];
}

const initialState: IDataState = {
  specializations: [],
  skills: [],
  spheres: [],
  instruments: [],
  languages: [],
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
      state.specializations = action.payload.specializations;
      state.skills = action.payload.skills;
      state.spheres = action.payload.spheres;
      state.instruments = action.payload.instruments;
      state.languages = action.payload.languages;
    });

    builder.addCase(getData.rejected, (state) => {
      state.specializations = [];
      state.skills = [];
      state.spheres = [];
      state.instruments = [];
      state.languages = [];
    });
  },
});

export default dataSlice.reducer;
