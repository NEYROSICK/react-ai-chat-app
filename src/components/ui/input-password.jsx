import * as React from "react";

import { Input } from "./input";
import { EyeIcon, EyeOffIcon } from "lucide-react";

const InputPassword = React.forwardRef(({ className, ...props }, ref) => {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <div className="relative">
      <Input type={showPassword ? "text" : "password"} className={className} ref={ref} {...props} />
      {showPassword ? (
        <EyeIcon
          className="absolute top-1/2 right-3 -translate-y-1/2 stroke-gray-500 cursor-pointer w-5"
          onClick={() => setShowPassword(false)}
        />
      ) : (
        <EyeOffIcon
          className="absolute top-1/2 right-3 -translate-y-1/2 stroke-gray-500 cursor-pointer w-5"
          onClick={() => setShowPassword(true)}
        />
      )}
    </div>
  );
});
InputPassword.displayName = "InputPassword";

export { InputPassword };

