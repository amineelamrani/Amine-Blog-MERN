const CopySvgComponent = ({ theme }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5">
    <svg
      fill={theme === "dark" ? "#ffffff" : "#000000"}
      className="w-4 h-4 md:w-5 md:h-5"
      viewBox="0 0 32 32"
      data-name="Layer 1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title></title>
      <path d="M27.2,8.22H23.78V5.42A3.42,3.42,0,0,0,20.36,2H5.42A3.42,3.42,0,0,0,2,5.42V20.36a3.43,3.43,0,0,0,3.42,3.42h2.8V27.2A2.81,2.81,0,0,0,11,30H27.2A2.81,2.81,0,0,0,30,27.2V11A2.81,2.81,0,0,0,27.2,8.22ZM5.42,21.91a1.55,1.55,0,0,1-1.55-1.55V5.42A1.54,1.54,0,0,1,5.42,3.87H20.36a1.55,1.55,0,0,1,1.55,1.55v2.8H11A2.81,2.81,0,0,0,8.22,11V21.91ZM28.13,27.2a.93.93,0,0,1-.93.93H11a.93.93,0,0,1-.93-.93V11a.93.93,0,0,1,.93-.93H27.2a.93.93,0,0,1,.93.93Z"></path>
    </svg>
  </svg>
);
export default CopySvgComponent;
