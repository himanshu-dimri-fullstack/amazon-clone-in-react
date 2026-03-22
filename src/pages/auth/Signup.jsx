import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { signupUser } from "../../api/api";
import Input from "../../components/Input";
import Button from "../../components/Button";

const Signup = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [error, setError] = useState("");
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (form.password !== form.confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            const { confirmPassword, ...userData } = form;

            const data = await signupUser(userData);

            login(data);
            navigate("/dashboard");

        } catch (err) {
            setError(err.message || "Something went wrong");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-10 p-3">

            <Input type={"text"}
                name={"name"}
                placeholder={"Name"}
                value={form.name}
                onChange={handleChange}
                required={"required"}
            />

            <Input type={"email"}
                name={"email"}
                placeholder={"Email"}
                value={form.email}
                onChange={handleChange}
                required={"required"}
            />

            <Input type={"password"}
                name={"password"}
                placeholder={"Password"}
                value={form.password}
                onChange={handleChange}
                required={"required"}
            />

            <Input type={"password"}
                name={"confirmPassword"}
                placeholder={"Confirm Password"}
                value={form.confirmPassword}
                onChange={handleChange}
                required={"required"}
            />


            {error && <p className="text-red-500 mb-2">{error}</p>}

            <Button type={"submit"} text={"Signup"} />

        </form>
    );
};

export default Signup;