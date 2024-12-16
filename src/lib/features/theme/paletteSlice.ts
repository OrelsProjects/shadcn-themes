import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ParsedPalette, ThemeType } from "@/models/palette";
import { basePalette } from "@/lib/consts";

type PaletteName = string;

export interface ThemeState {
  selectedPalette: ParsedPalette;
  selectedPaletteName: PaletteName;
  baseThemeType: ThemeType;
  selectedThemeType: ThemeType;
  allPalettes: ParsedPalette[];
  showThemePalette?: boolean;
  hideThemePalette?: boolean;
}

export const initialState: ThemeState = {
  allPalettes: [],
  baseThemeType: "dark",
  selectedThemeType: "dark",
  selectedPaletteName: "base",
  selectedPalette: basePalette,
  showThemePalette: false,
  hideThemePalette: false,
};

const paletteSlice = createSlice({
  name: "palette",
  initialState,
  reducers: {
    selectPalette(state, action: PayloadAction<{ name: PaletteName }>) {
      // const hasLightMode = Object.keys(state.selectedPalette.colors.light).length;
      const newPalette = state.allPalettes.find(
        palette => palette.name === action.payload.name,
      );

      if (newPalette) {
        const newType = state.selectedThemeType;
        state.selectedPaletteName = action.payload.name;
        state.selectedPalette = newPalette;
        state.selectedThemeType = newType;
      }
    },
    changeThemeType(state, action: PayloadAction<ThemeType>) {
      state.selectedThemeType = action.payload;
      const newPalette = state.allPalettes.find(
        palette => palette.name === state.selectedPaletteName,
      );
      if (newPalette) {
        state.selectedPalette = newPalette;
      }
    },
    addPalettes(state, action: PayloadAction<ParsedPalette[]>) {
      state.allPalettes = [...state.allPalettes, ...action.payload];
    },
    setShowThemePalette(state, action: PayloadAction<boolean>) {
      state.showThemePalette = action.payload;
    },
    setHideThemePalette(state, action: PayloadAction<boolean>) {
      state.hideThemePalette = action.payload;
    },
    changeBaseThemeType(state) {
      if (state.selectedThemeType === state.baseThemeType) {
        state.selectedThemeType =
          state.selectedThemeType === "light" ? "dark" : "light";
      }
      state.baseThemeType = state.baseThemeType === "light" ? "dark" : "light";
    },
  },
});

export const {
  selectPalette,
  addPalettes,
  changeThemeType,
  changeBaseThemeType,
  setShowThemePalette,
  setHideThemePalette,
} = paletteSlice.actions;

export default paletteSlice.reducer;
