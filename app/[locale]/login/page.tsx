import { Logo } from "@/components/layout/logo";
import { GoogleButton } from "@/components/auth/google-button";
import { AuthHeader } from "@/components/auth/auth-header";
import { AuthDivider } from "@/components/auth/auth-divider";
import { LoginForm } from "@/components/auth/login-form";

export default function Login() {
  return (
    <div className="flex flex-col desktop:flex-row">
      <section className="flex flex-col gap-3 py-5 md:py-8 px-4 md:px-10 desktop:px-20 max-w-200">
        <Logo />
        <div className="flex flex-col gap-6">
          <AuthHeader
            eyebrow="welcomeBack"
            title="signInToShelf"
            description="yourReadingList"
          />
          <GoogleButton />
          <AuthDivider />
          <LoginForm />
        </div>
      </section>
      <section className="max-w-200"></section>
    </div>
  );
}
