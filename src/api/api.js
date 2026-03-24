const BASE_URL = "https://amazon-server-five.vercel.app";

export const getNavbarLinks = async () => {
    const res = await fetch(`${BASE_URL}/api/navbar`);
    return res.json();
};

export const getCategories = async () => {
    const res = await fetch(`${BASE_URL}/api/categories`);
    return res.json();
};

export const getSubcategories = async () => {
    const res = await fetch(`${BASE_URL}/api/subcategories`);
    return res.json();
};

export const getProducts = async (subcategoryId) => {
    const res = await fetch(
        `${BASE_URL}/api/products?subcategoryId=${subcategoryId}`
    );
    return res.json();
};

export const getMobileProducts = async () => {
    const res = await fetch(
        `${BASE_URL}/api/products`
    );
    return res.json();
};

export const getProductBySlug = async (slug) => {
    const res = await fetch(`${BASE_URL}/api/products?slug=${slug}`);
    const data = await res.json();
    console.log(data);
    return data[0];
};

export const loginUser = async (email) => {
    const res = await fetch(`${BASE_URL}/api/users?email=${email}`);
    return res.json();
};

export const signupUser = async (user) => {

    const checkRes = await fetch(`${BASE_URL}/api/users?email=${user.email}`);
    const checkData = await checkRes.json();

    if (checkData.length > 0) {
        throw new Error("User with this email already exists");
    }

    const res = await fetch(`${BASE_URL}/api/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user)
    });

    return res.json();
};

