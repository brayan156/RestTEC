//defines the properties of each alert object

export class Alert {
    constructor(
        public id: string,
        public type?: AlertType,
        public message?: string,
        public autoClose: boolean = true,
        public keepAfterRouteChange: boolean = false,
        public fade: boolean = false
    ) {}
}

// defines the types of alerts allowed in the Angular CRUD application.
export enum AlertType {
    Success,
    Error,
    Info,
    Warning
}