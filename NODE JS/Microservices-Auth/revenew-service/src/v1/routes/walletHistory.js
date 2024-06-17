const express = require("express");
const walletHistoryController = require("../controllers/walletHistory");
const { authenticateAndValidateRole } = require("../middleware/user-auth");
const {validate} = require("../middleware/validation");
const rules = require("../middleware/validation-rules");
const router = express.Router();

// Define routes
router.get("/vendor/wallet-history",authenticateAndValidateRole(['1']),walletHistoryController.getAllWalletHistoryRecords);
router.get("/vendor/wallet-history/view-all",authenticateAndValidateRole(['1']), walletHistoryController.getAllWalletHistoryWithPagination);
router.get("/vendor/wallet-history/:id",authenticateAndValidateRole(['1']), walletHistoryController.getWalletHistoryById);
router.post("/wallet-history/create", [validate(rules.createWalletHistory)],walletHistoryController.createWalletHistoryRecord);
router.delete("/vendor/wallet-history/delete/:id",[validate(rules.deleteWalletHistory)],authenticateAndValidateRole(['1']), walletHistoryController.deleteWalletHistoryRecord);
router.post("/vendor/wallet-history/bulk-delete",[validate(rules.bulkDeleteRequestPayments)], authenticateAndValidateRole(['1']),walletHistoryController.bulkDeleteWalletHistoryRecords);


module.exports = router;
