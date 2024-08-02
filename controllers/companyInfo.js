const CompanyInfo = require('../models/companyInfo');
const companyInfoSchema = require('../validators/companyInfoSchema');
const makeApiResponse = require('../lib/response')
const addInfo = async (req, res) => {
    try {
        const validatedData = await companyInfoSchema.validateAsync(req.body, { abortEarly: false });

        const newCompanyInfo = new CompanyInfo(validatedData);

        await newCompanyInfo.save();

        res.status(201).json({ message: 'Company info added successfully', data: newCompanyInfo });
    } catch (err) {
        console.error('Error adding company info:', err);

        if (err.isJoi) {
            const errorMessage = err.details.map(d => d.message).join('; ');
            return res.status(400).json({ error: errorMessage });
        }

        res.status(500).json({ error: 'Failed to add company info' });
    }
};


//delete company Information

const deleteInfo = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id);

        const deletedCompanyInfo = await CompanyInfo.findByIdAndDelete(id);

        if (!deletedCompanyInfo) {
            return res.status(404).json({ error: 'Company info not found' });
        }

        const response = makeApiResponse('Company info deleted successfully', 'success', 200, deletedCompanyInfo);
        res.status(200).json(response);
    } catch (err) {
        console.error('Error deleting company info:', err);
        res.status(500).json({ error: 'Failed to delete company info' });
    }
};


//update company Infor
const updateInfo = async (req, res) => {
    try {
        const { id } = req.params;
        const validatedData = await companyInfoSchema.validateAsync(req.body, { abortEarly: false });

        const updatedCompanyInfo = await CompanyInfo.findByIdAndUpdate(id, validatedData, { new: true });

        if (!updatedCompanyInfo) {
            return res.status(404).json({ error: 'Company info not found' });
        }

        const response = makeApiResponse('Company info updated successfully', 'success', 200, updatedCompanyInfo);
        res.status(200).json(response);
    } catch (err) {
        console.error('Error updating company info:', err);

        if (err.isJoi) {
            const errorMessage = err.details.map(d => d.message).join('; ');
            return res.status(400).json({ error: errorMessage });
        }

        res.status(500).json({ error: 'Failed to update company info' });
    }
};



module.exports = { addInfo, deleteInfo,updateInfo };



