import { useEffect } from "react";

import "./alertWindow.css";

const AlertWindow = ({ alertActive, setAlertActive, setAlertWindowOpen }) => {
  const handleCancelAlert = () => {
    setAlertActive(false);
    setTimeout(() => {
      setAlertWindowOpen(false);
    }, 5000);
  };

  return (
    <div className="absolute top-16 right-4 z-20">
      <div className="w-60 p-4 h-fit rounded-xl bg-gradient-to-t dark:from-slate-800 dark:to-slate-700 dark:text-white flex flex-col justify-start items-center gap-2">
        {alertActive ? (
          <>
            <p className="text-xl font-semibold">
              We have recorded your response.
            </p>
            <p className="text-xl font-semibold">
              Hold still. Help will arrive soon.
            </p>
            <div className="flex gap-1 items-center">
              <p>If this is a mistake,</p>
              <div
                className="rounded-xl w-fit bg-green-500 p-2 flex items-center justify-center font-semibold"
                onClick={() => handleCancelAlert()}
              >
                I'm Safe
              </div>
            </div>
          </>
        ) : (
          <>
            <p className="text-xl font-semibold">
              We are relieved to hear that!
            </p>
            <p>
              Reach out to the community whenever again you need. Take care...
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default AlertWindow;
