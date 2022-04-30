const SudokoButton = (props) => {
  const buttonText = props.text;
  const buttonKey = props.id;
  const numberbtnClick = props.click;
  return (
    <button
      className="bg-white text-black w-8 h-8 text-lg font-bold rounded m-2 hover:bg-teal-200"
      key={buttonKey}
      onClick={() => {
        numberbtnClick(buttonKey + 1);
      }}
    >
      {buttonText}
    </button>
  );
};

export default SudokoButton;
