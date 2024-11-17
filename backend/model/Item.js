import mongoose from 'mongoose';

const itemSchema = mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  costPrice: { type: Number, required: true },
  salePrice: { type: Number, required: true },
  gst: { type: Number, required: true },
  barCode: { type: String, required: true, unique: true },
}, { timestamps: true });

const Item = mongoose.model('Item', itemSchema);
export default Item;
