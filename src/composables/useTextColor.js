/**
 * Provides utility functions to determine appropriate text colors based on background colors.
 *
 * @returns {{
*   isDarkBackground: (hex: string) => boolean,
*   getTextColor: (hex: string) => string
* }}
*/
export default function useTextColor() {

 /**
  * Converts a hex color code to its RGB representation.
  * 
  * @param {string} hex - The hex color code (e.g., "#FFFFFF").
  * @returns {{ r: number, g: number, b: number }} The RGB values of the color.
  */
 function hexToRgb(hex) {
   const r = parseInt(hex.slice(1, 3), 16);
   const g = parseInt(hex.slice(3, 5), 16);
   const b = parseInt(hex.slice(5, 7), 16);
   return { r, g, b };
 }

 /**
  * Determines if a given hex color code corresponds to a dark background.
  * 
  * Uses the YIQ color contrast formula to assess brightness.
  * 
  * @param {string} hex - The hex color code.
  * @returns {boolean} `true` if the background is dark, otherwise `false`.
  */
 const isDarkBackground = (hex) => {
   const rgb = hexToRgb(hex);
   const yiq = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
   return yiq < 128; // Dark background: white text, light background: black text
 };

 /**
  * Returns the recommended text color (black or white) based on a given background color.
  * 
  * @param {string} hex - The hex color code of the background.
  * @returns {string} The appropriate text color ("#FFFFFF" for dark backgrounds, "#000000" for light backgrounds).
  */
 const getTextColor = (hex) => {
   return isDarkBackground(hex) ? "#FFFFFF" : "#000000";
 };

 return { isDarkBackground, getTextColor };
}
