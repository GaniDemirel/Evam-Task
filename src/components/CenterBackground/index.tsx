export const CenterBackground = () => {
  return (
    <>
      <div
        className={
          "main-center-background right-[-200px] top-[25%] lg:right-0 w-[1728px] lg:w-screen "
        }
      >
        <div className="absolute bottom-0 left-0 w-full h-full">
          <div className="main-center-background-vector-blue" />
          <div className="main-center-background-vector-darkBlue" />
        </div>
        <div className="main-center-background-transparent" />
      </div>
      <div
        className={
          "main-center-background-grey right-[-200px] top-[25%] lg:right-0 w-[1728px] lg:w-screen"
        }
      />
    </>
  );
};
