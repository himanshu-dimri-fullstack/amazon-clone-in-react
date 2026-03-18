import { useContext, useState, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Input from "../components/Input";

const Checkout = () => {
    const navigate = useNavigate();

    const { cart, setCart } = useContext(CartContext);

    useEffect(() => {
        if (cart.length === 0) {
            navigate("/");
        }
    }, []);

    const [form, setForm] = useState({
        name: "",
        address: "",
        city: "",
        phone: "",
        pincode: "",
    });

    const [payment, setPayment] = useState("COD");

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.qty,
        0
    );

    const handleSubmit = (e) => {
        e.preventDefault();

        if (form.phone.length !== 10) {
            alert("Phone must be 10 digits");
            return;
        }

        if (form.pincode.length !== 6) {
            alert("Pincode must be 6 digits");
            return;
        }

        const orderData = {
            customer: form,
            items: cart,
            total: total,
            date: new Date().toLocaleString(),
        };

        setCart([]);

        navigate("/success", { state: orderData });
    };

    return (
        <div className="max-w-6xl mx-auto p-6 grid md:grid-cols-2 gap-8">

            <div className="bg-white shadow-lg rounded-xl p-6">
                <h2 className="text-2xl font-semibold mb-6">
                    Delivery Details
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">

                    <Input required={"required"} type={"text"} placeholder={"Full Name"}
                        value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />

                    <textarea
                        required
                        placeholder="Full Address"
                        value={form.address}
                        onChange={(e) =>
                            setForm({ ...form, address: e.target.value })
                        }
                        className="w-full mb-3 px-3 py-2 min-h-25 border border-gray-300 rounded-md
                                 bg-white text-sm resize-none
                                 placeholder-gray-400
                                   outline-none
                                   transition-all duration-200
                                 focus:border-[#e77600]
                                    focus:ring-2 focus:ring-[#f0c14b]/40"
                    />

                    <Input required={"required"} type={"text"} placeholder={"City"}
                        value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />

                    <Input required={"required"} type={"text"} placeholder={"Phone Number"}
                        value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value.replace(/\D/g, "") })} />

                    <Input required={"required"} type={"text"} placeholder={"Pincode"}
                        value={form.pincode} onChange={(e) => setForm({ ...form, pincode: e.target.value.replace(/\D/g, "") })} />

                    <div>
                        <h3 className="font-semibold mb-3 text-lg">Payment Method</h3>

                        <div className="space-y-3">

                            {["COD", "UPI", "CARD"].map((method) => (
                                <label
                                    key={method}
                                    className={`flex items-center gap-3 border p-3 rounded-md cursor-pointer transition-all duration-200
                                   ${payment === method
                                            ? "border-[#e77600] bg-[#fff8f0]"
                                            : "border-gray-300 hover:border-[#e77600]"
                                        }`}
                                >

                                    <input
                                        type="radio"
                                        name="payment"
                                        checked={payment === method}
                                        onChange={() => setPayment(method)}
                                        className="w-4 h-4 accent-[#e77600] cursor-pointer"
                                    />

                                    <span className="text-sm font-medium text-gray-800">
                                        {method === "COD" && "Cash on Delivery"}
                                        {method === "UPI" && "UPI Payment"}
                                        {method === "CARD" && "Debit / Credit Card"}
                                    </span>

                                </label>
                            ))}
                        </div>
                    </div>
                    <Button text={"Place Order"} type={"submit"} />
                </form>
            </div>


            <div className="bg-white shadow-lg rounded-xl p-6">
                <h2 className="text-2xl font-semibold mb-6">
                    Order Summary
                </h2>

                <div className="space-y-4 max-h-75 overflow-y-auto">
                    {cart.map((item) => (
                        <div
                            key={item.id}
                            className="flex justify-between border-b pb-2"
                        >
                            <div>
                                <p className="font-medium">{item.title}</p>
                                <p className="text-sm text-gray-500">
                                    Qty: {item.qty}
                                </p>
                            </div>

                            <p className="font-semibold">
                                ₹{item.price * item.qty}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="mt-6 border-t pt-4 flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span>₹{total}</span>
                </div>
            </div>

        </div>
    );
};

export default Checkout;