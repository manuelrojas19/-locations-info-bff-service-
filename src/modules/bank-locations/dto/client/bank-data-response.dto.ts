export interface BankDataResponse {
    Data: Data;
    Page: Page;
}

export interface Data {
    Bank: BankData[];
}

export interface BankData {
    Id: string;
    Name: string;
    Street: string;
    Address: string;
    State: string;
    PostalCode: string;
    Type: string;
    OpeningTime: OpeningTime;
    Location: Location;
}

export interface Location {
    Latitude: number;
    Longitude: number;
}

export interface OpeningTime {
    Open: string;
    Close: string;
}

export interface Page {
    ResultCount: number;
    PageNumber: number;
    PageSize: number;
    TotalPages: number;
    TotalElements: number;
}