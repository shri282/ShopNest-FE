export interface ISnackbarState {
    open: boolean;
    message: string;
    status: "Error" | "Info";
}