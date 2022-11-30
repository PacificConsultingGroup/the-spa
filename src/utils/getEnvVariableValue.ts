
export function getEnvVariableValue(key: string) {
    if (!import.meta.env[key]) throw new Error(`${key} does not exist in .env`);
    return import.meta.env[key] as string;
}