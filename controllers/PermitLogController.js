const Joi = require('joi');
const PermitLogBook = require('../models/PermitLogBook.model');
const permitLogBookSchema = require('../validators/permitLogBookSchema');
const mongoose = require('mongoose')


const addPermitLogBook = async (req, res) => {
    console.log("Permit Log Book API");
    try {
        const { error, value } = permitLogBookSchema.validate(req.body, { abortEarly: false });
        if (error) {
            return res.status(400).send({ error: error.details.map(detail => detail.message) });
        }

        const newPermitLogBook = new PermitLogBook(value);
        await newPermitLogBook.save();

        res.status(201).send({ message: "Permit Log Book added successfully", data: newPermitLogBook });
    } catch (error) {
        console.error("Error saving Permit Log Book:", error);
        res.status(500).send("Server error");
    }
};


const deletePermitLogBook = async (req, res) => {
    console.log("Delete Permit Log Book API");
    try {
        const permitLogBookId = req.params.id;

        if (!mongoose.isValidObjectId(permitLogBookId)) {
            return res.status(400).send({ error: "Invalid Permit Log Book ID" });
        }

        const deletedPermitLogBook = await PermitLogBook.findByIdAndDelete(permitLogBookId);

        if (!deletedPermitLogBook) {
            return res.status(404).send({ error: "Permit Log Book not found" });
        }

        res.status(200).send({ message: "Permit Log Book deleted successfully", data: deletedPermitLogBook });
    } catch (error) {
        console.error("Error deleting Permit Log Book:", error);
        res.status(500).send("Server error");
    }
};


//update permit log Book

const updatePermitLogBook = async (req, res) => {
    console.log("Update Permit Log Book API");
    try {
        const permitLogBookId = req.params.id;

        if (!mongoose.isValidObjectId(permitLogBookId)) {
            return res.status(400).send({ error: "Invalid Permit Log Book ID" });
        }

        const updatedPermitLogBook = await PermitLogBook.findByIdAndUpdate(
            permitLogBookId,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedPermitLogBook) {
            return res.status(404).send({ error: "Permit Log Book not found" });
        }

        res.status(200).send({ message: "Permit Log Book updated successfully", data: updatedPermitLogBook });
    } catch (error) {
        console.error("Error updating Permit Log Book:", error);
        res.status(500).send("Server error");
    }
};



module.exports = {
    addPermitLogBook,
    deletePermitLogBook,
    updatePermitLogBook

};

