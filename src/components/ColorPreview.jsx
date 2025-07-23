function ColorPreview({ color }) {
  return (
    <div
      className="preview-box"
      style={{ backgroundColor: color || "#fff" }}
    />
  );
}
export default ColorPreview;
