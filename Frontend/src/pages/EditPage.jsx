import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const EditPage = () => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [category, setCategory] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();
    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        const getProduct = async () => {
            const response = await axios.get(`${API_URL}/products/${id}`);
            setName(response.data.name);
            setPrice(response.data.price);
            setDescription(response.data.description);
            setImage(response.data.image);
            setCategory(response.data.category);
        }
        getProduct();
    }, [id]);

    const editProduct = async (e) => {
        e.preventDefault();
        if (name === "" || price === "" || description === "" || image === "") {
            alert("please fill the inputs");
            return;
        }
        try {
            setIsLoading(true);
            const response = await axios.put(`${API_URL}/products/${id}`, {
                name, price: Number(price), description, image, category, createdBy: user.id
            });
            alert(`Saved "${response.data.name}" successfully!`);
            setIsLoading(false);
            navigate("/");
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    };

    const fields = [
        { label: "Title", value: name, setter: setName, type: "text", placeholder: "e.g. Blue Denim Jacket" },
        { label: "Price (€)", value: price, setter: setPrice, type: "number", placeholder: "0.00" },
        { label: "Description", value: description, setter: setDescription, type: "text", placeholder: "Describe the item's condition, size, brand..." },
        { label: "Image URL", value: image, setter: setImage, type: "text", placeholder: "https://..." },
        { label: "Category", value: category, setter: setCategory, type: "text", placeholder: "e.g. Jackets, Shoes, Accessories" },
    ];

    return (
        <div className="flex items-center justify-center px-4 overflow-y-auto">
            <div className="rounded-2xl bg-gray-100 w-full max-w-lg p-3 mt-2">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-black mb-1">Edit item</h1>
                    <p className="text-gray-400 text-sm">Update your listing details</p>
                </div>
                <form onSubmit={editProduct} className="flex flex-col gap-5">
                    {fields.map(({ label, value, setter, type, placeholder }) => (
                        <div key={label} className="flex flex-col gap-1.5">
                            <label className="text-sm font-semibold text-black">{label}</label>
                            <input
                                type={type}
                                value={value}
                                onChange={(e) => setter(e.target.value)}
                                placeholder={placeholder}
                                className="border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-300 outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100 transition-all bg-gray-50"
                            />
                        </div>
                    ))}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="mt-2 bg-cyan-600 hover:bg-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl text-sm tracking-wide transition-colors cursor-pointer"
                    >
                        {isLoading ? "Saving..." : "Save changes"}
                    </button>
                </form>
            </div>
        </div>
    )
}
export default EditPage