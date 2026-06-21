import { useEffect, useState } from 'react';
import axios from 'axios';
import Product from '../components/porduct.jsx';
import Loading from '../components/loading.jsx';

const API_URL = import.meta.env.VITE_API_URL;

const HomePage = ({ query }) => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const getProducts = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get(`${API_URL}/products/`);
            console.log(response.data);
            setProducts(response.data);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    useEffect(() => {
        getProducts();
    }, []);

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <div className="bg-gray-50 min-h-screen p-6">
            {isLoading ? (
                <div className="flex items-center justify-center min-h-[60vh]">
                    <Loading />
                </div>
            ) : filteredProducts.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {filteredProducts.map((product) => (
                        <Product key={product.id} product={product} />
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-500 mt-10">No result found.</p>
            )}
        </div>
    );
}
export default HomePage