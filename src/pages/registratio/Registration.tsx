import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { useRegisterMutation } from "../../redux/fetchers/auth/authApi";
import { toast } from "react-toastify";
import { TbFidgetSpinner } from "react-icons/tb";
import { ReUsableImageUploder } from "../../utils";
import { useState } from "react";
import { ImagePreview } from "../../utils/previewImage";
import { ArrowRight, CarFront, Eye, EyeOff, ImagePlus, LockKeyhole, Mail, Phone, UserRound } from "lucide-react";
import { Button } from "../../components/ui/button";
import "../login/Login.css";
import "./Registration.css";

const Registration = () => {
  const { register, handleSubmit } = useForm();
  const [image, setImage] = useState<File[] | []>([])
  const [preview, setPreview] = useState<string[] | []>([])
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [registration, { isLoading }] = useRegisterMutation();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      setLoading(true)
      if (data?.password !== data?.confirmPassword) {
        toast.error("Password and Confirm Password must match.")
      }
      const imageFromData = new FormData()

      imageFromData.append("file", image[0])

      imageFromData.append('upload_preset', "my_preset")

      const imgRes = await fetch('https://api.cloudinary.com/v1_1/dwduymu1l/image/upload', {
        method: "POST",
        body: imageFromData
      })
      const imageData = await imgRes.json()
      const photoURL = imageData.secure_url

      data.profileImg = photoURL


      const res = await registration(data);



      if (res?.data?.success) {
        setLoading(false)
        toast.success(res?.data?.message);
        navigate('/login')
      }

    } catch (err) {
      setLoading(false)
      const error = err as { data?: { errorMessage?: string } };
      toast.error(error?.data?.errorMessage ?? 'Something went wrong');
    }

  };

  return (
    <section className="login-page registration-page" aria-labelledby="registration-title">
      <div className="login-page__container">
        <div className="login-page__layout">
          <aside className="login-story" aria-labelledby="registration-story-title">
            <img className="login-story__image" src="/images/hero/drive-your-dream.jpg" alt="" />
            <div className="login-story__shade" aria-hidden="true" />
            <div className="login-story__copy">
              <p className="login-story__eyebrow">Welcome to AutoSphere</p>
              <h2 id="registration-story-title">A new journey.<br /><span>Made for you.</span></h2>
              <p className="login-story__description">Your first car or your next upgrade. Take the next step toward a drive that fits your life.</p>
            </div>
            <div className="login-story__footer">
              <CarFront aria-hidden="true" />
              <p>Your next chapter starts with AutoSphere.</p>
            </div>
          </aside>

          <div className="login-panel">
            <div className="login-panel__content">
              <div className="login-panel__heading">
                <p className="login-panel__eyebrow">Join AutoSphere</p>
                <h1 id="registration-title">Create an account</h1>
                <p>Create your profile and take the first step toward your next car.</p>
              </div>

              <form className="login-form registration-form" onSubmit={handleSubmit(onSubmit)} aria-busy={isLoading || loading}>
                <div className="registration-form__fields">
                  <div className="login-form__field">
                    <label htmlFor="firstName">First Name</label>
                    <div className="login-form__input-wrap">
                      <UserRound aria-hidden="true" />
                      <input type="text" id="firstName" className="login-form__input" placeholder="First Name" {...register("firstName")} />
                    </div>
                  </div>
                  <div className="login-form__field">
                    <label htmlFor="lastName">Last Name</label>
                    <div className="login-form__input-wrap">
                      <UserRound aria-hidden="true" />
                      <input type="text" id="lastName" className="login-form__input" placeholder="Last Name" {...register("lastName")} />
                    </div>
                  </div>
                  <div className="login-form__field">
                    <label htmlFor="email">Your email</label>
                    <div className="login-form__input-wrap">
                      <Mail aria-hidden="true" />
                      <input type="email" id="email" className="login-form__input" placeholder="name@company.com" {...register("email")} />
                    </div>
                  </div>
                  <div className="login-form__field">
                    <label htmlFor="phoneNumber">Phone Number</label>
                    <div className="login-form__input-wrap">
                      <Phone aria-hidden="true" />
                      <input type="text" id="phoneNumber" className="login-form__input" placeholder="017xx-xxxxxx" {...register("phoneNumber")} />
                    </div>
                  </div>
                  <div className="login-form__field">
                    <label htmlFor="password">Password</label>
                    <div className="login-form__input-wrap">
                      <LockKeyhole aria-hidden="true" />
                      <input type={showPassword ? "text" : "password"} id="password" placeholder="••••••••" className="login-form__input login-form__input--password" {...register("password")} />
                      <button type="button" className="login-form__password-toggle" aria-label={showPassword ? "Hide password" : "Show password"} aria-controls="password" onClick={() => setShowPassword((visible) => !visible)}>
                        {showPassword ? <EyeOff aria-hidden="true" /> : <Eye aria-hidden="true" />}
                      </button>
                    </div>
                  </div>
                  <div className="login-form__field">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <div className="login-form__input-wrap">
                      <LockKeyhole aria-hidden="true" />
                      <input type={showConfirmPassword ? "text" : "password"} id="confirmPassword" placeholder="••••••••" className="login-form__input login-form__input--password" {...register("confirmPassword")} />
                      <button type="button" className="login-form__password-toggle" aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"} aria-controls="confirmPassword" onClick={() => setShowConfirmPassword((visible) => !visible)}>
                        {showConfirmPassword ? <EyeOff aria-hidden="true" /> : <Eye aria-hidden="true" />}
                      </button>
                    </div>
                  </div>
                </div>

                <div className={`registration-upload ${preview?.length > 0 ? "registration-upload--preview" : ""}`}>
                  <div className="registration-upload__control">
                    {preview?.length > 0 ? (
                      <ImagePreview setImage={setImage} preview={preview} setPreview={setPreview} />
                    ) : (
                      <>
                        <ReUsableImageUploder setImage={setImage} setPreview={setPreview} label="Upload Profile Picture" />
                        <ImagePlus className="registration-upload__icon" aria-hidden="true" />
                      </>
                    )}
                  </div>
                  {preview?.length > 0 && (
                    <div className="registration-upload__copy">
                      <p>Profile picture</p>
                      <span>Remove the photo to choose another one.</span>
                    </div>
                  )}
                </div>

                {(isLoading || loading) ? (
                  <Button disabled={(isLoading || loading)} className="login-form__submit" aria-label="Creating your account">
                    <TbFidgetSpinner className="animate-spin cursor-no-drop" size={24} />
                    <span>Creating your account…</span>
                  </Button>
                ) : (
                  <Button type="submit" className="login-form__submit">
                    Create an account <ArrowRight aria-hidden="true" />
                  </Button>
                )}
                <p className="login-form__signup">
                  Already have an account? <Link to="/login">Login here</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Registration;
