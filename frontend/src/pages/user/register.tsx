import React from "react";
import Field from "../../components/Input";
import { useForm } from "react-hook-form";
import { AJAX } from "../../utils/getJson";
import { API_URL } from "../../config";
import { useNavigate } from "react-router";
import "../../assets/styles/userFunctionality/register.scss";

type FormInputs = {
  email: string;
  name: string;
  password: string;
  surname: string;
  date_of_birth: string;
  city: string;
  post_code: string;
  street: string;
};

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({
    criteriaMode: "all",
  });

  const navigate = useNavigate();

  const registerUser = async (data: FormInputs) => {
    try {
      data = await AJAX(`${API_URL}/users/sign_up/`, true, data);
      navigate("/");
    } catch (err) {
      alert("something when wrong");
    }
  };

  return (
    <>
      <div className="register-page">
        <div className="register-container">
          <form onSubmit={handleSubmit(registerUser)}>
            <h1>Register</h1>
            <Field label="" error={errors.email} required>
              <>
                <input
                  {...register("email", {
                    required: "Email is required",
                    maxLength: {
                      value: 256,
                      message:
                        "Description cannot be longer than 256 characters",
                    },
                  })}
                  type="text"
                  id="email"
                  placeholder="email"
                  className={`${errors.email ? "alert-active" : ""}`}
                />
              </>
            </Field>
            <Field label="" error={errors.password} required>
              <>
                <input
                  {...register("password", {
                    required: "Password is required",
                    maxLength: {
                      value: 100,
                      message: "Password cannot be longer than 100 characters",
                    },
                    minLength: {
                      value: 8,
                      message: "Password cannot be shorther than 8 characters",
                    },
                  })}
                  type="password"
                  id="password"
                  placeholder="password"
                  className={`${errors.password ? "alert-active" : ""}`}
                />
              </>
            </Field>
            <Field label="" error={errors.name} required>
              <>
                <input
                  {...register("name", {
                    required: "Name is required",
                    maxLength: {
                      value: 20,
                      message: "Name cannot be longer than 20 characters",
                    },
                  })}
                  type="text"
                  id="name"
                  placeholder="name"
                  className={`${errors.name ? "alert-active" : ""}`}
                />
              </>
            </Field>
            <Field label="" error={errors.surname} required>
              <>
                <input
                  {...register("surname", {
                    required: "Surname is required",
                    maxLength: {
                      value: 20,
                      message: "Surname cannot be longer than 20 characters",
                    },
                  })}
                  type="text"
                  id="surname"
                  placeholder="surname"
                  className={`${errors.surname ? "alert-active" : ""}`}
                />
              </>
            </Field>
            <Field label="" error={errors.date_of_birth} required>
              <>
                <input
                  {...register("date_of_birth", {
                    required: "Date of birth is required",
                  })}
                  type="date"
                  id="date_of_birth"
                  placeholder="date of birth"
                  className={`${errors.date_of_birth ? "alert-active" : ""}`}
                />
              </>
            </Field>
            <Field label="" error={errors.city} required>
              <>
                <input
                  {...register("city", { required: "City is required" })}
                  type="text"
                  id="city"
                  placeholder="city"
                  className={`${errors.city ? "alert-active" : ""}`}
                />
              </>
            </Field>
            <Field label="" error={errors.post_code} required>
              <>
                <input
                  {...register("post_code", {
                    required: "Postal Code is required",
                    pattern: {
                      value: /^[0-9]{2}-[0-9]{3}/i,
                      message: "wrong format of post code",
                    },
                  })}
                  type="text"
                  id="post_code"
                  placeholder="postal code"
                  className={`${errors.post_code ? "alert-active" : ""}`}
                />
              </>
            </Field>
            <Field label="" error={errors.street} required>
              <>
                <input
                  {...register("street", {
                    required: "Street name is required",
                    maxLength: {
                      value: 50,
                      message: "Street cannot be longer than 50 characters",
                    },
                  })}
                  className={`${errors.street ? "alert-active" : ""}`}
                  type="text"
                  id="street"
                  placeholder="street"
                />
              </>
            </Field>
            <input className="submit-button" type="submit" />
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
