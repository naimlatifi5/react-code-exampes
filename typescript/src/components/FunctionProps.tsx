interface Props {
  title: string;
  count: number;
  isLoggedIn: boolean;
  status: "waiting" | "success";
  preamble?: string; // optional
  onClick: () => void;
}

const FunctionProps = ({
  title,
  status,
  preamble,
  onClick,
  count,
  isLoggedIn,
}: Props) => {
  const handleOnClick = (): void => {
    onClick();
  };
  return (
    <div>
      FunctionProps, {title}
      Status: {status}
      {preamble}
      Count: {count}
      <button type="button" onClick={handleOnClick}>
        Click
      </button>
      IsLoggedIn: {isLoggedIn}
    </div>
  );
};

export default FunctionProps;
