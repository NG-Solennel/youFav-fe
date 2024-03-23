import { FC } from "react";

const Error: FC<{ status: number; message: string }> = ({
  message,
  status,
}) => {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <div className="flex justify-center items-center gap-4">
        <h1 className="font-semibold text-xl text-primary">
          {typeof status === "number" ? status : ""}
        </h1>
        <p className="text-3xl text-white text-opacity-60">|</p>
        <h1 className="font-semibold text-xl">
          {typeof message === "string" ? message : "An error occurred!"}
        </h1>
      </div>
    </div>
  );
};

export default Error;
