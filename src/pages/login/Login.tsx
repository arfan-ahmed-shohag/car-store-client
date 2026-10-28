import { Link, useLocation, useNavigate } from "react-router";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useLoginMutation } from "../../redux/fetchers/auth/authApi";
import { toast } from "react-toastify";
import { TbFidgetSpinner } from "react-icons/tb";
import { ArrowRight, CarFront, LockKeyhole, Mail, ShieldCheck, UserRound } from "lucide-react";
import { Button } from "../../components/ui/button";
import { useAppDispatch } from "../../redux/hooks";
import { setUser } from "../../redux/fetchers/auth/authSlice";
import { decodeToken } from "../../utils/jwtDecode";
import "./Login.css";

const Login = () => {
  const { register, handleSubmit, setValue } = useForm();
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useAppDispatch();

  const [login, { isLoading }] = useLoginMutation();

  const demoCredential = {
    admin: {
      email: "anomious313@gmail.com",
      password: "Arfan@gmail.com"
    },
    user: {
      email: "anomious3@gmail.com",
      password: "Arfan@gmail.com"
    }
  }

  const fillDemo = (role: "admin" | "user") => {
    setValue("email", demoCredential[role].email)
    setValue("password", demoCredential[role].password)
  }

  const onSubmit: SubmitHandler<FieldValues> = async (formData) => {
    try {
      const res = await login(formData).unwrap();
      console.log(res)

      if (res?.success) {
        toast.success(res?.message);
        const user = decodeToken(res?.data?.token);
        dispatch(setUser({ user, token: res?.data?.token }));
        navigate(location.state?.from || "/")
      }
    } catch (err) {
      const error = err as { data?: { errorMessage?: string } };
      toast.error(error?.data?.errorMessage ?? 'Something went wrong');
    }
  };

  return (
    <section className="login-page" aria-labelledby="login-title">
      <div className="login-page__container">
        <div className="login-page__layout">
          <aside className="login-story" aria-labelledby="login-story-title">
            <img className="login-story__image" src="/images/hero/drive-your-dream.jpg" alt="" />
            <div className="login-story__shade" aria-hidden="true" />
            <div className="login-story__copy">
              <p className="login-story__eyebrow">Welcome to AutoSphere</p>
              <h2 id="login-story-title">Your next drive.<br /><span>Starts here.</span></h2>
              <p className="login-story__description">From everyday journeys to open-road adventures, find a car that feels like you.</p>
            </div>
            <div className="login-story__footer">
              <CarFront aria-hidden="true" />
              <p>Every journey begins with the right car.</p>
            </div>
          </aside>

          <div className="login-panel">
            <div className="login-panel__content">
              <div className="login-panel__heading">
                <p className="login-panel__eyebrow">Welcome back</p>
                <h1 id="login-title">Sign in to your account</h1>
                <p>Good to see you again. Let’s get you back on the road.</p>
              </div>

              <form className="login-form" onSubmit={handleSubmit(onSubmit)} aria-busy={isLoading}>
                <div className="login-form__field">
                  <label htmlFor="email">Your email</label>
                  <div className="login-form__input-wrap">
                    <Mail aria-hidden="true" />
                    <input type="email" id="email" className="login-form__input" placeholder="name@company.com" {...register("email")} />
                  </div>
                </div>
                <div className="login-form__field">
                  <label htmlFor="password">Password</label>
                  <div className="login-form__input-wrap">
                    <LockKeyhole aria-hidden="true" />
                    <input type="password" id="password" placeholder="••••••••" className="login-form__input" {...register("password")} />
                  </div>
                </div>
                {isLoading ? (
                  <Button className="login-form__submit" aria-label="Signing in">
                    <TbFidgetSpinner className="animate-spin" size={24} />
                    <span>Signing in…</span>
                  </Button>
                ) : (
                  <Button type="submit" className="login-form__submit">
                    Sign in <ArrowRight aria-hidden="true" />
                  </Button>
                )}

                <p className="login-form__signup">
                  Don’t have an account yet? <Link to="/registration">Sign up</Link>
                </p>
              </form>

              <div className="login-demo">
                <p className="login-demo__label">Explore with a demo account</p>
                <div className="login-demo__buttons">
                  <Button type="button" variant="outline" className="login-demo__button" onClick={() => fillDemo("user")}>
                    <UserRound aria-hidden="true" /> User Credential
                  </Button>
                  <Button type="button" variant="outline" className="login-demo__button" onClick={() => fillDemo("admin")}>
                    <ShieldCheck aria-hidden="true" /> Admin Credential
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
