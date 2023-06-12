export default function Loading() {
  return (
    <>
      <div className="h-screen w-screen flex justify-center items-center flex-col bg-amber-50 dark:bg-slate-800 gap-y-5">
        <div
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status">
        </div>
        <p className="">Loading...</p>
      </div>
    </>
  )
}