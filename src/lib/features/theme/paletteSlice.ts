import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Palette, ParsedPalette, ThemeType } from "@/models/palette";
import { basePalette } from "@/lib/consts";
import { set } from "lodash";

type PaletteName = string;

export interface ThemeState {
  selectedPalette: ParsedPalette;
  selectedPaletteName: PaletteName;
  selectedThemeType: ThemeType;
  allPalettes: ParsedPalette[];
  showThemePalette?: boolean;
}

export const initialState: ThemeState = {
  allPalettes: [],
  selectedThemeType: "dark",
  selectedPaletteName: "base",
  selectedPalette: basePalette,
  showThemePalette: false,
};

const paletteSlice = createSlice({
  name: "palette",
  initialState,
  reducers: {
    selectPalette(
      state,
      action: PayloadAction<{ name: PaletteName; type?: ThemeType }>,
    ) {
      // const hasLightMode = Object.keys(state.selectedPalette.colors.light).length;
      const newPalette = state.allPalettes.find(
        palette => palette.name === action.payload.name,
      );

      if (newPalette) {
        const hasDarkMode = Object.keys(newPalette.colors.dark).length;
        const newType = action.payload.type || hasDarkMode ? "dark" : "light";
        state.selectedPaletteName = action.payload.name;
        state.selectedPalette = newPalette;
        state.selectedThemeType = newType;
      }
    },
    changeThemeType(state) {
      state.selectedThemeType =
        state.selectedThemeType === "light" ? "dark" : "light";
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
  },
});

export const {
  selectPalette,
  addPalettes,
  changeThemeType,
  setShowThemePalette,
} = paletteSlice.actions;

export default paletteSlice.reducer;
