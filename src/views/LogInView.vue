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
    <div :class="$style.logInViewWrapper">
        <div :class="$style.background"></div>
        <div :class="$style.foreground">
            <div :class="$style.logInBox">
                <h1 :class="$style.logInBoxTitle">MAKE IT HAPPEN</h1>
                <ul v-if="formErrorsRef.length > 0" :class="$style.logInFailureErrorsContainer">
                    <li v-for="(formError, i) in formErrorsRef" :key="i" :class="$style.formErrorMessage">
                        {{ formError }}
                    </li>
                </ul>
                <form :class="$style.logInForm">
                    <form :class="$style.inputGroupsContainer">
                        <div :class="$style.inputGroup">
                            <label for="email" hidden>Username / Email</label>
                            <input
                                id="email"
                                for="email"
                                placeholder="Email"
                                v-model="inputValuesRef.email"
                                @focusout="(ev) => ev.target === ev.currentTarget && validateInputOfFormField('email')" />
                            <p :class="$style.inputErrorMessage">
                                {{ inputErrorsRef.email }}
                            </p>
                        </div>
                        <div :class="$style.inputGroup">
                            <label for="password" hidden>Password</label>
                            <input
                                id="password"
                                for="password"
                                type="password"
                                placeholder="Password"
                                v-model="inputValuesRef.password"
                                @focusout="(ev) => ev.target === ev.currentTarget && validateInputOfFormField('password')" />
                            <p :class="$style.inputErrorMessage">
                                {{ inputErrorsRef.password }}
                            </p>
                        </div>
                    </form>
                    <a :class="$style.forgotPasswordLink">Forgot your password?</a>
                    <button :class="$style.logInButton" type="button" @click="clickHandlerLogInButton" :disabled="logInRequest.isPendingResponse.value">
                        <template v-if="logInRequest.isPendingResponse.value">
                            <Icon icon="eos-icons:bubble-loading" /> Signing In...
                        </template>
                        <template v-else>
                            Sign In
                        </template>
                    </button>
                    <div :class="$style.loginMethodDivider">or</div>
                    <button :class="$style.azureLoginButton" type="button">Azure Login</button>
                </form>
            </div>
        </div>
    </div>
</template>

<style module>
.logInViewWrapper {
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
.logInBox {
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
.logInBoxTitle {
    position: relative;
    text-align: center;
    color: var(--color-mono-light);
    font-family: 'Productivity Suite';
    margin-bottom: 50px;
}
.logInForm {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin-bottom: 10px;
}
.logInFailureErrorsContainer {
    position: relative;
    font-size: var(--font-size-small);
    color: var(--color-error-base);
    align-self: flex-start;
    list-style: none;
    padding-left: 5px;
    margin-bottom: 10px;
}
.inputGroupsContainer {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    width: 100%;
    margin-bottom: 30px;
}
.inputGroup {
    position: relative;
    width: 100%;
}
.inputGroup > input {
    position: relative;
    width: 100%;
}
.inputErrorMessage {
    position: relative;
    font-size: var(--font-size-small);
    margin-top: 5px;
    padding-left: 5px;
    color: var(--color-error-base);
}
.forgotPasswordLink {
    position: relative;
    align-self: flex-end;
    margin-bottom: 30px;
}
.logInButton {
    position: relative;
    width: 100%;
}
.loginMethodDivider {
    font-size: var(--font-size-small);
    color: var(--color-mono-base);
    margin: 20px 0px;
}
.loginMethodDivider::before {
    position: absolute;
    content: '';
    translate: 0px 6px;
    background-color: var(--color-mono-base);
    height: 1px;
    left: 0px;
    width: 40%;
}
.loginMethodDivider::after {
    position: absolute;
    content: '';
    translate: 0px 6px;
    background-color: var(--color-mono-base);
    height: 1px;
    right: 0px;
    width: 40%;
}
.azureLoginButton {
    position: relative;
    width: 100%;
}

@media (max-width: 800px) {
    .logInBox {
        width: 70%;
    }
}
@media (max-width: 600px) {
    .logInBox {
        width: 90%;
    }
}
</style>