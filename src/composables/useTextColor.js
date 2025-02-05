

export default function useTextColor() {

    function hexToRgb(hex) {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return { r, g, b };
      }
    
      // Berechnung, ob der Hintergrund dunkel oder hell ist
      const isDarkBackground = (hex) => {
        const rgb = hexToRgb(hex);
        const yiq = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
        return yiq < 128; // Dunkel: Textfarbe weiß, hell: Textfarbe schwarz
      };
  
      const getTextColor = (hex) => {
        console.log('hex', hex);
        console.log('isDarkBackground(hex)', isDarkBackground(hex));
        return isDarkBackground(hex) ? '#FFFFFF' : '#000000';
      };
        
      return { isDarkBackground, getTextColor };
}