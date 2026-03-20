import Config from "../Component/Comman/Config";

export const GetDefaultCurrencySymbol = () => {
    let DefaultCurrencySymbol = "₹ ";  //--USD is consider as default if there is no setting in appsetting.json file
    DefaultCurrencySymbol = Config.APP_SETTING['DefaultCurrencySymbol'] ?? "₹ ";
    return DefaultCurrencySymbol;


}