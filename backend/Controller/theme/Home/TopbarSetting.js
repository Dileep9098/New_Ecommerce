const catchAsyncError = require("../../../Middlewares/catchAsyncError");
const SearchBarSetting = require("../../../Models/ThemeSetting/searchbarSettingModel");
const TopBar = require("../../../Models/ThemeSetting/topbarModel");
const path = require("path");
const ErrorHandler = require("../../../utils/errorhandler");
const fs = require("fs");
exports.topBarSetting = catchAsyncError(async (req, res, next) => {
    const { title, backgroundColor, textColor, status, language, texts } = req.body.settings;
    console.log(req.body.settings)
    const existingSetting = await TopBar.findOne();
    if (existingSetting) {
        existingSetting.title = title;
        existingSetting.backgroundColor = backgroundColor;
        existingSetting.textColor = textColor;
        existingSetting.language = language;
        existingSetting.status = status;
        existingSetting.texts = texts;
        existingSetting.numberOfColumns = texts.length;

        await existingSetting.save();
        return res.status(200).json({

            success: true,
            message: "Topbar settings updated successfully",
            setting: existingSetting
        });
    }
    const newSetting = await TopBar.create({
        title,
        backgroundColor,
        textColor,
        language,
        status
        , texts
        , numberOfColumns: texts.length
    });
    res.status(201).json({
        success: true,
        message: "Topbar settings created successfully",
        setting: newSetting
    });
}
);

exports.getTopBarSetting = catchAsyncError(async (req, res, next) => {
    const setting = await TopBar.findOne();
    if (!setting) {
        return next(new ErrorHandler("Topbar settings not found", 404));
    }
    res.status(200).json({
        success: true,
        setting
    });
}

);




// Create or Update Searchbar Setting
// exports.searchBarSetting = catchAsyncError(async (req, res, next) => {
//     const {
//         placeholderText,
//         backgroundColor,
//         textColor,
//         borderColor,
//         status,
//         logo,
//         icons
//     } = req.body.settings;

//     let existingSetting = await SearchBarSetting.findOne();
//     if (existingSetting) {
//         existingSetting.placeholderText = placeholderText;
//         existingSetting.backgroundColor = backgroundColor;
//         existingSetting.textColor = textColor;
//         existingSetting.borderColor = borderColor;
//         existingSetting.status = status;
//         existingSetting.logo = logo;
//         existingSetting.icons = icons;

//         await existingSetting.save();
//         return res.status(200).json({
//             success: true,
//             message: "Searchbar settings updated successfully",
//             setting: existingSetting
//         });
//     }

//     const newSetting = await SearchBarSetting.create({
//         placeholderText,
//         backgroundColor,
//         textColor,
//         borderColor,
//         status,
//         logo,
//         icons
//     });

//     res.status(201).json({
//         success: true,
//         message: "Searchbar settings created successfully",
//         setting: newSetting
//     });
// });




exports.searchBarSetting = async (req, res) => {
    try {
        // console.log("📥 BODY:", req.body);
        // console.log("📸 FILE:", req.file);

        let icons = [];
        if (req.body.icons) {
            try {
                icons = JSON.parse(req.body.icons);
            } catch (err) {
                console.log("⚠️ Invalid icons JSON:", err);
            }
        }

        const uploadsFolder = path.join(__dirname, "../../../uploads/searchbar");
        console.log("dfogjhfdiki rtythdu thdhfgdthfdvh ",uploadsFolder)
        const logoUrl = req.file ? req.file.filename : null;

        let setting = await SearchBarSetting.findOne();

        if (setting) {
            // Update text/color/icons
            Object.assign(setting, {
                placeholderText: req.body.placeholderText || setting.placeholderText,
                backgroundColor: req.body.backgroundColor || setting.backgroundColor,
                textColor: req.body.textColor || setting.textColor,
                borderColor: req.body.borderColor || setting.borderColor,
                status: req.body.status || setting.status,
                icons,
            });

            // Remove old logo if new logo uploaded
            
            if (logoUrl) {
                if (setting.logo) {
                    const oldImagePath = path.join(uploadsFolder, setting.logo);
                    console.log("dfogjhfdiki rtythdu thdhfgdthfdvh ",oldImagePath)

                    if (fs.existsSync(oldImagePath)) {
                        fs.unlink(oldImagePath, (err) => {
                            if (err) console.log("❌ Error deleting old logo:", err);
                            else console.log("🗑️ Old logo deleted:", setting.logo);
                        });
                    }
                }
                setting.logo = logoUrl;
            }

            await setting.save();
            return res.status(200).json({ success: true, message: "Updated", setting });
        }

        // Create new setting
        const newSetting = await SearchBarSetting.create({
            placeholderText: req.body.placeholderText || "",
            backgroundColor: req.body.backgroundColor || "",
            textColor: req.body.textColor || "",
            borderColor: req.body.borderColor || "",
            status: req.body.status || "Active",
            icons,
            logo: logoUrl || "",
        });

        res.status(201).json({ success: true, message: "Created", setting: newSetting });

    } catch (error) {
        console.error("❌ Server error:", error);
        res.status(500).json({
            success: false,
            message: "Unexpected end of form or server error",
            error: error.message,
        });
    }
};


// Get Searchbar Setting
exports.getSearchBarSetting = catchAsyncError(async (req, res, next) => {
    const setting = await SearchBarSetting.findOne();
    if (!setting) {
        return res.status(404).json({
            success: false,
            message: "Searchbar settings not found"
        });
    }
    res.status(200).json({
        success: true,
        setting
    });
});