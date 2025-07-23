import { useState } from "react";
import ColorButton from "./components/ColorButton";
import ColorPreview from "./components/ColorPreview";
import "./index.css";

const colors = ["red", "blue", "green", "yellow", "purple","violet", "orange", "pink", "brown", 
"cyan", "magenta","lime", "teal", "indigo", "gold", "silver", "gray","black", "white","navy", "maroon","olive","turquoise", "coral", "salmon", "plum", "orchid", "khaki", "tan", "chocolate", "crimson", "sienna", "azure", "aquamarine"];


function App() {
  const [selectedColor, setSelectedColor] = useState("");

  return (
    <div>
      <h1>🎨 Color Palette Picker</h1>
      <div>
        {colors.map((color) => (
          <ColorButton key={color} color={color} onClick={setSelectedColor} />
        ))}
      </div>
      <ColorPreview color={selectedColor} />
      <button className="reset-button" onClick={() => setSelectedColor("")}>
        Reset
      </button>
    </div>
  );
}

export default App;
