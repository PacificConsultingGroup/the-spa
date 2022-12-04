
<script setup lang="ts">

// const props = defineProps<{
//
// }>()

</script>

<template>
    <div class="unsaved-changes-notice-bar-wrapper">
        <p>You have made changes in this section</p>
    </div>
</template>

<style scoped>
.unsaved-changes-notice-bar-wrapper {
    --color-mono-light: var(--color-mono-lightest-dark-theme);

    position: relative;
    width: 100%;
    display: grid;
    place-items: center;
    padding: 10px 0px;
    border-radius: 0.2em;
    overflow: clip;
    margin: 20px 0px;
}
.unsaved-changes-notice-bar-wrapper > * {
    position: relative;
}
.unsaved-changes-notice-bar-wrapper::before {
    position: absolute;
    content: '';
    width: 100%;
    height: 100%;
    background-color: var(--color-error-base);
}

@media (prefers-color-scheme: light) {
    .unsaved-changes-notice-bar-wrapper::before {
        background-color: var(--color-error-light);
    }
}
</style>