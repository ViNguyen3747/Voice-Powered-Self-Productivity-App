import React, { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { useParams } from "react-router-dom";
import { Button, Form } from "semantic-ui-react";

import { RESET_PASSWORD } from "../../utils/graphQL/mutation";
import { passwordSchema } from "../../utils/validation/authenticationValidation";

const ResetPassword = () => {
  const { reset_token } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(passwordSchema) });
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState("");
  const [resetPassword] = useMutation(RESET_PASSWORD);

  const onSubmit = (userData) => {
    try {
      const { password } = userData;
      const { data } = resetPassword({
        variables: { token: reset_token, newPassword: password },
      });
      if (data) setSuccess("Password is reset successfully");
    } catch (e) {
      setErr("Fail to change password");
    }
  };

  return (
    <div className="container">
      <div className="formContainer">
        <div className="formWrapper">
          <div className="header">Reset Password</div>
          {err && <div>{err}</div>} {success && <div>{success}</div>}
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Field required>
              <input
                type="password"
                {...register("password")}
                placeholder="Password..."
              />
              <p className="errorText">{errors.password?.message}</p>
            </Form.Field>
            <Form.Field required>
              <input
                type="password"
                {...register("retypePassword")}
                placeholder="Confirm Password..."
              />
              <p className="errorText">{errors.retypePassword?.message}</p>
            </Form.Field>
            <div>
              <Button secondary type="submit">
                Submit
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
