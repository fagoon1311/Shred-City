import React from 'react';
import { Trash2 } from 'lucide-react'; // Changed to trash icon
import useFetch from '@/hooks/useFetch';
import { removeItemFromCart } from '@/api/apiShop';

const CartCard = ({ id, name, quantity, price, image, onItemRemoval }) => {
  const {
    loading: loadingDeleteItem,
    fn: deleteItem,
  } = useFetch(removeItemFromCart, {
    cartItemId: id,
  });

  const onRemove = async () => {
    await deleteItem();
    onItemRemoval(id);
  };

  return (
    <div className="w-full flex flex-col md:flex-row gap-4 m-4">
      <div className="w-full bg-[#0e100f] rounded-xl p-4">
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4 items-center">
          {image && (
            <img
              src={image}
              alt={name}
              className="w-16 h-16 object-cover col-span-1 rounded-lg"
            />
          )}
          <h1
            className={`col-span-2 md:col-span-${image ? '2' : '3'} truncate font-Poppins text-xl text-white`}
          >
            {name}
          </h1>
          <h1 className="col-span-1 md:col-span-1 text-center text-lg text-[#97fb57]">
            ₹ {price}
          </h1>
          <h1 className="col-span-1 md:col-span-1 text-center text-lg text-[#97fb57]">
            Qty - {quantity}
          </h1>
          <div
            onClick={onRemove}
            className="col-span-1 cursor-pointer flex items-center justify-center"
            style={{ padding: '0.5rem 1rem', borderRadius: '0.375rem' }} // Optional padding and border radius
          >
            <Trash2 className="w-5 h-5 text-white hover:text-red-500" /> {/* Simple trash icon */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartCard;
