import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, firestore } from "../lib/firebase";

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
import { registerSchema } from "@/validators/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { addDoc, collection } from "firebase/firestore";
import LanguagesSwitch from "@/components/LanguagesSwitch";
import { useTranslation } from "react-i18next";
import { ModeToggle } from "@/components/ModeToggle";

const Signup = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const usersRef = collection(firestore, "users");

  const addUserToCollection = async (user) => {
    await addDoc(usersRef, {
      uid: user.uid,
      username: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      createdAt: new Date(),
    });
  };

  const handleSubmit = async (data) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      const user = userCredential.user;
      await updateProfile(user, {
        displayName: data.username,
      });
      localStorage.setItem("token", user.accessToken);
      localStorage.setItem("user", JSON.stringify(user));
      await addUserToCollection(user);

      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  return (
    <div className="flex justify-center items-center h-full">
      <ModeToggle className="absolute top-6 right-6" />
      <LanguagesSwitch className="absolute bottom-6 right-6" />
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="text-center text-3xl">{t("registerTitle")}</CardTitle>
          <CardDescription className="text-center">{t("registerSubtitle")}</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem className="mb-3">
                    <FormLabel>{t("usernameField")}</FormLabel>
                    <FormControl>
                      <Input placeholder={t("usernameField")} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="mb-3">
                    <FormLabel>{t("emailField")}</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder={t("emailField")} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("passwordField")}</FormLabel>
                    <FormControl>
                      <InputPassword placeholder={t("passwordField")} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="w-full mt-6" type="submit">
                {t("registerSubmitButton")}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="block">
          <CardDescription className="text-center">
            {t("navigateToLoginTitle")}{" "}
            <Link to="/login" className="text-white font-semibold hover:underline">
              {t("navigateToLoginUrl")}
            </Link>
          </CardDescription>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Signup;

