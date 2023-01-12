import { TailSpin } from "react-loader-spinner";

export function Loader() {
  return (
    <TailSpin
      height="40"
      width="100%"
      color="#1877f2"
      ariaLabel="tail-spin-loading"
      radius="1"
      visible={true}
      wrapperStyle={{ marginTop: "40px" }}
    />
  );
}
