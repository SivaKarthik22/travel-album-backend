const express = require("express");
const assetController = require("../controllers/assetController");

const router = express.Router();
const baseUrl = "/api/assets";

router.get("/getAssetsInFolder/:folderName", assetController.getAssetsInFolder);

module.exports = {router, baseUrl};