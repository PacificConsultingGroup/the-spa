<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { getEnvVariableValue } from '@/utils/getEnvVariableValue';
import type { Person } from '@/schema/Person';
import { useRequest } from '@/composables/useRequest';
import { Icon } from '@iconify/vue';

const router = useRouter();

const logInRequest = useRequest();

/* Form handling */
const initialInputValues = {
    email: '',
    password: ''
};
const inputValuesRef = ref(initialInputValues);
const inputErrorsRef = ref<{ [Property in keyof typeof initialInputValues]?: string }>({});
const formErrorsRef = ref<string[]>([]);

function validateInputOfFormField(fieldName: keyof typeof inputValuesRef.value) {
    switch (fieldName) {
        case 'email': {
            const email = inputValuesRef.value.email;
            inputErrorsRef.value.email = '';
            if (!email) return inputErrorsRef.value.email = 'Please enter an email';
            if (!/^.+@.+$/.test(email)) return inputErrorsRef.value.email = 'Please enter a valid email';
            if (email.length > 100) return inputErrorsRef.value.email = 'Please enter an email no longer than 100 characters';
            break;
        }
        case 'password': {
            const password = inputValuesRef.value.password;
            inputErrorsRef.value.password = '';
            if (!password) return inputErrorsRef.value.password = 'Please enter a password';
            if (password.length > 100) return inputErrorsRef.value.password = 'Please enter a password no longer than 100 characters';
            break;
        }
        default: return;
    }
}
async function submitForm() {
    formErrorsRef.value = [];
    for (const field of Object.keys(inputValuesRef.value) as (keyof typeof inputValuesRef.value)[]) validateInputOfFormField(field);
    if (Object.values(inputErrorsRef.value).some(inputErrorMessage => !!inputErrorMessage)) return;
    await logInRequest.send('/auth/login', 'POST', inputValuesRef.value);
    if (logInRequest.responseError.value) {
        const err = logInRequest.responseError.value;
        if (!axios.isAxiosError(err)) throw (err);
        if (!err.response) return formErrorsRef.value.push('Failed to log in. Please try again later.');
        if (err.response.status === 401) formErrorsRef.value.push('Email or password may be incorrect');
        return;
    }
    const personUuid = (logInRequest.responseData.value as { person_uuid: Person['person_uuid'] }).person_uuid;
    localStorage.setItem(getEnvVariableValue('VITE_LS_LOGGED_IN_USER_KEY_NAME'), personUuid);
    router.replace('/home');
}

/* Click Handlers */
function clickHandlerLogInButton(ev: MouseEvent) {
    ev.preventDefault();
    submitForm();
}

</script>

<template>
    <div class="log-in-view-wrapper">
        <div class="background"></div>
        <div class="foreground">
            <div class="log-in-box">
                <h1 class="log-in-box-title">MAKE IT HAPPEN</h1>
                <ul v-if="formErrorsRef.length > 0" class="log-in-failure-errors-container">
                    <li v-for="(formError, i) in formErrorsRef" :key="i" class="form-error-message">
                        {{ formError }}
                    </li>
                </ul>
                <form class="log-in-form">
                    <form class="input-groups-container">
                        <div class="input-group">
                            <label for="email" hidden>Username / Email</label>
                            <input
                                id="email"
                                for="email"
                                placeholder="Email"
                                v-model="inputValuesRef.email"
                                @focusout="(ev) => ev.target === ev.currentTarget && validateInputOfFormField('email')" />
                            <p class="input-error-message">
                                {{ inputErrorsRef.email }}
                            </p>
                        </div>
                        <div class="input-group">
                            <label for="password" hidden>Password</label>
                            <input
                                id="password"
                                for="password"
                                type="password"
                                placeholder="Password"
                                v-model="inputValuesRef.password"
                                @focusout="(ev) => ev.target === ev.currentTarget && validateInputOfFormField('password')" />
                            <p class="input-error-message">
                                {{ inputErrorsRef.password }}
                            </p>
                        </div>
                    </form>
                    <a class="forgot-password-link">Forgot your password?</a>
                    <button class="log-in-button" type="button" @click="clickHandlerLogInButton" :disabled="logInRequest.isPendingResponse.value">
                        <template v-if="logInRequest.isPendingResponse.value">
                            <Icon icon="eos-icons:bubble-loading" /> Signing In...
                        </template>
                        <template v-else>
                            Sign In
                        </template>
                    </button>
                    <div class="login-method-divider">or</div>
                    <button class="azure-login-button" type="button">Azure Login</button>
                </form>
            </div>
        </div>
    </div>
</template>

<style scoped>
.log-in-view-wrapper {
    position: absolute;
    top: 0px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100vh;
    width: 100%;
}
.background {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: var(--color-surface-mono-0);
}
.foreground {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 50px 0px;
    box-shadow:
        0px 5px 25px hsla(0, 0%, 0%, 0.3),
        0px 0px 100px hsla(0, 0%, 0%, 0.1);
    background-color: var(--color-surface-mono-1);
}
.log-in-box {
    position: relative;
    width: 400px;
    background-color: var(--color-surface-mono-2);
    box-shadow: var(--box-shadow-hover);
    border-radius: 5px;
    padding: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.log-in-box-title {
    position: relative;
    text-align: center;
    color: var(--color-mono-light);
    font-family: 'Productivity Suite';
    margin-bottom: 50px;
}
.log-in-form {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin-bottom: 10px;
}
.log-in-failure-errors-container {
    position: relative;
    font-size: var(--font-size-small);
    color: var(--color-error-base);
    align-self: flex-start;
    list-style: none;
    padding-left: 5px;
    margin-bottom: 10px;
}
.input-groups-container {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    width: 100%;
    margin-bottom: 30px;
}
.input-group {
    position: relative;
    width: 100%;
}
.input-group > input {
    position: relative;
    width: 100%;
}
.input-error-message {
    position: relative;
    font-size: var(--font-size-small);
    margin-top: 5px;
    padding-left: 5px;
    color: var(--color-error-base);
}
.forgot-password-link {
    position: relative;
    align-self: flex-end;
    margin-bottom: 30px;
}
.log-in-button {
    position: relative;
    width: 100%;
}
.login-method-divider {
    font-size: var(--font-size-small);
    color: var(--color-mono-base);
    margin: 20px 0px;
}
.login-method-divider::before {
    position: absolute;
    content: '';
    translate: 0px 6px;
    background-color: var(--color-mono-base);
    height: 1px;
    left: 0px;
    width: 40%;
}
.login-method-divider::after {
    position: absolute;
    content: '';
    translate: 0px 6px;
    background-color: var(--color-mono-base);
    height: 1px;
    right: 0px;
    width: 40%;
}
.azure-login-button {
    position: relative;
    width: 100%;
}

@media (max-width: 800px) {
    .log-in-box {
        width: 70%;
    }
}
@media (max-width: 600px) {
    .log-in-box {
        width: 90%;
    }
}
</style>