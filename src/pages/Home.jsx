import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import Product from "../components/Product"

const Home = () => {
  const API_URL = "https://fakestoreapi.com/products";
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [phone, setPhone] = useState("");
  async function fetchProductData(){
    setLoading(true);

    try{
      const res = await fetch(API_URL);
      const data = await res.json();

      setPosts(data);
    }
    catch(err){
      alert("Error");
      setPosts([]);
    }
    setLoading(false);
  }

  useEffect( () => {
    fetchProductData();
    window.RT.capture("Visit Home Page");
  }, []);

  const handleSubmit = () => {
    window.RT.setPhoneNumber(phone);
  }

  return (
    <div className="flex justify-center items-center flex-col">
      {
        loading ? <Spinner /> : 
        posts.length > 0 ?

        (<div className="flex flex-col justify-center">
          <input className="bg-gray-200 p-2 rounded-md border border-black " placeholder="Enter phone Number" value={phone} onChange={(e) => setPhone(e.target.value)}/>
          <button className="bg-blue-500 text-white p-2 rounded-md mt-2" onClick={handleSubmit}>Submit</button>
          <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-6xl p-2 mx-auto space-y-10 space-x-5 min-h-[10vh] mt-16">
            {
              posts.map( (post) => (
                <Product key={post.id} post={post} />
                ) )
                }
          </div>
        </div>
        
      ) :
        (<div className="flex justify-center items-center">
          <p>No data found</p>
        </div>)
      }

    </div>
  );
};

export default Home;
