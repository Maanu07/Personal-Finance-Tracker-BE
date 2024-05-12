"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const financial_record_1 = __importDefault(require("../schema/financial-record"));
const router = express_1.default.Router();
// GET ALL RECORDS  => /financial-records/getAllByUserId/1001
router.get("/getAllByUserId/:userId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const records = yield financial_record_1.default.find({
            userId,
        });
        // play with data and finally return to the user
        if (records.length === 0) {
            return res.status(401).send("No records found for the user.");
        }
        res.status(200).send(records);
    }
    catch (error) {
        // server error occured
        res.status(500).send(error);
    }
}));
// CREATE A NEW RECORD
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userData = req.body;
        const newRecord = new financial_record_1.default(userData);
        const savedRecord = yield newRecord.save();
        res.status(200).send(savedRecord);
    }
    catch (error) {
        res.status(500).send(error);
    }
}));
// UPDATE EXISTING RECORD
// REPLACE ENTIRE DATA => PUT
router.put("/:recordId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedRecordData = req.body;
        const id = req.params.recordId;
        const record = yield financial_record_1.default.findByIdAndUpdate(id, updatedRecordData, { new: true });
        if (!record)
            return res.status(404).send("No record found!");
        res.status(200).send(record);
    }
    catch (error) {
        res.status(500).send(error);
    }
}));
// DELETE EXISTING RECORD
router.delete("/:recordId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.recordId;
        const record = yield financial_record_1.default.findByIdAndDelete(id);
        if (!record)
            return res.status(404).send("No record found!");
        res.status(200).send(record);
    }
    catch (error) {
        // server error occured
        res.status(500).send(error);
    }
}));
exports.default = router;
