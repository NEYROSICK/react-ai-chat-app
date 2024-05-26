import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/firebase";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { InputPassword } from "@/components/ui/input-password";

import { useForm } from "react-hook-form";
import { loginSchema } from "@/validators/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import LanguagesSwitch from "@/components/LanguagesSwitch";
import { useTranslation } from "react-i18next";

const Login = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSubmit = async (data) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
      const user = userCredential.user;
      localStorage.setItem("token", user.accessToken);
      localStorage.setItem("user", JSON.stringify(user));

      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <div className="flex justify-center items-center h-full">
      <LanguagesSwitch className="absolute bottom-6 right-6" />
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="text-center text-3xl">{t("loginTitle")}</CardTitle>
          <CardDescription className="text-center">{t("loginSubtitle")}</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("emailField")}</FormLabel>
                    <FormControl>
                      <Input placeholder={t("emailField")} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className=" mt-3">
                    <FormLabel>{t("passwordField")}</FormLabel>
                    <FormControl>
                      <InputPassword placeholder={t("passwordField")} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="w-full mt-6" type="submit">
                {t("loginSubmitButton")}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="block">
          <CardDescription className="text-center">
            {t("navigateToRegisterTitle")}{" "}
            <Link to="/signup" className="text-white font-semibold hover:underline">
              {t("navigateToRegisterUrl")}
            </Link>
          </CardDescription>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;

