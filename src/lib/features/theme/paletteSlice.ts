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
  showRandomize?: boolean;
  hideRandomize?: boolean;

  systemTheme: ThemeType;
}

export const initialState: ThemeState = {
  allPalettes: [],
  baseThemeType: "light",
  selectedThemeType: "light",
  selectedPaletteName: "base",
  selectedPalette: basePalette,
  showThemePalette: false,
  hideThemePalette: false,
  showRandomize: false,
  hideRandomize: false,
  systemTheme: "dark",
};

const paletteSlice = createSlice({
  name: "palette",
  initialState,
  reducers: {
    selectPalette(state, action: PayloadAction<{ newPalette: ParsedPalette }>) {
      const newType = state.selectedThemeType;

      state.selectedPaletteName = action.payload.newPalette.name;
      state.selectedPalette = action.payload.newPalette;
      state.selectedThemeType = newType;
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
    setShowRandomize(state, action: PayloadAction<boolean>) {
      state.showRandomize = action.payload;
    },
    setHideRandomize(state, action: PayloadAction<boolean>) {
      state.hideRandomize = action.payload;
    },
    changeBaseThemeType(state) {
      if (state.selectedThemeType === state.baseThemeType) {
        state.selectedThemeType =
          state.selectedThemeType === "light" ? "dark" : "light";
      }
      state.baseThemeType = state.baseThemeType === "light" ? "dark" : "light";
    },
    setSystemTheme(state, action: PayloadAction<ThemeType>) {
      state.systemTheme = action.payload;
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
  setShowRandomize,
  setHideRandomize,
  setSystemTheme,
} = paletteSlice.actions;

export default paletteSlice.reducer;
