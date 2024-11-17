import Quotation from "../model/Quotation.js";

export const addQuotation = async (request , response)=>{
    try {
        const quotationData = request.body;
    
        // If no existing quotation, proceed to save
        const newQuotation = new Quotation(quotationData);
        await newQuotation.save();
    
        response.status(200).json({ message: 'Quotation saved successfully', data: newQuotation });
      } catch (error) {
        response.status(500).json({ message: 'Error saving quotation', error: error.message });
      }
}
export const getQuotation = async (request , response)=>{
    try {

        const allQuotation = await Quotation.find({});
        response.status(200).json(allQuotation);
      } catch (error) {
        response.status(500).json({ message: 'Error Fetching quotation', error: error });
      }
}
