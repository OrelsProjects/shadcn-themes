import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/lib/store";
import { Palette, ThemePalette, ThemeType } from "@/models/palette";
import { basePalettes } from "@/lib/consts";

type PaletteName = string;

export interface ThemeState {
  selectedPalette: ThemePalette;
  selectedPaletteName: PaletteName;
  selectedThemeType: ThemeType;
  allPalettes: Palette;
}

export const initialState: ThemeState = {
  allPalettes: basePalettes,
  selectedThemeType: "light",
  selectedPaletteName: "base",
  selectedPalette: basePalettes["base"]["light"],
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
      const newPalette = state.allPalettes[action.payload.name]?.[newType];
      if (newPalette) {
        state.selectedPaletteName = action.payload.name;
        state.selectedPalette = newPalette;
        state.selectedThemeType = newType;
      }
    },
    changeThemeType(state) {
      state.selectedThemeType =
        state.selectedThemeType === "light" ? "dark" : "light";
      state.selectedPalette =
        state.allPalettes[state.selectedPaletteName][state.selectedThemeType];
    },
    addPalettes(state, action: PayloadAction<Palette>) {
      state.allPalettes = { ...state.allPalettes, ...action.payload };
    },
  },
});

export const { selectPalette, addPalettes, changeThemeType } =
  paletteSlice.actions;

export default paletteSlice.reducer;
