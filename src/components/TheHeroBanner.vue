<script setup lang="ts">


</script>

<template>
    <div class="the-hero-banner-wrapper">
        <h1 class="hero-text">Make It Happen</h1>
    </div>
</template>

<style scoped>
.the-hero-banner-wrapper {
    position: relative;
    padding-top: 160px;
    padding-bottom: 100px;
    padding-left: 100px;
    background-color: transparent;
}
.hero-text {
    font-size: 36px;
    font-weight: bold;
    filter: drop-shadow(7px 6px 2px hsla(0, 0%, 0%, 0.12));
    color: var(--color-mono-base);
}

@media (prefers-color-scheme: light) {
    .hero-text {
        color: var(--color-mono-darkest);
    }
}
</style>