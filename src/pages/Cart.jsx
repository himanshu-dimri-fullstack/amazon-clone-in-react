import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

const Cart = () => {
  const {
    cart,
    removeFromCart,
    increaseQty,
    decreaseQty,
  } = useContext(CartContext);

  const navigate = useNavigate();

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );
  return (
    <div className="bg-gray-100 min-h-screen p-6">

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

        <div className="col-span-12 md:col-span-7 bg-white p-6 rounded-lg shadow">

          <h2 className="text-lg md:text-2xl font-semibold border-b pb-4 mb-4">
            Shopping Cart
          </h2>

          {cart.length === 0 ? (
            <div className="flex justify-center">
              <div className="text-center py-20 w-80">
                <p className="text-gray-500 text-lg mb-4">
                  Your cart is empty
                </p>

                <Button onClick={() => navigate("/")} text={"Continue Shopping"} className={"bg-yellow-500 text-black! hover:bg-yellow-600"} />
              </div>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.id} className="grid grid-cols-12 gap-6 border-b py-3 sm:py-6">
                <div className="col-span-12 md:col-span-3 mx-auto">
                  <img src={item.images[0]} alt="" className="w-28 h-28 sm:w-32 sm:h-32 object-contain" />

                </div>


                <div className="col-span-12 md:col-span-6 flex-1 mx-auto">

                  <h3 className="font-semibold text-sm md:text-lg">
                    {item.title}
                  </h3>

                  <p className="text-green-600 text-sm mt-1">
                    In Stock
                  </p>

                  <div className="flex items-center gap-3 mt-4">

                    <button
                      onClick={() => decreaseQty(item.id)}
                      className="px-3 py-1 border rounded"
                    >
                      −
                    </button>

                    <span className="font-semibold">
                      {item.qty}
                    </span>

                    <button
                      onClick={() => increaseQty(item.id)}
                      className="px-3 py-1 border rounded"
                    >
                      +
                    </button>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 ml-6 hover:underline"
                    >
                      Remove
                    </button>

                  </div>
                </div>

                <div className="col-span-12 md:col-span-3 font-bold text-lg mx-auto">
                  ₹{item.price * item.qty}
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="col-span-12 md:col-span-5 bg-white p-6 rounded-lg shadow h-fit">

            <h3 className="text-lg sm:text-xl font-semibold mb-4">
              Order Summary
            </h3>

            <div className="flex justify-between mb-2">
              <span>Items ({cart.length})</span>
              <span>₹{total}</span>
            </div>

            <div className="border-t pt-4 mt-4 ">
              <div className="flex justify-between font-bold text-lg mb-6">
                <span>Total</span>
                <span>₹{total}</span>
              </div>
              <Button text={"Proceed to buy"} onClick={() => navigate("/checkout")} />
            </div>

          </div>
        )}

      </div>
    </div>
  );
};

export default Cart;
