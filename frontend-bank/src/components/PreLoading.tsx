import LoadingIcon from "@/components/LoadingIcon";


const PreLoading = (): JSX.Element => {
  return (
    <section className="h-screen bg-black text-center">
      <div className="w-full h-full flex items-center justify-center flex-col">
        <LoadingIcon />
      <p className="text-white text-2xl">Loading</p>
     </div>
    </section>
  );
};

export default PreLoading;
