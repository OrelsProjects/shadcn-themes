import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Palette, ParsedPalette, ThemeType } from "@/models/palette";
import { basePalette } from "@/lib/consts";

type PaletteName = string;

export interface ThemeState {
  selectedPalette: ParsedPalette;
  selectedPaletteName: PaletteName;
  selectedThemeType: ThemeType;
  allPalettes: ParsedPalette[];
}

export const initialState: ThemeState = {
  allPalettes: [],
  selectedThemeType: "dark",
  selectedPaletteName: "base",
  selectedPalette: basePalette,
};

const paletteSlice = createSlice({
  name: "palette",
  initialState,
  reducers: {
    selectPalette(
      state,
      action: PayloadAction<{ name: PaletteName; type?: ThemeType }>,
    ) {
      const newType = action.payload.type || state.selectedThemeType;
      const newPalette = state.allPalettes.find(
        palette => palette.name === action.payload.name,
      );

      if (newPalette) {
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
  },
});

export const { selectPalette, addPalettes, changeThemeType } =
  paletteSlice.actions;

export default paletteSlice.reducer;
