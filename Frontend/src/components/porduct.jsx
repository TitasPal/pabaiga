import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"

const API_URL = import.meta.env.VITE_API_URL;

const Product = ({ product }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const handleDelete = async () => {
    console.log('product object:', product); // add this
    try {
      await axios.delete(`${API_URL}/products/${product.id}`);
      window.location.reload();
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div className="card w-full border-gray-500">
      <div className="card-body bg-white text-black rounded-xl">
        <figure>
          <img src={product.image} alt={product.name} />
        </figure>
        <h2 className="card-title">{product.name}</h2>
        <p>{product.description}</p>
        <h1>${product.price.toFixed(2)}</h1>
        <div className="card-actions justify-end">
          {user && user.id === product.createdBy && (<button className='bg-cyan-600 rounded-sm h-10 w-20 text-center text-white hover:bg-cyan-700 mr-2'><Link to={`/edit/${product.id}`}>edit</Link></button>)}
          {user && user.id === product.createdBy && (<button onClick={handleDelete} className='bg-red-500 rounded-sm h-10 w-20 text-center text-white hover:bg-red-600'>Delete</button>)}
        </div>
      </div>
    </div>
  )
}

export default Product