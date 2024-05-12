import express, { Request, Response } from "express";
import FinancialRecordModel from "../schema/financial-record";

const router = express.Router();

// GET ALL RECORDS  => /financial-records/getAllByUserId/1001
router.get("/getAllByUserId/:userId", async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;

    const records = await FinancialRecordModel.find({
      userId,
    });

    // play with data and finally return to the user
    if (records.length === 0) {
      return res.status(401).send("No records found for the user.");
    }
    res.status(200).send(records);
  } catch (error) {
    // server error occured
    res.status(500).send(error);
  }
});

// CREATE A NEW RECORD
router.post("/", async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    const newRecord = new FinancialRecordModel(userData);
    const savedRecord = await newRecord.save();

    res.status(200).send(savedRecord);
  } catch (error) {
    res.status(500).send(error);
  }
});

// UPDATE EXISTING RECORD
// REPLACE ENTIRE DATA => PUT
router.put("/:recordId", async (req: Request, res: Response) => {
  try {
    const updatedRecordData = req.body;
    const id = req.params.recordId;
    const record = await FinancialRecordModel.findByIdAndUpdate(
      id,
      updatedRecordData,
      { new: true }
    );

    if (!record) return res.status(404).send("No record found!");
    res.status(200).send(record);
  } catch (error) {
    res.status(500).send(error);
  }
});

// DELETE EXISTING RECORD
router.delete("/:recordId", async (req: Request, res: Response) => {
  try {
    const id = req.params.recordId;
    const record = await FinancialRecordModel.findByIdAndDelete(id);

    if (!record) return res.status(404).send("No record found!");
    res.status(200).send(record);
  } catch (error) {
    // server error occured
    res.status(500).send(error);
  }
});

export default router;
