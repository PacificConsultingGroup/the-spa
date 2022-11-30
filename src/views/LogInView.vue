<script setup lang="ts">
import { useRouter } from 'vue-router';


const router = useRouter();

function clickHandlerLogIn(ev: MouseEvent) {
    ev.preventDefault();
    router.push('/home');
}

</script>

<template>
    <div :class="$style.logInViewWrapper">
        <div :class="$style.background"></div>
        <div :class="$style.foreground">
            <div :class="$style.logInBox">
                <h1 :class="$style.logInBoxTitle">MAKE IT HAPPEN</h1>
                <form :class="$style.logInForm">
                    <form :class="$style.inputGroupsContainer">
                        <div :class="$style.inputGroup">
                            <label for="username" hidden>Username / Email</label>
                            <input id="username" for="username" placeholder="Username / Email" />
                        </div>
                        <div :class="$style.inputGroup">
                            <label for="password" hidden>Password</label>
                            <input id="password" for="password" placeholder="Password" />
                        </div>
                    </form>
                    <a :class="$style.forgotPasswordLink">Forgot your password?</a>
                    <button :class="$style.logInButton" type="button" @click="clickHandlerLogIn">Sign In</button>
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