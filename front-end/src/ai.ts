import Vapi from "@vapi-ai/web";

export interface IUserInitialData {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
}

export const vapi = new Vapi(import.meta.env.VITE_VAPI_API_KEY);
export const assistantId = import.meta.env.VITE_ASSISTANT_ID;

export const startAssistant = async ({firstName, lastName, phoneNumber, email}: IUserInitialData) => {
    const assistantOverrides: {
        variableValues: IUserInitialData;
    } = {
        variableValues: {
            firstName,
            lastName,
            phoneNumber,
            email,
        }
    }
    return await vapi.start(assistantId, assistantOverrides);

}

export const stopAssistant = async () => {
    return await vapi.stop();
}