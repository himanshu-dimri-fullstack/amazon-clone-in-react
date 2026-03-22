import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { loginUser } from "../../api/api";
import Input from "../../components/Input";
import Button from "../../components/Button";

const Login = () => {
    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const users = await loginUser(form.email);

            if (users.length === 0) {
                setError("User not found");
                return;
            }
            const user = users[0];
            if (user.password !== form.password) {
                setError("Wrong password");
                return;
            }
            login(user);
            navigate("/dashboard");

        } catch (err) {
            setError(err.message || "Something went wrong");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-10 p-3">
            <Input type={"email"} name={"email"} placeholder={"Email"} value={form.email} onChange={handleChange} required={"required"} />
            <Input type={"password"} name={"password"} placeholder={"Password"} value={form.password} onChange={handleChange} required={"required"} />
            {error && <p className="text-red-500 mb-2">{error}</p>}
            <Button type={"submit"} text={"Login"} />
        </form>
    );
};

export default Login;