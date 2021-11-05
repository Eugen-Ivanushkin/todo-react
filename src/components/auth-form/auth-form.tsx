import React from 'react';

//components
import { Form, Field } from 'react-final-form';

//@ts-ignore
import styles from './style.module.scss';

//interfaces
interface Props {
  onhandleSabmit: (values: Values) => void;
}

interface Values {
  email: string;
  password: string;
}

const required = (value: string) => (value ? undefined : 'Required');

const AuthForm = ({ onhandleSabmit }: Props) => {
  let formData = {};

  return (
    <div className={styles.wrapper}>
      <Form
        onSubmit={onhandleSabmit}
        initialValues={formData}
        render={({ handleSubmit, form, submitting, pristine }) => (
          <form onSubmit={handleSubmit}>
            <Field name="Email" validate={required}>
              {({ input, meta }) => (
                <div>
                  <label>Email</label>
                  <input {...input} type="email" placeholder="Email" />
                  {meta.error && meta.touched && <span>{meta.error}</span>}
                </div>
              )}
            </Field>
            <Field name="password" validate={required}>
              {({ input, meta }) => (
                <div>
                  <label>Password</label>
                  <input {...input} type="password" placeholder="Password" />
                  {meta.error && meta.touched && <span>{meta.error}</span>}
                </div>
              )}
            </Field>
            <div className={styles.buttons}>
              <button type="submit" disabled={submitting}>
                Submit
              </button>
              <button
                type="button"
                onClick={form.reset}
                disabled={submitting || pristine}
              >
                Reset
              </button>
            </div>
          </form>
        )}
      />
    </div>
  );
};

export default AuthForm;
