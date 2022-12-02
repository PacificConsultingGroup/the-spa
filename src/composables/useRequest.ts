import { gatewayAxios } from '@/lib/gatewayAxios';
import { ref } from 'vue';

export function useRequest() {

    const isPendingResponse = ref(false);
    const responseData = ref<unknown | null>(null);
    const responseError = ref<unknown | null>(null);

    async function launchRequest(url: string, verb: 'GET' | 'PUT' | 'POST' | 'DELETE', body?: Record<string, unknown>) {
        isPendingResponse.value = true;
        try {
            switch (verb) {
                case 'GET': {
                    const response = await gatewayAxios.get(url);
                    responseData.value = response.data;
                    break;
                }
                case 'PUT': {
                    const response = await gatewayAxios.put(url, body);
                    responseData.value = response.data;
                    break;
                }
                case 'POST': {
                    const response = await gatewayAxios.post(url, body);
                    responseData.value = response.data;
                    break;
                }
                case 'DELETE': {
                    const response = await gatewayAxios.delete(url);
                    responseData.value = response.data;
                    break;
                }
                default: return;
            }
        } catch (err) {
            responseError.value = err;
        }
        isPendingResponse.value = false;
    }

    return { launchRequest, isPendingResponse, responseData, responseError };
}