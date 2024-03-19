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
            <Field label="Email" error={errors.email} required>
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
                />
              </>
            </Field>
            <Field label="Password" error={errors.password} required>
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
                />
              </>
            </Field>
            <Field label="Name" error={errors.name} required>
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
                />
              </>
            </Field>
            <Field label="Surname" error={errors.surname} required>
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
                />
              </>
            </Field>
            <Field label="Date of Birth" error={errors.date_of_birth} required>
              <>
                <input
                  {...register("date_of_birth", {
                    required: "Date of birth is required",
                  })}
                  type="date"
                  id="date_of_birth"
                />
              </>
            </Field>
            <Field label="City" error={errors.city} required>
              <>
                <input
                  {...register("city", { required: "City is required" })}
                  type="text"
                  id="city"
                />
              </>
            </Field>
            <Field label="Postal Code" error={errors.post_code} required>
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
                />
              </>
            </Field>
            <Field label="Street" error={errors.street} required>
              <>
                <input
                  {...register("street", {
                    required: "Street name is required",
                    maxLength: {
                      value: 50,
                      message: "Street cannot be longer than 50 characters",
                    },
                  })}
                  type="text"
                  id="street"
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
