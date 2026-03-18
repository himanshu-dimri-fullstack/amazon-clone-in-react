const BASE_URL = "https://amazon-server-t4kg.onrender.com/";
// GET navbar menu items
export const getNavbarLinks = async () => {
    const res = await fetch(`${BASE_URL}/navbarLinks`);
    return res.json();
};

// GET all categories
export const getCategories = async () => {
    const res = await fetch(`${BASE_URL}/categories`);
    return res.json();
};
// GET all subcategories
export const getSubcategories = async () => {
    const res = await fetch(`${BASE_URL}/subcategories`);
    return res.json();
};

// GET products by subcategory
export const getProducts = async (subcategoryId) => {
    const res = await fetch(
        `${BASE_URL}/products?subcategoryId=${subcategoryId}`
    );
    return res.json();
};

// GET products
export const getMobileProducts = async () => {
    const res = await fetch(
        `${BASE_URL}/products`
    );
    return res.json();
};

// GET single product by slug
export const getProductBySlug = async (slug) => {
    const res = await fetch(`${BASE_URL}/products?slug=${slug}`);
    const data = await res.json();
    console.log(data);
    return data[0];
};

export const loginUser = async (email) => {
    const res = await fetch(`${BASE_URL}/users?email=${email}`);
    return res.json();
};

export const signupUser = async (user) => {

    const checkRes = await fetch(`${BASE_URL}/users?email=${user.email}`);
    const checkData = await checkRes.json();

    if (checkData.length > 0) {
        throw new Error("User with this email already exists");
    }

    const res = await fetch(`${BASE_URL}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user)
    });

    return res.json();
};

