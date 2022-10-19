import React, { useState } from "react";
import { Form } from "semantic-ui-react";
import { useFormik } from "formik";
import { Newsletter as NewsletterController } from "../../../../api";
import { initialValues, validationSchema } from "./Newsletter.form";
import "./Newsletter.scss";

const newsletterController = new NewsletterController();

export function Newsletter() {
  const [successs, setSuccesss] = useState(false);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      setSuccesss(false);

      try {
        await newsletterController.registerEmail(formValue.email);
        formik.resetForm();
        setSuccesss(true);
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <div className="footer-newsletter">
      <h4>¡Apuntarte y aprende!</h4>

      <Form onSubmit={formik.handleSubmit}>
        <Form.Input
          name="email"
          placeholder="Correo electronico"
          onChange={formik.handleChange}
          value={formik.values.email}
          error={formik.errors.email}
        />
        <Form.Button type="submit" primary fluid loading={formik.isSubmitting}>
          ¡Me suscribo!
        </Form.Button>

        {successs && (
          <p className="success">¡Email registrado correctamente!</p>
        )}
      </Form>
    </div>
  );
}
