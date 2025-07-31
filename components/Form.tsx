import React from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { useDispatch } from 'react-redux';
import { setFormData } from '../features/form/formSlice';
//navigate component
import { useNavigate } from 'react-router-dom';

interface IFormData {
  firstname: string;
  lastname: string;
  dob: string;
  gender: string;
  email: string;
  course: string;
  password: string;
  checkbox: boolean;
}

const Form: React.FC = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validationSchema = yup.object({
    firstname: yup.string().required('First Name is required'),
    lastname: yup.string().required('Last Name is required'),
    dob: yup.string().required('Date of Birth is required'),
    gender: yup.string().required('Gender is required'),
    email: yup.string().email('Email is invalid').required('Email is required'),
    course: yup.string().required('Cpurse is Required'),
    password: yup.string().required('Password is required'),
    checkbox: yup.boolean().required('').oneOf([true], 'You must accept the terms and conditions'),

  });

  const { register, handleSubmit, formState: { errors } } = useForm<IFormData>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<IFormData> = (data) => {
    console.log(data);
    dispatch(setFormData(data));
    //store the form data in localStorage
    localStorage.setItem('userData', JSON.stringify(data));
    //navigate to the login page
    navigate('/login');
  }

  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className="card shadow-lg" style={{ maxWidth: "700px", width: "100%", borderRadius: "16px" }}>
        <div className="card-header text-white text-center" style={{ background: "#222", borderTopLeftRadius: "16px", borderTopRightRadius: "16px" }}>
          <h2 className="mb-0" style={{ letterSpacing: "2px" }}>REGISTRATION FORM</h2>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="card-body px-5 py-4">
          <div className="row mb-3 align-items-center">
            <label className="col-md-3 col-form-label fw-bold">Name</label>
            <div className="col-md-4">
              <input
                className={`form-control ${errors.firstname ? "is-invalid" : ""}`}
                type="text"
                placeholder="First Name"
                {...register("firstname")}
              />
              {errors.firstname && <div className="invalid-feedback">{errors.firstname.message}</div>}
            </div>
            <div className="col-md-5">
              <input
                className={`form-control ${errors.lastname ? "is-invalid" : ""}`}
                type="text"
                placeholder="Last Name"
                {...register("lastname")}
              />
              {errors.lastname && <div className="invalid-feedback">{errors.lastname.message}</div>}
            </div>
          </div>
          <div className="row mb-3 align-items-center">
            <label className="col-md-3 col-form-label fw-bold">Date of Birth</label>
            <div className="col-md-9">
              <input
                className={`form-control ${errors.dob ? "is-invalid" : ""}`}
                type="date"
                {...register("dob")}
              />
              {errors.dob && <div className="invalid-feedback">{errors.dob.message}</div>}
            </div>
          </div>
          <div className="row mb-3 align-items-center">
            <label className="col-md-3 col-form-label fw-bold">Gender</label>
            <div className="col-md-9">
              <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" value="Male" {...register("gender")} id="genderMale" />
                <label className="form-check-label" htmlFor="genderMale">Male</label>
              </div>
              <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" value="Female" {...register("gender")} id="genderFemale" />
                <label className="form-check-label" htmlFor="genderFemale">Female</label>
              </div>
              {errors.gender && <div className="text-danger small mt-1">{errors.gender.message}</div>}
            </div>
          </div>
          <div className="row mb-3 align-items-center">
            <label className="col-md-3 col-form-label fw-bold">Email</label>
            <div className="col-md-9">
              <input
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                type="email"
                placeholder="example@email.com"
                {...register("email")}
              />
              {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
            </div>
          </div>
          <div className="row mb-3 align-items-center">
            <label className="col-md-3 col-form-label fw-bold">Course</label>
            <div className="col-md-9">
              <select className={`form-select ${errors.course ? "is-invalid" : ""}`} {...register('course')}>
                <option value="">Choose Option</option>
                <option value="BCA">BCA</option>
                <option value="MCA">MCA</option>
              </select>
              {errors.course && <div className="invalid-feedback">{errors.course.message}</div>}
            </div>
          </div>
          <div className="row mb-3 align-items-center">
            <label className="col-md-3 col-form-label fw-bold">Password</label>
            <div className="col-md-9">
              <input
                type="password"
                className={`form-control ${errors.password ? "is-invalid" : ""}`}
                placeholder="Enter password"
                {...register('password')}
              />
              {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
            </div>
          </div>
          <div className="row mb-4 align-items-center">
            <label className="col-md-6 col-form-label fw-bold">Accept Terms</label>
            <div className="col-md-6">
              <div className="form-check">
                <input type="checkbox" className={`form-check-input ${errors.checkbox ? "is-invalid" : ""}`} {...register("checkbox")} id="checkbox" />
                <label className="form-check-label" htmlFor="checkbox">I accept the terms & conditions</label>
                {errors.checkbox && <div className="text-danger small mt-1">{errors.checkbox.message}</div>}
              </div>
            </div>
          </div>
          <div className="text-center">
            <button type="submit" className="btn btn-danger px-5 py-2 fw-bold" style={{ fontSize: "1.2rem", borderRadius: "8px" }}>
              REGISTER
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Form;