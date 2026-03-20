const mongoose = require("mongoose");

const searchbarSchema = new mongoose.Schema({
    placeholderText: { type: String, default: "" },
    backgroundColor: { type: String, default: "" },
    textColor: { type: String, default: "" },
    borderColor: { type: String, default: "" },
    status: { type: String, default: "Active" },
    logo: { type: String, default: "" },

    icons: [
        {
            name: { type: String, default: "" },
            link: { type: String, default: "" }
        }
    ]
}, {
    timestamps: true
});

const SearchBarSetting = mongoose.model("SearchBarSetting", searchbarSchema);
module.exports = SearchBarSetting;
