import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

import EmployeeService from "../services/EmployeeService";

const AddEmployeeComponent = () => {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [emailId, setEmailId] = useState("");
	const navigate = useNavigate();
	const { id } = useParams();

	const saveOrUpdateEmployee = (e) => {
		e.preventDefault();

		const employee = { firstName, lastName, emailId };

		if (id) {
			EmployeeService.updateEmployee(id, employee)
				.then((response) => {
					navigate("/employees");
				})
				.catch((error) => {
					console.log(error);
				});
		} else {
			EmployeeService.createEmployee(employee)
				.then((response) => {
					console.log(response.data);
					navigate("/employees");
				})
				.catch((error) => {
					console.log(error);
				});
		}
	};

	useEffect(() => {
		EmployeeService.getEmployeeById(id)
			.then((response) => {
				setFirstName(response.data.firstName);
				setLastName(response.data.lastName);
				setEmailId(response.data.emailId);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	const title = () => {
		if (id) {
			return <h2 className="text-center">Update Employee</h2>;
		} else {
			return <h2 className="text-center">Add Employee</h2>;
		}
	};

	return (
		<div>
			<br />
			<div className="container">
				<div className="row">
					<div className="card col-md-6 offset-md-3 offset-md-3">
						{title()}
						<div className="card-body">
							<form action="">
								<div className="form-group mb-2">
									<label htmlFor="" className="form-label">
										First Name:{" "}
									</label>
									<input
										type="text"
										className="form-control"
										placeholder="Enter First Name..."
										name="firstName"
										value={firstName}
										onChange={(e) => setFirstName(e.target.value)}
									/>
								</div>
								<div className="form-group mb-2">
									<label htmlFor="" className="form-label">
										Last Name:{" "}
									</label>
									<input
										type="text"
										className="form-control"
										placeholder="Enter Last Name..."
										name="lastName"
										value={lastName}
										onChange={(e) => setLastName(e.target.value)}
									/>
								</div>
								<div className="form-group mb-2">
									<label htmlFor="" className="form-label">
										Email:{" "}
									</label>
									<input
										type="email"
										className="form-control"
										placeholder="Enter Email..."
										name="emailId"
										value={emailId}
										onChange={(e) => setEmailId(e.target.value)}
									/>
								</div>

								<button
									className="btn btn-success"
									onClick={(e) => saveOrUpdateEmployee(e)}
								>
									Submit
								</button>
								<Link to="/employees" className="btn btn-danger">
									Cancel
								</Link>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AddEmployeeComponent;
