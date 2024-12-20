import {
  Poppins as PoppinsFont,
  Roboto as RobotoFont,
  Gabarito as GabaritoFont,
  Recursive as RecursiveFont,
  Inter as InterFont,
  Montserrat,
} from "next/font/google";

export const Recursive = RecursiveFont({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const Poppins = PoppinsFont({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const Gabarito = GabaritoFont({
  weight: ["400", "500", "600", "700", "900"],
  subsets: ["latin"],
});

export const MontserratAlternates = Montserrat({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const Roboto = RobotoFont({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
});

export const Inter = InterFont({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});
