import { useSelector } from "react-redux";
import { Box, Button, Stepper, Step, StepLabel } from "@mui/material";
import { Formik } from "formik";
import { useState } from "react";
import * as yup from "yup";
import { shades } from "../../theme";
import Payment from "./Payment";
import Shipping from "./Shipping";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
	"pk_test_51MPZZ7Kgfs91rCalh2MZ0ZcOiP04yO8afuYc9IPAvcN1nwlsNoCjybezRYmvGO0EtbymSXhpfnhffMAuA0RCGXWy00jp2xyTxS"
);

const Checkout = () => {
	const [activeStep, setActiveStep] = useState(0);
	const cart = useSelector((state) => state.cart.cart);
	const isFirstStep = activeStep === 0;
	const isSecondStep = activeStep === 1;

	const handleFormSubmit = async (values, actions) => {
		console.log("ActiveStep:", activeStep);
		setActiveStep(activeStep + 1);
		console.log("ActiveStep:", activeStep);

		// copies the billing address into shipping address
		if (isFirstStep && values.shippingAddress.isSameAddress) {
			actions.setFieldValue("shippingAddress", {
				...values.billingAddress,
				isSameAddress: true,
			})
		}

		console.log("Finish first step...");
		console.log(values);

		if (isSecondStep) {
			console.log("Second step starting...");
			makePayment(values);
		}

		actions.setTouched({});
	}

	async function makePayment (values) {
		console.log(values.billingAddress.firstName, values.billingAddress.lastName);
		console.log(cart);
		const stripe = await stripePromise;
		const requestBody = {
			userName: [values.billingAddress.firstName, values.billingAddress.lastName].join(" "),
			email: values.email,
			products: cart.map(({ id, count}) => ({
				id,
				count,
			}))
		};

		console.log(requestBody);

		const response = await fetch("http://localhost:1337/api/orders", {
			method: "POST",
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify(requestBody)
		});

		const session = await response.json();
		await stripe.redirectToCheckout({
			sessionId: session.id
		})
	}

	return (
		<Box width="80%" m="100px auto">
			<Stepper activeStep={activeStep} sx={{ m: "20px 0" }}>
				<Step>
					<StepLabel>Billing</StepLabel>
				</Step>
				<Step>
					<StepLabel>Payment</StepLabel>
				</Step>
			</Stepper>
			<Box>
				<Formik
					onSubmit={handleFormSubmit}
					initialValues={initialValues}
					validationSchema={checkoutSchema[activeStep]}
				>
					{({
						values,
						errors,
						touched,
						handleBlur,
						handleChange,
						handleSubmit,
						setFieldValue
					}) => (
						<form onSubmit={handleSubmit}>
							{isFirstStep && (
								<Shipping 
									values={values}
									errors={errors}
									touched={touched}
									handleBlur={handleBlur}
									handleChange={handleChange}
									setFieldValue={setFieldValue}
								/>
							)}
							{isSecondStep && (
								<Payment 
									values={values}
									errors={errors}
									touched={touched}
									handleBlur={handleBlur}
									handleChange={handleChange}
									setFieldValue={setFieldValue}
								/>
							)}
							<Box display="flex" justifyContent="space-between" gap="50px">
								{!isFirstStep && (
									<Button
										fullwidth="true"
										color="primary"
										variant="contained"
										sx={{
											backgroundColor: shades.primary[200],
											boxShadow: "none",
											color: "white",
											borderRadius: 0,
											padding: "15px 40px"
										}}
										onClick={() => setActiveStep(activeStep - 1)}
									>Back</Button>
								)}
								<Button
									fullwidth="true"
									type="submit"
									color="primary"
									variant="contained"
									sx={{
										backgroundColor: shades.primary[400],
										boxShadow: "none",
										color: "white",
										borderRadius: 0,
										padding: "15px 40px"
									}}
									>
										{!isSecondStep ? "Next" : "Place Order"}
									</Button>
							</Box>
						</form>
					)}
				</Formik>
			</Box>
		</Box>
	);
};

const initialValues = {
	billingAddress: {
		firstName: "",
		lastName: "",
		country: "",
		street1: "",
		street2: "",
		city: "",
		state: "",
		zipCode: "",
	},
	shippingAddress: {
		isSameAddress: true,
		firstName: "",
		lastName: "",
		country: "",
		street1: "",
		street2: "",
		city: "",
		state: "",
		zipCode: "",
	},
	email: "",
	phoneNumber: ""
}

const checkoutSchema = [
	yup.object().shape({
		billingAddress: yup.object().shape({
			firstName: yup.string().required("required"),
			lastName: yup.string().required("required"),
			country: yup.string().required("required"),
			street1: yup.string().required("required"),
			street2: yup.string(),
			city: yup.string().required("required"),
			state: yup.string().required("required"),
			zipCode: yup.string().required("required"),
		}),
		shippingAddress: yup.object().shape({
			isSameAddress: yup.boolean(),
			firstName: yup.string().when("isSameAddress", {
				is: false,
				then: yup.string().required("required"),
			}),
			lastName: yup.string().when("isSameAddress", {
				is: false,
				then: yup.string().required("required"),
			}),
			country: yup.string().when("isSameAddress", {
				is: false,
				then: yup.string().required("required"),
			}),
			street1: yup.string().when("isSameAddress", {
				is: false,
				then: yup.string().required("required"),
			}),
			street2: yup.string(),
			city: yup.string().when("isSameAddress", {
				is: false,
				then: yup.string().required("required"),
			}),
			state: yup.string().when("isSameAddress", {
				is: false,
				then: yup.string().required("required"),
			}),
			zipCode: yup.string().when("isSameAddress", {
				is: false,
				then: yup.string().required("required"),
			}),
		}),
	}),
	yup.object().shape({
		email: yup.string().required("required"),
		phoneNumber: yup.string().required("required")
	})
]


export default Checkout;