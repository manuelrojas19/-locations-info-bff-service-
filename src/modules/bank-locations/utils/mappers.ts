import { BankDataResponse } from "../dto/client/bank-data-response.dto";
import { BankLocations } from "../dto/graphql/bank-data.gql.model";

export const toBankLocations = (bankDataResponse: BankDataResponse): BankLocations[] => {

    if (!bankDataResponse || !bankDataResponse.Data || !bankDataResponse.Data.Bank || bankDataResponse.Data.Bank.length === 0) {
        return [];
    }

    return bankDataResponse.Data.Bank.map(dataItem => ({
        id: dataItem.Id,
        name: dataItem.Name,
        street: dataItem.Street,
        address: dataItem.Address,
        state: dataItem.State,
        postalCode: dataItem.PostalCode,
        type: dataItem.Type,
        openingTime: {
            open: dataItem.OpeningTime?.Open,
            close: dataItem.OpeningTime?.Close
        },
        location: {
            latitude: dataItem.Location?.Latitude,
            longitude: dataItem.Location?.Longitude
        }
    }));
    
};

export const toBankTypeConstants = (type: string) => ({
    BRANCH: "Sucursal",
    PRIVATE_BANKING: "Banca Privada",
    WEALTH_MANAGEMENT: "Banca Patrimonial",
    DIGITAL_BRANCH: "Sucursal Digital",
    ATM: "ATM",
    AUTOMATIC_BRANCH: "Sucursal Automatica",
    RETIREMENT_SAVINGS: "AFORE",
    PRIORITY_EXECUTIVE: "Ejecutivo Priority",
    PRIORITY_SPACE: "Espacio Priority",
    DEFAULT: "Default"
}[type] || "Default");