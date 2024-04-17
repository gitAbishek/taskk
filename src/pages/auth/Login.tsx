import React, { useState } from "react";
import InputForm from "../../components/form/InputForm";
import Button from "../../components/button/Button";
import { checkIfEmpty } from "../../utils/validation";
import { showErrorMessage, showSuccessMessage } from "../../utils/toast";
import { useLoginAccount } from "../../hook/auth.hook";
import { getValue } from "../../utils/object";
import AuthImage from "../../assets/image/auth-image.jpeg";
import { AUTH_COOKIE_CONFIG, IP_ADDRESS } from "../../constant/common";
import { setCookie } from "../../utils/cookie";
import { useAuthContext } from "../../hook/contextConsumer.hooks";

const Login: React.FC = () => {

  const {setIsLoggedIn} = useAuthContext()

  const [loginAccountData, setLoginAccountData] = useState({
    login_id: "",
    login_password: "",
    ip_address: IP_ADDRESS,
  });
  const [showPassword, setShowPassword] = useState(false);

  const { mutateAsync: loginAccount, isPending } = useLoginAccount();

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginAccountData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const verifyFields = () => {
    if (checkIfEmpty(loginAccountData.login_id)) {
      showErrorMessage("Please enter email address ");
      return false;
    }
    if (checkIfEmpty(loginAccountData.login_password)) {
      showErrorMessage("Please enter password");
      return false;
    }

    return true;
  };

  const onLoginAccount = async () => {
    try {
      if (!verifyFields()) {
        return;
      }
      const response = await loginAccount(loginAccountData);
      const jwtToken = getValue(response, 'data[0].jwt_token')
      setCookie({cookieName:AUTH_COOKIE_CONFIG.BEARER_TOKEN, value: jwtToken, expiresIn: 1})
      showSuccessMessage(getValue(response, "message"));
      setIsLoggedIn(true)
    } catch (error) {
      showErrorMessage(getValue(error, 'message'));
    }
  };

  return (
    <div className="w-full flex flex-wrap  justify-center   lg:justify-between  h-screen px-6 lg:px-0 overflow-hidden bg-black">
      <div className="w-full md:w-1/2 flex flex-col items-center mt-10 md:mt-20 lg:mt-32">
        <div className="w-full lg:w-[60%] flex flex-col gap-8">
          <h2 className="text-3xl font-bold">Welcome back! ✨</h2>

          <div>
            <InputForm
              value={loginAccountData.login_id}
              onChange={onInputChange}
              name="login_id"
              type="email"
              label="Email"
            />
          </div>
          <div>
            <InputForm
              value={loginAccountData.login_password}
              onChange={onInputChange}
              name="login_password"
              type={showPassword ? "text" : "password"}
              label="Password"
              showEye
              onEyeClick={() => setShowPassword(!showPassword)}
            />
          </div>

          <div className="">
            <Button
              title="Sign In"
              onClick={onLoginAccount}
              styles={`${isPending ? "bg-gray-500" : "bg-[#6366f2]"}`}
            />
          </div>

          {/* <div className="border-t border-gray-500 pt-4">
            <p className="text-gray-500 font-light text-sm">
              New to BlockSeas?
              <Link
                to={PATH.signUp}
                className="pl-2 text-[#6366f1] hover:underline"
              >
                Create an account
              </Link>
            </p>

            <div className="pt-1">
              <p className="text-gray-500 font-light text-sm">
                Forgot password?
                <Link
                  to={PATH.forgotPassowrd}
                  className="pl-2 text-[#6366f1] hover:underline"
                >
                  Click here
                </Link>
              </p>
            </div>
          </div> */}
        </div>
      </div>

      <div className="hidden lg:block w-1/2 ">
        <img src={AuthImage} alt="Authentication" className="h-full" />
      </div>
    </div>
  );
};

export default Login;
