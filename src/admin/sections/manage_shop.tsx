import { useState } from "react";

interface itemsProp {
    id:string;
    name:string;
    price:string;
    category:string;
    stock:number;
}

const ManageShop = () => {
  // Static data for products
  const data = [
    {
      id: "1",
      name: "Product 1",
      price: "$50.00",
      category: "Electronics",
      stock: 20,
    },
    {
      id: "2",
      name: "Product 2",
      price: "$30.00",
      category: "Clothing",
      stock: 50,
    },
    {
      id: "3",
      name: "Product 3",
      price: "$80.00",
      category: "Home Appliance",
      stock: 10,
    },
  ];

  const [products, setProducts] = useState<itemsProp[]>(data);
  const [newProduct, setNewProduct] = useState({ name: "", price: "", category: "", stock: 0 });
  const [editingProduct, setEditingProduct] = useState<any|null>(null);

  // Handle form changes
  const handleInputChange = (e:any) => {
    const { name, value } = e.target;
    if (editingProduct) {
      setEditingProduct({ ...editingProduct, [name]: value });
    } else {
      setNewProduct({ ...newProduct, [name]: value });
    }
  };

  // Add product
  const handleAddProduct = (e:any) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price || !newProduct.category || newProduct.stock < 0) return;
    const updatedProducts = [...products, { ...newProduct, id: String(products.length + 1) }];
    setProducts(updatedProducts);
    setNewProduct({ name: "", price: "", category: "", stock: 0 }); // Clear form after submit
  };

  // Edit product
  const handleEditProduct = (product:any) => {
    setEditingProduct(product);
  };

  // Save edited product
  const handleSaveEditedProduct = () => {
    const updatedProducts = products.map((prod) =>
      prod.id === editingProduct.id ? editingProduct : prod
    );
    setProducts(updatedProducts);
    setEditingProduct(null);
  };

  // Delete product
  const handleDeleteProduct = (id:any) => {
    const updatedProducts = products.filter((product) => product.id !== id);
    setProducts(updatedProducts);
  };

  return (
    <section className="p-6 max-w-6xl mx-auto text-white bg-gray-900">
      <h2 className="text-3xl font-bold mb-6">Manage Shop Products</h2>

      {/* Add Product Form */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-4">Add New Product</h3>
        <form onSubmit={handleAddProduct} className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={newProduct.name}
            onChange={handleInputChange}
            className="px-4 py-2 bg-gray-800 text-white rounded"
          />
          <input
            type="text"
            name="price"
            placeholder="Price"
            value={newProduct.price}
            onChange={handleInputChange}
            className="px-4 py-2 bg-gray-800 text-white rounded"
          />
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={newProduct.category}
            onChange={handleInputChange}
            className="px-4 py-2 bg-gray-800 text-white rounded"
          />
          <input
            type="number"
            name="stock"
            placeholder="Stock"
            value={newProduct.stock}
            onChange={handleInputChange}
            className="px-4 py-2 bg-gray-800 text-white rounded"
          />
          <button type="submit" className="bg-blue-600 px-4 py-2 rounded text-white">
            Add Product
          </button>
        </form>
      </div>

      {/* Edit Product Form (Visible when editing) */}
      {editingProduct && (
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-4">Edit Product</h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSaveEditedProduct();
            }}
            className="flex flex-col gap-4"
          >
            <input
              type="text"
              name="name"
              placeholder="Product Name"
              value={editingProduct?.name}
              onChange={handleInputChange}
              className="px-4 py-2 bg-gray-800 text-white rounded"
            />
            <input
              type="text"
              name="price"
              placeholder="Price"
              value={editingProduct?.price}
              onChange={handleInputChange}
              className="px-4 py-2 bg-gray-800 text-white rounded"
            />
            <input
              type="text"
              name="category"
              placeholder="Category"
              value={editingProduct.category}
              onChange={handleInputChange}
              className="px-4 py-2 bg-gray-800 text-white rounded"
            />
            <input
              type="number"
              name="stock"
              placeholder="Stock"
              value={editingProduct.stock}
              onChange={handleInputChange}
              className="px-4 py-2 bg-gray-800 text-white rounded"
            />
            <button type="submit" className="bg-green-600 px-4 py-2 rounded text-white">
              Save Changes
            </button>
          </form>
        </div>
      )}

      {/* Products Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto text-left">
          <thead className="bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-sm font-medium text-white">Product Name</th>
              <th className="px-6 py-3 text-sm font-medium text-white">Price</th>
              <th className="px-6 py-3 text-sm font-medium text-white">Category</th>
              <th className="px-6 py-3 text-sm font-medium text-white">Stock</th>
              <th className="px-6 py-3 text-sm font-medium text-white">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b bg-gray-700">
                <td className="px-6 py-4 text-sm text-gray-300">{product.name}</td>
                <td className="px-6 py-4 text-sm text-gray-300">{product.price}</td>
                <td className="px-6 py-4 text-sm text-gray-300">{product.category}</td>
                <td className="px-6 py-4 text-sm text-gray-300">{product.stock}</td>
                <td className="px-6 py-4 text-sm">
                  <button
                    className="px-3 py-1 bg-yellow-600 hover:bg-yellow-700 rounded text-sm mr-2"
                    onClick={() => handleEditProduct(product)}
                  >
                    Edit
                  </button>
                  <button
                    className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-sm"
                    onClick={() => handleDeleteProduct(product.id)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default ManageShop;
